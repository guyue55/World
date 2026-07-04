import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf-8'))
const failures = []

const taxonomy = readJson('data/world-kernel/worldos-script-taxonomy-v1.json')
const pkg = readJson('package.json')

for (const category of taxonomy.categories ?? []) {
  if (!category.id || !category.script || !category.description) {
    failures.push(`脚本分类项不完整：${JSON.stringify(category)}`)
    continue
  }
  if (!pkg.scripts?.[category.script]) failures.push(`package scripts 缺少分类入口：${category.script}`)
}

for (const command of taxonomy.recommendedDailyCommands ?? []) {
  const script = command.replace(/^npm run\s+/, '')
  if (!pkg.scripts?.[script]) failures.push(`recommendedDailyCommands 指向不存在脚本：${command}`)
}

for (const command of taxonomy.releaseCandidateCommands ?? []) {
  const script = command.replace(/^npm run\s+/, '')
  if (!pkg.scripts?.[script]) failures.push(`releaseCandidateCommands 指向不存在脚本：${command}`)
}

if (pkg.scripts?.['check:mainline'] && !pkg.scripts['check:mainline'].includes('check:worldos-mainline-governance')) {
  failures.push('check:mainline 必须包含 check:worldos-mainline-governance')
}
if (pkg.scripts?.['check:mainline'] && !pkg.scripts['check:mainline'].includes('check:worldos-script-taxonomy')) {
  failures.push('check:mainline 必须包含 check:worldos-script-taxonomy')
}
const rcGateSource = fs.existsSync(path.join(root, 'scripts/run-worldos-rc-release-gate.mjs'))
  ? fs.readFileSync(path.join(root, 'scripts/run-worldos-rc-release-gate.mjs'), 'utf-8')
  : ''
if (pkg.scripts?.['check:release:rc'] && !pkg.scripts['check:release:rc'].includes('check:mainline') && !rcGateSource.includes('check:mainline')) {
  failures.push('check:release:rc 必须包含 check:mainline')
}

if (taxonomy.legacyPolicy?.newStageScriptDefault !== 'deny') failures.push('新阶段脚本默认策略必须是 deny')

if (failures.length) {
  console.error('WorldOS script taxonomy check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS script taxonomy check passed: ${(taxonomy.categories ?? []).length} categories`)
