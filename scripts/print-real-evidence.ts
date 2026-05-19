import {
  getBrowserQaRecords,
  getBuildFailurePlaybook,
  getPerformanceMeasurementRecords,
  getRealExecutionEvidenceLedger,
} from '../src/lib/real-evidence'

function main() {
  const ledger = getRealExecutionEvidenceLedger()
  const playbook = getBuildFailurePlaybook()
  const performance = getPerformanceMeasurementRecords()
  const browser = getBrowserQaRecords()

  console.log(`${ledger.name}`)
  console.log(`status=${ledger.status}`)
  console.log(`executionRecords=${ledger.records.length}`)
  console.log(`failureTypes=${playbook.failureTypes.length}`)
  console.log(`performanceRoutes=${performance.routes.length}`)
  console.log(`browserQaViewports=${browser.matrix.length}`)
}

main()
