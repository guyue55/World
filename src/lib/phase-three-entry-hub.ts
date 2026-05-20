import phaseThreeEntryHubContract from '../../data/phase-three-entry-hub-contract.json'
import phaseThreeImplementationFinalReport from '../../data/phase-three-implementation-final-report.json'
import releasePreparationFinalReport from '../../data/release-preparation-final-report.json'

export function getPhaseThreeEntryHubContract() {
  return phaseThreeEntryHubContract
}

export function getPhaseThreeEntryHubSummary() {
  return {
    stageProgress: phaseThreeEntryHubContract.stageProgress,
    route: phaseThreeEntryHubContract.route,
    entries: phaseThreeEntryHubContract.entries.length,
    warnings: phaseThreeEntryHubContract.warnings.length,
    implementedRoutes: phaseThreeImplementationFinalReport.implementedRoutes.length,
    releaseDecision: releasePreparationFinalReport.releaseDecision,
  }
}
