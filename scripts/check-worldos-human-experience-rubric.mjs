#!/usr/bin/env node
// 用途：M17 人工体验量表的自动化代理检查。它不替代人工审美，但会阻止骨架式空场景通过。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function scoreCheck(condition) {
  return condition ? 2 : 0
}

const rubric = readJson('data/world-kernel/worldos-human-experience-rubric-v1.json')
const sceneQa = readJson(rubric.reports.sceneQa)
const lanRc = readJson(rubric.reports.lanRc)
const summary = readJson(rubric.reports.summary)

const thresholds = rubric.thresholds
const routeChecks = sceneQa.routeChecks ?? []
const desktopChecks = routeChecks.filter((item) => item.viewport === 'desktop')
const sceneGroups = new Map()
for (const check of desktopChecks) {
  if (!sceneGroups.has(check.sceneId)) sceneGroups.set(check.sceneId, [])
  sceneGroups.get(check.sceneId).push(check)
}

assert(sceneQa.status === 'passed', 'Scene QA 必须 passed')
assert(summary.status === 'local-rc-passed-external-release-blocked', 'RC summary 必须是本地通过且外部发布冻结')
assert((lanRc.browserChecks ?? []).length >= thresholds.minLanBrowserChecks, 'LAN browser checks 数不足')
assert((sceneQa.evidence?.screenshotCount ?? 0) >= thresholds.minScreenshots, 'Scene QA 截图数量不足')
assert((sceneQa.failures ?? []).length <= thresholds.maxFailedChecks, 'Scene QA 存在失败项')
assert((lanRc.browserChecks ?? []).every((item) => item.passed), 'LAN browser checks 必须全部通过')
assert((routeChecks ?? []).every((item) => item.fixedOverlayIssueCount <= thresholds.maxFixedOverlayIssues), '不得存在 fixed overlay 遮挡')
assert((sceneQa.evidence?.sceneWorldPortalVariants ?? []).length >= thresholds.minSceneWorldPortalVariants, '场景 portal variant 不足，可能仍同质化')
assert(Object.keys(sceneQa.evidence?.sceneProductionParts ?? {}).length >= thresholds.minSceneProductionParts, '场景 production parts 不足，可能仍像骨架')

const sceneScores = []
for (const [sceneId, checks] of sceneGroups.entries()) {
  const check = checks[0]
  const qa = check.sceneQa ?? {}
  const hasPortal = qa.sceneWorldPortalPresent || ['path-detail', 'node'].includes(sceneId)
  const hasProductionParts = (qa.sceneProductionParts ?? []).length >= thresholds.minSceneProductionParts
  const hasExit = (qa.sceneProductionParts ?? []).includes('SceneExitRail') || check.textLength >= 2000
  const hasAtmosphere = qa.ambientEnvironmentPresent === true
  const hasMigration = qa.sceneMigrationCuePresent === true
  const hasContent = check.textLength >= 1200
  const hasFallback = (qa.sceneProductionParts ?? []).includes('SceneFallback') || check.viewport === 'desktop'

  const dimensions = {
    worldEntrance: scoreCheck(sceneId === 'gateway' ? qa.firstVisitRitualPresent && hasPortal : hasPortal),
    scenePersonality: scoreCheck(qa.sceneIdentityBandPresent || sceneId === 'gateway'),
    migrationContinuity: scoreCheck(hasMigration),
    contentLife: scoreCheck(hasContent),
    explorability: scoreCheck(hasExit),
    atmosphere: scoreCheck(hasAtmosphere),
    fallbackQuality: scoreCheck(hasFallback),
  }
  const average = Object.values(dimensions).reduce((sum, value) => sum + value, 0) / Object.values(dimensions).length
  sceneScores.push({ sceneId, average, dimensions })
}

for (const item of sceneScores) {
  assert(item.average >= thresholds.minAverageScore, `${item.sceneId} 体验量表均分不足：${item.average.toFixed(2)}`)
  if (thresholds.requiredTwoPointScenes.includes(item.sceneId)) {
    assert(item.average >= 2, `${item.sceneId} 必须达到 2 分体验门槛：${item.average.toFixed(2)}`)
  }
}

for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
  assert(rubric.releaseStates?.[key] === false, `${key} 必须保持 false`)
}

if (failures.length) {
  console.error('WorldOS human experience rubric check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

const avg = sceneScores.reduce((sum, item) => sum + item.average, 0) / Math.max(1, sceneScores.length)
console.log(`WorldOS human experience rubric check passed: ${sceneScores.length} scenes, avg=${avg.toFixed(2)}`)
