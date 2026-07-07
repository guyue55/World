// 用途：检查world kernel audit
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const failures = []
const mustExist = [
  'data/world-kernel/kernel-freeze-policy.json',
  'data/world-kernel/world-kernel-architecture-audit-v1.json',
  'docs/10-development-history/world-kernel/world-kernel-architecture-audit-v1.md',
  'src/lib/world-kernel-boundary.ts',
  'scripts/audit-world-kernel.mjs',
  'scripts/check-world-kernel-audit.mjs',
]

for (const file of mustExist) {
  if (!fs.existsSync(rel(file))) failures.push(`缺少 World Kernel 审计文件：${file}`)
}

const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))

if (!failures.length) {
  const freeze = json('data/world-kernel/kernel-freeze-policy.json')
  const audit = json('data/world-kernel/world-kernel-architecture-audit-v1.json')
  const doc = read('docs/10-development-history/world-kernel/world-kernel-architecture-audit-v1.md')
  const boundary = read('src/lib/world-kernel-boundary.ts')
  const middleware = read('middleware.ts')
  const packageJson = json('package.json')

  if (freeze.status !== 'active') failures.push('功能冻结策略必须处于 active 状态')
  if (!freeze.blockedWorkClasses?.includes('new-r8-line')) failures.push('冻结策略必须阻断 new-r8-line')
  if (!freeze.allowedWorkClasses?.includes('kernel-consolidation')) failures.push('冻结策略必须允许 kernel-consolidation')
  if (!audit.findings?.some((item) => item.id === 'kernel-002')) failures.push('审计报告必须包含 R8 runtime 重复发现')
  if (!audit.decisionMatrix?.some((item) => item.category === 'Runtime')) failures.push('审计报告必须包含 Runtime 决策矩阵')
  if (!doc.includes('删 / 合 / 留 / 封')) failures.push('审计文档必须包含删 / 合 / 留 / 封决策矩阵')
  if (!doc.includes('不要继续新增 R8.10/V11')) failures.push('审计文档必须明确禁止继续扩展 R8.10/V11')
  if (!boundary.includes('getWorldKernelRouteDecision')) failures.push('World Kernel 边界层必须提供 getWorldKernelRouteDecision')
  if (!boundary.includes('private-guarded')) failures.push('World Kernel 边界层必须区分 private-guarded')
  if (!middleware.includes('getWorldKernelRouteDecision')) failures.push('middleware 必须统一通过 World Kernel route decision 守门')
  if (!packageJson.scripts?.['audit:world-kernel']) failures.push('package.json 必须声明 audit:world-kernel')
  if (!packageJson.scripts?.['check:world-kernel-audit']) failures.push('package.json 必须声明 check:world-kernel-audit')
}

if (failures.length) {
  console.error('World Kernel audit check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('World Kernel audit check passed')
