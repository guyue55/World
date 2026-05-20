import phaseFourEntryGate from '../data/phase-four-entry-gate.json'

function main() {
  console.log(`${phaseFourEntryGate.name}`)
  console.log(`stageProgress=${phaseFourEntryGate.stageProgress}`)
  console.log(`structureEntryConditions=${phaseFourEntryGate.structureEntryConditions.length}`)
  console.log(`realEvidenceBlockers=${phaseFourEntryGate.realEvidenceBlockers.length}`)
  console.log(`entryDecision=${phaseFourEntryGate.entryDecision}`)
}

main()
