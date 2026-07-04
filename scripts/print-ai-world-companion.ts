import aiPathExhibitionRecommendations from '../data/domains/ai/ai-path-exhibition-recommendations.json'
import aiWorldCompanionPlan from '../data/domains/ai/ai-world-companion-plan.json'

function main() {
  console.log(`${aiWorldCompanionPlan.name}`)
  console.log(`stageProgress=${aiWorldCompanionPlan.stageProgress}`)
  console.log(`capabilities=${aiWorldCompanionPlan.capabilities.length}`)
  console.log(`maintenanceChecks=${aiWorldCompanionPlan.maintenanceChecks.length}`)
  console.log(`recommendations=${aiPathExhibitionRecommendations.recommendations.length}`)
  console.log(`executed=${aiPathExhibitionRecommendations.recommendations.filter((item) => item.execution !== 'not-executed').length}`)
}

main()
