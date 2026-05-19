import finalClosureReportContract from '../../data/final-closure-report-contract.json'
import phaseOneFinalDecisionTemplate from '../../data/phase-one-final-decision-template.json'

export function getFinalClosureReportContract() {
  return finalClosureReportContract
}

export function getPhaseOneFinalDecisionTemplate() {
  return phaseOneFinalDecisionTemplate
}

export function canMarkPhaseOneComplete(input: {
  commandPassed: boolean
  previewPassed: boolean
  previewUrlRecorded: boolean
  blockingDefects: number
  manualQaPassed: boolean
  performancePassed: boolean
}) {
  return (
    input.commandPassed &&
    input.previewPassed &&
    input.previewUrlRecorded &&
    input.blockingDefects === 0 &&
    input.manualQaPassed &&
    input.performancePassed
  )
}
