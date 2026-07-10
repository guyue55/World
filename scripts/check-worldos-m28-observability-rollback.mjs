import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const reportPath = path.join(root, 'docs/90-archive/reports/worldos-m28-observability-rollback-report.json')
const failures = []

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath))
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function hasAll(text, tokens) {
  return tokens.every((token) => text.includes(token))
}

const contract = readJson('data/domains/operations/long-running-observability-rollback-v1.json')
const packageJson = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const statusPage = readText('src/app/status/page.tsx')
const statusPanel = readText('src/components/status/LongRunningOpsPanel.tsx')
const statusIndex = readText('src/components/status/index.ts')
const summaryLib = readText('src/lib/long-running-ops.ts')
const runbook = readText(contract.rollbackDrill.runbook)

const command = 'check:m28-observability-rollback'
const packageCommand = packageJson.scripts[command]
const mainline = packageJson.scripts['check:mainline'] ?? ''
const requiredRunbookTokens = [
  'git status --short',
  'git log --oneline -5',
  'npm run check:mainline',
  'npm run release:local-rc',
  'git reset --hard',
]
const requiredStatusTokens = contract.acceptance.requiredStatusTokens
const evidenceFiles = contract.observabilityTargets
  .map((target) => target.evidence)
  .filter((evidence) => evidence.startsWith('docs/'))

assert(contract.source === 'docs/00-overview/worldos-m28-long-running-observability-rollback-runbook-2026-07-10.md', 'M28 contract source must point to the M28 runbook spec.')
assert(contract.scope.localOnly === true, 'M28 must remain local-only.')
assert(contract.scope.lanIpAccepted === true, 'M28 must accept LAN IP validation.')
assert(contract.scope.externalPreviewConsidered === false, 'M28 must not include external preview.')
assert(contract.scope.productionConsidered === false, 'M28 must not include production.')
assert(contract.scope.frontendPermissionControl === false, 'Frontend must not be permission authority.')
assert(contract.observabilityTargets.length >= 6, 'M28 must cover at least six observability targets.')
assert(contract.failureTaxonomy.length >= 4, 'M28 must cover at least four failure categories.')
assert(contract.rollbackDrill.safeCommands.includes('npm run check:mainline'), 'Rollback drill must include mainline check.')
assert(contract.rollbackDrill.safeCommands.includes('npm run release:local-rc'), 'Rollback drill must include local RC.')
assert(contract.rollbackDrill.forbiddenWithoutExplicitUserApproval.includes('git reset --hard'), 'Destructive reset must be forbidden without explicit user approval.')
assert(contract.rollbackDrill.backupCommands.includes('npm run backup:world'), 'Rollback drill must include world backup.')
assert(exists(contract.rollbackDrill.runbook), 'Rollback runbook must exist.')
assert(hasAll(runbook, requiredRunbookTokens), 'Rollback runbook must contain safe checks, RC, and forbidden destructive command guidance.')
assert(packageCommand === 'node scripts/check-worldos-m28-observability-rollback.mjs', 'package.json must expose check:m28-observability-rollback.')
assert(mainline.includes('npm run check:m28-observability-rollback'), 'check:mainline must include M28 gate.')
assert(scriptRegistry.activeEntrypoints.includes(command), 'Script registry active entrypoints must include M28 gate.')
assert(scriptRegistry.recommendedDailyCommands.includes(`npm run ${command}`), 'Script registry daily commands must include M28 gate.')
assert(scriptRegistry.releaseCandidateCommands.includes(`npm run ${command}`), 'Script registry RC commands must include M28 gate.')
assert(statusPage.includes('getLongRunningOpsSummary') && statusPage.includes('LongRunningOpsPanel'), '/status must render M28 panel from summary.')
assert(statusIndex.includes("LongRunningOpsPanel"), 'Status component index must export M28 panel.')
assert(summaryLib.includes('getLongRunningOpsSummary'), 'M28 summary lib must expose getLongRunningOpsSummary.')
assert(hasAll(statusPanel, requiredStatusTokens), 'M28 status panel must include required visible acceptance tokens.')

for (const evidenceFile of evidenceFiles) {
  assert(exists(evidenceFile), `Required evidence file is missing: ${evidenceFile}`)
}

const evidenceSummary = evidenceFiles.map((evidenceFile) => {
  const fullPath = path.join(root, evidenceFile)
  const stat = fs.statSync(fullPath)
  return {
    path: evidenceFile,
    bytes: stat.size,
    updatedAt: stat.mtime.toISOString(),
  }
})

const localRcReport = exists('docs/90-archive/reports/worldos-local-rc-summary-report.json')
  ? readJson('docs/90-archive/reports/worldos-local-rc-summary-report.json')
  : null
const lanRcReport = exists('docs/90-archive/reports/worldos-local-lan-rc-report.json')
  ? readJson('docs/90-archive/reports/worldos-local-lan-rc-report.json')
  : null

const report = {
  name: 'WorldOS M28 long-running observability rollback report',
  generatedAt: new Date().toISOString(),
  status: failures.length === 0 ? 'passed' : 'failed',
  scope: contract.scope,
  observabilityTargets: contract.observabilityTargets.map((target) => ({
    id: target.id,
    command: target.command,
    evidence: target.evidence,
  })),
  failureTaxonomy: contract.failureTaxonomy.map((failure) => ({
    id: failure.id,
    signals: failure.signals,
    firstAction: failure.firstAction,
  })),
  rollbackDrill: {
    unit: contract.rollbackDrill.unit,
    safeCommands: contract.rollbackDrill.safeCommands,
    forbiddenWithoutExplicitUserApproval: contract.rollbackDrill.forbiddenWithoutExplicitUserApproval,
    backupCommands: contract.rollbackDrill.backupCommands,
    runbook: contract.rollbackDrill.runbook,
  },
  latestLocalRc: localRcReport
    ? {
        status: localRcReport.status,
        lanUrl: localRcReport.lanUrl,
        generatedAt: localRcReport.generatedAt,
      }
    : null,
  latestLanRc: lanRcReport
    ? {
        status: lanRcReport.status,
        lanUrl: lanRcReport.lanUrl,
        generatedAt: lanRcReport.generatedAt,
      }
    : null,
  evidenceSummary,
  failures,
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)

if (failures.length > 0) {
  console.error(`M28 observability rollback check failed with ${failures.length} failure(s).`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`M28 observability rollback check passed. Report: ${path.relative(root, reportPath)}`)
