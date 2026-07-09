// 用途：从本地 LAN RC 浏览器证据生成场景宇宙 QA 报告
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf8'))
const exists = (file) => fs.existsSync(rel(file))

const checklistPath = 'data/domains/experience/scene-qa-checklist.json'
const checklist = readJson(checklistPath)
const lanReport = readJson(checklist.reports.lanRcReport)
const failures = []

function fail(message) {
  failures.push(message)
}

function browserCheckFor(route, viewport) {
  return (lanReport.browserChecks ?? []).find((check) => check.route === route && check.viewport === viewport)
}

function screenshotEvidence(check) {
  const screenshotPath = check?.screenshotPath ?? ''
  if (!screenshotPath || !exists(screenshotPath)) return { exists: false, size: 0, path: screenshotPath }
  return {
    exists: true,
    size: fs.statSync(rel(screenshotPath)).size,
    path: screenshotPath,
  }
}

function bool(value) {
  return value === true
}

function validateCheck(scene, viewport, check) {
  const localFailures = []
  const metrics = check?.metrics ?? {}
  const sceneQa = metrics.sceneQa ?? {}
  const screenshot = screenshotEvidence(check)

  if (!check) {
    localFailures.push(`缺少 ${viewport} ${scene.route} 浏览器证据`)
    return { metrics, sceneQa, screenshot, failures: localFailures, passed: false }
  }

  if (check.passed !== true) localFailures.push(`${viewport} ${scene.route} LAN 浏览器检查未通过`)
  if ((metrics.textLength ?? 0) < checklist.thresholds.minTextLength) {
    localFailures.push(`${viewport} ${scene.route} DOM 文本长度不足：${metrics.textLength ?? 0}`)
  }
  if (metrics.hiddenBody === true) localFailures.push(`${viewport} ${scene.route} body 被隐藏`)
  if (metrics.overflowX === true) localFailures.push(`${viewport} ${scene.route} 出现横向溢出`)
  if ((metrics.fixedOverlayIssues ?? []).length > checklist.thresholds.maxFixedOverlayIssues) {
    localFailures.push(`${viewport} ${scene.route} 存在固定遮挡：${metrics.fixedOverlayIssues.length}`)
  }
  if ((check.exceptions ?? []).length > checklist.thresholds.maxExceptions) {
    localFailures.push(`${viewport} ${scene.route} 存在运行时异常：${check.exceptions.length}`)
  }
  if ((check.logIssues ?? []).length > checklist.thresholds.maxLogIssues) {
    localFailures.push(`${viewport} ${scene.route} 存在 console warning/error：${check.logIssues.length}`)
  }
  if ((check.failedNetwork ?? []).length > checklist.thresholds.maxFailedNetwork) {
    localFailures.push(`${viewport} ${scene.route} 存在网络失败：${check.failedNetwork.length}`)
  }
  if (!screenshot.exists || screenshot.size <= 0) {
    localFailures.push(`${viewport} ${scene.route} 截图证据缺失或为空`)
  }

  if (!bool(sceneQa.ambientEnvironmentPresent)) localFailures.push(`${viewport} ${scene.route} 缺少空气层证据`)
  if (!bool(sceneQa.sceneTransitionShellPresent)) localFailures.push(`${viewport} ${scene.route} 缺少场景转场壳证据`)
  if (scene.requiresSceneIdentityBand && !bool(sceneQa.sceneIdentityBandPresent)) {
    localFailures.push(`${viewport} ${scene.route} 缺少场景身份带证据`)
  }
  if (scene.requiresSceneWorldPortal && !bool(sceneQa.sceneWorldPortalPresent)) {
    localFailures.push(`${viewport} ${scene.route} 缺少世界化场景门户证据`)
  }
  if (scene.expectedSceneWorldPortal && sceneQa.sceneWorldPortalVariant !== scene.expectedSceneWorldPortal) {
    localFailures.push(`${viewport} ${scene.route} 场景门户类型不正确：${sceneQa.sceneWorldPortalVariant || 'missing'}`)
  }
  if (scene.requiresFirstVisitRitual && !bool(sceneQa.firstVisitRitualPresent)) {
    localFailures.push(`${viewport} ${scene.route} 缺少首次进入仪式证据`)
  }
  if (!bool(sceneQa.journeyMemoryEntryPresent)) localFailures.push(`${viewport} ${scene.route} 缺少 Journey Memory 入口证据`)

  return {
    metrics,
    sceneQa,
    screenshot,
    failures: localFailures,
    passed: localFailures.length === 0,
  }
}

const routeChecks = []

