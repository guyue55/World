import phaseFiveEntryGate from '../data/phase-five-entry-gate.json'
import phaseFourContentOpsFinalReport from '../data/phase-four-content-ops-final-report.json'

function main() {
  console.log(`${phaseFourContentOpsFinalReport.name}`)
  console.log(`stageProgress=${phaseFourContentOpsFinalReport.stageProgress}`)
  console.log(`decision=${phaseFourContentOpsFinalReport.decision}`)
  console.log(`releaseDecision=${phaseFourContentOpsFinalReport.releaseDecision}`)
  console.log(`completedBatches=${phaseFourContentOpsFinalReport.completedBatches.length}`)
  console.log(`phaseFiveEntryDecision=${phaseFourContentOpsFinalReport.phaseFiveEntryDecision}`)
  console.log(`phaseFiveNotYetImplemented=${phaseFiveEntryGate.notYetImplemented.length}`)
}

main()
