// 用途：检查 Phase 30 Journey Memory 是否只记录公开体验状态，且不承担权限判断。
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

function assert(condition, message) {
  if (!condition) failures.push(message)
}

const policy = readJson('data/domains/experience/journey-memory-policy.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(policy.name === 'WorldOS Phase 30 公开旅程记忆策略', 'Journey Memory Policy 名称不正确')
assert(policy.scope?.localOnly === true, 'Journey Memory 必须 localOnly=true')
assert(policy.scope?.externalPreviewConsidered === false, 'Journey Memory 不得考虑外部 Preview')
assert(policy.scope?.productionConsidered === false, 'Journey Memory 不得考虑 Production')
assert(policy.scope?.publicSceneOnly === true, 'Journey Memory 必须只保存公开体验')
assert(policy.scope?.frontendPermissionControl === false, 'Journey Memory 不得把权限控制放到前端')
assert(policy.scope?.requiresOwner === false, 'Journey Memory 不得要求 owner')
assert(policy.scope?.requiresAuth === false, 'Journey Memory 不得要求 auth')
assert(policy.scope?.requiresRealAI === false, 'Journey Memory 不得要求真实 AI')
assert(policy.storage?.primaryKey === 'guyue-world:journey-memory-v1', 'Journey Memory 主 key 不正确')
assert(policy.storage?.historyKey === 'guyue-world:journey-history-v1', 'Journey Memory history key 不正确')
assert(policy.storage?.maxHistory <= 5, 'Journey Memory 历史数量必须克制')

for (const field of ['path', 'label', 'sceneId', 'sceneTitle', 'recentNodeSlug', 'recentPathId', 'visitedAt']) {
  assert((policy.storage?.allowedFields ?? []).includes(field), `allowedFields 缺少 ${field}`)
}

for (const field of ['owner', 'auth', 'permission', 'role', 'token', 'secret', 'private', 'vault']) {
  assert((policy.storage?.forbiddenFields ?? []).includes(field), `forbiddenFields 缺少 ${field}`)
}

for (const file of policy.acceptance?.requiredFiles ?? []) {
  assert(fs.existsSync(rel(file)), `缺少必要文件：${file}`)
}

const lib = read('src/lib/journey-memory.ts')
for (const token of [
  'getJourneyMemoryPolicy',
  'getJourneyStorageKeys',
  'getJourneyMemorySummary',
  'buildJourneyMemoryEntry',
  'mergeJourneyHistory',
  'isJourneyMemoryEntry',
  'normalizeJourneyPath',
]) {
  assert(lib.includes(`function ${token}`), `journey-memory lib 缺少 ${token}`)
}
assert(lib.includes('getSceneForPathname'), 'journey-memory 必须复用 scene-runtime 的 pathname 解析')
assert(!/window|document|localStorage|sessionStorage/.test(lib), 'journey-memory lib 必须保持纯函数，不得访问浏览器状态')

const provider = read('src/components/world/WorldRuntimeProvider.tsx')
for (const token of [
  'buildJourneyMemoryEntry',
  'getJourneyStorageKeys',
  'mergeJourneyHistory',
  'currentJourney',
  'journeyHistory',
  'writeJourneyMemory',
  'writeJourneyHistory',
]) {
  assert(provider.includes(token), `WorldRuntimeProvider 缺少 Journey Memory 能力：${token}`)
}

const productDock = read('src/components/product/ProductJourneyDock.tsx')
for (const token of [
  'useWorldRuntime',
  'runtime.lastJourney',
  'runtime.journeyHistory',
  '移动旅程入口',
  '2xl:hidden',
  '2xl:block',
]) {
  assert(productDock.includes(token), `ProductJourneyDock 缺少移动/桌面 Journey Memory 能力：${token}`)
}
assert(!productDock.includes('localStorage'), 'ProductJourneyDock 不得再散写 localStorage')

const pathProgress = read('src/components/paths/PathProgress.tsx')
for (const token of ['useWorldRuntime', 'visitedNodes.length', '下一站', 'pathId']) {
  assert(pathProgress.includes(token), `PathProgress 缺少路径连续性能力：${token}`)
}

const pathPage = read('src/app/paths/[id]/page.tsx')
assert(pathPage.includes('pathId={path.id}'), 'Path Detail 必须向 PathProgress 传入 pathId')

const nodeNextStep = read('src/components/node/NodeNextStepPanel.tsx')
for (const token of ['useWorldRuntime', '返回来源', 'returnJourney']) {
  assert(nodeNextStep.includes(token), `NodeNextStepPanel 缺少来源返回能力：${token}`)
}

const statusPage = read('src/app/status/page.tsx')
const statusPanel = read('src/components/status/SceneRuntimeStatusPanel.tsx')
for (const token of ['getJourneyMemorySummary', 'journeyMemorySummary', 'Journey Memory']) {
  assert(statusPage.includes(token) || statusPanel.includes(token), `/status 缺少 Journey Memory 状态：${token}`)
}

for (const file of [
  'src/components/world/WorldRuntimeProvider.tsx',
  'src/components/product/ProductJourneyDock.tsx',
  'src/components/paths/PathProgress.tsx',
  'src/components/node/NodeNextStepPanel.tsx',
  'src/components/status/SceneRuntimeStatusPanel.tsx',
]) {
  const content = read(file)
  for (const forbidden of policy.acceptance?.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或权限判断：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth|role|token)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

assert(pkg.scripts?.['check:journey-memory'] === 'node scripts/check-worldos-journey-memory.mjs', 'package.json 缺少 check:journey-memory')
assert(pkg.scripts?.['check:mainline']?.includes('check:journey-memory'), 'check:mainline 必须纳入 check:journey-memory')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:journey-memory'), '脚本注册表缺少 check:journey-memory active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:journey-memory'), '脚本注册表缺少 check:journey-memory recommended command')

if (failures.length) {
  console.error('WorldOS Journey Memory check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Journey Memory check passed: maxHistory=${policy.storage.maxHistory}`)
