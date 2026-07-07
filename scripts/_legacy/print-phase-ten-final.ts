import phaseElevenEntryGate from '../data/release/phase-eleven-entry-gate.json'
import phaseTenIntelligentOpsFinalReport from '../data/release/phase-ten-intelligent-ops-final-report.json'

function main() {
  console.log(`${phaseTenIntelligentOpsFinalReport.name}`)
  console.log(`stageProgress=${phaseTenIntelligentOpsFinalReport.stageProgress}`)
  console.log(`decision=${phaseTenIntelligentOpsFinalReport.decision}`)
  console.log(`releaseDecision=${phaseTenIntelligentOpsFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseTenIntelligentOpsFinalReport.productionDecision}`)
  console.log(`intelligentOpsDecision=${phaseTenIntelligentOpsFinalReport.intelligentOpsDecision}`)
  console.log(`completedBatches=${phaseTenIntelligentOpsFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseTenIntelligentOpsFinalReport.completedCapabilities.length}`)
  console.log(`phaseElevenEntryDecision=${phaseTenIntelligentOpsFinalReport.phaseElevenEntryDecision}`)
  console.log(`phaseElevenFocus=${phaseElevenEntryGate.phaseElevenCandidateFocus.length}`)
}

main()
