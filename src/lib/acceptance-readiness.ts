import acceptanceReadinessContract from '../../data/release/acceptance-readiness-contract.json'
import lintExecutionReadiness from '../../data/release/lint-execution-readiness.json'
import phaseTwoExperienceAcceptanceChecklist from '../../data/domains/experience/phase-two-experience-acceptance-checklist.json'
import stageCompletionGate from '../../data/release/stage-completion-gate.json'

export function getAcceptanceReadinessContract() {
  return acceptanceReadinessContract
}

export function getLintExecutionReadiness() {
  return lintExecutionReadiness
}

export function getPhaseTwoExperienceAcceptanceChecklist() {
  return phaseTwoExperienceAcceptanceChecklist
}

export function getAcceptanceReadinessSummary() {
  const pendingRoutes = phaseTwoExperienceAcceptanceChecklist.routes.filter((route) => route.status !== 'passed').length
  const externalGates = stageCompletionGate.completionGates.filter((gate) => gate.status === 'external-required').length

  return {
    lintStatus: lintExecutionReadiness.currentStatus,
    pendingRoutes,
    executionGroups: acceptanceReadinessContract.executionGroups.length,
    externalGates,
    stageOneStatus: stageCompletionGate.currentStatus,
  }
}
