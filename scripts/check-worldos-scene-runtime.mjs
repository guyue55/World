// 用途：检查 Phase 26 Scene Runtime 是否进入公开主线且边界清晰。
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

const registry = readJson('data/domains/experience/scene-registry.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(registry.name === 'WorldOS Phase 26 公开场景注册表', 'Scene Registry 名称不正确')
assert(registry.scope?.localOnly === true, 'Scene Registry 必须保持 localOnly=true')
assert(registry.scope?.externalPreviewConsidered === false, 'Scene Registry 不得考虑外部 Preview')
assert(registry.scope?.productionConsidered === false, 'Scene Registry 不得考虑 Production')
assert(registry.scope?.publicSceneOnly === true, 'Scene Registry 必须只描述公开场景')
assert(registry.scope?.frontendPermissionControl === false, 'Scene Registry 不得把权限控制放到前端')
assert(registry.scope?.requiresOwner === false, 'Scene Registry 不得要求 owner 权限')
assert(registry.scope?.requiresRealAI === false, 'Scene Registry 不得要求真实 AI')

const requiredMatches = registry.acceptance?.requiredSceneMatches ?? []
const sceneMatches = new Set((registry.scenes ?? []).map((scene) => scene.match))
for (const match of requiredMatches) {
  assert(sceneMatches.has(match), `缺少公开主线场景：${match}`)
}

const sceneIds = new Set()
for (const scene of registry.scenes ?? []) {
  assert(!sceneIds.has(scene.id), `Scene id 重复：${scene.id}`)
  sceneIds.add(scene.id)
  assert(scene.publicOnly === true, `${scene.id} 必须 publicOnly=true`)
  assert(scene.requiresOwner === false, `${scene.id} 不得 requiresOwner`)
  assert(scene.requiresRealAI === false, `${scene.id} 不得 requiresRealAI`)
  assert(typeof scene.reducedMotionFallback === 'string' && scene.reducedMotionFallback.length >= 12, `${scene.id} 缺少 reduced-motion 降级说明`)
  assert(typeof scene.primaryAction === 'string' && scene.primaryAction.length > 0, `${scene.id} 缺少 primaryAction`)
  assert(typeof scene.href === 'string' && scene.href.startsWith('/'), `${scene.id} href 必须是站内路径`)
  assert(Array.isArray(scene.objects) && scene.objects.length >= 3, `${scene.id} objects 至少 3 个`)
}

for (const prefix of registry.acceptance?.forbiddenRoutePrefixes ?? []) {
  assert([...(registry.scenes ?? []).map((scene) => scene.match), registry.fallback?.match].every((match) => !String(match).startsWith(prefix)), `Scene Registry 不得包含 ${prefix}`)
}

const requiredTransitions = registry.acceptance?.requiredTransitions ?? []
const transitionIds = new Set((registry.transitions ?? []).map((transition) => transition.id))
for (const id of requiredTransitions) {
  assert(transitionIds.has(id), `缺少场景转场：${id}`)
}
for (const transition of registry.transitions ?? []) {
  assert(typeof transition.intent === 'string' && transition.intent.length >= 12, `${transition.id} 缺少 intent`)
  assert(typeof transition.reducedMotionFallback === 'string' && transition.reducedMotionFallback.length >= 8, `${transition.id} 缺少 reduced-motion fallback`)
}

for (const [key, value] of Object.entries(registry.acceptance?.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Phase 26 必须保持 false`)
}

const sceneRuntime = read('src/lib/scene-runtime.ts')
for (const token of ['getSceneRegistry', 'getAllScenes', 'getPublicSceneSummary', 'getSceneForPathname', 'getSceneTransition']) {
  assert(sceneRuntime.includes(`function ${token}`), `scene-runtime 缺少 ${token}`)
}
assert(sceneRuntime.includes("startsWith('/node/')"), 'scene-runtime 必须匹配 /node/*')
assert(sceneRuntime.includes("startsWith('/paths/')"), 'scene-runtime 必须匹配 /paths/*')
assert(!/window|document|localStorage|sessionStorage/.test(sceneRuntime), 'scene-runtime 必须保持纯读取，不得访问浏览器状态')

const statusPage = read('src/app/status/page.tsx')
for (const token of ['getPublicSceneSummary', 'SceneRuntimeStatusPanel', 'sceneRuntimeSummary']) {
  assert(statusPage.includes(token), `/status 缺少 Scene Runtime 接入：${token}`)
}

const panel = read('src/components/status/SceneRuntimeStatusPanel.tsx')
for (const token of ['场景运行时', 'Scene Registry', '本地 / 局域网', '不读取私密层', 'reduced-motion']) {
  assert(panel.includes(token), `SceneRuntimeStatusPanel 缺少文案：${token}`)
}

const clientFiles = [
  'src/components/status/SceneRuntimeStatusPanel.tsx',
  'src/app/status/page.tsx',
]
for (const file of clientFiles) {
  const content = read(file)
  for (const forbidden of registry.acceptance?.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或真实 Provider 调用：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

assert(pkg.scripts?.['check:scene-runtime'] === 'node scripts/check-worldos-scene-runtime.mjs', 'package.json 缺少 check:scene-runtime')
assert(pkg.scripts?.['check:mainline']?.includes('check:scene-runtime'), 'check:mainline 必须纳入 check:scene-runtime')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:scene-runtime'), '脚本注册表缺少 check:scene-runtime active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:scene-runtime'), '脚本注册表缺少 check:scene-runtime recommended command')

if (failures.length) {
  console.error('WorldOS Scene Runtime check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Scene Runtime check passed: ${registry.scenes.length} scenes, ${registry.transitions.length} transitions`)
