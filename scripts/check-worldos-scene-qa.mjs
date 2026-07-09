// 用途：检查场景宇宙 QA 报告与本地 RC 证据边界
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf8'))
const exists = (file) => fs.existsSync(rel(file))
const failures = []

const checklistPath = 'data/domains/experience/scene-qa-checklist.json'
const packagePath = 'package.json'
const localRcGatePath = 'scripts/run-worldos-local-rc-trust-gate.mjs'

function fail(message) {
  failures.push(message)
}

function fileText(file) {
  return fs.readFileSync(rel(file), 'utf8')
}

if (!exists(checklistPath)) fail(`缺少场景 QA 清单：${checklistPath}`)

if (failures.length === 0) {
  const checklist = readJson(checklistPath)
  const reportPath = checklist.reports.sceneQaReport

  for (const file of checklist.acceptance.requiredFiles ?? []) {
    if (!exists(file)) fail(`缺少场景 QA 必需文件：${file}`)
  }

  if (checklist.scope.localOnly !== true) fail('Scene QA 必须限定 localOnly=true')
  if (checklist.scope.externalPreviewConsidered !== false) fail('Scene QA 不应纳入外部 Preview')
  if (checklist.scope.productionConsidered !== false) fail('Scene QA 不应纳入 Production')
  if (checklist.scope.frontendPermissionControl !== false) fail('Scene QA 不得声明前端权限控制')
  if (!checklist.requiredViewports.includes('desktop')) fail('Scene QA 缺少 desktop 视口')
  if (!checklist.requiredViewports.includes('mobile-reduced-motion')) fail('Scene QA 缺少 mobile reduced-motion 视口')

  if (exists(reportPath)) {
    const report = readJson(reportPath)
    const expectedRouteChecks = checklist.requiredScenes.length * checklist.requiredViewports.length

    if (report.status !== 'passed') fail(`Scene QA 报告未通过：${report.status}`)
    if (report.sourceLanReport !== checklist.reports.lanRcReport) fail('Scene QA 报告没有指向规范 LAN RC 报告')
    if ((report.failures ?? []).length > 0) fail(`Scene QA 报告仍有失败项：${report.failures.join('；')}`)
    if ((report.routeChecks ?? []).length < expectedRouteChecks) {
      fail(`Scene QA 场景视口证据不足：${(report.routeChecks ?? []).length}/${expectedRouteChecks}`)
    }
    if ((report.evidence?.screenshotCount ?? 0) < checklist.thresholds.minScreenshots) fail('Scene QA 截图数量不足')
    if (report.evidence?.firstVisitRitual !== true) fail('Scene QA 缺少首次进入仪式证据')
    if (report.evidence?.returningVisitor !== true) fail('Scene QA 缺少返回访客 Journey Memory 证据')
    if (report.evidence?.ambientEnvironment !== true) fail('Scene QA 缺少空气层全量证据')
    if (report.evidence?.sceneTransitionShell !== true) fail('Scene QA 缺少转场壳全量证据')
    if (report.evidence?.sceneIdentityBand !== true) fail('Scene QA 缺少场景身份带证据')
    if (report.evidence?.journeyMemoryEntry !== true) fail('Scene QA 缺少 Journey Memory 入口全量证据')
    if ((report.evidence?.reducedMotionChecks ?? 0) < checklist.requiredScenes.length) fail('Scene QA reduced-motion 证据不足')
    if ((report.evidence?.domNonEmptyChecks ?? 0) < expectedRouteChecks) fail('Scene QA DOM 非空证据不足')
    if ((report.evidence?.noOverflowChecks ?? 0) < expectedRouteChecks) fail('Scene QA 横向溢出检查不足')
    if ((report.evidence?.noOverlayChecks ?? 0) < expectedRouteChecks) fail('Scene QA 固定遮挡检查不足')

    for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
      if (report.releaseStates?.[key] !== false) fail(`${key} 必须保持 false`)
    }

    for (const routeCheck of report.routeChecks ?? []) {
      if (routeCheck.passed !== true) fail(`Scene QA 路由证据未通过：${routeCheck.viewport} ${routeCheck.route}`)
      if (!routeCheck.screenshot?.path || !exists(routeCheck.screenshot.path)) {
        fail(`Scene QA 截图不存在：${routeCheck.viewport} ${routeCheck.route}`)
      }
    }
  }

  const pkg = readJson(packagePath)
  if (!pkg.scripts?.['check:scene-qa']?.includes('write-worldos-scene-qa-report')) {
    fail('package scripts 缺少 check:scene-qa 生成器')
  }
  if (!pkg.scripts?.['check:scene-qa']?.includes('check-worldos-scene-qa')) {
    fail('package scripts 缺少 check:scene-qa 检查器')
  }
  if (!pkg.scripts?.['check:mainline']?.includes('check:scene-qa')) fail('check:mainline 必须包含 check:scene-qa')
  if (!fileText(localRcGatePath).includes("['npm', ['run', 'check:scene-qa']]")) {
    fail('release:local-rc 必须在 LAN smoke 后包含 check:scene-qa')
  }

  function listSourceFiles(dir) {
    if (!exists(dir)) return []
    const entries = fs.readdirSync(rel(dir), { withFileTypes: true })
    return entries.flatMap((entry) => {
      const next = path.join(dir, entry.name)
      if (entry.isDirectory()) return listSourceFiles(next)
      if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) return [next]
      return []
    })
  }

  const clientSource = ['src/app', 'src/components']
    .flatMap(listSourceFiles)
    .filter((file) => file.startsWith('src/components') || fileText(file).startsWith("'use client'") || fileText(file).startsWith('"use client"'))

  for (const file of clientSource) {
    const text = fileText(file)
    for (const token of checklist.acceptance.forbiddenClientTokens ?? []) {
      if (text.includes(token)) fail(`客户端源码出现禁止令牌 ${token}：${file}`)
    }
  }
}

if (failures.length > 0) {
  console.error('WorldOS scene QA check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS scene QA check passed')
