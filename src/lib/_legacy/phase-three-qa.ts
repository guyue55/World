import phaseThreeQaExpansionContract from '../../data/release/phase-three-qa-expansion-contract.json'
import browserQaRouteCoverage from '../../data/domains/experience/browser-qa-route-coverage.json'
import browserQaRecords from '../../data/domains/experience/browser-qa-records.json'

export function getPhaseThreeQaExpansionContract() {
  return phaseThreeQaExpansionContract
}

export function getPhaseThreeQaSummary() {
  const newRouteCoverage = phaseThreeQaExpansionContract.newRoutes.map((route) => {
    const coverage = browserQaRouteCoverage.routes.find((item) => item.route === route)
    return { route, coverageCount: coverage?.coverageCount ?? 0 }
  })

  return {
    stageProgress: phaseThreeQaExpansionContract.stageProgress,
    newRoutes: phaseThreeQaExpansionContract.newRoutes.length,
    requiredViewports: phaseThreeQaExpansionContract.requiredViewports.length,
    interactionFocus: phaseThreeQaExpansionContract.interactionFocus.length,
    matrixItems: browserQaRecords.matrix.length,
    newRouteCoverage,
  }
}
