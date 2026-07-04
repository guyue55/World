import manualSignoffPreparationChecklist from '../../data/release/manual-signoff-preparation-checklist.json'
import realExecutionBlockerLedger from '../../data/release/real-execution-blocker-ledger.json'
import realExecutionQueue from '../../data/engineering/real-execution-queue.json'
import realExecutionResultSummary from '../../data/engineering/real-execution-result-summary.json'
import releaseReadinessTransitionGate from '../../data/release/release-readiness-transition-gate.json'

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
