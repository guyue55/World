import aiSuggestionProtocol from '../../data/ai-suggestion-protocol.json'
import aiWorkbenchImplementationContract from '../../data/ai-workbench-implementation-contract.json'
import aiWorkbenchSuggestions from '../../data/ai-workbench-suggestions.json'
import phaseThreeAiSafetyGate from '../../data/phase-three-ai-safety-gate.json'

export function getAiWorkbenchImplementationContract() {
  return aiWorkbenchImplementationContract
}

export function getAiWorkbenchSuggestions() {
  return aiWorkbenchSuggestions.suggestions
}

export function getAiWorkbenchSummary() {
  return {
    stageProgress: aiWorkbenchImplementationContract.stageProgress,
    route: aiWorkbenchImplementationContract.route,
    suggestions: aiWorkbenchSuggestions.suggestions.length,
    draftSuggestions: aiWorkbenchSuggestions.suggestions.filter((item) => item.status === 'draft').length,
    highRiskSuggestions: aiWorkbenchSuggestions.suggestions.filter((item) => item.risk === 'high').length,
    protocolStatuses: aiSuggestionProtocol.allowedStatuses.length,
    safetyChecks: phaseThreeAiSafetyGate.checks.length,
  }
}
