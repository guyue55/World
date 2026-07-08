#!/usr/bin/env node
// 用途：审计 src/lib/*.ts 之间的 import 依赖关系
// 输出：docs/00-overview/lib-dependency-report.md
// 目的：发现潜在冗余、孤岛文件、循环依赖，指导 Phase 14 收束
// 幂等：每次覆盖同一份报告

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LIB_DIR = path.join(ROOT, 'src/lib')
const REPORT = path.join(ROOT, 'docs/00-overview/lib-dependency-report.md')

const files = fs.readdirSync(LIB_DIR).filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'))
const graph = new Map()
const importedBy = new Map()

const importRegex = /import\s+(?:type\s+)?[^'"\n]+\s+from\s+['"](\.[^'"\n]+)['"]/g

// 扫描 lib 外的引用（app / features / scripts / middleware / tests）
const EXT_DIRS = ['src/app', 'src/features', 'src/components', 'src/hooks', 'scripts', 'tests']
const extUsageBy = new Map()
function walk(dir, cb) {
  if (!fs.existsSync(dir)) return
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name)
    const stat = fs.statSync(abs)
    if (stat.isDirectory()) walk(abs, cb)
    else if (/\.(ts|tsx|mjs|js)$/.test(name)) cb(abs)
  }
}
const extImportRegex = /from\s+['"]([^'"\n]+)['"]/g
for (const dir of EXT_DIRS) {
  walk(path.join(ROOT, dir), (abs) => {
    const src = fs.readFileSync(abs, 'utf8')
    let m
    while ((m = extImportRegex.exec(src)) !== null) {
      const target = m[1]
      let libName = null
      const aliasMatch = target.match(/^@\/lib\/([\w\-.]+)/)
      if (aliasMatch) libName = aliasMatch[1].replace(/\.(ts|tsx)$/, '')
      const relMatch = target.match(/(?:^|\/)lib\/([\w\-.]+)$/)
      if (!libName && relMatch) libName = relMatch[1].replace(/\.(ts|tsx)$/, '')
      if (!libName) continue
      if (!extUsageBy.has(libName)) extUsageBy.set(libName, new Set())
      extUsageBy.get(libName).add(path.relative(ROOT, abs))
    }
  })
}

for (const file of files) {
  const abs = path.join(LIB_DIR, file)
  const stat = fs.statSync(abs)
  if (stat.isDirectory()) continue
  const src = fs.readFileSync(abs, 'utf8')
  const deps = new Set()
  let m
  while ((m = importRegex.exec(src)) !== null) {
    const target = m[1]
    // 仅统计 lib 内相对依赖
    if (target.startsWith('./')) {
      const dep = target.replace(/^\.\//, '').replace(/\.(ts|tsx)$/, '')
      deps.add(dep)
    }
  }
  graph.set(file.replace(/\.tsx?$/, ''), deps)
}

for (const [file, deps] of graph.entries()) {
  for (const dep of deps) {
    if (!importedBy.has(dep)) importedBy.set(dep, new Set())
    importedBy.get(dep).add(file)
  }
}

// 计算未被 lib 内引用的文件
const notImportedInLib = []
const trulyOrphan = []
for (const file of graph.keys()) {
  if (!importedBy.has(file) || importedBy.get(file).size === 0) {
    notImportedInLib.push(file)
    const extRefs = extUsageBy.get(file)?.size ?? 0
    if (extRefs === 0) trulyOrphan.push(file)
  }
}

// 计算 fan-out 与 fan-in
const rows = []
for (const [file, deps] of graph.entries()) {
  const fanIn = importedBy.get(file)?.size ?? 0
  const fanOut = deps.size
  rows.push({ file, fanIn, fanOut })
}
rows.sort((a, b) => b.fanIn - a.fanIn)

// 检测循环依赖（简单 DFS）
function findCycles() {
  const cycles = []
  const stack = []
  const inStack = new Set()
  const visited = new Set()
  function dfs(node) {
    if (inStack.has(node)) {
      const idx = stack.indexOf(node)
      cycles.push(stack.slice(idx).concat(node))
      return
    }
    if (visited.has(node)) return
    visited.add(node)
    inStack.add(node)
    stack.push(node)
    for (const dep of graph.get(node) || []) dfs(dep)
    stack.pop()
    inStack.delete(node)
  }
  for (const node of graph.keys()) dfs(node)
  return cycles
}
const cycles = findCycles()

const lines = []
lines.push('# src/lib 依赖审计报告')
lines.push('')
lines.push(`> 生成时间：${new Date().toISOString()}`)
lines.push(`> 库文件数：${graph.size}`)
lines.push(`> 检测到的循环依赖：${cycles.length}`)
lines.push('')
lines.push('## 一、总览')
lines.push('')
lines.push('| 指标 | 数值 |')
lines.push('|---|---|')
lines.push(`| 库文件总数 | ${graph.size} |`)
lines.push(`| 有 lib 内被依赖 | ${graph.size - notImportedInLib.length} |`)
lines.push(`| 未被 lib 内引用 | ${notImportedInLib.length} |`)
lines.push(`| 循环依赖 | ${cycles.length} |`)
lines.push('')
lines.push('## 二、被依赖最多的核心（top 15）')
lines.push('')
lines.push('| 文件 | 被引用次数 | 引用他人次数 |')
lines.push('|---|---|---|')
for (const row of rows.slice(0, 15)) {
  lines.push(`| ${row.file} | ${row.fanIn} | ${row.fanOut} |`)
}
lines.push('')
lines.push('## 三、未被 lib 内引用的候选（可能被 app/features 单点引用或已废弃）')
lines.push('')
lines.push(`共 ${notImportedInLib.length} 个：`)
lines.push('')
for (const f of notImportedInLib.sort()) {
  const extCount = extUsageBy.get(f)?.size ?? 0
  lines.push(`- ${f}（app/features/scripts 引用：${extCount}）`)
}
lines.push('')
lines.push('## 三·B、真孤岛：既不被 lib 内也不被 app/features/scripts 引用')
lines.push('')
lines.push(`共 ${trulyOrphan.length} 个：`)
lines.push('')
for (const f of trulyOrphan.sort()) lines.push(`- ${f}`)
lines.push('')
lines.push('## 四、循环依赖清单')
lines.push('')
if (cycles.length === 0) {
  lines.push('无循环依赖。')
} else {
  for (const cyc of cycles) lines.push(`- ${cyc.join(' -> ')}`)
}
lines.push('')
lines.push('## 五、下一步建议')
lines.push('')
lines.push('1. 未被 lib 内引用的文件应确认是否仍被 app/features/scripts 使用；若无引用，进入废弃候选清单。')
lines.push('2. 被依赖最多的核心文件（fan-in 高）应视为世界的稳定层，改动需 ADR。')
lines.push('3. 循环依赖若存在，优先拆分共享类型或 constants。')
lines.push('')
fs.writeFileSync(REPORT, lines.join('\n'))
console.log(`依赖审计完成：${graph.size} 个库文件，${notImportedInLib.length} 未被 lib 内引用，${cycles.length} 循环依赖`)
console.log(`报告：${path.relative(ROOT, REPORT)}`)
