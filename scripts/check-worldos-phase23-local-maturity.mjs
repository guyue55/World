#!/usr/bin/env node
// 用途：检查 Phase 23 本地成熟度可观测化交付是否真实达成

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

const contract = readJson('data/world-kernel/worldos-phase23-local-maturity-observability-contract-v1.json')
const ledger = readJson('data/domains/operations/local-maturity-ledger.json')
const pkg = readJson('package.json')
const rcSummary = readJson('docs/90-archive/reports/worldos-local-rc-summary-report.json')
const lanReport = readJson('docs/90-archive/reports/worldos-local-lan-rc-report.json')
const runtimeReport = readJson('docs/90-archive/reports/worldos-local-runtime-smoke-report.json')
const auditReport = readJson('docs/90-archive/reports/npm-audit-report.json')
const jaccardReport = readJson('docs/90-archive/reports/worldos-content-jaccard-report.json')

assert(contract.scope?.localOnly === true, 'Phase 23 必须保持 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false, 'Phase 23 不得考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, 'Phase 23 不得考虑 Production')
assert(ledger.localOnly === true, '成熟度账本必须声明 localOnly=true')
assert(ledger.externalPreviewConsidered === false, '成熟度账本不得考虑外部 Preview')
assert(ledger.productionConsidered === false, '成熟度账本不得考虑 Production')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Phase 23 合同中必须保持 false`)
}
for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
  assert(ledger.releaseStates?.[key] === false, `${key} 在成熟度账本中必须保持 false`)
  assert(rcSummary.releaseStates?.[key] === false, `${key} 在 RC 摘要中必须保持 false`)
}

for (const file of contract.requiredFiles ?? []) {
  assert(exists(file), `缺少 Phase 23 文件：${file}`)
}
for (const report of contract.requiredReports ?? []) {
  assert(exists(report), `缺少 Phase 23 报告：${report}`)
}
for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 Phase 23 命令：${command}`)
}
assert(pkg.scripts?.['check:mainline']?.includes('check:phase23-local-maturity'), 'check:mainline 必须纳入 check:phase23-local-maturity')

const minimums = contract.minimums ?? {}
assert(ledger.world.publicNodes >= minimums.publicNodes, `公开节点不足：${ledger.world.publicNodes}/${minimums.publicNodes}`)
assert(ledger.world.publicPaths >= minimums.publicPaths, `公开路径不足：${ledger.world.publicPaths}/${minimums.publicPaths}`)
assert(ledger.world.relations >= minimums.relations, `关系不足：${ledger.world.relations}/${minimums.relations}`)
assert(ledger.world.events >= minimums.events, `事件不足：${ledger.world.events}/${minimums.events}`)

const runtimeFailed = (runtimeReport.checks ?? []).filter((item) => item.passed !== true)
const lanHttpFailed = (lanReport.checks ?? []).filter((item) => item.passed !== true)
const lanBrowserFailed = (lanReport.browserChecks ?? []).filter((item) => item.passed !== true)
const screenshots = (lanReport.browserChecks ?? []).filter((item) => item.screenshotPath)
const audit = auditReport.summary ?? auditReport.vulnerabilities

assert(runtimeReport.status === 'passed', 'runtime smoke 报告必须 passed')
assert((runtimeReport.checks ?? []).length >= minimums.runtimeChecks, `runtime checks 不足：${runtimeReport.checks?.length ?? 0}/${minimums.runtimeChecks}`)
assert(runtimeFailed.length === 0, `runtime checks 存在失败：${runtimeFailed.length}`)
assert(lanReport.status === 'passed', 'LAN 报告必须 passed')
assert((lanReport.checks ?? []).length >= minimums.lanHttpChecks, `LAN HTTP checks 不足：${lanReport.checks?.length ?? 0}/${minimums.lanHttpChecks}`)
assert((lanReport.browserChecks ?? []).length >= minimums.lanBrowserChecks, `LAN browser checks 不足：${lanReport.browserChecks?.length ?? 0}/${minimums.lanBrowserChecks}`)
assert(lanHttpFailed.length === 0, `LAN HTTP checks 存在失败：${lanHttpFailed.length}`)
assert(lanBrowserFailed.length === 0, `LAN browser checks 存在失败：${lanBrowserFailed.length}`)
assert(screenshots.length >= minimums.lanScreenshots, `LAN 截图不足：${screenshots.length}/${minimums.lanScreenshots}`)
assert(audit.high === minimums.auditHigh, `audit high 不符合要求：${audit.high}/${minimums.auditHigh}`)
assert(audit.critical === minimums.auditCritical, `audit critical 不符合要求：${audit.critical}/${minimums.auditCritical}`)
assert(jaccardReport.maxSimilarity <= minimums.contentJaccardThreshold, `内容相似度超阈值：${jaccardReport.maxSimilarity}/${minimums.contentJaccardThreshold}`)

for (const gate of ledger.gates ?? []) {
  assert(gate.status === 'passed', `成熟度账本 gate 未通过：${gate.id}`)
}

const statusPage = read('src/app/status/page.tsx')
assert(statusPage.includes('getLocalMaturityLedger'), '状态页必须读取本地成熟度事实源')
assert(statusPage.includes('LocalMaturityLedgerPanel'), '状态页必须展示本地成熟度面板')

const panelSource = read('src/components/status/LocalMaturityLedgerPanel.tsx')
for (const token of ['本地成熟度', 'LAN', '截图证据', '外部发布保持阻断', 'ledger.gates.map']) {
  assert(panelSource.includes(token), `本地成熟度面板缺少证据：${token}`)
}

for (const forbidden of ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'new OpenAI', 'responses.create', 'chat.completions', 'GUYUE_OWNER_TOKEN', 'R8_OWNER_TOKEN']) {
  assert(!panelSource.includes(forbidden), `本地成熟度面板不得包含敏感权限或 Provider 调用：${forbidden}`)
  assert(!statusPage.includes(forbidden), `状态页不得包含敏感权限或 Provider 调用：${forbidden}`)
}

if (failures.length) {
  console.error('WorldOS Phase 23 local maturity check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Phase 23 local maturity check passed: ${ledger.world.publicNodes} nodes, ${ledger.world.publicPaths} paths, ${lanReport.browserChecks.length} browser checks, ${screenshots.length} screenshots`)