for (const scene of checklist.requiredScenes) {
  for (const viewport of checklist.requiredViewports) {
    const check = browserCheckFor(scene.route, viewport)
    const result = validateCheck(scene, viewport, check)
    for (const item of result.failures) fail(item)
    routeChecks.push({
      sceneId: scene.sceneId,
      route: scene.route,
      viewport,
      passed: result.passed,
      h1: result.metrics.h1 ?? '',
      textLength: result.metrics.textLength ?? 0,
      hiddenBody: result.metrics.hiddenBody === true,
      overflowX: result.metrics.overflowX === true,
      fixedOverlayIssueCount: (result.metrics.fixedOverlayIssues ?? []).length,
      exceptionCount: (check?.exceptions ?? []).length,
      logIssueCount: (check?.logIssues ?? []).length,
      failedNetworkCount: (check?.failedNetwork ?? []).length,
      screenshot: result.screenshot,
      sceneQa: {
        ambientEnvironmentPresent: bool(result.sceneQa.ambientEnvironmentPresent),
        sceneTransitionShellPresent: bool(result.sceneQa.sceneTransitionShellPresent),
        sceneIdentityBandPresent: bool(result.sceneQa.sceneIdentityBandPresent),
        sceneWorldPortalPresent: bool(result.sceneQa.sceneWorldPortalPresent),
        sceneWorldPortalVariant: result.sceneQa.sceneWorldPortalVariant ?? '',
        firstVisitRitualPresent: bool(result.sceneQa.firstVisitRitualPresent),
        journeyMemoryEntryPresent: bool(result.sceneQa.journeyMemoryEntryPresent),
        hasReturningVisitorCopy: bool(result.sceneQa.hasReturningVisitorCopy),
        journeyMemoryText: result.sceneQa.journeyMemoryText ?? '',
      },
      failures: result.failures,
    })
  }
}

if (lanReport.status !== 'passed') fail(`LAN RC 报告状态不是 passed：${lanReport.status}`)

const screenshotCount = routeChecks.filter((check) => check.screenshot.exists && check.screenshot.size > 0).length
if (screenshotCount < checklist.thresholds.minScreenshots) {
  fail(`场景截图证据不足：${screenshotCount}/${checklist.thresholds.minScreenshots}`)
}

const requiredIdentityChecks = routeChecks.filter((check) => {
  const scene = checklist.requiredScenes.find((item) => item.sceneId === check.sceneId)
  return scene?.requiresSceneIdentityBand === true
})
const requiredPortalChecks = routeChecks.filter((check) => {
  const scene = checklist.requiredScenes.find((item) => item.sceneId === check.sceneId)
  return scene?.requiresSceneWorldPortal === true
})
const returningVisitorChecks = routeChecks.filter((check) => check.sceneQa.hasReturningVisitorCopy)

if (returningVisitorChecks.length === 0) fail('缺少返回访客文案证据：Journey Memory 没有出现“上次停在”')

const report = {
  generatedAt: new Date().toISOString(),
  source: 'scripts/write-worldos-scene-qa-report.mjs',
  checklist: checklistPath,
  sourceLanReport: checklist.reports.lanRcReport,
  lanGeneratedAt: lanReport.generatedAt ?? null,
  status: failures.length === 0 ? 'passed' : 'failed',
  scope: checklist.scope,
  releaseStates: checklist.acceptance.releaseStates,
  requiredViewports: checklist.requiredViewports,
  requiredSceneCount: checklist.requiredScenes.length,
  routeCheckCount: routeChecks.length,
  routeChecks,
  evidence: {
    screenshotCount,
    firstVisitRitual: routeChecks.some((check) => check.sceneQa.firstVisitRitualPresent),
    returningVisitor: returningVisitorChecks.length > 0,
    ambientEnvironment: routeChecks.every((check) => check.sceneQa.ambientEnvironmentPresent),
    sceneTransitionShell: routeChecks.every((check) => check.sceneQa.sceneTransitionShellPresent),
    sceneIdentityBand: requiredIdentityChecks.every((check) => check.sceneQa.sceneIdentityBandPresent),
    sceneWorldPortal: requiredPortalChecks.every((check) => check.sceneQa.sceneWorldPortalPresent),
    sceneWorldPortalVariants: [...new Set(requiredPortalChecks.map((check) => check.sceneQa.sceneWorldPortalVariant).filter(Boolean))],
    journeyMemoryEntry: routeChecks.every((check) => check.sceneQa.journeyMemoryEntryPresent),
    reducedMotionChecks: routeChecks.filter((check) => check.viewport === 'mobile-reduced-motion').length,
    domNonEmptyChecks: routeChecks.filter((check) => check.textLength >= checklist.thresholds.minTextLength).length,
    noOverflowChecks: routeChecks.filter((check) => !check.overflowX).length,
    noOverlayChecks: routeChecks.filter((check) => check.fixedOverlayIssueCount === 0).length,
  },
  failures,
  note: 'Scene QA 只复用本地 LAN RC 的真实浏览器证据；当前阶段不作为外部 Preview / Production 证据。',
}

fs.mkdirSync(path.dirname(rel(checklist.reports.sceneQaReport)), { recursive: true })
fs.writeFileSync(rel(checklist.reports.sceneQaReport), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
console.log(`WorldOS scene QA report written: ${checklist.reports.sceneQaReport}`)
if (failures.length > 0) {
  console.error('WorldOS scene QA report contains failures:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
