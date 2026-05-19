import phaseTwoHandoffContract from '../../data/phase-two-handoff-contract.json'
import foundationFreezeManifest from '../../data/foundation-freeze-manifest.json'
import phaseTwoBacklogSeed from '../../data/phase-two-backlog-seed.json'

export function getPhaseTwoHandoffContract() {
  return phaseTwoHandoffContract
}

export function getFoundationFreezeManifest() {
  return foundationFreezeManifest
}

export function getPhaseTwoBacklogSeed() {
  return phaseTwoBacklogSeed
}

export function canActivatePhaseTwo(input: {
  stageComplete: boolean
  completionCertificateExists: boolean
  finalClosureComplete: boolean
}) {
  return input.stageComplete && input.completionCertificateExists && input.finalClosureComplete
}
