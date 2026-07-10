// 用途：验证 M24 高级可视化试点是否符合 ADR-0007 的候选制、收益证明和轻量边界。
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

function walk(dir, cb) {
  if (!fs.existsSync(rel(dir))) return
  for (const entry of fs.readdirSync(rel(dir), { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    const absolute = rel(file)
    if (entry.isDirectory() && entry.name !== '_legacy') walk(file, cb)
    else if (entry.isFile() && /\.(ts|tsx|js|mjs|json)$/.test(entry.name)) cb(file, read(file))
  }
}

const registryPath = 'data/domains/experience/advanced-visualization-candidates.json'
const registry = readJson(registryPath)
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const dependencyPolicy = readJson('data/engineering/dependency-hardening-policy.json')
const atlasPilot = read('src/components/atlas/AtlasLiveConstellation.tsx')
const statusPage = read('src/app/status/page.tsx')
const statusPanel = read('src/components/status/AdvancedVisualizationPilotPanel.tsx')
const lib = read('src/lib/advanced-visualization.ts')

assert(registry.name === 'WorldOS M24 高级可视化候选账本', 'M24 可视化账本名称不正确')
assert(registry.source === 'docs/09-adr/ADR-0007-advanced-visualization-candidates.md', 'M24 source 必须指向 ADR-0007')
assert(registry.scope?.localOnly === true, 'M24 必须 localOnly')
assert(registry.scope?.publicSceneOnly === true, 'M24 只允许公开场景试点')
assert(registry.scope?.frontendPermissionControl === false, 'M24 不得引入前端权限控制')
assert(registry.runtime?.currentRenderer === 'svg-css', 'M24 当前 renderer 必须是 svg-css')
assert(registry.runtime?.dependencyDelta === 0, 'M24 当前不得新增运行时依赖')
assert(Array.isArray(registry.runtime?.newRuntimeDependencies) && registry.runtime.newRuntimeDependencies.length === 0, 'M24 newRuntimeDependencies 必须为空')
assert(registry.runtime?.usesD3 === false, 'M24 当前不得启用 D3')
assert(registry.runtime?.usesThree === false, 'M24 当前不得启用 Three')
assert(registry.runtime?.usesReactThreeFiber === false, 'M24 当前不得启用 R3F')
assert(registry.runtime?.usesPixi === false, 'M24 当前不得启用 Pixi')
assert(registry.runtime?.usesWebGl === false, 'M24 当前不得启用 WebGL')
assert(registry.runtime?.usesCanvas === false, 'M24 当前不得启用 Canvas')
assert(registry.pilot?.id === 'atlas-svg-relationship-field', 'M24 试点必须是 Atlas SVG 关系场')
assert(registry.pilot?.acceptanceCommand === 'check:m24-advanced-visualization', 'M24 acceptanceCommand 不正确')
assert((registry.pilot?.evidence ?? []).length >= 3, 'M24 必须记录截图/QA 证据位置')

const candidates = registry.candidates ?? []
assert(candidates.some((item) => item.id === 'svg-css' && item.status === 'accepted-now'), 'SVG/CSS 必须是当前接受候选')
for (const id of ['canvas', 'd3-force', 'pixi']) {
  assert(candidates.some((item) => item.id === id && item.status === 'deferred'), `${id} 必须暂缓`)
}
assert(candidates.some((item) => item.id === 'three-r3f' && item.status === 'rejected-for-now'), 'Three/R3F 必须当前拒绝')

const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }
for (const dependency of registry.acceptance?.forbiddenDependencies ?? []) {
  assert(!dependencies[dependency], `M24 不得引入依赖：${dependency}`)
}
for (const dependency of registry.acceptance?.forbiddenDependencies ?? []) {
  assert((dependencyPolicy.heavyCandidatesRequireAdr ?? []).includes(dependency) || dependency === 'sigma' || dependency === 'cytoscape', `依赖硬化策略缺少或未解释重型候选：${dependency}`)
}

for (const token of registry.acceptance?.requiredPilotDataAttributes ?? []) {
  assert(atlasPilot.includes(token), `Atlas M24 试点缺少 DOM 证据：${token}`)
}
for (const token of ['<svg', '<motion.line', 'vectorEffect="non-scaling-stroke"', 'M24 SVG PILOT']) {
  assert(atlasPilot.includes(token), `Atlas M24 试点缺少 SVG/CSS 可视化证据：${token}`)
}
for (const token of registry.acceptance?.requiredStatusTokens ?? []) {
  assert(statusPanel.includes(token), `/status M24 面板缺少：${token}`)
}
for (const token of ['getAdvancedVisualizationSummary', 'AdvancedVisualizationPilotPanel']) {
  assert(statusPage.includes(token), `/status 页面未接入 M24 摘要：${token}`)
}
for (const token of ['getAdvancedVisualizationRegistry', 'getAdvancedVisualizationSummary', 'dependencyDelta', 'usesHeavyRenderer']) {
  assert(lib.includes(token), `advanced-visualization lib 缺少：${token}`)
}

for (const forbidden of registry.acceptance?.forbiddenSourceTokens ?? []) {
  for (const root of ['src/app', 'src/components', 'src/lib']) {
    walk(root, (file, source) => {
      assert(!source.includes(forbidden), `${file} 包含 M24 禁用源码 token：${forbidden}`)
    })
  }
}

assert(pkg.scripts?.['check:m24-advanced-visualization'] === 'node scripts/check-worldos-m24-advanced-visualization.mjs', 'package.json 缺少 check:m24-advanced-visualization')
assert(pkg.scripts?.['check:mainline']?.includes('check:m24-advanced-visualization'), 'check:mainline 必须纳入 M24')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:m24-advanced-visualization'), '脚本注册表缺少 M24 active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:m24-advanced-visualization'), '脚本注册表缺少 M24 recommended command')
assert((scriptRegistry.releaseCandidateCommands ?? []).includes('npm run check:m24-advanced-visualization'), '脚本注册表缺少 M24 RC command')

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length > 0 ? 'failed' : 'passed',
  stage: 'M24',
  registry: registryPath,
  renderer: registry.runtime?.currentRenderer,
  pilot: registry.pilot?.id,
  dependencyDelta: registry.runtime?.dependencyDelta,
  newRuntimeDependencies: registry.runtime?.newRuntimeDependencies ?? [],
  acceptedCandidates: candidates.filter((item) => item.status === 'accepted-now').map((item) => item.id),
  deferredCandidates: candidates.filter((item) => item.status === 'deferred').map((item) => item.id),
  rejectedCandidates: candidates.filter((item) => item.status === 'rejected-for-now').map((item) => item.id),
  evidence: registry.pilot?.evidence ?? [],
  failures,
}

fs.mkdirSync(rel('docs/90-archive/reports'), { recursive: true })
fs.writeFileSync(rel('docs/90-archive/reports/worldos-m24-advanced-visualization-report.json'), `${JSON.stringify(report, null, 2)}\n`)

if (failures.length) {
  console.error('WorldOS M24 advanced visualization check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS M24 advanced visualization check passed: ${registry.runtime.currentRenderer}, dependency delta ${registry.runtime.dependencyDelta}`)
