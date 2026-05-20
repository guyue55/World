import phaseThirteenEntryGate from '../data/phase-thirteen-entry-gate.json'
import phaseTwelvePlatformFinalReport from '../data/phase-twelve-platform-final-report.json'

function main() {
  console.log(`${phaseTwelvePlatformFinalReport.name}`)
  console.log(`stageProgress=${phaseTwelvePlatformFinalReport.stageProgress}`)
  console.log(`decision=${phaseTwelvePlatformFinalReport.decision}`)
  console.log(`releaseDecision=${phaseTwelvePlatformFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseTwelvePlatformFinalReport.productionDecision}`)
  console.log(`platformDecision=${phaseTwelvePlatformFinalReport.platformDecision}`)
  console.log(`completedBatches=${phaseTwelvePlatformFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseTwelvePlatformFinalReport.completedCapabilities.length}`)
  console.log(`phaseThirteenEntryDecision=${phaseTwelvePlatformFinalReport.phaseThirteenEntryDecision}`)
  console.log(`phaseThirteenFocus=${phaseThirteenEntryGate.phaseThirteenCandidateFocus.length}`)
}

main()
