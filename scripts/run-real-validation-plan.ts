// 用途：运行real validation plan
import realValidationRunnerContract from '../data/release/real-validation-runner-contract.json'
import realExecutionRerunContract from '../data/engineering/real-execution-rerun-contract.json'
import browserQaRecords from '../data/domains/experience/browser-qa-records.json'
import performanceMeasurementRecords from '../data/engineering/performance-measurement-records.json'

function main() {
  console.log(`# ${realValidationRunnerContract.name}`)
  console.log(`stageProgress=${realValidationRunnerContract.stageProgress}`)
  console.log('')
  console.log('## Terminal commands')
  realExecutionRerunContract.steps.forEach((step, index) => {
    console.log(`${index + 1}. ${step.command}`)
  })
  console.log('')
  console.log('## Browser QA matrix')
  browserQaRecords.matrix.forEach((item) => {
    console.log(`- ${item.viewport}: ${item.routes.join(', ')}`)
  })
  console.log('')
  console.log('## Performance routes')
  performanceMeasurementRecords.routes.forEach((item) => {
    console.log(`- ${item.device}: ${item.route}`)
  })
  console.log('')
  console.log('Reminder: this command prints the plan only; it does not mark anything as passed.')
}

main()
