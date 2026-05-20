import defectExecutionQueue from '../../data/defect-execution-queue.json'
import defectExecutionQueueContract from '../../data/defect-execution-queue-contract.json'
import realValidationDefectRegister from '../../data/real-validation-defect-register.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getDefectExecutionQueueContract() {
  return defectExecutionQueueContract
}

export function getDefectExecutionSummary() {
  return {
    stageProgress: defectExecutionQueueContract.stageProgress,
    sources: defectExecutionQueueContract.sources.length,
    severity: defectExecutionQueueContract.severity.length,
    allowedStatuses: defectExecutionQueueContract.allowedStatuses.length,
    queueItems: defectExecutionQueue.items.length,
    validationDefects: realValidationDefectRegister.defects.length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
    queueStatus: defectExecutionQueue.status,
  }
}

export function getDefectExecutionQueueItems() {
  return defectExecutionQueue.items
}
