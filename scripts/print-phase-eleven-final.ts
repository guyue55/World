import phaseElevenRuntimeFinalReport from '../data/release/phase-eleven-runtime-final-report.json'
import phaseTwelveEntryGate from '../data/release/phase-twelve-entry-gate.json'

function main() {
  console.log(`${phaseElevenRuntimeFinalReport.name}`)
  console.log(`stageProgress=${phaseElevenRuntimeFinalReport.stageProgress}`)
  console.log(`decision=${phaseElevenRuntimeFinalReport.decision}`)
  console.log(`releaseDecision=${phaseElevenRuntimeFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseElevenRuntimeFinalReport.productionDecision}`)
  console.log(`runtimeDecision=${phaseElevenRuntimeFinalReport.runtimeDecision}`)
  console.log(`completedBatches=${phaseElevenRuntimeFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseElevenRuntimeFinalReport.completedCapabilities.length}`)
  console.log(`phaseTwelveEntryDecision=${phaseElevenRuntimeFinalReport.phaseTwelveEntryDecision}`)
  console.log(`phaseTwelveFocus=${phaseTwelveEntryGate.phaseTwelveCandidateFocus.length}`)
}

main()
