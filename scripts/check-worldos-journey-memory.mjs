// 用途：检查 M26 World Memory 是否只记录公开体验状态，支持返回访客与一键清除，且不承担权限判断。
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
const reportPath = 'docs/90-archive/reports/worldos-m26-world-memory-report.json'

assert(policy.name === 'WorldOS M26 世界记忆与回访体验策略', 'Journey Memory Policy 名称不正确')
assert(policy.source === 'docs/00-overview/worldos-m26-world-memory-returning-visitor-spec-2026-07-10.md', 'Journey Memory source 必须指向 M26 规范')
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
assert(policy.storage?.clearedAtKey === 'guyue-world:journey-cleared-at-v1', 'Journey Memory clearedAt key 不正确')
assert(policy.storage?.maxHistory <= 5, 'Journey Memory 历史数量必须克制')
assert(policy.returningVisitor?.enabled === true, 'M26 必须启用 returning visitor')
assert(policy.clearMemory?.enabled === true, 'M26 必须启用清除入口')
assert((policy.clearMemory?.removesKeys ?? []).includes(policy.storage.primaryKey), '清除入口必须移除主 key')
assert((policy.clearMemory?.removesKeys ?? []).includes(policy.storage.historyKey), '清除入口必须移除 history key')
assert(policy.clearMemory?.writesKey === policy.storage.clearedAtKey, '清除入口必须写入 clearedAt key')

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
  'getReturningJourney',
  'getClearedJourneyMemoryState',
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
  'clearJourneyMemory',
  'clearStoredJourneyMemory',
  'writeJourneyMemory',
  'writeJourneyHistory',
  'removeItem',
  'clearedAtKey',
]) {
  assert(provider.includes(token), `WorldRuntimeProvider 缺少 Journey Memory 能力：${token}`)
}

const productDock = read('src/components/product/ProductJourneyDock.tsx')
for (const token of [
  'useWorldRuntime',
  'runtime.lastJourney',
  'runtime.journeyHistory',
  'runtime.clearJourneyMemory',
  '移动旅程入口',
  '清除',
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
for (const token of ['getJourneyMemorySummary', 'journeyMemorySummary', 'Journey Memory', '清除入口', '返回访客']) {
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
assert(pkg.scripts?.['check:m26-world-memory'] === 'node scripts/check-worldos-journey-memory.mjs', 'package.json 缺少 check:m26-world-memory')
assert(pkg.scripts?.['check:mainline']?.includes('check:m26-world-memory'), 'check:mainline 必须纳入 check:m26-world-memory')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:journey-memory'), '脚本注册表缺少 check:journey-memory active entrypoint')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:m26-world-memory'), '脚本注册表缺少 check:m26-world-memory active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:journey-memory'), '脚本注册表缺少 check:journey-memory recommended command')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:m26-world-memory'), '脚本注册表缺少 check:m26-world-memory recommended command')
assert((scriptRegistry.releaseCandidateCommands ?? []).includes('npm run check:m26-world-memory'), '脚本注册表缺少 check:m26-world-memory RC command')

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  stage: 'M26',
  policy: {
    name: policy.name,
    source: policy.source,
    localOnly: policy.scope?.localOnly,
    publicSceneOnly: policy.scope?.publicSceneOnly,
    frontendPermissionControl: policy.scope?.frontendPermissionControl,
  },
  storage: {
    primaryKey: policy.storage?.primaryKey,
    historyKey: policy.storage?.historyKey,
    clearedAtKey: policy.storage?.clearedAtKey,
    maxHistory: policy.storage?.maxHistory,
    allowedFields: policy.storage?.allowedFields,
    forbiddenFields: policy.storage?.forbiddenFields,
  },
  returningVisitor: policy.returningVisitor,
  clearMemory: policy.clearMemory,
  evidence: {
    providerHasClearApi: provider.includes('clearJourneyMemory') && provider.includes('removeItem'),
    dockHasContinueAndClear: productDock.includes('继续') && productDock.includes('清除'),
    pathProgressUsesHistory: pathProgress.includes('runtime.journeyHistory'),
    nodeCanReturnToSource: nodeNextStep.includes('返回来源'),
    statusShowsClearPolicy: statusPanel.includes('清除入口') && statusPanel.includes('返回访客'),
  },
  failures,
}

fs.mkdirSync(path.dirname(rel(reportPath)), { recursive: true })
fs.writeFileSync(rel(reportPath), `${JSON.stringify(report, null, 2)}\n`, 'utf8')

if (failures.length) {
  console.error('WorldOS Journey Memory check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS M26 world memory check passed: maxHistory=${policy.storage.maxHistory}, clear=${policy.clearMemory.enabled}`)
