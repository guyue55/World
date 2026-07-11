// 用途：写入本地 RC 摘要
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf8'))
const exists = (file) => fs.existsSync(rel(file))

const runtimeReportPath = 'docs/90-archive/reports/worldos-local-runtime-smoke-report.json'
const lanReportPath = 'docs/90-archive/reports/worldos-local-lan-rc-report.json'
const sceneQaReportPath = 'docs/90-archive/reports/worldos-scene-qa-report.json'
const auditReportPath = 'docs/90-archive/reports/npm-audit-report.json'
const externalEvidencePath = 'docs/90-archive/reports/worldos-external-evidence-template.json'
const summaryReportPath = 'docs/90-archive/reports/worldos-local-rc-summary-report.json'
const evidencePolicyPath = 'data/world-kernel/worldos-local-rc-evidence-policy-v1.json'

const runtimeReport = readJson(runtimeReportPath)
const lanReport = readJson(lanReportPath)
const sceneQaReport = readJson(sceneQaReportPath)
const auditReport = readJson(auditReportPath)
const externalEvidence = readJson(externalEvidencePath)
const evidencePolicy = readJson(evidencePolicyPath)
const publicWorldIndex = exists('public/world-index.json') ? readJson('public/world-index.json') : null

const requiredArtifacts = ['.next/BUILD_ID', '.next/required-server-files.json', 'public/world-index.json']
const missingArtifacts = requiredArtifacts.filter((file) => !exists(file))
const screenshotDir = 'docs/90-archive/reports/worldos-local-lan-rc'
const screenshots = exists(screenshotDir)
  ? fs.readdirSync(rel(screenshotDir)).filter((file) => file.endsWith('.png')).sort()
  : []
const contentLifeFacts = publicWorldIndex?.contentLifeFacts ?? []
const completeContentLifeFacts = contentLifeFacts.filter((fact) =>
  fact.aiReadableSummary
  && (fact.relationReasons ?? []).length > 0
  && (fact.pathIds ?? []).length > 0
)

const runtimePassed = runtimeReport.status === 'passed'
const lanPassed = lanReport.status === 'passed'
const sceneQaPassed = sceneQaReport.status === 'passed'
const auditSummary = auditReport.summary ?? {}
const highOrCritical = Number(auditSummary.high ?? 0) + Number(auditSummary.critical ?? 0)
const externalReleaseStates = externalEvidence.rc?.releaseStates ?? {}

const report = {
  generatedAt: new Date().toISOString(),
  source: 'scripts/write-worldos-local-rc-summary.mjs',
  status: runtimePassed && lanPassed && sceneQaPassed && missingArtifacts.length === 0 && highOrCritical === 0
    && contentLifeFacts.length > 0 && completeContentLifeFacts.length === contentLifeFacts.length
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
      passedSceneViewportChecks: lanReport.browserChecks?.filter((check) => check.metrics?.sceneViewportVisible === true && check.metrics?.sceneViewportRatio >= 0.65).length ?? 0,
      passedPrimaryInteractionChecks: lanReport.browserChecks?.filter((check) => check.metrics?.primaryInteractionVisible === true).length ?? 0,
      passedMobileNavigationChecks: lanReport.browserChecks?.filter((check) => check.viewport?.includes('mobile') && check.metrics?.mobileNavigationVisible === true).length ?? 0,
      screenshotCount: screenshots.length,
    },
    sceneQa: {
      status: sceneQaReport.status,
      report: sceneQaReportPath,
      routeChecks: sceneQaReport.routeCheckCount ?? 0,
      screenshotCount: sceneQaReport.evidence?.screenshotCount ?? 0,
      firstVisitRitual: sceneQaReport.evidence?.firstVisitRitual === true,
      returningVisitor: sceneQaReport.evidence?.returningVisitor === true,
      ambientEnvironment: sceneQaReport.evidence?.ambientEnvironment === true,
      sceneTransitionShell: sceneQaReport.evidence?.sceneTransitionShell === true,
      sceneIdentityBand: sceneQaReport.evidence?.sceneIdentityBand === true,
      compactSceneIdentityBand: sceneQaReport.evidence?.compactSceneIdentityBand === true,
      sceneWorldPortal: sceneQaReport.evidence?.sceneWorldPortal === true,
      sceneWorldPortalVariants: sceneQaReport.evidence?.sceneWorldPortalVariants ?? [],
      reducedMotionChecks: sceneQaReport.evidence?.reducedMotionChecks ?? 0,
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
    contentLife: {
      status: contentLifeFacts.length > 0 && completeContentLifeFacts.length === contentLifeFacts.length ? 'passed' : 'needs-attention',
      publicNodeFacts: contentLifeFacts.length,
      completePublicNodeFacts: completeContentLifeFacts.length,
      publicIndex: 'public/world-index.json',
      absorbedBy: ['atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse'],
    },
    lighthouseReadonly: {
      status: 'passed-by-check:mainline',
      mode: 'low-light',
      providerStatus: 'disabled-dry-run',
      serverRuntime: 'src/server/ai/lighthouse-runtime.ts',
      api: 'src/app/api/lighthouse/ask/route.ts',
      writesWorldSource: false,
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
    reason: '当前计划只打磨 localhost / LAN IP。本地 LAN RC 可以证明局域网访问、构建产物、运行时和浏览器 smoke；外部 Preview / Production 暂不作为近期验收目标。',
  },
  evidence: {
    policy: evidencePolicyPath,
    policySummary: evidencePolicy.summary,
    runtimeReport: runtimeReportPath,
    lanReport: lanReportPath,
    sceneQaReport: sceneQaReportPath,
    auditReport: auditReportPath,
    externalEvidenceTemplate: externalEvidencePath,
    screenshots: screenshots.map((file) => `${screenshotDir}/${file}`),
  },
  nextActions: [
    '继续使用 npm run release:local-rc 作为本地局域网验收唯一推荐入口。',
    '继续补强公开内容、路径体验、权限边界和截图巡检，让 localhost / LAN IP 体验先稳定成熟。',
    '保持 productionLive=false、releaseReady=false、cleanProductionReady=false，外部 Preview / Production 暂不纳入近期目标。',
    '每次阶段性验收前重跑 release:local-rc，确保 fresh build、LAN smoke、browser smoke、audit 和证据策略一致。',
  ],
}

fs.mkdirSync(path.dirname(rel(summaryReportPath)), { recursive: true })
fs.writeFileSync(rel(summaryReportPath), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
console.log(`WorldOS local RC summary report written: ${summaryReportPath}`)
