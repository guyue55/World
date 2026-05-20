import realValidationFinalReport from '../../data/real-validation-final-report.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getRealValidationFinalReport() {
  return realValidationFinalReport
}

export function getReleaseBlockerRegister() {
  return releaseBlockerRegister
}

export function getValidationClosureSummary() {
  return {
    decision: realValidationFinalReport.decision,
    releaseDecision: realValidationFinalReport.releaseDecision,
    pendingRerunSteps: realValidationFinalReport.summary.pendingRerunSteps,
    pendingBrowserQaItems: realValidationFinalReport.summary.pendingBrowserQaItems,
    pendingPreviewRoutes: realValidationFinalReport.summary.pendingPreviewRoutes,
    pendingPerformanceRoutes: realValidationFinalReport.summary.pendingPerformanceRoutes,
    blockers: releaseBlockerRegister.blockers.length,
  }
}
