// 用途：检查真实验证运行器
import fs from 'node:fs'
import path from 'node:path'
import realValidationRunnerContract from '../data/release/real-validation-runner-contract.json'
import realValidationDefectProtocol from '../data/release/real-validation-defect-protocol.json'
import realValidationDefectRegister from '../data/release/real-validation-defect-register.json'
import browserQaRecords from '../data/domains/experience/browser-qa-records.json'
import performanceMeasurementRecords from '../data/engineering/performance-measurement-records.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (realValidationRunnerContract.requiredSteps.length < 10) {
    errors.push('real validation runner must include at least 10 required steps')
  }

  ;['install', 'lint', 'typecheck', 'world-core', 'build', 'browser-qa', 'preview-smoke', 'performance'].forEach((id) => {
    if (!realValidationRunnerContract.requiredSteps.includes(id)) {
      errors.push(`real validation runner missing step: ${id}`)
    }
  })

  if (realValidationDefectProtocol.requiredFields.length < 9) {
    errors.push('defect protocol required fields too few')
  }

  if (!Array.isArray(realValidationDefectRegister.defects)) {
    errors.push('defect register defects must be an array')
  }

  const browserQaItems = browserQaRecords.matrix.reduce((sum, item) => sum + item.routes.length, 0)
  if (browserQaItems < 18) errors.push('browser QA matrix too small')

  if (performanceMeasurementRecords.routes.length < 6) {
    errors.push('performance measurement routes too few')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['validation:plan']) errors.push('package missing validation:plan')
  if (!pkg.scripts['check:real-validation-runner']) errors.push('package missing check:real-validation-runner')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real validation runner check passed.')
}

main()
