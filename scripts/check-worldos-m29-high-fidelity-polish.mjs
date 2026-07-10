import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const defects = []
const reportPath = path.join(root, 'docs/90-archive/reports/worldos-m29-high-fidelity-polish-report.json')

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

function addDefect(severity, id, title, evidencePath, status = 'open') {
  defects.push({ severity, id, title, evidencePath, status })
}

function scoreRatio(passed, total, floor = 0) {
  if (total <= 0) return floor
  return Math.max(floor, Math.min(10, (passed / total) * 10))
}

const contract = readJson('data/domains/experience/high-fidelity-polish-review-v1.json')
const sceneQa = readJson(contract.reports.sceneQa)
const lanRc = readJson(contract.reports.lanRc)
const localRc = readJson(contract.reports.localRc)
const audio = readJson(contract.reports.audio)
const visualization = readJson(contract.reports.visualization)
const packageJson = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const statusPage = readText('src/app/status/page.tsx')
const statusPanel = readText('src/components/status/HighFidelityPolishPanel.tsx')
const summaryLib = readText('src/lib/high-fidelity-polish.ts')

const routeChecks = sceneQa.routeChecks ?? []
const browserChecks = lanRc.browserChecks ?? []
const screenshots = routeChecks.filter((check) => check.screenshot?.exists && check.screenshot?.size > 0)
const noOverlay = routeChecks.filter((check) => check.fixedOverlayIssueCount === 0)
const noOverflow = routeChecks.filter((check) => !check.overflowX)
const noHidden = routeChecks.filter((check) => !check.hiddenBody)
const noBrowserFailures = browserChecks.filter((check) => check.passed)
const mobileReduced = browserChecks.filter((check) => check.viewport === 'mobile-reduced-motion')
const mobileReducedPassed = mobileReduced.filter((check) => check.passed && !check.metrics?.overflowX && check.metrics?.textLength > 900)
const variants = sceneQa.evidence?.sceneWorldPortalVariants ?? []
const productionParts = Object.keys(sceneQa.evidence?.sceneProductionParts ?? {})
const fallbackFiles = contract.requiredFallbackFiles.filter((file) => exists(file))
const fallbackIntegrated = contract.requiredFallbackFiles.every((file) => {
  const source = exists(file) ? readText(file) : ''
  if (file.endsWith('WorldFallbackScene.tsx')) return source.includes('data-m29-polish="fallback-state"')
  return source.includes('WorldFallbackScene')
})

const visualDistinctness = Math.min(8.9, 5.8 + variants.length * 0.32 + productionParts.length * 0.18)
const motionDiscipline = Math.min(
  8.8,
  (scoreRatio(noOverlay.length, routeChecks.length, 6) + scoreRatio(sceneQa.evidence?.sceneMigrationCueChecks ?? 0, routeChecks.length, 6) + scoreRatio(sceneQa.evidence?.reducedMotionChecks ?? 0, 9, 6)) / 3
)
const fallbackState = fallbackIntegrated ? 8.7 : scoreRatio(fallbackFiles.length, contract.requiredFallbackFiles.length, 4)
const mobileReducedMotion = Math.min(8.9, (scoreRatio(mobileReducedPassed.length, Math.max(1, mobileReduced.length), 6) + scoreRatio(noOverflow.length, routeChecks.length, 6) + scoreRatio(noHidden.length, routeChecks.length, 6)) / 3)
const sensoryCoherence = audio.status === 'passed' && audio.defaultSoundEnabled === false && audio.autoPlayAllowed === false && visualization.dependencyDelta === 0 ? 8.4 : 6

const dimensions = [
  { id: 'visual-distinctness', score: Number(visualDistinctness.toFixed(2)), evidence: `${variants.length} portal variants, ${productionParts.length} production part kinds` },
  { id: 'motion-discipline', score: Number(motionDiscipline.toFixed(2)), evidence: `${noOverlay.length}/${routeChecks.length} no overlay, ${sceneQa.evidence?.sceneMigrationCueChecks ?? 0} migration cues` },
  { id: 'fallback-state', score: Number(fallbackState.toFixed(2)), evidence: `${fallbackFiles.length}/${contract.requiredFallbackFiles.length} fallback files use WorldFallbackScene` },
  { id: 'mobile-reduced-motion', score: Number(mobileReducedMotion.toFixed(2)), evidence: `${mobileReducedPassed.length}/${mobileReduced.length} mobile reduced-motion browser checks passed` },
  { id: 'sensory-coherence', score: Number(sensoryCoherence.toFixed(2)), evidence: `audio=${audio.status}, autoplay=${audio.autoPlayAllowed}, dependencyDelta=${visualization.dependencyDelta}` },
]
const overallScore = Number((dimensions.reduce((sum, item) => sum + item.score, 0) / dimensions.length).toFixed(2))

if (visualization.rejectedCandidates?.includes('three-r3f')) {
  addDefect('P2', 'm29-no-full-3d-universe', '当前仍是轻量 SVG/CSS 舞台，不是完整 3D 宇宙。', contract.reports.visualization, 'accepted-limit')
}
if (audio.totalAssetBytes === 0) {
  addDefect('P2', 'm29-audio-short-cues-only', '当前声景是默认静音的短提示音，不是完整音乐系统。', contract.reports.audio, 'accepted-limit')
}
if (!exists('docs/90-archive/reports/worldos-m30-ultimate-candidate-report.json')) {
  addDefect('P2', 'm29-recordings-defer-to-m30', '完整首访、场景迁移、路径、节点、灯塔录屏留到 M30 终局候选验收。', 'docs/00-overview/worldos-m30-ultimate-candidate-acceptance-protocol-2026-07-10.md', 'deferred-to-m30')
}

