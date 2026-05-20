import realExecutionLandingFinalReport from '../data/real-execution-landing-final-report.json'
import realExecutionLandingReadiness from '../data/real-execution-landing-readiness.json'

function main() {
  console.log(`${realExecutionLandingFinalReport.name}`)
  console.log(`stageProgress=${realExecutionLandingFinalReport.stageProgress}`)
  console.log(`decision=${realExecutionLandingFinalReport.decision}`)
  console.log(`releaseDecision=${realExecutionLandingFinalReport.releaseDecision}`)
  console.log(`completedBatches=${realExecutionLandingFinalReport.completedBatches.length}`)
  console.log(`readinessItems=${realExecutionLandingReadiness.items.length}`)
  console.log(`readinessStatus=${realExecutionLandingReadiness.status}`)
}

main()
