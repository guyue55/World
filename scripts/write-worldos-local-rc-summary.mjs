import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf8'))
const exists = (file) => fs.existsSync(rel(file))

const runtimeReportPath = 'docs/90-archive/reports/worldos-local-runtime-smoke-report.json'
const lanReportPath = 'docs/90-archive/reports/worldos-local-lan-rc-report.json'
const auditReportPath = 'docs/90-archive/reports/npm-audit-report.json'
const externalEvidencePath = 'docs/90-archive/reports/worldos-external-evidence-template.json'
const summaryReportPath = 'docs/90-archive/reports/worldos-local-rc-summary-report.json'
const evidencePolicyPath = 'data/world-kernel/worldos-local-rc-evidence-policy-v1.json'

const runtimeReport = readJson(runtimeReportPath)
const lanReport = readJson(lanReportPath)
const auditReport = readJson(auditReportPath)
const externalEvidence = readJson(externalEvidencePath)
const evidencePolicy = readJson(evidencePolicyPath)

const requiredArtifacts = ['.next/BUILD_ID', '.next/required-server-files.json', 'public/world-index.json']
const missingArtifacts = requiredArtifacts.filter((file) => !exists(file))
const screenshotDir = 'docs/90-archive/reports/worldos-local-lan-rc'
const screenshots = exists(screenshotDir)
  ? fs.readdirSync(rel(screenshotDir)).filter((file) => file.endsWith('.png')).sort()
  : []

const runtimePassed = runtimeReport.status === 'passed'
const lanPassed = lanReport.status === 'passed'
const auditSummary = auditReport.summary ?? {}
const highOrCritical = Number(auditSummary.high ?? 0) + Number(auditSummary.critical ?? 0)
const externalReleaseStates = externalEvidence.rc?.releaseStates ?? {}

const report = {
  generatedAt: new Date().toISOString(),
  source: 'scripts/write-worldos-local-rc-summary.mjs',
  status: runtimePassed && lanPassed && missingArtifacts.length === 0 && highOrCritical === 0
    ? 'local-rc-passed-external-release-blocked'
    : 'local-rc-needs-attention',
  localAccess: {
    mode: 'local-lan',
    baseUrl: lanReport.baseUrl,
    lanIp: lanReport.lanIp,
    bindHost: lanReport.bindHost,
    port: lanReport.port,
  },
  gates: {
    releaseLocalRc: 'passed-before-summary',
    productionCiBuild: 'passed-before-summary',
    runtimeSmoke: {
      status: runtimeReport.status,
      report: runtimeReportPath,
      checks: runtimeReport.checks?.length ?? 0,
      passedChecks: runtimeReport.checks?.filter((check) => check.passed).length ?? 0,
    },
    lanSmoke: {
      status: lanReport.status,
      report: lanReportPath,
      httpChecks: lanReport.checks?.length ?? 0,
      passedHttpChecks: lanReport.checks?.filter((check) => check.passed).length ?? 0,
      browserChecks: lanReport.browserChecks?.length ?? 0,
      passedBrowserChecks: lanReport.browserChecks?.filter((check) => check.passed).length ?? 0,
      passedHomePrimaryCtaChecks: lanReport.browserChecks?.filter((check) => check.route === '/' && check.metrics?.primaryCtaVisible === true).length ?? 0,
      passedMobileNavigationChecks: lanReport.browserChecks?.filter((check) => check.viewport?.includes('mobile') && check.metrics?.mobileNavigationVisible === true).length ?? 0,
      passedHomeCoreStatusCardChecks: lanReport.browserChecks?.filter((check) => check.route === '/' && check.metrics?.coreStatusCardVisible === true).length ?? 0,
      screenshotCount: screenshots.length,
    },
    audit: {
      report: auditReportPath,
      total: auditSummary.total ?? 0,
      moderate: auditSummary.moderate ?? 0,
      high: auditSummary.high ?? 0,
      critical: auditSummary.critical ?? 0,
      policy: auditReport.policy ?? [],
    },
    buildArtifacts: {
      required: requiredArtifacts,
      missing: missingArtifacts,
      buildIdMtime: exists('.next/BUILD_ID') ? fs.statSync(rel('.next/BUILD_ID')).mtime.toISOString() : null,
    },
  },
  dynamicWorldEvidence: {
    objectIndexGate: 'covered-by-check:dynamic-world',
    surfaceBoundaryGate: 'covered-by-check:dynamic-world',
    chineseFirstCopyGate: 'covered-by-check:dynamic-world',
  },
  releaseStates: {
    productionLive: false,
    releaseReady: false,
    cleanProductionReady: false,
    externalPreviewEvidenceComplete: externalReleaseStates.externalPreviewEvidenceComplete === true,
    externalProductionEvidenceComplete: externalReleaseStates.externalProductionEvidenceComplete === true,
    manualSignoffComplete: externalReleaseStates.manualSignoffComplete === true,
    rollbackDrillComplete: externalReleaseStates.rollbackDrillComplete === true,
    reason: '本地 LAN RC 可以证明当前局域网访问、构建产物、运行时和浏览器 smoke；仍不能替代真实外部 Preview / Production、HTTPS、Web Vitals、人工签收和回滚演练。',
  },
  evidence: {
    policy: evidencePolicyPath,
    policySummary: evidencePolicy.summary,
    runtimeReport: runtimeReportPath,
    lanReport: lanReportPath,
    auditReport: auditReportPath,
    externalEvidenceTemplate: externalEvidencePath,
    screenshots: screenshots.map((file) => `${screenshotDir}/${file}`),
  },
  nextActions: [
    '继续使用 npm run release:local-rc 作为本地局域网验收唯一推荐入口。',
    '拥有真实 Preview URL 后设置 PREVIEW_URL 并执行 npm run smoke:preview。',
    '拥有真实 Production URL 后设置 PRODUCTION_URL 并执行 npm run smoke:production。',
    '补齐 HTTPS、Web Vitals、Accessibility、人工签收和回滚演练后，才允许评估 releaseReady。',
  ],
}

fs.mkdirSync(path.dirname(rel(summaryReportPath)), { recursive: true })
fs.writeFileSync(rel(summaryReportPath), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
console.log(`WorldOS local RC summary report written: ${summaryReportPath}`)
