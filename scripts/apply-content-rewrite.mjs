#!/usr/bin/env node
// 用途：批量重写指定节点的正文内容
// 输入：JSON 文件 { "slug": "正文" }
// 幂等：仅当当前正文匹配"模板复写"特征时才覆盖
// 目的：修复 Phase 9-10 批量扩展遗留的复读机式正文

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const NODES_PATH = resolve(ROOT, 'data/domains/experience/nodes.json')

const rewritePath = process.argv[2]
if (!rewritePath) {
  console.error('用法: node scripts/apply-content-rewrite.mjs <rewrite.json>')
  process.exit(1)
}

const rewrites = JSON.parse(readFileSync(resolve(ROOT, rewritePath), 'utf8'))
const nodes = JSON.parse(readFileSync(NODES_PATH, 'utf8'))
const bySlug = new Map(nodes.map((n) => [n.slug, n]))

const TEMPLATE_MARKERS = ['这个节点属于', '## 边界与诚实', '## 补充说明', '## 与世界的关系']

let written = 0
let skipped = 0
for (const [slug, body] of Object.entries(rewrites)) {
  const n = bySlug.get(slug)
  if (!n) {
    console.warn(`节点不存在，跳过: ${slug}`)
    continue
  }
  const cp = resolve(ROOT, n.contentPath)
  if (!existsSync(cp)) {
    console.warn(`contentPath 不存在: ${cp}`)
    continue
  }
  const current = readFileSync(cp, 'utf8')
  const isTemplate = TEMPLATE_MARKERS.every((m) => current.includes(m))
  if (!isTemplate) {
    console.log(`跳过（非模板复写）: ${slug}`)
    skipped += 1
    continue
  }
  const newContent = `# ${n.title}\n\n${body}\n`
  writeFileSync(cp, newContent)
  written += 1
  console.log(`重写: ${slug} (${newContent.length} 字符)`)
}
console.log(`\n---完成---\n重写: ${written}, 跳过: ${skipped}`)
