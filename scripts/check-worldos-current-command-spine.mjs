// 用途：确保当前主线只运行生命世界客观门禁，历史阶段和外部 Preview 仅登记不判定完成。
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const registry = JSON.parse(fs.readFileSync('data/world-kernel/worldos-script-legacy-registry-v1.json', 'utf8'))
const failures = []
const stagePattern = /^check:(?:r\d|v\d|phase\d*|stage|round|m\d+)/i
const requiredMainline = [
  'check:living-world-control',
  'check:living-world-contract',
  'check:current-command-spine',
  'check:content',
  'check:boundary',
  'check:objective-evidence-boundary',
  'check:dependency-hardening',
  'check:world-experience',
]

function npmRunCommands(script) {
  return [...String(script ?? '').matchAll(/(?:^|&&\s*)npm run\s+([^\s&]+)/g)].map((match) => match[1])
}

const mainline = npmRunCommands(pkg.scripts?.['check:mainline'])
if (JSON.stringify(mainline) !== JSON.stringify(requiredMainline)) failures.push(`check:mainline drift: ${mainline.join(',')}`)
for (const command of mainline) if (stagePattern.test(command)) failures.push(`stage command in mainline: ${command}`)

for (const entry of ['check:content', 'check:boundary']) {
  for (const command of npmRunCommands(pkg.scripts?.[entry])) if (stagePattern.test(command)) failures.push(`stage command nested in ${entry}: ${command}`)
}

const daily = registry.recommendedDailyCommands ?? []
if (daily.length > 8) failures.push(`recommended daily commands exceed 8: ${daily.length}`)
for (const command of daily) if (stagePattern.test(command.replace(/^npm run\s+/, ''))) failures.push(`stage command remains daily: ${command}`)

const historical = new Set((registry.historicalInvalidatedEntrypoints ?? []).map((entry) => entry.script))
const stageScripts = Object.keys(pkg.scripts ?? {}).filter((name) => stagePattern.test(name))
for (const script of stageScripts) if (!historical.has(script)) failures.push(`stage script is not registered historical: ${script}`)

const externalEntries = new Set((registry.externalPreviewEntrypoints ?? []).map((entry) => entry.script))
for (const script of ['preview:smoke', 'smoke:preview', 'check:preview-performance', 'check:preview-smoke-config']) {
  if (!externalEntries.has(script)) failures.push(`external preview script is not isolated: ${script}`)
}

if (failures.length) {
  console.error(`CURRENT_COMMAND_SPINE_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`CURRENT_COMMAND_SPINE_PASS mainline=${mainline.length} daily=${daily.length} historical=${historical.size}`)
