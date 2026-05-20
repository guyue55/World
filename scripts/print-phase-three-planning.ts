import phaseThreePlanningCharter from '../data/versions/archive/phase-three-planning-charter.json'
import phaseThreeArchitectureContract from '../data/core/phase-three-architecture-contract.json'
import phaseThreeRoadmap from '../data/versions/archive/phase-three-roadmap.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function main() {
  console.log(`${phaseThreePlanningCharter.name}`)
  console.log(`stageProgress=${phaseThreePlanningCharter.stageProgress}`)
  console.log(`status=${phaseThreePlanningCharter.status}`)
  console.log(`tracks=${phaseThreePlanningCharter.tracks.length}`)
  console.log(`architectureLayers=${phaseThreeArchitectureContract.layers.length}`)
  console.log(`roadmapBatches=${phaseThreeRoadmap.batches.length}`)
  console.log(`openReleaseBlockers=${releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length}`)
}

main()
