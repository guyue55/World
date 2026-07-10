// 用途：验证 M19 场景主体交互是否进入真实 LAN 浏览器证据
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
if (!exists(reportPath)) fail(`缺少 LAN RC 报告：${reportPath}`)

const required = [
  { route: '/atlas', kind: 'atlas' },
  { route: '/timeline', kind: 'timeline' },
  { route: '/archive', kind: 'archive' },
  { route: '/paths', kind: 'paths' },
]
const viewports = ['desktop', 'mobile-reduced-motion']

if (failures.length === 0) {
  const report = readJson(reportPath)
  if (report.status !== 'passed') fail(`LAN RC 报告未通过：${report.status}`)

  for (const item of required) {
    for (const viewport of viewports) {
      const check = (report.browserChecks ?? []).find((entry) => entry.route === item.route && entry.viewport === viewport)
      const sceneQa = check?.metrics?.sceneQa ?? {}
      if (!check) {
        fail(`缺少浏览器证据：${viewport} ${item.route}`)
        continue
      }
      if (check.passed !== true) fail(`浏览器证据未通过：${viewport} ${item.route}`)
      if (sceneQa.m19SceneInteractionDockPresent !== true) {
        fail(`${viewport} ${item.route} 缺少 M19 首屏交互坞`)
      }
      if (sceneQa.m19SceneInteractionDockKind !== item.kind) {
        fail(`${viewport} ${item.route} M19 交互坞类型错误：${sceneQa.m19SceneInteractionDockKind || 'missing'}`)
      }
      if (sceneQa.m19SceneInteractionPanelPresent !== true) {
        fail(`${viewport} ${item.route} 缺少 M19 完整交互面板`)
      }
      if (sceneQa.m19SceneInteractionPanelKind !== item.kind) {
        fail(`${viewport} ${item.route} M19 完整交互面板类型错误：${sceneQa.m19SceneInteractionPanelKind || 'missing'}`)
      }
      if (!check.screenshotPath || !exists(check.screenshotPath)) {
        fail(`${viewport} ${item.route} 缺少截图证据`)
      }
      if ((check.metrics?.fixedOverlayIssues ?? []).length > 0) {
        fail(`${viewport} ${item.route} 存在固定遮挡`)
      }
      if (check.metrics?.overflowX === true) {
        fail(`${viewport} ${item.route} 出现横向溢出`)
      }
    }
  }

  const portal = fs.readFileSync(rel('src/components/world/SceneWorldPortal.tsx'), 'utf8')
  for (const token of ['data-m19-scene-interaction-dock', 'interactionModel']) {
    if (!portal.includes(token)) fail(`SceneWorldPortal 缺少 M19 首屏证据令牌：${token}`)
  }

  const panel = fs.readFileSync(rel('src/components/world/SceneDeepInteractionPanel.tsx'), 'utf8')
  if (!panel.includes('data-m19-scene-interaction')) fail('SceneDeepInteractionPanel 缺少 M19 完整面板证据令牌')
}

if (failures.length > 0) {
  console.error('WorldOS M19 scene interaction check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS M19 scene interaction check passed')
