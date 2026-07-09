// 用途：检查 Phase 29 Scene Personality 是否统一、轻量、可识别且不承担权限判断。
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

const registry = readJson('data/domains/experience/scene-personality-registry.json')
const sceneRegistry = readJson('data/domains/experience/scene-registry.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(registry.name === 'WorldOS Phase 29 公开场景人格注册表', 'Scene Personality Registry 名称不正确')
assert(registry.scope?.localOnly === true, 'Scene Personality 必须 localOnly=true')
assert(registry.scope?.externalPreviewConsidered === false, 'Scene Personality 不得考虑外部 Preview')
assert(registry.scope?.productionConsidered === false, 'Scene Personality 不得考虑 Production')
assert(registry.scope?.publicSceneOnly === true, 'Scene Personality 必须只描述公开场景')
assert(registry.scope?.frontendPermissionControl === false, 'Scene Personality 不得把权限控制放到前端')
assert(registry.scope?.requiresOwner === false, 'Scene Personality 不得要求 owner')
assert(registry.scope?.requiresAuth === false, 'Scene Personality 不得要求 auth')
assert(registry.scope?.requiresRealAI === false, 'Scene Personality 不得要求真实 AI')
assert(registry.display?.usesHeavyMedia === false, 'Scene Personality 不得引入大图或重媒体')
assert(registry.display?.usesThreeJs === false, 'Scene Personality 不得引入 Three.js')
assert(registry.display?.usesNewAnimationLibrary === false, 'Scene Personality 不得新增动画库')
assert(registry.display?.usesStaticGsapImport === false, 'Scene Personality 不得静态导入 GSAP')
assert(registry.display?.maxSignals <= 3, 'SceneIdentityBand 信号数量必须克制')
assert(registry.display?.compactMaxSignals <= 2, '移动端 SceneIdentityBand 信号数量必须克制')

const sceneIds = new Set((sceneRegistry.scenes ?? []).map((scene) => scene.id))
const personalityIds = new Set((registry.personalities ?? []).map((personality) => personality.sceneId))

for (const id of registry.acceptance?.requiredSceneIds ?? []) {
  assert(sceneIds.has(id), `Scene Registry 缺少场景：${id}`)
  assert(personalityIds.has(id), `Scene Personality 缺少人格：${id}`)
}

for (const personality of registry.personalities ?? []) {
  assert(sceneIds.has(personality.sceneId), `人格指向不存在场景：${personality.sceneId}`)
  assert(typeof personality.persona === 'string' && personality.persona.length >= 2, `${personality.sceneId} 缺少 persona`)
  assert(typeof personality.landmark === 'string' && personality.landmark.length >= 10, `${personality.sceneId} 缺少 landmark`)
  assert(typeof personality.promise === 'string' && personality.promise.length >= 12, `${personality.sceneId} 缺少 promise`)
  assert(Array.isArray(personality.signals) && personality.signals.length >= 2 && personality.signals.length <= 3, `${personality.sceneId} signals 必须为 2-3 个`)
  assert(personality.primaryActionLabel && personality.primaryActionHref, `${personality.sceneId} 缺少主行动`)
  assert(personality.nextStationLabel && personality.nextStationHref, `${personality.sceneId} 缺少下一站`)
  assert(personality.reducedMotionFallback?.includes('静态') || personality.reducedMotionFallback?.includes('直接'), `${personality.sceneId} 缺少 reduced-motion 静态降级说明`)
}

for (const file of registry.acceptance?.requiredFiles ?? []) {
  assert(fs.existsSync(rel(file)), `缺少必要文件：${file}`)
}

const lib = read('src/lib/scene-personality.ts')
for (const token of [
  'getScenePersonalityRegistry',
  'getScenePersonalities',
  'getScenePersonalityForSceneId',
  'getScenePersonalityForPathname',
  'getScenePersonalitySummary',
]) {
  assert(lib.includes(`function ${token}`), `scene-personality lib 缺少 ${token}`)
}
assert(lib.includes('getSceneForPathname'), 'scene-personality 必须复用 scene-runtime 的 pathname 解析')
assert(!/window|document|localStorage|sessionStorage/.test(lib), 'scene-personality lib 必须保持纯函数，不得访问浏览器状态')

const component = read('src/components/world/SceneIdentityBand.tsx')
for (const token of [
  "'use client'",
  'usePathname',
  'useWorldRuntime',
  'getScenePersonalityForPathname',
  'data-testid="scene-identity-band"',
  'data-scene-personality',
  'data-scene-tone',
  'primaryActionHref',
  'nextStationHref',
]) {
  assert(component.includes(token), `SceneIdentityBand 缺少必要能力：${token}`)
}
assert(!component.includes("import('gsap')"), 'SceneIdentityBand 不应引入 GSAP，避免身份带变重')
assert(!component.includes("import { gsap }"), 'SceneIdentityBand 不得静态导入 GSAP')
assert(!component.includes('framer-motion'), 'SceneIdentityBand 不得新增 motion 依赖')
assert(!/localStorage|sessionStorage/.test(component), 'SceneIdentityBand 不得访问 localStorage/sessionStorage')
assert(!/(?<!-)\b(width|height|top|left)\s*:/.test(component), 'SceneIdentityBand 不得动画布局属性')

const worldShell = read('src/components/world/WorldShell.tsx')
assert(worldShell.includes("import { SceneIdentityBand }"), 'WorldShell 缺少 SceneIdentityBand import')
assert(worldShell.includes('<SceneIdentityBand />'), 'WorldShell 必须统一接入 SceneIdentityBand')

const statusPage = read('src/app/status/page.tsx')
const statusPanel = read('src/components/status/SceneRuntimeStatusPanel.tsx')
for (const token of ['getScenePersonalitySummary', 'personalitySummary', 'Scene Personality']) {
  assert(statusPage.includes(token) || statusPanel.includes(token), `/status 缺少场景人格状态：${token}`)
}

for (const file of ['src/components/world/SceneIdentityBand.tsx', 'src/components/world/WorldShell.tsx', 'src/components/status/SceneRuntimeStatusPanel.tsx']) {
  const content = read(file)
  for (const forbidden of registry.acceptance?.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或权限判断：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth|role)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

assert(pkg.scripts?.['check:scene-personality'] === 'node scripts/check-worldos-scene-personality.mjs', 'package.json 缺少 check:scene-personality')
assert(pkg.scripts?.['check:mainline']?.includes('check:scene-personality'), 'check:mainline 必须纳入 check:scene-personality')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:scene-personality'), '脚本注册表缺少 check:scene-personality active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:scene-personality'), '脚本注册表缺少 check:scene-personality recommended command')

if (failures.length) {
  console.error('WorldOS Scene Personality check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Scene Personality check passed: ${registry.personalities.length} personalities`)
