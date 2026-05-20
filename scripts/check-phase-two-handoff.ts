import phaseTwoHandoffContract from '../data/release/phase-two-handoff-contract.json'
import foundationFreezeManifest from '../data/release/foundation-freeze-manifest.json'
import phaseTwoBacklogSeed from '../data/versions/archive/phase-two-backlog-seed.json'

function main() {
  const errors: string[] = []

  if (phaseTwoHandoffContract.status !== 'prepared') {
    errors.push('phase two handoff should remain prepared before stage completion')
  }

  ;['world data protocol', 'visibility boundary', 'AI boundary', 'projection contracts'].forEach((item) => {
    if (!phaseTwoHandoffContract.frozenAfterStageOne.includes(item)) {
      errors.push(`missing frozen item: ${item}`)
    }
  })

  if (foundationFreezeManifest.items.length < 7) {
    errors.push('foundation freeze manifest is too small')
  }

  if (!phaseTwoBacklogSeed.items.some((item) => item.priority === 'P0' && item.type === 'evidence')) {
    errors.push('phase two backlog must begin with evidence work')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase two handoff check passed.')
}

main()
