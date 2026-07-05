import fs from 'node:fs'
import path from 'node:path'
import realExecutionRerunContract from '../data/engineering/real-execution-rerun-contract.json'
import realExecutionRerunRecord from '../data/engineering/real-execution-rerun-record.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const stepIds = new Set(realExecutionRerunContract.steps.map((step) => step.id))
  const runIds = new Set(realExecutionRerunRecord.runs.map((run) => run.id))

  ;['install', 'lint-env', 'lint', 'typecheck', 'world-core', 'build', 'evidence'].forEach((id) => {
    if (!stepIds.has(id)) errors.push(`rerun contract missing step: ${id}`)
    if (!runIds.has(id)) errors.push(`rerun record missing run: ${id}`)
  })

  if (realExecutionRerunContract.failureClasses.length < 6) {
    errors.push('rerun contract failure classes too few')
  }

  if (!realExecutionRerunContract.rules.some((rule) => rule.includes('exitCode'))) {
    errors.push('rerun contract must require exitCode recording')
  }



  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:real-execution-rerun']) {
    errors.push('package missing check:real-execution-rerun')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real execution rerun check passed.')
}

main()
