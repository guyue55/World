import phaseSevenEntryGate from '../data/phase-seven-entry-gate.json'
import phaseSixAiFinalReport from '../data/phase-six-ai-final-report.json'

function main() {
  console.log(`${phaseSixAiFinalReport.name}`)
  console.log(`stageProgress=${phaseSixAiFinalReport.stageProgress}`)
  console.log(`decision=${phaseSixAiFinalReport.decision}`)
  console.log(`releaseDecision=${phaseSixAiFinalReport.releaseDecision}`)
  console.log(`completedBatches=${phaseSixAiFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseSixAiFinalReport.completedCapabilities.length}`)
  console.log(`phaseSevenEntryDecision=${phaseSixAiFinalReport.phaseSevenEntryDecision}`)
  console.log(`phaseSevenFocus=${phaseSevenEntryGate.phaseSevenCandidateFocus.length}`)
}

main()
