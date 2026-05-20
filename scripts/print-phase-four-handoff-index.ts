import phaseFourHandoffIndex from '../data/phase-four-handoff-index.json'

function main() {
  console.log(`${phaseFourHandoffIndex.name}`)
  console.log(`stageProgress=${phaseFourHandoffIndex.stageProgress}`)
  console.log(`stageStatus=${phaseFourHandoffIndex.stageStatus.length}`)
  console.log(`keyDocuments=${phaseFourHandoffIndex.keyDocuments.length}`)
  console.log(`keyCommands=${phaseFourHandoffIndex.keyCommands.length}`)
  console.log(`openEvidence=${phaseFourHandoffIndex.openEvidence.length}`)
}

main()
