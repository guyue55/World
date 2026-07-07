import phaseEightProductionFinalReport from '../data/release/phase-eight-production-final-report.json'
import phaseNineEntryGate from '../data/release/phase-nine-entry-gate.json'

function main() {
  console.log(`${phaseEightProductionFinalReport.name}`)
  console.log(`stageProgress=${phaseEightProductionFinalReport.stageProgress}`)
  console.log(`decision=${phaseEightProductionFinalReport.decision}`)
  console.log(`releaseDecision=${phaseEightProductionFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseEightProductionFinalReport.productionDecision}`)
  console.log(`completedBatches=${phaseEightProductionFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseEightProductionFinalReport.completedCapabilities.length}`)
  console.log(`phaseNineEntryDecision=${phaseEightProductionFinalReport.phaseNineEntryDecision}`)
  console.log(`phaseNineFocus=${phaseNineEntryGate.phaseNineCandidateFocus.length}`)
}

main()
