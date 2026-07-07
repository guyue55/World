// 用途：检查world kernel runtime
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []
const registry = json('data/world-kernel/world-kernel-consolidation-v1.json')

const formalFiles = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/manifesto/page.tsx',
  'src/app/status/page.tsx',
  'src/app/node/[slug]/page.tsx',
  'src/components/world/WorldShell.tsx',
  'src/components/product/ProductHome.tsx',
  'src/components/product/ProductJourneyDock.tsx',
]

for (const file of formalFiles) {
  if (!fs.existsSync(rel(file))) {
    failures.push(`正式 runtime 文件不存在：${file}`)
    continue
  }

  const content = read(file)
  for (const token of registry.formalRuntime.forbiddenPublicRuntimeImports) {
    if (content.includes(token)) failures.push(`${file} 含有禁止的历史 runtime token：${token}`)
  }
}

const runtime = read('src/lib/world-kernel-runtime.ts')
if (!runtime.includes('getFormalWorldRuntime')) failures.push('缺少 getFormalWorldRuntime')
if (!runtime.includes('getLegacyRuntimePolicy')) failures.push('缺少 getLegacyRuntimePolicy')
if (!runtime.includes('isForbiddenFormalRuntimeToken')) failures.push('缺少 isForbiddenFormalRuntimeToken')

const shell = read('src/components/world/WorldShell.tsx')
for (const token of ['ProductBackdrop', 'ProductJourneyDock', 'skip-link', 'main-content']) {
  if (!shell.includes(token)) failures.push(`WorldShell 缺少正式 runtime 标识：${token}`)
}

if (registry.progress?.K2_runtimeBoundary !== 'completed') failures.push('K2_runtimeBoundary 必须标记 completed')

if (failures.length) {
  console.error('World Kernel runtime check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('World Kernel runtime check passed')
