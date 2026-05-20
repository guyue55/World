import aiPathExhibitionRecommendations from '../../data/domains/ai/ai-path-exhibition-recommendations.json'
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
