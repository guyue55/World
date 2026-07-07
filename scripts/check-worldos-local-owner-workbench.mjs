// 用途：检查worldos local owner workbench
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []

function rel(file) {
  return path.join(root, file)
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

const contract = readJson('data/world-kernel/worldos-local-owner-workbench-contract-v1.json')
const apiRegistry = readJson('data/world-kernel/worldos-api-boundary-registry-v1.json')
const suggestionQueue = readJson('data/domains/ai/ai-suggestion-audit-queue.json')
const companionPlan = readJson('data/domains/ai/ai-world-companion-plan.json')
const pkg = readJson('package.json')

assert(contract.name === 'WorldOS 本地 Owner 工作台契约 v1', 'Owner 工作台契约名称不正确')
assert(contract.scope?.localOnly === true, 'Owner 工作台必须保持 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false, 'Owner 工作台阶段不得考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, 'Owner 工作台阶段不得考虑 Production')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Owner 工作台阶段必须保持 false`)
}

for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 Owner 工作台命令：${command}`)
}

const ownerAuth = read(contract.serverGuard.helper)
for (const token of [...contract.serverGuard.requiredEnv, ...contract.serverGuard.acceptedHeaders, 'NextResponse.json']) {
  assert(ownerAuth.includes(token), `owner-auth 缺少服务端守门证据：${token}`)
}
assert(ownerAuth.includes(`status: ${contract.serverGuard.deniedStatus}`), 'owner-auth 拒绝状态必须是 403')
assert(ownerAuth.includes(contract.serverGuard.cacheControl), 'owner-auth 必须 no-store')
assert(!ownerAuth.includes('return true'), 'owner-auth 不允许无条件放行')

const routeByPath = new Map((apiRegistry.routes ?? []).map((route) => [route.path, route]))
for (const routePath of contract.ownerOnlyApiRoutes ?? []) {
  const route = routeByPath.get(routePath)
  assert(Boolean(route), `owner-only API 未注册：${routePath}`)
  assert(route?.classification === 'owner-only', `owner-only API classification 错误：${routePath}`)
  assert(route?.guard === 'requireOwner', `owner-only API 必须使用 requireOwner：${routePath}`)
  assert(route?.productionWrite === false, `owner-only API 当前不得声明 productionWrite=true：${routePath}`)
}

for (const routePath of contract.permissionGuardedApiRoutes ?? []) {
  const route = routeByPath.get(routePath)
  assert(Boolean(route), `permission-guarded API 未注册：${routePath}`)
  assert(route?.classification === 'permission-guarded', `permission-guarded API classification 错误：${routePath}`)
  assert(route?.guard === 'requirePermission', `permission-guarded API 必须使用 requirePermission：${routePath}`)
  assert(route?.productionWrite === false, `permission-guarded API 当前不得声明 productionWrite=true：${routePath}`)
}

for (const step of contract.workflow ?? []) {
  assert(step.requiresHumanAction === true, `Owner 工作流必须需要人工确认：${step.id}`)
  assert(!String(step.output).includes('auto'), `Owner 工作流输出不得自动执行：${step.id}`)
}

for (const evidence of contract.uiEvidence ?? []) {
  assert(Boolean(evidence.file), `Owner UI 证据缺少文件：${evidence.id}`)
  const source = read(evidence.file)
  for (const token of evidence.requiredTokens ?? []) {
    assert(source.includes(token), `Owner UI 证据缺少关键文本：${evidence.id}/${token}`)
  }
  assert(!source.includes('GUYUE_OWNER_TOKEN') && !source.includes('R8_OWNER_TOKEN'), `Owner UI 不得出现 owner token：${evidence.file}`)
  assert(!/localStorage.*(owner|permission|auth)/i.test(source), `Owner UI 不得用 localStorage 作为权限事实源：${evidence.file}`)
}

const allowedSourceTiers = new Set(contract.aiSuggestionRules?.allowedSourceTiers ?? [])
for (const item of suggestionQueue.items ?? []) {
  assert(allowedSourceTiers.has(item.sourceTier), `AI 建议来源层级不允许：${item.id}`)
  assert(item.execution === contract.aiSuggestionRules.requiredExecution, `AI 建议不得已执行：${item.id}`)
  assert(item.requiredHumanAction === contract.aiSuggestionRules.requiredHumanAction, `AI 建议必须需要人工确认：${item.id}`)
}

for (const capability of companionPlan.capabilities ?? []) {
  assert(capability.humanRequired === true, `AI 维护伙伴能力必须人工确认：${capability.id}`)
  assert(['suggestion-only', 'reminder-only', 'warning-only'].includes(capability.output), `AI 维护伙伴输出不得直接执行：${capability.id}`)
}

const publicFiles = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/ask/page.tsx',
  'src/components/product/ProductHome.tsx',
]
for (const file of publicFiles) {
  const source = read(file)
  assert(!source.includes('GUYUE_OWNER_TOKEN') && !source.includes('R8_OWNER_TOKEN'), `公开前端不得出现 owner token：${file}`)
  assert(!/localStorage.*(owner|permission|auth)/i.test(source), `公开前端不得用 localStorage 作为权限事实源：${file}`)
}

if (failures.length) {
  console.error('WorldOS local owner workbench check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS local owner workbench check passed: ${contract.ownerOnlyApiRoutes.length} owner routes, ${contract.permissionGuardedApiRoutes.length} permission routes, ${(contract.uiEvidence ?? []).length} UI evidence files`)
