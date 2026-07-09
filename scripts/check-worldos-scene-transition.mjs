// 用途：检查 Phase 28 Scene Transition Shell 是否统一、轻量、可降级且不承担权限判断。
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

const registry = readJson('data/domains/experience/scene-transition-registry.json')
const sceneRegistry = readJson('data/domains/experience/scene-registry.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(registry.name === 'WorldOS Phase 28 公开场景转场注册表', 'Scene Transition Registry 名称不正确')
assert(registry.scope?.localOnly === true, 'Scene Transition 必须 localOnly=true')
assert(registry.scope?.externalPreviewConsidered === false, 'Scene Transition 不得考虑外部 Preview')
assert(registry.scope?.productionConsidered === false, 'Scene Transition 不得考虑 Production')
assert(registry.scope?.publicSceneOnly === true, 'Scene Transition 必须只描述公开场景')
assert(registry.scope?.frontendPermissionControl === false, 'Scene Transition 不得把权限控制放到前端')
assert(registry.scope?.requiresOwner === false, 'Scene Transition 不得要求 owner')
assert(registry.scope?.requiresAuth === false, 'Scene Transition 不得要求 auth')
assert(registry.scope?.requiresRealAI === false, 'Scene Transition 不得要求真实 AI')
assert(registry.shell?.usesGsap === true, 'SceneTransitionShell 必须声明使用 GSAP 编排')
assert(registry.shell?.usesFramerMotionPresence === true, 'SceneTransitionShell 必须声明 Framer Motion 只处理显隐')
assert(registry.shell?.usesViewTransitionApi === false, 'Phase 28 不得硬依赖 View Transition API')
assert(registry.shell?.maxDurationMs <= 420, '桌面转场时长必须控制在 420ms 内')
assert(registry.shell?.compactMaxDurationMs <= 260, '移动端转场时长必须控制在 260ms 内')

const motionIds = new Set((registry.motions ?? []).map((motion) => motion.id))
for (const id of registry.acceptance?.requiredMotions ?? []) {
  assert(motionIds.has(id), `缺少 motion variant：${id}`)
}

for (const motion of registry.motions ?? []) {
  assert(typeof motion.intent === 'string' && motion.intent.length >= 12, `${motion.id} 缺少 intent`)
  assert(motion.from?.autoAlpha === 0, `${motion.id} from 必须使用 autoAlpha`)
  assert(motion.to?.autoAlpha === 1, `${motion.id} to 必须使用 autoAlpha`)
  assert(motion.to?.duration <= 0.42, `${motion.id} duration 必须 <= 0.42`)
  assert(motion.reducedMotion?.autoAlpha === 1, `${motion.id} reducedMotion 必须直接可见`)
  assert(motion.reducedMotion?.scale === 1, `${motion.id} reducedMotion 不得缩放`)
}

const sceneTransitionIds = new Set((sceneRegistry.transitions ?? []).map((transition) => transition.id))
for (const id of registry.acceptance?.requiredTransitions ?? []) {
  assert(sceneTransitionIds.has(id), `Scene Registry 缺少转场：${id}`)
}

for (const example of registry.routeExamples ?? []) {
  const sceneTransition = sceneRegistry.transitions.find((transition) => transition.id === example.transitionId)
  assert(Boolean(sceneTransition), `routeExample 指向不存在 transition：${example.transitionId}`)
  assert(sceneTransition?.motion === example.motion, `routeExample motion 与 Scene Registry 不一致：${example.transitionId}`)
  assert(motionIds.has(example.motion), `routeExample 指向不存在 motion：${example.motion}`)
}

for (const file of registry.acceptance?.requiredFiles ?? []) {
  assert(fs.existsSync(rel(file)), `缺少必要文件：${file}`)
}

const lib = read('src/lib/scene-transition.ts')
for (const token of [
  'getSceneTransitionRegistry',
  'getSceneTransitionMotions',
  'getSceneTransitionMotion',
  'getSceneTransitionForPathnames',
  'getSceneTransitionSummary',
]) {
  assert(lib.includes(`function ${token}`), `scene-transition lib 缺少 ${token}`)
}
assert(lib.includes('getSceneForPathname'), 'scene-transition 必须复用 scene-runtime 的 scene 解析')
assert(lib.includes('getSceneTransition'), 'scene-transition 必须复用 scene-runtime 的 transition 解析')
assert(!/window|document|localStorage|sessionStorage/.test(lib), 'scene-transition lib 必须保持纯函数，不得访问浏览器状态')

const shell = read('src/components/world/SceneTransitionShell.tsx')
for (const token of [
  "'use client'",
  'usePathname',
  'AnimatePresence',
  'gsap.matchMedia',
  'useWorldRuntime',
  "import('gsap')",
  'prefers-reduced-motion',
  'data-testid="scene-transition-shell"',
  'data-scene-transition',
  'data-scene-motion',
]) {
  assert(shell.includes(token), `SceneTransitionShell 缺少必要能力：${token}`)
}
assert((registry.motions ?? []).every((motion) => motion.from?.autoAlpha === 0 && motion.to?.autoAlpha === 1), 'SceneTransition motion 必须使用 GSAP autoAlpha')
assert(!shell.includes("import { gsap }"), 'SceneTransitionShell 必须动态导入 GSAP，避免抬高首屏 shared JS')
assert(shell.includes('clearProps'), 'SceneTransitionShell 必须清理 transform/visibility')
assert(!/(?<!-)\b(width|height|top|left)\s*:/.test(shell), 'SceneTransitionShell 不得动画布局属性')
assert(!/localStorage|sessionStorage/.test(shell), 'SceneTransitionShell 不得访问 localStorage/sessionStorage')

const worldShell = read('src/components/world/WorldShell.tsx')
assert(worldShell.includes("import { SceneTransitionShell }"), 'WorldShell 缺少 SceneTransitionShell import')
assert(worldShell.includes('<SceneTransitionShell>{children}</SceneTransitionShell>'), 'WorldShell 必须统一包裹 children')

const statusPage = read('src/app/status/page.tsx')
const statusPanel = read('src/components/status/SceneRuntimeStatusPanel.tsx')
for (const token of ['getSceneTransitionSummary', 'transitionSummary', 'Scene Transition Shell']) {
  assert(statusPage.includes(token) || statusPanel.includes(token), `/status 缺少转场壳状态：${token}`)
}

for (const file of ['src/components/world/SceneTransitionShell.tsx', 'src/components/world/WorldShell.tsx', 'src/components/status/SceneRuntimeStatusPanel.tsx']) {
  const content = read(file)
  for (const forbidden of registry.acceptance?.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或权限判断：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth|role)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

assert(pkg.scripts?.['check:scene-transition'] === 'node scripts/check-worldos-scene-transition.mjs', 'package.json 缺少 check:scene-transition')
assert(pkg.scripts?.['check:mainline']?.includes('check:scene-transition'), 'check:mainline 必须纳入 check:scene-transition')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:scene-transition'), '脚本注册表缺少 check:scene-transition active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:scene-transition'), '脚本注册表缺少 check:scene-transition recommended command')

if (failures.length) {
  console.error('WorldOS Scene Transition check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Scene Transition check passed: ${registry.motions.length} motions, ${registry.routeExamples.length} route examples`)
