import phaseThreeIntegrationFinalReport from '../data/phase-three-integration-final-report.json'
import phaseThreeIntegrationReadiness from '../data/phase-three-integration-readiness.json'

function main() {
  console.log(`${phaseThreeIntegrationFinalReport.name}`)
  console.log(`stageProgress=${phaseThreeIntegrationFinalReport.stageProgress}`)
  console.log(`decision=${phaseThreeIntegrationFinalReport.decision}`)
  console.log(`releaseDecision=${phaseThreeIntegrationFinalReport.releaseDecision}`)
  console.log(`completedBatches=${phaseThreeIntegrationFinalReport.completedBatches.length}`)
  console.log(`integratedRoutes=${phaseThreeIntegrationFinalReport.integratedRoutes.length}`)
  console.log(`readinessItems=${phaseThreeIntegrationReadiness.items.length}`)
}

main()
