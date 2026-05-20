import phaseFivePrivateFinalReport from '../data/phase-five-private-final-report.json'
import phaseSixEntryGate from '../data/phase-six-entry-gate.json'

function main() {
  console.log(`${phaseFivePrivateFinalReport.name}`)
  console.log(`stageProgress=${phaseFivePrivateFinalReport.stageProgress}`)
  console.log(`decision=${phaseFivePrivateFinalReport.decision}`)
  console.log(`releaseDecision=${phaseFivePrivateFinalReport.releaseDecision}`)
  console.log(`completedBatches=${phaseFivePrivateFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseFivePrivateFinalReport.completedCapabilities.length}`)
  console.log(`phaseSixEntryDecision=${phaseFivePrivateFinalReport.phaseSixEntryDecision}`)
  console.log(`phaseSixCandidateFocus=${phaseSixEntryGate.phaseSixCandidateFocus.length}`)
}

main()
