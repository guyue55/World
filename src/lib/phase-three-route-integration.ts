import phaseThreeRouteIntegrationContract from '../../data/domains/experience/phase-three-route-integration-contract.json'
import phaseThreeImplementationRoutes from '../../data/domains/experience/phase-three-implementation-routes.json'
import releasePreparationFinalReport from '../../data/release/release-preparation-final-report.json'

export function getPhaseThreeRouteIntegrationContract() {
  return phaseThreeRouteIntegrationContract
}

export function getPhaseThreeIntegratedRoutes() {
  return phaseThreeRouteIntegrationContract.routes
}

export function getPhaseThreeRouteIntegrationSummary() {
  return {
    stageProgress: phaseThreeRouteIntegrationContract.stageProgress,
    integratedRoutes: phaseThreeRouteIntegrationContract.routes.length,
    registeredRoutes: phaseThreeImplementationRoutes.routes.length,
    staticPrototypeRoutes: phaseThreeRouteIntegrationContract.routes.filter((route) => route.releaseStatus === 'static-prototype').length,
    releaseDecision: releasePreparationFinalReport.releaseDecision,
  }
}
