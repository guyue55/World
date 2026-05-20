import acceptanceReadinessContract from '../../data/acceptance-readiness-contract.json'
import lintExecutionReadiness from '../../data/lint-execution-readiness.json'
import phaseTwoExperienceAcceptanceChecklist from '../../data/phase-two-experience-acceptance-checklist.json'
import stageCompletionGate from '../../data/stage-completion-gate.json'

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
