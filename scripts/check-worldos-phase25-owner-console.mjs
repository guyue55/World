// 用途：检查 Phase 25 本地 Owner 只读指挥台是否真实接入本地主线。
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

const contract = readJson('data/world-kernel/worldos-phase25-owner-readonly-console-contract-v1.json')
const ledger = readJson('data/domains/operations/owner-readonly-console-ledger.json')
const apiRegistry = readJson('data/world-kernel/worldos-api-boundary-registry-v1.json')
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')

assert(contract.name === 'WorldOS Phase 25 本地 Owner 只读指挥台合同 v1', 'Phase 25 合同名称不正确')
assert(contract.scope?.localOnly === true, 'Phase 25 必须保持 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false, 'Phase 25 不得考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, 'Phase 25 不得考虑 Production')
assert(contract.scope?.readonlyOnly === true, 'Phase 25 必须是 readonlyOnly=true')
assert(contract.scope?.serverGuardRequired === true, 'Phase 25 必须要求服务端守门')
assert(contract.scope?.frontendPermissionControl === false, 'Phase 25 不得把权限控制放到前端')
assert(contract.scope?.forbidWrites === true, 'Phase 25 不得写入')
assert(contract.scope?.forbidRealAi === true, 'Phase 25 不得调用真实 AI')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Phase 25 必须保持 false`)
}

for (const file of contract.requiredFiles ?? []) {
  assert(exists(file), `缺少 Phase 25 必需文件：${file}`)
}

for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 Phase 25 命令：${command}`)
}
assert(pkg.scripts?.['check:phase25-owner-console'] === 'node scripts/check-worldos-phase25-owner-console.mjs', 'check:phase25-owner-console 命令不正确')
assert(pkg.scripts?.['check:mainline']?.includes('check:phase25-owner-console'), 'check:mainline 必须纳入 check:phase25-owner-console')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:phase25-owner-console'), '脚本注册表缺少 check:phase25-owner-console')

assert(ledger.name === 'WorldOS Phase 25 本地 Owner 只读指挥台账本', 'Owner 只读账本名称不正确')
assert(ledger.status === 'passed', 'Owner 只读账本必须通过')
assert(ledger.scope?.readonlyOnly === true, 'Owner 只读账本必须保持 readonlyOnly=true')
assert(ledger.apiBoundary?.ownerOnlyRoutes >= contract.minimums.ownerOnlyRoutes, 'owner-only API 数不足')
assert(ledger.apiBoundary?.permissionGuardedRoutes >= contract.minimums.permissionGuardedRoutes, 'permission-guarded API 数不足')
assert(ledger.sourceGates?.localMaturity >= contract.minimums.localMaturityGates, '本地成熟度 gate 数不足')
assert(ledger.sourceGates?.pathQuality >= contract.minimums.pathQualityGates, '路径质量 gate 数不足')
assert(ledger.audit?.high <= contract.minimums.highAuditMax, 'audit high 必须为 0')
assert(ledger.audit?.critical <= contract.minimums.criticalAuditMax, 'audit critical 必须为 0')

const apiRoute = read(contract.api.file)
for (const token of ['requireOwner(request', contract.api.scope, 'NextResponse.json', contract.api.cacheControl]) {
  assert(apiRoute.includes(token), `Owner summary API 缺少 ${token}`)
}
assert(apiRoute.includes('export function GET'), 'Owner summary API 必须只提供 GET')
assert(!/export\s+(?:async\s+)?function\s+(POST|PUT|PATCH|DELETE)/.test(apiRoute), 'Owner summary API 不得提供写入方法')
assert(!/writeFile|appendFile|unlink|rm\(|create\(|delete\(|update\(|insert\(/.test(apiRoute), 'Owner summary API 不得包含写入信号')

const route = (apiRegistry.routes ?? []).find((item) => item.path === contract.api.route)
assert(Boolean(route), 'API 注册表缺少 /api/owner/summary')
assert(route?.file === contract.api.file, 'Owner summary API 注册文件不正确')
assert(route?.classification === contract.api.classification, 'Owner summary API classification 不正确')
assert(route?.guard === contract.api.guard, 'Owner summary API guard 不正确')
assert(route?.mutability === 'read-only', 'Owner summary API 必须 read-only')
assert(route?.productionWrite === false, 'Owner summary API productionWrite 必须 false')
assert(route?.requiresDatabase === false, 'Owner summary API 不得依赖数据库')
assert(route?.requiresRealAI === false, 'Owner summary API 不得依赖真实 AI')

const statusPage = read('src/app/status/page.tsx')
for (const token of ['getOwnerReadonlyConsoleLedger', 'OwnerReadonlyConsolePanel', 'ownerReadonlyConsoleLedger']) {
  assert(statusPage.includes(token), `/status 缺少 Owner 只读接入：${token}`)
}

const panel = read('src/components/status/OwnerReadonlyConsolePanel.tsx')
for (const token of contract.requiredStatusTokens ?? []) {
  assert(panel.includes(token), `OwnerReadonlyConsolePanel 缺少文案或状态：${token}`)
}

const clientFiles = [
  'src/components/status/OwnerReadonlyConsolePanel.tsx',
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
  console.error('WorldOS Phase 25 owner readonly console check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Phase 25 owner readonly console check passed: ${ledger.apiBoundary.ownerOnlyRoutes} owner routes, ${ledger.apiBoundary.permissionGuardedRoutes} permission routes`)
