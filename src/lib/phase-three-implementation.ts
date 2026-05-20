import phaseThreeImplementationFinalReport from '../../data/release/phase-three-implementation-final-report.json'
import phaseThreeImplementationRoutes from '../../data/domains/experience/phase-three-implementation-routes.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getPhaseThreeImplementationFinalReport() {
  return phaseThreeImplementationFinalReport
}

export function getPhaseThreeImplementationRoutes() {
  return phaseThreeImplementationRoutes
}

export function getPhaseThreeImplementationSummary() {
  return {
    stageProgress: phaseThreeImplementationFinalReport.stageProgress,
    implementedRoutes: phaseThreeImplementationFinalReport.implementedRoutes.length,
    implementedBatches: phaseThreeImplementationFinalReport.implementedBatches.length,
    preservedBoundaries: phaseThreeImplementationFinalReport.preservedBoundaries.length,
    routeRegistry: phaseThreeImplementationRoutes.routes.length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
    releaseDecision: phaseThreeImplementationFinalReport.releaseDecision,
  }
}
