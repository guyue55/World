import { getFuturePhaseSummaries } from '../src/lib/future-compatibility'

function main() {
  getFuturePhaseSummaries().forEach((phase) => {
    console.log(`${phase.id}｜${phase.name}`)
    console.log(`  extensionPoints: ${phase.allowedExtensionPoints.join(', ')}`)
    console.log(`  slots: ${phase.capabilitySlots.map((slot) => slot.id).join(', ')}`)
  })
}

main()
