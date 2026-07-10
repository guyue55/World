// 用途：验证 M20 世界空间连续性是否进入真实 LAN 浏览器证据
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf8'))
const exists = (file) => fs.existsSync(rel(file))
const failures = []

function fail(message) {
  failures.push(message)
}

const reportPath = 'docs/90-archive/reports/worldos-local-lan-rc-report.json'
const requiredSteps = ['source', 'leaving', 'preview', 'arriving', 'settled']
const expectedRouteScenes = [
  { route: '/atlas', to: 'atlas' },
  { route: '/timeline', to: 'timeline' },
  { route: '/archive', to: 'archive' },
  { route: '/paths', to: 'paths' },
  { route: '/ask', to: 'lighthouse' },
  { route: '/status', to: 'status' },
]
const viewports = ['desktop', 'mobile-reduced-motion']

if (!exists(reportPath)) fail(`缺少 LAN RC 报告：${reportPath}`)

if (failures.length === 0) {
  const report = readJson(reportPath)
  if (report.status !== 'passed') fail(`LAN RC 报告未通过：${report.status}`)

  for (const viewport of viewports) {
    for (const expected of expectedRouteScenes) {
      const check = (report.browserChecks ?? []).find((entry) => entry.route === expected.route && entry.viewport === viewport)
      const continuity = check?.metrics?.sceneQa?.spatialContinuity ?? {}
      if (!check) {
        fail(`缺少浏览器证据：${viewport} ${expected.route}`)
        continue
      }
      if (check.passed !== true) fail(`浏览器证据未通过：${viewport} ${expected.route}`)
      if (!check.previousRoute) fail(`${viewport} ${expected.route} 缺少测试导航来源路由`)
      if (continuity.cuePresent !== true) fail(`${viewport} ${expected.route} 缺少迁移 cue`)
      if (!continuity.from) fail(`${viewport} ${expected.route} 缺少来源场景`)
      if (continuity.to !== expected.to) fail(`${viewport} ${expected.route} 目标场景错误：${continuity.to || 'missing'}`)
      if (!continuity.sourceGhost) fail(`${viewport} ${expected.route} 缺少来源残影`)
      if (!continuity.targetPreview) fail(`${viewport} ${expected.route} 缺少目标预告`)
      if ((continuity.stepCount ?? 0) < requiredSteps.length) fail(`${viewport} ${expected.route} 迁移步骤不足：${continuity.stepCount ?? 0}`)
      for (const step of requiredSteps) {
        if (!(continuity.steps ?? []).includes(step)) fail(`${viewport} ${expected.route} 缺少迁移阶段：${step}`)
      }
      if (viewport === 'mobile-reduced-motion' && !['reduced', 'settled', 'arriving'].includes(continuity.state)) {
        fail(`${viewport} ${expected.route} reduced-motion 状态异常：${continuity.state || 'missing'}`)
      }
      if (!check.screenshotPath || !exists(check.screenshotPath)) fail(`${viewport} ${expected.route} 缺少截图证据`)
      if ((check.metrics?.fixedOverlayIssues ?? []).length > 0) fail(`${viewport} ${expected.route} 存在固定遮挡`)
      if (check.metrics?.overflowX === true) fail(`${viewport} ${expected.route} 出现横向溢出`)
    }
  }

  const shell = fs.readFileSync(rel('src/components/world/SceneTransitionShell.tsx'), 'utf8')
  for (const token of ['previousPathnameRef', 'data-scene-source-ghost', 'data-scene-target-preview', 'data-scene-migration-step']) {
    if (!shell.includes(token)) fail(`SceneTransitionShell 缺少 M20 迁移证据令牌：${token}`)
  }
}

if (failures.length > 0) {
  console.error('WorldOS M20 spatial continuity check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS M20 spatial continuity check passed')
