import fs from 'node:fs'
import path from 'node:path'
import localAcceptanceRunner from '../data/local-acceptance-runner.json'
import stageClosureUpdateProtocol from '../data/stage-closure-update-protocol.json'
import firstStageAcceptanceReportSchema from '../data/first-stage-acceptance-report-schema.json'

function main() {
  const errors: string[] = []

  if (!fs.existsSync(path.join(process.cwd(), localAcceptanceRunner.runner))) {
    errors.push(`missing local acceptance runner: ${localAcceptanceRunner.runner}`)
  }

  ;['lint', 'typecheck', 'world-core', 'build'].forEach((id) => {
    if (!localAcceptanceRunner.steps.some((step) => step.id === id)) {
      errors.push(`missing local acceptance step: ${id}`)
    }
  })

  if (stageClosureUpdateProtocol.from !== 'not-yet-complete' || stageClosureUpdateProtocol.to !== 'complete') {
    errors.push('stage closure update protocol has invalid state transition')
  }

  ;['commands', 'manualQa', 'performance', 'previewDeployment', 'finalDecision'].forEach((field) => {
    if (!firstStageAcceptanceReportSchema.requiredFields.includes(field)) {
      errors.push(`acceptance report schema missing field: ${field}`)
    }
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Local acceptance runner check passed.')
}

main()
