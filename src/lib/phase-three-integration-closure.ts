import phaseThreeIntegrationFinalReport from '../../data/release/phase-three-integration-final-report.json'
import phaseThreeIntegrationReadiness from '../../data/release/phase-three-integration-readiness.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getPhaseThreeIntegrationFinalReport() {
  return phaseThreeIntegrationFinalReport
}

export function getPhaseThreeIntegrationReadiness() {
  return phaseThreeIntegrationReadiness
}

export function getPhaseThreeIntegrationClosureSummary() {
  return {
    stageProgress: phaseThreeIntegrationFinalReport.stageProgress,
    completedBatches: phaseThreeIntegrationFinalReport.completedBatches.length,
    integratedRoutes: phaseThreeIntegrationFinalReport.integratedRoutes.length,
    pendingEvidence: phaseThreeIntegrationFinalReport.pendingEvidence.length,
    readinessItems: phaseThreeIntegrationReadiness.items.length,
    releaseDecision: phaseThreeIntegrationFinalReport.releaseDecision,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
