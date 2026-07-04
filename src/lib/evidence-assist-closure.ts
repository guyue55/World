import realEvidenceExecutionAssistFinalReport from '../../data/release/real-evidence-execution-assist-final-report.json'
import realEvidenceExecutionAssistReadiness from '../../data/release/real-evidence-execution-assist-readiness.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getEvidenceAssistFinalReport() {
  return realEvidenceExecutionAssistFinalReport
}

export function getEvidenceAssistReadiness() {
  return realEvidenceExecutionAssistReadiness
}

export function getEvidenceAssistClosureSummary() {
  return {
    stageProgress: realEvidenceExecutionAssistFinalReport.stageProgress,
    completedBatches: realEvidenceExecutionAssistFinalReport.completedBatches.length,
    preparedCommands: realEvidenceExecutionAssistFinalReport.preparedCommands.length,
    remainingRealActions: realEvidenceExecutionAssistFinalReport.remainingRealActions.length,
    readinessItems: realEvidenceExecutionAssistReadiness.items.length,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
    releaseDecision: realEvidenceExecutionAssistFinalReport.releaseDecision,
  }
}
