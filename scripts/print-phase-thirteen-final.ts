import phaseFourteenEntryGate from '../data/phase-fourteen-entry-gate.json'
import phaseThirteenHardeningFinalReport from '../data/phase-thirteen-hardening-final-report.json'

function main() {
  console.log(`${phaseThirteenHardeningFinalReport.name}`)
  console.log(`stageProgress=${phaseThirteenHardeningFinalReport.stageProgress}`)
  console.log(`decision=${phaseThirteenHardeningFinalReport.decision}`)
  console.log(`releaseDecision=${phaseThirteenHardeningFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseThirteenHardeningFinalReport.productionDecision}`)
  console.log(`hardeningDecision=${phaseThirteenHardeningFinalReport.hardeningDecision}`)
  console.log(`completedBatches=${phaseThirteenHardeningFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseThirteenHardeningFinalReport.completedCapabilities.length}`)
  console.log(`phaseFourteenEntryDecision=${phaseThirteenHardeningFinalReport.phaseFourteenEntryDecision}`)
  console.log(`phaseFourteenFocus=${phaseFourteenEntryGate.phaseFourteenCandidateFocus.length}`)
}

main()
