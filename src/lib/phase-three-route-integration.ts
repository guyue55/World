import phaseThreeRouteIntegrationContract from '../../data/phase-three-route-integration-contract.json'
import phaseThreeImplementationRoutes from '../../data/phase-three-implementation-routes.json'
import releasePreparationFinalReport from '../../data/release-preparation-final-report.json'

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
