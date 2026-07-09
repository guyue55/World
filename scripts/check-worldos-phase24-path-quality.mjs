// 用途：检查 Phase 24 路径与内容质量精修是否真实接入本地主线。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const failures = []

function rel(file) {
  return path.join(ROOT, file)
}

function read(file) {
  return fs.readFileSync(rel(file), 'utf-8')
}

function readJson(file) {
  return JSON.parse(read(file))
}

function exists(file) {
  return fs.existsSync(rel(file))
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function isPublicVisible(visibility) {
  return visibility === 'public' || visibility === 'semiPublic'
}

const contract = readJson('data/world-kernel/worldos-phase24-path-content-quality-contract-v1.json')
const ledger = readJson('data/domains/experience/path-journey-quality-ledger.json')
const pkg = readJson('package.json')
const paths = readJson('data/domains/experience/paths.json')
const nodes = readJson('data/domains/experience/nodes.json')
const registry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(contract.name === 'WorldOS Phase 24 路径与内容质量精修合同 v1', 'Phase 24 合同名称不正确')
assert(contract.scope?.localOnly === true, 'Phase 24 必须保持 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false, 'Phase 24 不得考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, 'Phase 24 不得考虑 Production')
assert(contract.scope?.frontendPermissionControl === false, 'Phase 24 不得把权限控制放到前端')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Phase 24 必须保持 false`)
}

for (const file of contract.requiredFiles ?? []) {
  assert(exists(file), `缺少 Phase 24 必需文件：${file}`)
}

for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 Phase 24 命令：${command}`)
}
assert(pkg.scripts?.['check:phase24-path-quality'] === 'node scripts/check-worldos-phase24-path-quality.mjs', 'check:phase24-path-quality 命令不正确')
assert(pkg.scripts?.['check:mainline']?.includes('check:phase24-path-quality'), 'check:mainline 必须纳入 check:phase24-path-quality')
assert((registry.activeEntrypoints ?? []).includes('check:phase24-path-quality'), '脚本注册表缺少 check:phase24-path-quality')

assert(ledger.name === 'WorldOS Phase 24 路径与内容质量账本', '路径质量账本名称不正确')
assert(ledger.status === 'passed', '路径质量账本必须通过')
assert(ledger.scope?.localOnly === true, '路径质量账本必须保持 localOnly=true')

for (const [key, expected] of Object.entries(contract.minimums ?? {})) {
  const actual = ledger.metrics?.[key]
  assert(typeof actual === 'number', `路径质量账本缺少数值指标：${key}`)
  assert(actual >= expected, `${key} 未达标：${actual}/${expected}`)
}

const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
const publicNodeSlugs = new Set(publicNodes.map((node) => node.slug))
const publicPaths = paths.filter((item) => item.visibility === 'public')
assert(publicPaths.length === ledger.metrics.publicPaths, '账本公开路径数量与源数据不一致')

for (const item of publicPaths) {
  assert(item.nodeSlugs.length >= 4, `${item.id} 节点少于 4 个`)
  assert(Boolean(item.estimatedMinutes), `${item.id} 缺少预计阅读时间`)
  assert(Boolean(item.description && item.description.length >= 18), `${item.id} 缺少叙事描述`)
  for (const slug of item.nodeSlugs) {
    assert(publicNodeSlugs.has(slug), `${item.id} 引用了不存在或非公开节点：${slug}`)
  }
}

const statusPage = read('src/app/status/page.tsx')
for (const token of ['getPathQualityLedger', 'PathQualityLedgerPanel', 'pathQualityLedger']) {
  assert(statusPage.includes(token), `/status 缺少路径质量接入：${token}`)
}

const statusPanel = read('src/components/status/PathQualityLedgerPanel.tsx')
for (const token of contract.requiredStatusTokens ?? []) {
  assert(statusPanel.includes(token), `PathQualityLedgerPanel 缺少文案或状态：${token}`)
}

const pathBoard = read('src/components/paths/PathJourneyBoard.tsx')
for (const token of contract.requiredPathJourneyTokens ?? []) {
  assert(pathBoard.includes(token), `PathJourneyBoard 缺少旅程质量文案：${token}`)
}

const surfaceTypes = read('src/lib/public-surfaces/types.ts')
for (const token of ['whyThisStep', 'progressLabel', 'promise', 'rhythmLabel', 'completionHint', 'qualitySignals']) {
  assert(surfaceTypes.includes(token), `PathJourneySurface 类型缺少 ${token}`)
}

const surfaceBuilder = read('src/lib/public-surfaces/archive-and-paths.ts')
for (const token of ['buildStepReason', 'whyThisStep', 'progressLabel', 'qualitySignals', 'completionHint']) {
  assert(surfaceBuilder.includes(token), `Path journey builder 缺少 ${token}`)
}

const clientFiles = [
  'src/components/status/PathQualityLedgerPanel.tsx',
  'src/components/paths/PathJourneyBoard.tsx',
  'src/app/status/page.tsx',
]
for (const file of clientFiles) {
  const content = read(file)
  for (const forbidden of contract.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或真实 Provider 调用：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

if (failures.length) {
  console.error('WorldOS Phase 24 path quality check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Phase 24 path quality check passed: ${ledger.metrics.publicPaths} paths, avg ${ledger.metrics.averageNodesPerPath} nodes, ${ledger.metrics.pathsWithMultipleAreas} multi-area paths`)
