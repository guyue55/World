import browserQaExecutionContract from '../../data/browser-qa-execution-contract.json'
import browserQaRecords from '../../data/browser-qa-records.json'
import browserQaRouteCoverage from '../../data/browser-qa-route-coverage.json'
import realValidationDefectRegister from '../../data/real-validation-defect-register.json'

export function getBrowserQaExecutionContract() {
  return browserQaExecutionContract
}

export function getBrowserQaRecords() {
  return browserQaRecords
}

export function getBrowserQaRouteCoverage() {
  return browserQaRouteCoverage
}

export function getBrowserQaSummary() {
  const matrixItems = browserQaRecords.matrix.length
  const routeChecks = browserQaRecords.matrix.reduce((sum, item) => sum + item.routes.length, 0)
  const pendingItems = browserQaRecords.matrix.filter((item) => item.status !== 'passed').length

  return {
    stageProgress: browserQaExecutionContract.stageProgress,
    viewports: browserQaExecutionContract.requiredViewports.length,
    requiredRoutes: browserQaExecutionContract.requiredRoutes.length,
    interactionFocus: browserQaExecutionContract.requiredInteractionFocus.length,
    matrixItems,
    routeChecks,
    pendingItems,
    defects: realValidationDefectRegister.defects.length,
  }
}
