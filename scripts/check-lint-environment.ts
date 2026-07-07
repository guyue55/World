// 用途：检查lint environment
import fs from 'node:fs'
import path from 'node:path'
import lintEnvironmentContract from '../data/engineering/lint-environment-contract.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []
  const warnings: string[] = []

  lintEnvironmentContract.requiredFiles.forEach((file) => {
    if (!exists(file)) errors.push(`missing required lint file: ${file}`)
  })

  const hasNodeModules = exists('node_modules')
  const hasLocalEslint = exists('node_modules/.bin/eslint') || exists('node_modules/eslint/bin/eslint.js')

  if (!hasNodeModules || !hasLocalEslint) {
    warnings.push('missing-local-dependencies: run npm install before judging npm run lint')
  }

  if (lintExecutionReadiness.requiredCommand !== 'npm run lint') {
    errors.push('lint readiness requiredCommand must remain npm run lint')
  }

  if (!lintEnvironmentContract.rules.some((rule) => rule.includes('npm install'))) {
    errors.push('lint environment contract must explain npm install prerequisite')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))

  if (warnings.length > 0) {
    console.log(warnings.join('\n'))
    console.log('Lint environment diagnostic completed with dependency warnings.')
    return
  }

  console.log('Lint environment diagnostic passed; npm run lint can be judged in this workspace.')
}

main()
