import manualSignoffPreparationChecklist from '../../data/manual-signoff-preparation-checklist.json'
import realExecutionBlockerLedger from '../../data/real-execution-blocker-ledger.json'
import realExecutionQueue from '../../data/real-execution-queue.json'
import realExecutionResultSummary from '../../data/real-execution-result-summary.json'
import releaseReadinessTransitionGate from '../../data/release-readiness-transition-gate.json'

export function getRealExecutionQueue() {
  return realExecutionQueue
}

export function getRealExecutionBlockerLedger() {
  return realExecutionBlockerLedger
}

export function getRealExecutionResultSummary() {
  return realExecutionResultSummary
}

export function getManualSignoffPreparationChecklist() {
  return manualSignoffPreparationChecklist
}

export function getReleaseReadinessTransitionGateForSprint() {
  return releaseReadinessTransitionGate
}

export function getPhaseFourteenEvidenceSummary() {
  return {
    stageProgress: realExecutionResultSummary.stageProgress,
    realExecutionPassed: realExecutionResultSummary.realExecutionPassed,
    executionItems: realExecutionQueue.items.length,
    blockers: realExecutionBlockerLedger.blockers.length,
    manualSignoffReady: manualSignoffPreparationChecklist.manualSignoffReady,
    signoffItems: manualSignoffPreparationChecklist.items.length,
    releaseReady: releaseReadinessTransitionGate.releaseReady,
    transitionAllowed: releaseReadinessTransitionGate.transitionAllowed,
  }
}
