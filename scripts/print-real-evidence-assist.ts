import realEvidenceExecutionAssistFinalReport from '../data/release/real-evidence-execution-assist-final-report.json'
import realEvidenceExecutionAssistReadiness from '../data/release/real-evidence-execution-assist-readiness.json'

function main() {
  console.log(`${realEvidenceExecutionAssistFinalReport.name}`)
  console.log(`stageProgress=${realEvidenceExecutionAssistFinalReport.stageProgress}`)
  console.log(`decision=${realEvidenceExecutionAssistFinalReport.decision}`)
  console.log(`releaseDecision=${realEvidenceExecutionAssistFinalReport.releaseDecision}`)
  console.log(`completedBatches=${realEvidenceExecutionAssistFinalReport.completedBatches.length}`)
  console.log(`readinessItems=${realEvidenceExecutionAssistReadiness.items.length}`)
  console.log(`readinessStatus=${realEvidenceExecutionAssistReadiness.status}`)
}

main()
