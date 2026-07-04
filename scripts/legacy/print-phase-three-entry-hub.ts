import phaseThreeEntryHubContract from '../data/core/phase-three-entry-hub-contract.json'

function main() {
  console.log(`${phaseThreeEntryHubContract.name}`)
  console.log(`stageProgress=${phaseThreeEntryHubContract.stageProgress}`)
  console.log(`route=${phaseThreeEntryHubContract.route}`)
  console.log(`entries=${phaseThreeEntryHubContract.entries.length}`)
  console.log(`warnings=${phaseThreeEntryHubContract.warnings.length}`)
}

main()
