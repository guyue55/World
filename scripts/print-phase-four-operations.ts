import phaseFiveHandoffPreparation from '../data/phase-five-handoff-preparation.json'
import phaseFourOperationsBoard from '../data/phase-four-operations-board.json'

function main() {
  console.log(`${phaseFourOperationsBoard.name}`)
  console.log(`stageProgress=${phaseFourOperationsBoard.stageProgress}`)
  console.log(`lanes=${phaseFourOperationsBoard.lanes.length}`)
  console.log(`metrics=${phaseFourOperationsBoard.metrics.length}`)
  console.log(`phaseFiveFocus=${phaseFiveHandoffPreparation.phaseFiveCandidateFocus.length}`)
}

main()
