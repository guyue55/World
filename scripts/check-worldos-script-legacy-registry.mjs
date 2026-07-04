import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const failures = []

const pkg = readJson('package.json')
const registry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const taxonomy = readJson('data/world-kernel/worldos-script-taxonomy-v1.json')
const scripts = pkg.scripts ?? {}
const scriptNames = Object.keys(scripts).sort()
const checkScripts = scriptNames.filter((name) => name.startsWith('check'))
const stageLike = scriptNames.filter((name) => /^check:(?:r\d|v\d|phase-|stage-|round)/.test(name))
const longScripts = scriptNames
  .map((name) => ({ name, length: String(scripts[name]).length }))
  .filter((item) => item.length > 1200)
  .sort((a, b) => b.length - a.length || a.name.localeCompare(b.name))

for (const entrypoint of registry.activeEntrypoints ?? []) {
  if (!scripts[entrypoint]) failures.push(`activeEntrypoints 指向不存在脚本：${entrypoint}`)
  if (/^check:(?:r\d|v\d|phase-|stage-|round)/.test(entrypoint)) failures.push(`activeEntrypoints 不允许使用阶段型脚本：${entrypoint}`)
}

for (const command of registry.recommendedDailyCommands ?? []) {
  const script = command.replace(/^npm run\s+/, '')
  if (!scripts[script]) failures.push(`recommendedDailyCommands 指向不存在脚本：${command}`)
}

for (const command of registry.releaseCandidateCommands ?? []) {
  const script = command.replace(/^npm run\s+/, '')
  if (!scripts[script]) failures.push(`releaseCandidateCommands 指向不存在脚本：${command}`)
}

const registeredStageLike = [...(registry.legacyStageLikeCheckScripts ?? [])].sort()
if (registeredStageLike.join('\n') !== stageLike.join('\n')) {
  const missing = stageLike.filter((name) => !registeredStageLike.includes(name))
  const stale = registeredStageLike.filter((name) => !stageLike.includes(name))
  failures.push(`legacyStageLikeCheckScripts 与 package.json 漂移：missing=${missing.length}, stale=${stale.length}`)
  if (missing.length) failures.push(`未注册阶段型脚本示例：${missing.slice(0, 10).join(', ')}`)
  if (stale.length) failures.push(`过期阶段型脚本示例：${stale.slice(0, 10).join(', ')}`)
}

const registeredLong = [...(registry.longScripts ?? [])].sort((a, b) => a.name.localeCompare(b.name))
const actualLong = [...longScripts].sort((a, b) => a.name.localeCompare(b.name))
if (JSON.stringify(registeredLong) !== JSON.stringify(actualLong)) failures.push('longScripts 与 package.json 漂移，请重生成 legacy registry')

const counts = registry.scriptCounts ?? {}
if (counts.totalScripts !== scriptNames.length) failures.push(`totalScripts 统计漂移：${counts.totalScripts} vs ${scriptNames.length}`)
if (counts.checkScripts !== checkScripts.length) failures.push(`checkScripts 统计漂移：${counts.checkScripts} vs ${checkScripts.length}`)
if (counts.stageLikeCheckScripts !== stageLike.length) failures.push(`stageLikeCheckScripts 统计漂移：${counts.stageLikeCheckScripts} vs ${stageLike.length}`)
if (counts.longScripts !== longScripts.length) failures.push(`longScripts 统计漂移：${counts.longScripts} vs ${longScripts.length}`)

const thresholds = registry.thresholds ?? {}
if (scriptNames.length > thresholds.maxTotalScripts) failures.push(`npm scripts 数超过阈值：${scriptNames.length} > ${thresholds.maxTotalScripts}`)
if (checkScripts.length > thresholds.maxCheckScripts) failures.push(`check scripts 数超过阈值：${checkScripts.length} > ${thresholds.maxCheckScripts}`)
if (stageLike.length > thresholds.maxStageLikeCheckScripts) failures.push(`阶段型 check scripts 数超过阈值：${stageLike.length} > ${thresholds.maxStageLikeCheckScripts}`)
if (longScripts.length > thresholds.maxLongScripts) failures.push(`长脚本数超过阈值：${longScripts.length} > ${thresholds.maxLongScripts}`)

if (registry.policies?.newStageScriptDefault !== 'deny') failures.push('newStageScriptDefault 必须是 deny')
if (registry.policies?.keepLegacyScriptsTracked !== true) failures.push('keepLegacyScriptsTracked 必须是 true')
if (taxonomy.legacyPolicy?.legacyRegistry !== 'data/world-kernel/worldos-script-legacy-registry-v1.json') failures.push('script taxonomy 必须指向 legacy registry')
if (!scripts['check:scripts']?.includes('check:worldos-script-taxonomy') || !scripts['check:scripts']?.includes('check:worldos-script-legacy-registry')) failures.push('check:scripts 必须同时运行 taxonomy 与 legacy registry 检查')
if (!scripts['check:mainline']?.includes('check:scripts')) failures.push('check:mainline 必须包含 check:scripts')

if (failures.length) {
  console.error('WorldOS script legacy registry check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS script legacy registry check passed: ${scriptNames.length} scripts, ${stageLike.length} stage-like check scripts tracked`)
