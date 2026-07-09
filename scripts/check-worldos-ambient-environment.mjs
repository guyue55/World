// 用途：检查 Phase 31 Ambient Environment v2 是否轻量、可降级且不承担权限判断。
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

const registry = readJson('data/domains/experience/ambient-environment-registry.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(registry.name === 'WorldOS Phase 31 公开空气层注册表', 'Ambient Environment Registry 名称不正确')
assert(registry.scope?.localOnly === true, 'Ambient Environment 必须 localOnly=true')
assert(registry.scope?.externalPreviewConsidered === false, 'Ambient Environment 不得考虑外部 Preview')
assert(registry.scope?.productionConsidered === false, 'Ambient Environment 不得考虑 Production')
assert(registry.scope?.publicSceneOnly === true, 'Ambient Environment 必须只描述公开体验')
assert(registry.scope?.frontendPermissionControl === false, 'Ambient Environment 不得把权限控制放到前端')
assert(registry.scope?.requiresOwner === false, 'Ambient Environment 不得要求 owner')
assert(registry.scope?.requiresAuth === false, 'Ambient Environment 不得要求 auth')
assert(registry.scope?.requiresRealAI === false, 'Ambient Environment 不得要求真实 AI')
assert(registry.display?.usesHeavyMedia === false, 'Ambient Environment 不得引入重媒体')
assert(registry.display?.usesThreeJs === false, 'Ambient Environment 不得引入 Three.js')
assert(registry.display?.usesWebGl === false, 'Ambient Environment 不得引入 WebGL')
assert(registry.display?.usesNewAnimationLibrary === false, 'Ambient Environment 不得新增动画库')
assert(registry.display?.usesStaticGsapImport === false, 'Ambient Environment 不得静态导入 GSAP')
assert(registry.display?.maxMovingObjects <= 9, 'Ambient Environment moving objects 必须克制')
assert(registry.display?.compactMaxMovingObjects <= 5, 'Ambient Environment 移动端对象数量必须克制')

for (const collection of ['dayPeriods', 'seasons', 'aiStatuses', 'sceneEnvironments']) {
  assert(Array.isArray(registry[collection]) && registry[collection].length > 0, `Ambient Environment 缺少 ${collection}`)
}

for (const input of registry.acceptance?.requiredRuntimeInputs ?? []) {
  assert(['dayPeriod', 'season', 'currentScene', 'aiStatus', 'reducedMotion'].includes(input), `未知运行时输入：${input}`)
}

for (const file of registry.acceptance?.requiredFiles ?? []) {
  assert(fs.existsSync(rel(file)), `缺少必要文件：${file}`)
}

const lib = read('src/lib/ambient-environment.ts')
for (const token of [
  'getAmbientEnvironmentRegistry',
  'getAmbientEnvironmentState',
  'getAmbientEnvironmentSummary',
]) {
  assert(lib.includes(`function ${token}`), `ambient-environment lib 缺少 ${token}`)
}
assert(!/window|document|localStorage|sessionStorage/.test(lib), 'ambient-environment lib 必须保持纯函数，不得访问浏览器状态')
assert(!lib.includes('@/components/'), 'ambient-environment lib 不得依赖组件层')

const provider = read('src/components/world/WorldRuntimeProvider.tsx')
for (const token of ['AiRuntimeStatus', 'aiStatus', 'currentScene']) {
  assert(provider.includes(token), `WorldRuntimeProvider 缺少环境运行时字段：${token}`)
}

const atmosphere = read('src/components/world/RuntimeAtmosphere.tsx')
for (const token of [
  'getAmbientEnvironmentState',
  'ambient-environment-v2',
  'data-day-period',
  'data-season',
  'data-current-scene',
  'data-ai-status',
  'data-reduced-motion',
  'environment.day.background',
  'environment.seasonal.textureOpacity',
  'environment.ai.beaconOpacity',
]) {
  assert(atmosphere.includes(token), `RuntimeAtmosphere 缺少环境能力：${token}`)
}
assert(!atmosphere.includes("import { gsap }"), 'RuntimeAtmosphere 不得静态导入 GSAP')
assert(!atmosphere.includes("import('gsap')"), 'RuntimeAtmosphere 不应额外动态导入 GSAP')
assert(!/three|webgl|canvas/i.test(atmosphere), 'RuntimeAtmosphere 不得引入 Three/WebGL/Canvas 空气层')
assert(!/localStorage|sessionStorage/.test(atmosphere), 'RuntimeAtmosphere 不得访问 localStorage/sessionStorage')

const statusPage = read('src/app/status/page.tsx')
const statusPanel = read('src/components/status/SceneRuntimeStatusPanel.tsx')
for (const token of ['getAmbientEnvironmentSummary', 'ambientEnvironmentSummary', 'Ambient Environment v2']) {
  assert(statusPage.includes(token) || statusPanel.includes(token), `/status 缺少 Ambient Environment 状态：${token}`)
}

for (const file of [
  'src/components/world/RuntimeAtmosphere.tsx',
  'src/components/world/WorldRuntimeProvider.tsx',
  'src/components/status/SceneRuntimeStatusPanel.tsx',
]) {
  const content = read(file)
  for (const forbidden of registry.acceptance?.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或权限判断：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth|role|token)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

assert(pkg.scripts?.['check:ambient-environment'] === 'node scripts/check-worldos-ambient-environment.mjs', 'package.json 缺少 check:ambient-environment')
assert(pkg.scripts?.['check:mainline']?.includes('check:ambient-environment'), 'check:mainline 必须纳入 check:ambient-environment')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:ambient-environment'), '脚本注册表缺少 check:ambient-environment active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:ambient-environment'), '脚本注册表缺少 check:ambient-environment recommended command')

if (failures.length) {
  console.error('WorldOS Ambient Environment check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Ambient Environment check passed: ${registry.sceneEnvironments.length} scenes, ${registry.dayPeriods.length} day periods`)
