import phaseThreePlanningCharter from '../data/phase-three-planning-charter.json'
import phaseThreeArchitectureContract from '../data/phase-three-architecture-contract.json'
import phaseThreeRoadmap from '../data/phase-three-roadmap.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

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
