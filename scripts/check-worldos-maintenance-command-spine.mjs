import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const exists = (file) => fs.existsSync(rel(file))

const failures = []

function requireFile(file) {
  if (!exists(file)) failures.push(`缺少文件：${file}`)
}

const requiredFiles = [
  'data/world-kernel/worldos-maintenance-command-spine-v1.json',
  'data/world-kernel/worldos-1-rc6-maintenance-command-spine-v1.json',
  'data/world-kernel/worldos-1-rc7-local-runtime-smoke-v1.json',
  'data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json',
  'data/world-kernel/worldos-local-runtime-smoke-v1.json',
  'data/world-kernel/worldos-local-lan-rc-v1.json',
  'docs/10-development-history/world-kernel/worldos-1-rc6-maintenance-command-spine.md',
  'docs/10-development-history/world-kernel/worldos-1-rc7-local-runtime-smoke.md',
  'docs/10-development-history/world-kernel/worldos-1-rc8-local-lan-rc.md',
  'README.md',
  'CONTRIBUTING.md',
  'package.json',
]

for (const file of requiredFiles) requireFile(file)

if (!failures.length) {
  const contract = json('data/world-kernel/worldos-maintenance-command-spine-v1.json')
  const report = json('data/world-kernel/worldos-1-rc6-maintenance-command-spine-v1.json')
  const rc7Report = json('data/world-kernel/worldos-1-rc7-local-runtime-smoke-v1.json')
  const rc8Report = json('data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json')
  const pkg = json('package.json')
  const readme = read('README.md')
  const contributing = read('CONTRIBUTING.md')
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

  if (contract.name !== 'WorldOS 长期维护命令脊柱 v1') failures.push('命令脊柱注册表名称不正确')
  if (report.auditName !== 'WorldOS 1.0 RC6 长期维护命令脊柱复核') failures.push('RC6 报告名称不正确')
  if (!['pass', 'rc6-maintenance-command-spine-completed-external-deploy-still-blocked'].includes(report.status)) failures.push('RC6 报告状态不正确')
  if (rc7Report.auditName !== 'WorldOS 1.0 RC7 本地运行时 HTTP Smoke 复核') failures.push('RC7 报告名称不正确')
  if (!String(rc7Report.status ?? '').includes('rc7-local-runtime-smoke-completed')) failures.push('RC7 报告状态不正确')
  if (rc8Report.auditName !== 'WorldOS 1.0 RC8 本地局域网 RC 验收') failures.push('RC8 报告名称不正确')
  if (!String(rc8Report.status ?? '').includes('rc8-local-lan-rc')) failures.push('RC8 报告状态不正确')

  for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
    if (key === 'reason') continue
    if (value !== false) failures.push(`${key} 必须继续为 false`)
  }

  const stageLikePattern = /(?:^|&&\s*)npm run check:(?:r\d|v\d|phase-|stage-|round)/
  for (const entry of contract.commandSpine ?? []) {
    if (!entry.script) failures.push('commandSpine entry 缺少 script')
    if (!entry.command) failures.push(`${entry.script} 缺少 command`)
    if (!scripts[entry.script]) failures.push(`package scripts 缺少命令脊柱脚本：${entry.script}`)
    if (scripts[entry.script] && scripts[entry.script] !== entry.command) {
      failures.push(`${entry.script} 与命令脊柱注册表不一致`)
    }
    if (entry.stageLikeAllowed !== true && stageLikePattern.test(entry.command)) {
      failures.push(`${entry.script} 不得直接调用阶段型 check 脚本：${entry.command}`)
    }
  }

  for (const name of contract.stableEntrypoints ?? []) {
    if (!scripts[name]) failures.push(`stableEntrypoints 指向不存在脚本：${name}`)
  }

  const mainlineCommand = commandEvidenceFor('check:mainline')
  const boundaryCommand = commandEvidenceFor('check:boundary')
  const rcFullCommand = commandEvidenceFor('check:rc:full')

  if (!mainlineCommand.includes('check:maintenance-command-spine')) failures.push('check:mainline 必须包含 check:maintenance-command-spine')
  if (!mainlineCommand.includes('check:runtime-local')) failures.push('check:mainline 必须包含 check:runtime-local')
  if (!mainlineCommand.includes('check:local-product-maturity')) failures.push('check:mainline 必须包含 check:local-product-maturity')
  if (!boundaryCommand.includes('check:api-boundary') || !boundaryCommand.includes('check:permission-boundary') || !boundaryCommand.includes('check:local-owner-workbench') || !boundaryCommand.includes('check:scripts')) failures.push('check:boundary 必须包含 API、权限事实源、本地 Owner 工作台与脚本治理')
  if (!boundaryCommand.includes('check:runtime-local')) failures.push('check:boundary 必须包含 check:runtime-local')
  if (!rcFullCommand.includes('build:kernel-release') || !rcFullCommand.includes('build:production-ci') || !rcFullCommand.includes('build:verify-artifacts')) failures.push('check:rc:full 必须包含真实生产构建与构建产物验证链路')
  if (!rcFullCommand.includes('smoke:runtime-local')) failures.push('check:rc:full 必须包含本地运行时 HTTP smoke')
  if (!rcFullCommand.includes('smoke:lan-local')) failures.push('check:rc:full 必须包含本地局域网 RC smoke')
  if (!scripts['check:release:rc']?.includes('check:lan-local')) failures.push('check:release:rc 必须包含本地局域网 RC 静态门禁')
  if (scripts['check:rc'] !== 'npm run check:release:rc') failures.push('check:rc 必须保持为 check:release:rc 别名')
  if (scripts['check:rc:fast'] !== 'npm run check:release:rc') failures.push('check:rc:fast 必须保持为 check:release:rc 别名')

  for (const token of ['WorldOS 1.0 RC6', 'WorldOS 1.0 RC7', 'WorldOS 1.0 RC8', 'check:daily', 'check:boundary', 'check:rc:full', 'release:local-rc', 'smoke:runtime-local', 'smoke:lan-local']) {
    if (!readme.includes(token)) failures.push(`README 缺少 ${token}`)
    if (!contributing.includes(token)) failures.push(`CONTRIBUTING 缺少 ${token}`)
  }

  for (const file of contract.documentationTargets ?? []) {
    if (!exists(file)) failures.push(`documentationTargets 缺少文件：${file}`)
  }

  if (contract.policies?.productionFlagsRequireExternalEvidence !== true) failures.push('productionFlagsRequireExternalEvidence 必须为 true')
  if (contract.policies?.runtimeSmokeDoesNotReplaceExternalSmoke !== true) failures.push('runtimeSmokeDoesNotReplaceExternalSmoke 必须为 true')
  if (contract.policies?.frontendVisibilityIsNotPermission !== true) failures.push('frontendVisibilityIsNotPermission 必须为 true')
  if (contract.policies?.newStageScriptDefault !== 'deny') failures.push('newStageScriptDefault 必须为 deny')
}

if (failures.length) {
  console.error('WorldOS maintenance command spine check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS maintenance command spine check passed')
