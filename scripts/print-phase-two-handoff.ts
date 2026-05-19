import phaseTwoHandoffContract from '../data/phase-two-handoff-contract.json'
import foundationFreezeManifest from '../data/foundation-freeze-manifest.json'
import phaseTwoBacklogSeed from '../data/phase-two-backlog-seed.json'

function main() {
  console.log(`${phaseTwoHandoffContract.name}`)
  console.log(`status=${phaseTwoHandoffContract.status}`)
  console.log(`frozen=${phaseTwoHandoffContract.frozenAfterStageOne.length}`)
  console.log(`freezeItems=${foundationFreezeManifest.items.length}`)
  console.log(`backlogItems=${phaseTwoBacklogSeed.items.length}`)
}

main()
