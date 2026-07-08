#!/usr/bin/env node
// 用途：汇总本地/LAN RC、内容质量与审计证据，生成状态页可读事实源

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))

const contract = readJson('data/world-kernel/worldos-phase23-local-maturity-observability-contract-v1.json')
const nodes = readJson('data/domains/experience/nodes.json')
const paths = readJson('data/domains/experience/paths.json')
const relations = readJson('data/core/relations.json')
const events = readJson('data/core/world-events.json')
const rcSummary = readJson('docs/90-archive/reports/worldos-local-rc-summary-report.json')
const lanReport = readJson('docs/90-archive/reports/worldos-local-lan-rc-report.json')
const runtimeReport = readJson('docs/90-archive/reports/worldos-local-runtime-smoke-report.json')
const auditReport = readJson('docs/90-archive/reports/npm-audit-report.json')
const jaccardReport = readJson('docs/90-archive/reports/worldos-content-jaccard-report.json')

const publicNodes = nodes.filter((node) => node.visibility === 'public')
const publicPaths = paths.filter((item) => item.visibility === 'public')
const failedRuntime = (runtimeReport.checks ?? []).filter((item) => item.passed !== true)
const failedLanHttp = (lanReport.checks ?? []).filter((item) => item.passed !== true)
const failedLanBrowser = (lanReport.browserChecks ?? []).filter((item) => item.passed !== true)
const screenshots = (lanReport.browserChecks ?? []).filter((item) => item.screenshotPath)
const audit = auditReport.summary ?? auditReport.vulnerabilities

function gate(id, label, status, value, note) {
  return { id, label, status, value, note }
}

const ledger = {
  name: 'WorldOS 本地成熟度可观测账本',
  updatedAt: new Date().toISOString(),
  localOnly: true,
  externalPreviewConsidered: false,
  productionConsidered: false,
  summary: '当前只证明 localhost / LAN IP 范围内的成熟度：fresh build、运行时 smoke、LAN 浏览器检查、截图证据、内容质量和审计摘要。',
  localAccess: {
    mode: rcSummary.localAccess?.mode ?? 'local-lan',
    baseUrl: rcSummary.localAccess?.baseUrl ?? lanReport.baseUrl,
    lanIp: rcSummary.localAccess?.lanIp ?? lanReport.lanIp,
    bindHost: rcSummary.localAccess?.bindHost ?? lanReport.bindHost,
    port: rcSummary.localAccess?.port ?? lanReport.port,
  },
  releaseStates: rcSummary.releaseStates,
  world: {
    publicNodes: publicNodes.length,
    publicPaths: publicPaths.length,
    relations: relations.length,
    events: events.length,
  },
  gates: [
    gate('rc-summary', '本地 RC 摘要', rcSummary.status === 'local-rc-passed-external-release-blocked' ? 'passed' : 'failed', rcSummary.status, '外部发布保持阻断，本地/LAN 证据有效。'),
    gate('runtime-smoke', '本机运行时', failedRuntime.length === 0 ? 'passed' : 'failed', `${(runtimeReport.checks ?? []).length - failedRuntime.length}/${(runtimeReport.checks ?? []).length}`, '生产 server 本机 HTTP smoke。'),
    gate('lan-http', 'LAN HTTP', failedLanHttp.length === 0 ? 'passed' : 'failed', `${(lanReport.checks ?? []).length - failedLanHttp.length}/${(lanReport.checks ?? []).length}`, '通过局域网 IP 访问公开页面、API 与守门路由。'),
    gate('lan-browser', 'LAN 浏览器', failedLanBrowser.length === 0 ? 'passed' : 'failed', `${(lanReport.browserChecks ?? []).length - failedLanBrowser.length}/${(lanReport.browserChecks ?? []).length}`, 'Playwright 桌面与移动 reduced-motion 验收。'),
    gate('screenshots', '截图证据', screenshots.length >= contract.minimums.lanScreenshots ? 'passed' : 'failed', String(screenshots.length), '规范化截图可用于人工复核。'),
    gate('audit', '依赖审计', audit.high === 0 && audit.critical === 0 ? 'passed' : 'failed', `${audit.total} total / ${audit.high} high / ${audit.critical} critical`, 'moderate 不阻断本地成熟度，高危和严重必须阻断外部发布。'),
    gate('content-jaccard', '内容相似度', jaccardReport.maxSimilarity <= contract.minimums.contentJaccardThreshold ? 'passed' : 'failed', `${jaccardReport.maxSimilarity}/${jaccardReport.threshold}`, '防止公开节点批量同质化。'),
  ],
  evidence: {
    runtimeReport: 'docs/90-archive/reports/worldos-local-runtime-smoke-report.json',
    lanReport: 'docs/90-archive/reports/worldos-local-lan-rc-report.json',
    auditReport: 'docs/90-archive/reports/npm-audit-report.json',
    jaccardReport: 'docs/90-archive/reports/worldos-content-jaccard-report.json',
    screenshotCount: screenshots.length,
  },
  nextActions: [
    '继续使用 npm run release:local-rc 作为唯一可信本地 RC 入口。',
    '继续保持 productionLive=false、releaseReady=false、cleanProductionReady=false。',
    '下一阶段优先打磨路径叙事和内容质量，不盲目扩充节点数量。'
  ],
}

const outFile = rel('data/domains/operations/local-maturity-ledger.json')
fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(ledger, null, 2)}\n`)
console.log(`WorldOS local maturity ledger written: ${path.relative(root, outFile)}`)
