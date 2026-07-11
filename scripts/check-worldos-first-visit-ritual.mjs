// 用途：检查 Phase 27 首次进入仪式是否轻量、公开、可降级且不承担权限判断。
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

const ritual = readJson('data/domains/experience/first-visit-ritual.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(ritual.name === 'WorldOS Phase 27 首次进入仪式', '首次进入仪式事实源名称不正确')
assert(ritual.scope?.localOnly === true, '首次进入仪式必须 localOnly=true')
assert(ritual.scope?.externalPreviewConsidered === false, '首次进入仪式不得考虑外部 Preview')
assert(ritual.scope?.productionConsidered === false, '首次进入仪式不得考虑 Production')
assert(ritual.scope?.publicExperienceOnly === true, '首次进入仪式必须只服务公开体验')
assert(ritual.scope?.frontendPermissionControl === false, '首次进入仪式不得把权限控制放到前端')
assert(ritual.scope?.requiresOwner === false, '首次进入仪式不得要求 owner')
assert(ritual.scope?.requiresAuth === false, '首次进入仪式不得要求 auth')
assert(ritual.scope?.requiresRealAI === false, '首次进入仪式不得要求真实 AI')
assert(ritual.storage?.key === 'guyue-world:gateway-ritual-seen', 'storage key 必须稳定且语义明确')
assert(ritual.storage?.value === 'seen', 'storage value 必须稳定')
assert(ritual.storage?.permissionSource === false, 'localStorage 不得成为权限来源')

const actionIds = new Set((ritual.actions ?? []).map((action) => action.id))
for (const actionId of ritual.acceptance?.requiredActions ?? []) {
  assert(actionIds.has(actionId), `缺少首次进入动作：${actionId}`)
}

const actionHrefs = new Set((ritual.actions ?? []).map((action) => action.href))
for (const href of ritual.acceptance?.requiredHrefs ?? []) {
  assert(actionHrefs.has(href), `缺少首次进入入口：${href}`)
}

for (const action of ritual.actions ?? []) {
  assert(typeof action.label === 'string' && action.label.length >= 2, `${action.id} 缺少中文 label`)
  assert(typeof action.title === 'string' && action.title.length >= 4, `${action.id} 缺少中文 title`)
  assert(typeof action.description === 'string' && action.description.length >= 8, `${action.id} 缺少说明`)
  assert(typeof action.href === 'string' && action.href.startsWith('/'), `${action.id} href 必须是站内路径`)
}

for (const file of ritual.acceptance?.requiredFiles ?? []) {
  assert(fs.existsSync(rel(file)), `缺少必要文件：${file}`)
}

const lib = read('src/lib/first-visit-ritual.ts')
for (const token of [
  'FIRST_VISIT_RITUAL_STORAGE_KEY',
  'FIRST_VISIT_RITUAL_STORAGE_VALUE',
  'getFirstVisitRitualConfig',
  'getFirstVisitRitualSummary',
]) {
  assert(lib.includes(token), `first-visit-ritual lib 缺少 ${token}`)
}
assert(!/window|document|localStorage|sessionStorage/.test(lib), 'first-visit-ritual lib 必须保持纯事实源读取')

const component = read('src/components/product/WorldGatewayStage.tsx')
for (const token of ['useWorldRuntime', 'gateway-enter', '推开月门', 'returning', 'gateway-returning', 'AccessibleSceneList']) assert(component.includes(token), `Gateway 首访/回访缺少能力：${token}`)
assert(!/setItem\([^,]*owner|setItem\([^,]*permission|setItem\([^,]*auth/i.test(component), 'Gateway 不得用 localStorage 控制权限')

const productHome = read('src/components/product/ProductHome.tsx')
assert(productHome.includes("import { WorldGatewayStage }"), 'ProductHome 缺少 WorldGatewayStage import')
assert(productHome.includes('<WorldGatewayStage'), 'ProductHome 缺少世界入口舞台')

for (const file of ['src/components/product/WorldGatewayStage.tsx', 'src/components/product/ProductHome.tsx', 'src/components/world/WorldRuntimeProvider.tsx']) {
  const content = read(file)
  for (const forbidden of ritual.acceptance?.forbiddenClientTokens ?? []) {
    assert(!content.includes(forbidden), `${file} 不得包含敏感 token 或权限判断：${forbidden}`)
  }
  assert(!/localStorage.*(owner|permission|auth|role)/i.test(content), `${file} 不得用 localStorage 控制权限`)
}

assert(pkg.scripts?.['check:first-visit-ritual'] === 'node scripts/check-worldos-first-visit-ritual.mjs', 'package.json 缺少 check:first-visit-ritual')
assert(pkg.scripts?.['check:mainline']?.includes('check:first-visit-ritual'), 'check:mainline 必须纳入 check:first-visit-ritual')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:first-visit-ritual'), '脚本注册表缺少 check:first-visit-ritual active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:first-visit-ritual'), '脚本注册表缺少 check:first-visit-ritual recommended command')

if (failures.length) {
  console.error('WorldOS First Visit Ritual check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS First Visit Ritual check passed: ${ritual.actions.length} actions, storage=${ritual.storage.key}`)
