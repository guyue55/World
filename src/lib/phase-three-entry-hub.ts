import phaseThreeEntryHubContract from '../../data/core/phase-three-entry-hub-contract.json'
import phaseThreeImplementationFinalReport from '../../data/release/phase-three-implementation-final-report.json'
import releasePreparationFinalReport from '../../data/release/release-preparation-final-report.json'

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
