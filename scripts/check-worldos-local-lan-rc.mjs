// 用途：检查worldos local lan rc
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const exists = (file) => fs.existsSync(rel(file))
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

function requireFile(file) {
  if (!exists(file)) failures.push(`缺少文件：${file}`)
}

const requiredFiles = [
  'data/world-kernel/worldos-local-lan-rc-v1.json',
  'data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json',
  'scripts/run-worldos-local-lan-rc.mjs',
  'scripts/check-worldos-local-lan-rc.mjs',
  'docs/10-development-history/world-kernel/worldos-1-rc8-local-lan-rc.md',
  'docs/superpowers/plans/2026-07-05-worldos-local-lan-rc.md',
  'README.md',
  'CONTRIBUTING.md',
  'package.json',
]

for (const file of requiredFiles) requireFile(file)

if (!failures.length) {
  const registry = json('data/world-kernel/worldos-local-lan-rc-v1.json')
  const report = json('data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json')
  const pkg = json('package.json')
  const runner = read('scripts/run-worldos-local-lan-rc.mjs')
  const readme = read('README.md')
  const contributing = read('CONTRIBUTING.md')
  const plan = read('docs/superpowers/plans/2026-07-05-worldos-local-lan-rc.md')
  const history = read('docs/10-development-history/world-kernel/worldos-1-rc8-local-lan-rc.md')
  const scripts = pkg.scripts ?? {}

  function expandedScriptCommand(scriptName, seen = new Set()) {
    const command = scripts[scriptName]
    if (!command || seen.has(scriptName)) return command ?? ''

    const nextSeen = new Set(seen)
    nextSeen.add(scriptName)

    return command.replace(/\bnpm run ([\w:-]+)/g, (match, nestedScriptName) => {
      const nestedCommand = expandedScriptCommand(nestedScriptName, nextSeen)
      return nestedCommand ? `(${nestedCommand})` : match
    })
  }

  function commandEvidenceFor(scriptName) {
    const command = expandedScriptCommand(scriptName)
    const scriptFiles = [...command.matchAll(/\bnode (scripts\/[\w.-]+\.mjs)/g)].map((match) => match[1])
    const scriptSources = scriptFiles.filter(exists).map(read)
    return [scripts[scriptName] ?? '', command, ...scriptSources].join('\n')
  }

  if (registry.name !== 'WorldOS 本地局域网 RC 验收 v1') failures.push('LAN RC 注册表名称不正确')
  if (report.auditName !== 'WorldOS 1.0 RC8 本地局域网 RC 验收') failures.push('RC8 报告名称不正确')
  if (!String(report.status ?? '').includes('rc8-local-lan-rc')) failures.push('RC8 报告状态不正确')

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (registry.releaseStates?.[key] !== false) failures.push(`${key} 必须继续为 false`)
    if (report.releaseStates?.[key] !== false) failures.push(`RC8 ${key} 必须继续为 false`)
  }

  if (registry.server?.bindHost !== '0.0.0.0') failures.push('LAN RC 必须绑定 0.0.0.0')
  if (registry.policies?.mustUseLanIp !== true) failures.push('mustUseLanIp 必须为 true')
  if (registry.policies?.mustBindAllInterfaces !== true) failures.push('mustBindAllInterfaces 必须为 true')
  if (registry.policies?.mustRunBrowserRuntimeCheck !== true) failures.push('mustRunBrowserRuntimeCheck 必须为 true')
  if (registry.policies?.mustCaptureScreenshots !== true) failures.push('mustCaptureScreenshots 必须为 true')
  if (registry.policies?.frontendVisibilityIsNotPermission !== true) failures.push('frontendVisibilityIsNotPermission 必须为 true')
  if (registry.policies?.lanRcDoesNotReplaceExternalSmoke !== true) failures.push('lanRcDoesNotReplaceExternalSmoke 必须为 true')

  const routeCounts = [
    ['publicHtmlRoutes', 8],
    ['staticAssetRoutes', 4],
    ['legacyRedirectRoutes', 4],
    ['guardedRoutes', 3],
    ['negativeRoutes', 1],
    ['browserRoutes', 8],
  ]
  for (const [key, min] of routeCounts) {
    if (!Array.isArray(registry[key]) || registry[key].length < min) failures.push(`${key} 至少需要 ${min} 项`)
  }

  if (!Array.isArray(registry.browser?.viewports) || registry.browser.viewports.length < 2) {
    failures.push('LAN RC 至少需要桌面和移动端两个浏览器视口')
  }
  if (!registry.browser?.viewports?.some((item) => item.mobile === true && item.reducedMotion === true)) {
    failures.push('LAN RC 必须覆盖移动端低动效视口')
  }
  for (const key of ['mustHaveHomePrimaryCta', 'mustHaveHomeCoreStatusCard', 'mustHaveMobileNavigation']) {
    if (registry.browserExpectations?.[key] !== true) failures.push(`LAN RC 浏览器预期缺少 ${key}`)
  }

  for (const token of [
    'os.networkInterfaces()',
    'bindHost',
    "'0.0.0.0'",
    'next',
    'start',
    'WebSocket',
    'Runtime.exceptionThrown',
    'Log.entryAdded',
    'Network.loadingFailed',
    'Page.captureScreenshot',
    'prefers-reduced-motion',
    'overflowX',
    'primaryCtaVisible',
    'mobileNavigationVisible',
    'coreStatusCardVisible',
    'frontendVisibilityIsNotPermission',
    'productionLive',
  ]) {
    if (!runner.includes(token)) failures.push(`LAN RC runner 缺少关键行为：${token}`)
  }

  if (!scripts['check:lan-local']?.includes('check-worldos-local-lan-rc')) failures.push('package scripts 缺少 check:lan-local')
  if (!scripts['smoke:lan-local']?.includes('run-worldos-local-lan-rc')) failures.push('package scripts 缺少 smoke:lan-local')
  if (!scripts['check:release:rc']?.includes('check:lan-local')) failures.push('check:release:rc 必须包含 check:lan-local')
  if (!commandEvidenceFor('check:rc:full').includes('smoke:lan-local')) failures.push('check:rc:full 必须包含 smoke:lan-local')

  for (const token of ['WorldOS 1.0 RC8', 'check:lan-local', 'smoke:lan-local', '本地局域网 RC']) {
    if (!readme.includes(token)) failures.push(`README 缺少 ${token}`)
    if (!contributing.includes(token)) failures.push(`CONTRIBUTING 缺少 ${token}`)
  }

  for (const token of ['局域网 IP', 'productionLive: false', 'npm run smoke:lan-local']) {
    if (!plan.includes(token)) failures.push(`计划文档缺少 ${token}`)
    if (!history.includes(token)) failures.push(`历史文档缺少 ${token}`)
  }

  for (const file of registry.documentationTargets ?? []) {
    if (!exists(file)) failures.push(`documentationTargets 指向不存在文件：${file}`)
  }

  const evidenceOutput = registry.evidenceOutput ?? ''
  if (!evidenceOutput.includes('worldos-local-lan-rc-report.json')) failures.push('LAN RC 证据报告路径不正确')
}

if (failures.length) {
  console.error('WorldOS local LAN RC check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS local LAN RC check passed')
