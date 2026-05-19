import stageCompletionTransitionGuard from '../../data/stage-completion-transition-guard.json'
import stageCompletionCertificateTemplate from '../../data/stage-completion-certificate-template.json'

export function getStageCompletionTransitionGuard() {
  return stageCompletionTransitionGuard
}

export function getStageCompletionCertificateTemplate() {
  return stageCompletionCertificateTemplate
}

export function canApplyStageCompletion(input: {
  decision: string
  blockingDefects: number
  previewUrlRecorded: boolean
  manualQaPassed: boolean
  performancePassed: boolean
}) {
  return (
    input.decision === 'complete' &&
    input.blockingDefects === 0 &&
    input.previewUrlRecorded &&
    input.manualQaPassed &&
    input.performancePassed
  )
}
