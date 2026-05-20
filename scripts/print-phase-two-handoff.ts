import phaseTwoHandoffContract from '../data/release/phase-two-handoff-contract.json'
import foundationFreezeManifest from '../data/release/foundation-freeze-manifest.json'
import phaseTwoBacklogSeed from '../data/versions/archive/phase-two-backlog-seed.json'

function main() {
  console.log(`${phaseTwoHandoffContract.name}`)
  console.log(`status=${phaseTwoHandoffContract.status}`)
  console.log(`frozen=${phaseTwoHandoffContract.frozenAfterStageOne.length}`)
  console.log(`freezeItems=${foundationFreezeManifest.items.length}`)
  console.log(`backlogItems=${phaseTwoBacklogSeed.items.length}`)
}

main()
