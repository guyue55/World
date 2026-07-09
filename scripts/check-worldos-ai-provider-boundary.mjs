// 用途：检查worldos ai provider boundary
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

function exists(file) {
  return fs.existsSync(rel(file))
}

const contract = readJson('data/world-kernel/worldos-ai-provider-boundary-contract-v1.json')
const lighthouseReadonly = readJson('data/world-kernel/worldos-lighthouse-readonly-contract-v1.json')
const aiBoundary = readJson('data/domains/ai/ai-boundary-policy.json')
const suggestionQueue = readJson('data/domains/ai/ai-suggestion-audit-queue.json')
const pkg = readJson('package.json')

assert(contract.name === 'WorldOS AI Provider 接入边界契约 v1', 'AI Provider 边界契约名称不正确')
assert(contract.scope?.localOnly === true, 'AI Provider 准备阶段必须保持 localOnly=true')
assert(contract.scope?.providerImplementationReady === false, '当前不得声明 Provider 实现已准备完成')
assert(contract.scope?.realTimeAIProviderEnabled === false, '当前不得启用真实 AI Provider')
assert(contract.scope?.externalPreviewConsidered === false, 'AI Provider 准备阶段不得考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, 'AI Provider 准备阶段不得考虑 Production')
assert(contract.backendAdapter?.status === 'disabled-dry-run', 'AI Provider 后端适配器必须保持 disabled-dry-run')
assert(contract.backendAdapter?.serverOnly === true, 'AI Provider 后端适配器必须 serverOnly=true')
assert(contract.backendAdapter?.readsProviderKeys === false, 'AI Provider 当前不得读取 provider key')
assert(contract.backendAdapter?.performsNetworkRequest === false, 'AI Provider 当前不得发起网络请求')
assert(contract.backendAdapter?.writesWorldSource === false, 'AI Provider 当前不得写世界源文件')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 AI Provider 准备阶段必须保持 false`)
}
for (const [key, value] of Object.entries(contract.requiredBackendPolicies ?? {})) {
  assert(value === true, `AI Provider 后端策略必须为 true：${key}`)
}
for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 AI Provider 命令：${command}`)
}
assert(pkg.scripts?.['check:lighthouse']?.includes('check:ai-provider-boundary'), 'check:lighthouse 必须纳入 AI Provider 边界')

assert(lighthouseReadonly.releaseStates?.realTimeAIProviderEnabled === false, '灯塔只读契约必须保持 realTimeAIProviderEnabled=false')
assert(lighthouseReadonly.policies?.noRemoteAIInLowLightMode === true, '灯塔低光模式必须禁止远程 AI')

for (const forbidden of [
  'read vault/sealed/silent content',
  'index private/family/partner/vault/sealed/silent content',
  'publish content automatically',
  'change visibility automatically',
  'delete or overwrite original content',
  'create public AI content without review',
]) {
  assert((aiBoundary.forbidden ?? []).includes(forbidden), `AI boundary forbidden 缺少：${forbidden}`)
}
assert(aiBoundary.draftRules?.publicRequiresReview === true, 'AI public draft 必须人工审核')
assert(aiBoundary.draftRules?.visibilityChangeRequiresHuman === true, 'AI 改可见性必须人工确认')

for (const file of contract.forbiddenClientFiles ?? []) {
  assert(exists(file), `缺少 AI Provider 客户端检查文件：${file}`)
  if (!exists(file)) continue
  const source = read(file)
  for (const token of contract.forbiddenRuntimeTokens ?? []) {
    assert(!source.includes(token), `${file} 不得包含真实 Provider token：${token}`)
  }
}

for (const file of contract.requiredBackendFiles ?? []) {
  assert(exists(file), `缺少 AI Provider 后端边界文件：${file}`)
  if (!exists(file)) continue
  const source = read(file)
  for (const token of contract.requiredBackendTokens?.[file] ?? []) {
    assert(source.includes(token), `AI Provider 后端边界文件缺少关键证据：${file}/${token}`)
  }
  for (const token of contract.forbiddenRuntimeTokens ?? []) {
    assert(!source.includes(token), `${file} 当前不得包含真实 Provider token：${token}`)
  }
  assert(!/process\.env\.[A-Z0-9_]*(OPENAI|ANTHROPIC|API_KEY)/.test(source), `${file} 当前不得读取真实 provider key`)
  assert(!/fetch\s*\(/.test(source), `${file} 当前不得发起 provider 网络请求`)
}

for (const item of suggestionQueue.items ?? []) {
  assert(item.execution === 'not-executed', `AI 建议不得自动执行：${item.id}`)
  assert(item.requiredHumanAction === true, `AI 建议必须人工确认：${item.id}`)
  assert(['public', 'semiPublic'].includes(item.sourceTier), `AI 建议来源层级不允许：${item.id}`)
}

if (failures.length) {
  console.error('WorldOS AI provider boundary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS AI provider boundary check passed: provider disabled, ${(contract.requiredBackendFiles ?? []).length} backend boundary files verified`)
