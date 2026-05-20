import realValidationRunnerContract from '../data/release/real-validation-runner-contract.json'
import realValidationDefectRegister from '../data/release/real-validation-defect-register.json'
import browserQaRecords from '../data/domains/experience/browser-qa-records.json'
import performanceMeasurementRecords from '../data/engineering/performance-measurement-records.json'

function main() {
  const browserQaItems = browserQaRecords.matrix.reduce((sum, item) => sum + item.routes.length, 0)
  console.log(`${realValidationRunnerContract.name}`)
  console.log(`stageProgress=${realValidationRunnerContract.stageProgress}`)
  console.log(`steps=${realValidationRunnerContract.requiredSteps.length}`)
  console.log(`browserQaItems=${browserQaItems}`)
  console.log(`performanceRoutes=${performanceMeasurementRecords.routes.length}`)
  console.log(`defects=${realValidationDefectRegister.defects.length}`)
}

main()
