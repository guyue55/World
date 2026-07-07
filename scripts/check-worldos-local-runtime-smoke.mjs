// 用途：检查本地运行时冒烟
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
  'data/world-kernel/worldos-local-runtime-smoke-v1.json',
  'data/world-kernel/worldos-1-rc7-local-runtime-smoke-v1.json',
  'scripts/run-worldos-local-runtime-smoke.mjs',
  'docs/10-development-history/world-kernel/worldos-1-rc7-local-runtime-smoke.md',
  'README.md',
  'CONTRIBUTING.md',
  'package.json',
]
for (const file of requiredFiles) requireFile(file)

if (!failures.length) {
  const registry = json('data/world-kernel/worldos-local-runtime-smoke-v1.json')
  const report = json('data/world-kernel/worldos-1-rc7-local-runtime-smoke-v1.json')
  const pkg = json('package.json')
  const readme = read('README.md')
  const contributing = read('CONTRIBUTING.md')
  const runner = read('scripts/run-worldos-local-runtime-smoke.mjs')
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

  if (registry.name !== 'WorldOS 本地运行时 HTTP Smoke v1') failures.push('本地 runtime smoke 注册表名称不正确')
  if (report.auditName !== 'WorldOS 1.0 RC7 本地运行时 HTTP Smoke 复核') failures.push('RC7 报告名称不正确')
  if (!String(report.status ?? '').includes('rc7-local-runtime-smoke-completed')) failures.push('RC7 报告状态不正确')

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (registry.releaseStates?.[key] !== false) failures.push(`${key} 必须继续为 false`)
    if (report.releaseStates?.[key] !== false) failures.push(`RC7 ${key} 必须继续为 false`)
  }

  if (registry.policies?.mustUseRealHttp !== true) failures.push('mustUseRealHttp 必须为 true')
  if (registry.policies?.mustStartProductionServer !== true) failures.push('mustStartProductionServer 必须为 true')
  if (registry.policies?.runtimeSmokeDoesNotReplaceExternalSmoke !== true) failures.push('runtimeSmokeDoesNotReplaceExternalSmoke 必须为 true')
  if (registry.policies?.frontendVisibilityIsNotPermission !== true) failures.push('frontendVisibilityIsNotPermission 必须为 true')

  const routeCounts = [
    ['publicHtmlRoutes', 8],
    ['staticAssetRoutes', 4],
    ['legacyRedirectRoutes', 3],
    ['guardedRoutes', 2],
    ['negativeRoutes', 1],
  ]
  for (const [key, min] of routeCounts) {
    if (!Array.isArray(registry[key]) || registry[key].length < min) failures.push(`${key} 至少需要 ${min} 项`)
  }

  for (const artifact of registry.requiredBuildArtifacts ?? []) {
    if (!artifact.startsWith('.next/')) failures.push(`构建产物路径必须在 .next 内：${artifact}`)
  }

  if (!scripts['smoke:runtime-local']?.includes('run-worldos-local-runtime-smoke')) failures.push('package scripts 缺少 smoke:runtime-local 或未指向 runner')
  if (!scripts['check:runtime-local']?.includes('check-worldos-local-runtime-smoke')) failures.push('package scripts 缺少 check:runtime-local 或未指向检查脚本')
  if (!commandEvidenceFor('check:mainline').includes('check:runtime-local')) failures.push('check:mainline 必须包含 check:runtime-local')
  if (!commandEvidenceFor('check:boundary').includes('check:runtime-local')) failures.push('check:boundary 必须包含 check:runtime-local')
  if (!commandEvidenceFor('check:rc:full').includes('smoke:runtime-local')) failures.push('check:rc:full 必须包含 smoke:runtime-local')

  for (const token of ['next start', 'fetch(', 'redirect: options.redirect ?? \'manual\'', 'worldos-local-runtime-smoke-report.json']) {
    if (!runner.includes(token)) failures.push(`本地 runtime smoke runner 缺少关键行为：${token}`)
  }

  for (const token of ['WorldOS 1.0 RC7', 'smoke:runtime-local', 'check:runtime-local', '本地运行时 HTTP Smoke']) {
    if (!readme.includes(token)) failures.push(`README 缺少 ${token}`)
    if (!contributing.includes(token)) failures.push(`CONTRIBUTING 缺少 ${token}`)
  }

  for (const file of registry.documentationTargets ?? []) {
    if (!exists(file)) failures.push(`documentationTargets 指向不存在文件：${file}`)
  }
}

if (failures.length) {
  console.error('WorldOS local runtime smoke check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS local runtime smoke check passed')
