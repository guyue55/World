#!/usr/bin/env node
// 用途：检查 Phase 21 灯塔本地化增强仍保持只读低光边界

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const readJson = (file) => JSON.parse(read(file))
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function exists(file) {
  return fs.existsSync(rel(file))
}

const contract = readJson('data/world-kernel/worldos-phase21-lighthouse-local-contract-v1.json')
const status = readJson('data/domains/ai/lighthouse-local-status.json')
const pkg = readJson('package.json')

assert(contract.scope?.localOnly === true, 'Phase 21 必须保持 localOnly=true')
assert(contract.scope?.realTimeAIProviderEnabled === false, 'Phase 21 不得启用真实 AI Provider')
assert(status.realTimeAIProviderEnabled === false, '灯塔本地状态必须声明 Provider 禁用')
assert(status.mode === 'low-light', '灯塔状态必须保持 low-light')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Phase 21 必须保持 false`)
}
for (const file of contract.requiredFiles ?? []) {
  assert(exists(file), `缺少 Phase 21 文件：${file}`)
}
for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 Phase 21 命令：${command}`)
}
assert(pkg.scripts?.['check:lighthouse']?.includes('check:phase21-lighthouse'), 'check:lighthouse 必须纳入 Phase 21 检查')

const searchSource = read('src/lib/search.ts')
for (const token of ['WORLDOS_SEARCH_WEIGHTS', 'weight: 0.34', 'includeScore: true', 'minMatchCharLength: 2']) {
  assert(searchSource.includes(token), `搜索权重证据缺失：${token}`)
}

const recommendSource = read('src/lib/lighthouse-recommend.ts')
for (const token of ['relationReason', 'relation?.note', 'sharedTags', '当前节点位于']) {
  assert(recommendSource.includes(token), `推荐理由证据缺失：${token}`)
}

const statusPage = read('src/app/status/page.tsx')
assert(statusPage.includes('getLighthouseLocalStatus'), '状态页必须读取灯塔本地状态事实源')
assert(statusPage.includes('AiLowLightStatusPanel'), '状态页必须展示灯塔低光状态面板')

const statusPanel = read('src/components/status/AiLowLightStatusPanel.tsx')
for (const token of ['AI 低光状态', 'Provider', '禁止动作', 'status.forbiddenActions.map']) {
  assert(statusPanel.includes(token), `灯塔状态面板证据缺失：${token}`)
}

for (const forbidden of ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'new OpenAI', 'responses.create', 'chat.completions', 'fetch(']) {
  assert(!searchSource.includes(forbidden), `搜索增强不得接入真实 Provider：${forbidden}`)
  assert(!recommendSource.includes(forbidden), `推荐增强不得接入真实 Provider：${forbidden}`)
  assert(!statusPanel.includes(forbidden), `状态面板不得接入真实 Provider：${forbidden}`)
}

if (failures.length) {
  console.error('WorldOS Phase 21 lighthouse check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS Phase 21 lighthouse check passed: weighted search, readable reasons, low-light status verified')
