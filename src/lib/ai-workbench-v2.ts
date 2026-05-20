import aiPermissionMatrix from '../../data/domains/ai/ai-permission-matrix.json'
import aiReadableProtocol from '../../data/domains/ai/ai-readable-protocol.json'
import aiSuggestionAuditContract from '../../data/domains/ai/ai-suggestion-audit-contract.json'
import aiSuggestionAuditQueue from '../../data/domains/ai/ai-suggestion-audit-queue.json'

export function getAiReadableProtocol() {
  return aiReadableProtocol
}

export function getAiPermissionMatrix() {
  return aiPermissionMatrix
}

export function getAiSuggestionAuditContract() {
  return aiSuggestionAuditContract
}

export function getAiSuggestionAuditQueue() {
  return aiSuggestionAuditQueue.items
}

export function getAiWorkbenchV2Summary() {
  const queue = aiSuggestionAuditQueue.items

  return {
    stageProgress: aiSuggestionAuditContract.stageProgress,
    readableTiers: aiReadableProtocol.readableTiers.length,
    forbiddenTiers: aiReadableProtocol.forbiddenTiers.length,
    suggestionTypes: aiSuggestionAuditContract.suggestionTypes.length,
    queuedSuggestions: queue.length,
    executedSuggestions: queue.filter((item) => item.execution !== 'not-executed').length,
    humanRequired: queue.filter((item) => item.requiredHumanAction).length,
  }
}
