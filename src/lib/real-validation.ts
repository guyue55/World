import realValidationRunnerContract from '../../data/release/real-validation-runner-contract.json'
import realValidationDefectProtocol from '../../data/release/real-validation-defect-protocol.json'
import realValidationDefectRegister from '../../data/release/real-validation-defect-register.json'
import realExecutionRerunContract from '../../data/engineering/real-execution-rerun-contract.json'
import browserQaRecords from '../../data/domains/experience/browser-qa-records.json'
import performanceMeasurementRecords from '../../data/engineering/performance-measurement-records.json'

export function getRealValidationRunnerContract() {
  return realValidationRunnerContract
}

export function getRealValidationDefectProtocol() {
  return realValidationDefectProtocol
}

export function getRealValidationDefectRegister() {
  return realValidationDefectRegister
}

export function getRealValidationSummary() {
  const browserQaItems = browserQaRecords.matrix.reduce((sum, item) => sum + item.routes.length, 0)
  const performanceRoutes = performanceMeasurementRecords.routes.length

  return {
    stageProgress: realValidationRunnerContract.stageProgress,
    validationSteps: realValidationRunnerContract.requiredSteps.length,
    rerunSteps: realExecutionRerunContract.steps.length,
    browserQaItems,
    performanceRoutes,
    defectCount: realValidationDefectRegister.defects.length,
  }
}
