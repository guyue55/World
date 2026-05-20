import phaseTwoClosureContract from '../../data/release/phase-two-closure-contract.json'
import phaseTwoClosureReport from '../../data/release/phase-two-closure-report.json'
import lintExecutionReadiness from '../../data/release/lint-execution-readiness.json'

export function getPhaseTwoClosureContract() {
  return phaseTwoClosureContract
}

export function getPhaseTwoClosureReport() {
  return phaseTwoClosureReport
}

export function getPhaseTwoClosureSummary() {
  return {
    stageProgress: phaseTwoClosureReport.stageProgress,
    decision: phaseTwoClosureReport.decision,
    completedBatchCount: phaseTwoClosureContract.completedBatches.length,
    routeCount: phaseTwoClosureReport.summary.experienceRoutesProductized.length,
    lintStatus: lintExecutionReadiness.currentStatus,
    remainingEvidenceCount: phaseTwoClosureContract.remainingExternalEvidence.length,
  }
}
