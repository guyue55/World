// 用途：检查worldos local rc evidence policy
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const policyPath = 'data/world-kernel/worldos-local-rc-evidence-policy-v1.json'
const summaryPath = 'docs/90-archive/reports/worldos-local-rc-summary-report.json'
const failures = []

function exists(file) {
  return fs.existsSync(rel(file))
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), 'utf8'))
}

if (!exists(policyPath)) failures.push(`缺少验收产物策略：${policyPath}`)

if (!failures.length) {
  const policy = readJson(policyPath)
  const summary = exists(summaryPath) ? readJson(summaryPath) : null

  if (policy.recommendedCommand !== 'npm run release:local-rc') failures.push('recommendedCommand 必须指向 release:local-rc')
  if (policy.compatibleCommand !== 'npm run check:rc:full') failures.push('compatibleCommand 必须保留 check:rc:full')

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (policy.releaseStates?.[key] !== false) failures.push(`${key} 在产物策略中必须保持 false`)
  }

  for (const file of policy.requiredSummaryLinks ?? []) {
    if (!exists(file)) failures.push(`requiredSummaryLinks 指向不存在证据：${file}`)
  }

  for (const token of ['summary', 'runtime', 'LAN', 'audit', '截图', 'generatedAt', 'reports/']) {
    if (!policy.diffPolicy?.some((item) => String(item).includes(token))) failures.push(`diffPolicy 缺少 ${token}`)
  }

  if (!policy.canonicalCommittedEvidence?.includes(summaryPath)) failures.push('canonicalCommittedEvidence 必须包含 RC 汇总报告')
  if (!policy.ephemeralEvidence?.some((item) => String(item).startsWith('reports/'))) failures.push('ephemeralEvidence 必须明确 reports/ 为临时排障材料')

  if (summary) {
    if (summary.evidence?.policy !== policyPath) failures.push('RC 汇总报告必须链接验收产物策略')
    if (summary.gates?.productionCiBuild !== 'passed-before-summary') failures.push('RC 汇总报告必须记录 production CI build 门禁')
  }
}

if (failures.length) {
  console.error('WorldOS local RC evidence policy check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS local RC evidence policy check passed')
