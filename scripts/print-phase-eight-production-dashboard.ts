import phaseEightProductionDashboard from '../data/phase-eight-production-dashboard.json'
import phaseEightProductionDeploymentChecklist from '../data/phase-eight-production-deployment-checklist.json'

function main() {
  console.log(`${phaseEightProductionDashboard.name}`)
  console.log(`stageProgress=${phaseEightProductionDashboard.stageProgress}`)
  console.log(`productionLive=${phaseEightProductionDashboard.productionLive}`)
  console.log(`cards=${phaseEightProductionDashboard.cards.length}`)
  console.log(`deploymentSteps=${phaseEightProductionDeploymentChecklist.steps.length}`)
  console.log(`pending=${phaseEightProductionDeploymentChecklist.steps.filter((item) => String(item.status).startsWith('pending')).length}`)
}

main()