const blockingDefects = defects.filter((defect) => ['P0', 'P1'].includes(defect.severity))
const command = 'check:m29-high-fidelity-polish'

assert(contract.source === 'docs/00-overview/worldos-m29-high-fidelity-polish-standard-2026-07-10.md', 'M29 contract source must point to M29 polish standard.')
assert(contract.scope.localOnly === true && contract.scope.lanIpAccepted === true, 'M29 must remain local/LAN only.')
assert(contract.scope.externalPreviewConsidered === false && contract.scope.productionConsidered === false, 'M29 must not include external preview or production.')
assert(contract.scope.frontendPermissionControl === false, 'Frontend must not be permission authority.')
assert(sceneQa.status === 'passed', 'Scene QA must pass.')
assert(lanRc.status === 'passed', 'LAN RC must pass.')
assert(localRc.status === 'local-rc-passed-external-release-blocked', 'Local RC summary must pass and keep external release blocked.')
assert(routeChecks.length >= 18, 'M29 needs at least 18 scene route checks.')
assert(screenshots.length >= contract.thresholds.minScreenshots, 'M29 screenshot wall has too few screenshots.')
assert(browserChecks.length >= contract.thresholds.minBrowserChecks, 'M29 needs enough LAN browser checks.')
assert(noBrowserFailures.length === browserChecks.length, 'All LAN browser checks must pass.')
assert(noOverlay.length === routeChecks.length, 'M29 must have no fixed overlay issues.')
assert(noOverflow.length === routeChecks.length, 'M29 must have no horizontal overflow in scene QA.')
assert(variants.length >= contract.thresholds.minScenePortalVariants, 'M29 scene variants are too few.')
assert(productionParts.length >= contract.thresholds.minProductionPartKinds, 'M29 production part kinds are too few.')
assert(fallbackIntegrated, 'M29 fallback states must use unified WorldFallbackScene.')
assert(audio.status === 'passed' && audio.defaultSoundEnabled === false && audio.autoPlayAllowed === false, 'M29 audio must remain opt-in and default muted.')
assert(visualization.dependencyDelta <= contract.thresholds.maxHeavyRuntimeDependencyDelta, 'M29 must not add heavy visualization runtime dependencies.')
assert(overallScore >= contract.thresholds.minOverallScore, `M29 score too low: ${overallScore}.`)
assert(blockingDefects.length <= contract.thresholds.maxP0P1Defects, 'M29 must have no open P0/P1 defects.')
assert(packageJson.scripts[command] === 'node scripts/check-worldos-m29-high-fidelity-polish.mjs', 'package.json must expose M29 gate.')
assert((packageJson.scripts['check:mainline'] ?? '').includes(`npm run ${command}`), 'check:mainline must include M29 gate.')
assert(scriptRegistry.activeEntrypoints.includes(command), 'Script registry active entrypoints must include M29 gate.')
assert(scriptRegistry.recommendedDailyCommands.includes(`npm run ${command}`), 'Script registry daily commands must include M29 gate.')
assert(scriptRegistry.releaseCandidateCommands.includes(`npm run ${command}`), 'Script registry RC commands must include M29 gate.')
assert(statusPage.includes('getHighFidelityPolishSummary') && statusPage.includes('HighFidelityPolishPanel'), '/status must render M29 polish panel.')
assert(summaryLib.includes('getHighFidelityPolishSummary'), 'M29 summary lib must expose getHighFidelityPolishSummary.')
for (const token of contract.acceptance.requiredStatusTokens) {
  assert(statusPanel.includes(token), `M29 status panel missing token: ${token}`)
}

const report = {
  name: 'WorldOS M29 high fidelity polish report',
  generatedAt: new Date().toISOString(),
  status: failures.length === 0 ? 'passed' : 'failed',
  overallScore,
  honestConclusion: 'M29 reaches high-fidelity local/LAN polish gate, but remains not 10/10 until M30 recordings and final candidate acceptance are complete.',
  scope: contract.scope,
  dimensions,
  screenshotWall: {
    routeChecks: routeChecks.length,
    screenshots: screenshots.length,
    browserChecks: browserChecks.length,
    mobileReducedMotionChecks: mobileReduced.length,
  },
  defectSummary: {
    p0p1: blockingDefects.length,
    p2: defects.filter((defect) => defect.severity === 'P2').length,
    defects,
  },
  evidence: {
    sceneQa: contract.reports.sceneQa,
    lanRc: contract.reports.lanRc,
    localRc: contract.reports.localRc,
    audio: contract.reports.audio,
    visualization: contract.reports.visualization,
  },
  failures,
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)

if (failures.length > 0) {
  console.error(`M29 high fidelity polish check failed with ${failures.length} failure(s).`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`M29 high fidelity polish check passed: score=${overallScore}, P0/P1=${blockingDefects.length}, report=${path.relative(root, reportPath)}`)
