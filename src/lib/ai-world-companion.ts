import aiPathExhibitionRecommendations from '../../data/domains/ai/ai-path-exhibition-recommendations.json'
import aiSuggestionAuditQueue from '../../data/domains/ai/ai-suggestion-audit-queue.json'
import aiWorldCompanionPlan from '../../data/domains/ai/ai-world-companion-plan.json'

export function getAiWorldCompanionPlan() {
  return aiWorldCompanionPlan
}

export function getAiPathExhibitionRecommendations() {
  return aiPathExhibitionRecommendations.recommendations
}

export function getAiWorldCompanionSummary() {
  const recommendations = aiPathExhibitionRecommendations.recommendations

  return {
    stageProgress: aiWorldCompanionPlan.stageProgress,
    capabilities: aiWorldCompanionPlan.capabilities.length,
    maintenanceChecks: aiWorldCompanionPlan.maintenanceChecks.length,
    recommendations: recommendations.length,
    executed: recommendations.filter((item) => item.execution !== 'not-executed').length,
    needsReview: recommendations.filter((item) => item.requiresReview).length,
  }
}

export function getOwnerReviewFlowSummary() {
  const queue = aiSuggestionAuditQueue.items
  const capabilities = aiWorldCompanionPlan.capabilities
  const recommendations = aiPathExhibitionRecommendations.recommendations

  return {
    queueItems: queue.length,
    notExecuted: queue.filter((item) => item.execution === 'not-executed').length,
    humanRequired: queue.filter((item) => item.requiredHumanAction === true).length,
    suggestionOnlyCapabilities: capabilities.filter((item) => item.humanRequired === true && item.output.endsWith('-only')).length,
    reviewRequiredRecommendations: recommendations.filter((item) => item.requiresReview === true && item.execution === 'not-executed').length,
  }
}
