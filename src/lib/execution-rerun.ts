import realExecutionRerunContract from '../../data/engineering/real-execution-rerun-contract.json'
import realExecutionRerunRecord from '../../data/engineering/real-execution-rerun-record.json'
import lintExecutionReadiness from '../../data/release/lint-execution-readiness.json'

export function getRealExecutionRerunContract() {
  return realExecutionRerunContract
}

export function getRealExecutionRerunRecord() {
  return realExecutionRerunRecord
}

export function getRealExecutionRerunSummary() {
  const pending = realExecutionRerunRecord.runs.filter((run) => run.status === 'pending').length
  const passed = realExecutionRerunRecord.runs.filter((run) => run.status === 'passed').length
  const failed = realExecutionRerunRecord.runs.filter((run) => run.status === 'failed').length

  return {
    stageProgress: realExecutionRerunContract.stageProgress,
    stepCount: realExecutionRerunContract.steps.length,
    pending,
    passed,
    failed,
    lintStatus: lintExecutionReadiness.currentStatus,
  }
}
