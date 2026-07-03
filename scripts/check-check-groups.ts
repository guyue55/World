import fs from 'node:fs'

const configPath = 'data/world-kernel/check-groups.proposed.json'
const packagePath = 'package.json'

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
const scripts = packageJson.scripts ?? {}
const groups = config.groups ?? {}
const errors: string[] = []

for (const groupName of ['check:core', 'check:runtime', 'check:release', 'check:legacy']) {
  if (!Array.isArray(groups[groupName])) {
    errors.push(`Missing group: ${groupName}`)
  }
}

for (const [groupName, groupScripts] of Object.entries(groups)) {
  if (!Array.isArray(groupScripts)) continue

  for (const scriptName of groupScripts) {
    if (typeof scriptName !== 'string' || scriptName.includes('*')) continue
    if (!scripts[scriptName] && scriptName !== 'check-world-kernel-mainline') {
      errors.push(`${groupName} references missing package script: ${scriptName}`)
    }
  }
}

if (!config.migrationPlan || !Array.isArray(config.migrationPlan)) {
  errors.push('Missing migrationPlan')
}

for (const error of errors) console.error(`[error] ${error}`)

if (errors.length > 0) {
  throw new Error(`Check groups validation failed: ${errors.length} error(s)`)
}

console.log('Check groups validation passed')
