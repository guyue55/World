import phaseThreeImplementationFinalReport from '../data/phase-three-implementation-final-report.json'
import phaseThreeImplementationRoutes from '../data/phase-three-implementation-routes.json'

function main() {
  console.log(`${phaseThreeImplementationFinalReport.name}`)
  console.log(`stageProgress=${phaseThreeImplementationFinalReport.stageProgress}`)
  console.log(`decision=${phaseThreeImplementationFinalReport.decision}`)
  console.log(`releaseDecision=${phaseThreeImplementationFinalReport.releaseDecision}`)
  console.log(`routes=${phaseThreeImplementationRoutes.routes.length}`)
  console.log(`batches=${phaseThreeImplementationFinalReport.implementedBatches.length}`)
}

main()
