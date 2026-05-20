import phaseThreePlanningCharter from '../../data/phase-three-planning-charter.json'
import phaseThreeArchitectureContract from '../../data/phase-three-architecture-contract.json'
import phaseThreeRoadmap from '../../data/phase-three-roadmap.json'
import releasePreparationFinalReport from '../../data/release-preparation-final-report.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getPhaseThreePlanningCharter() {
  return phaseThreePlanningCharter
}

export function getPhaseThreeArchitectureContract() {
  return phaseThreeArchitectureContract
}

export function getPhaseThreeRoadmap() {
  return phaseThreeRoadmap
}

export function getPhaseThreePlanningSummary() {
  return {
    stageProgress: phaseThreePlanningCharter.stageProgress,
    tracks: phaseThreePlanningCharter.tracks.length,
    goals: phaseThreePlanningCharter.goals.length,
    nonGoals: phaseThreePlanningCharter.nonGoals.length,
    architectureLayers: phaseThreeArchitectureContract.layers.length,
    roadmapBatches: phaseThreeRoadmap.batches.length,
    releaseDecision: releasePreparationFinalReport.releaseDecision,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
