import phaseFifteenEntryGate from '../data/release/phase-fifteen-entry-gate.json'
import phaseFourteenEvidenceSprintFinalReport from '../data/release/phase-fourteen-evidence-sprint-final-report.json'
import realExecutionResultSummary from '../data/engineering/real-execution-result-summary.json'

function main() {
  console.log(`${phaseFourteenEvidenceSprintFinalReport.name}`)
  console.log(`stageProgress=${phaseFourteenEvidenceSprintFinalReport.stageProgress}`)
  console.log(`decision=${phaseFourteenEvidenceSprintFinalReport.decision}`)
  console.log(`releaseDecision=${phaseFourteenEvidenceSprintFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseFourteenEvidenceSprintFinalReport.productionDecision}`)
  console.log(`evidenceDecision=${phaseFourteenEvidenceSprintFinalReport.evidenceDecision}`)
  console.log(`completedBatches=${phaseFourteenEvidenceSprintFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseFourteenEvidenceSprintFinalReport.completedCapabilities.length}`)
  console.log(`realExecutionPassed=${realExecutionResultSummary.realExecutionPassed}`)
  console.log(`passed=${realExecutionResultSummary.passed}`)
  console.log(`blocked=${realExecutionResultSummary.blocked}`)
  console.log(`pending=${realExecutionResultSummary.pending}`)
  console.log(`phaseFifteenEntryDecision=${phaseFourteenEvidenceSprintFinalReport.phaseFifteenEntryDecision}`)
  console.log(`phaseFifteenFocus=${phaseFifteenEntryGate.phaseFifteenCandidateFocus.length}`)
}

main()
