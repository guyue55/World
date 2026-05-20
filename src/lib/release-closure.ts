import releasePreparationFinalReport from '../../data/release-preparation-final-report.json'
import releaseReadyMatrix from '../../data/release-ready-matrix.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getReleasePreparationFinalReport() {
  return releasePreparationFinalReport
}

export function getReleaseReadyMatrix() {
  return releaseReadyMatrix
}

export function getReleaseClosureSummary() {
  return {
    decision: releasePreparationFinalReport.decision,
    releaseDecision: releasePreparationFinalReport.releaseDecision,
    completedBatches: releasePreparationFinalReport.completedReleasePrepBatches.length,
    openBlockers: releasePreparationFinalReport.summary.openBlockers,
    readinessItems: releaseReadyMatrix.items.length,
    requiredPending: releaseReadyMatrix.items.filter((item) => item.required && item.status !== 'passed' && item.status !== 'closed').length,
    blockerRegisterStatus: releaseBlockerRegister.status,
  }
}
