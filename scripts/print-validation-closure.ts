import realValidationFinalReport from '../data/release/real-validation-final-report.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function main() {
  console.log(`${realValidationFinalReport.name}`)
  console.log(`stageProgress=${realValidationFinalReport.stageProgress}`)
  console.log(`decision=${realValidationFinalReport.decision}`)
  console.log(`releaseDecision=${realValidationFinalReport.releaseDecision}`)
  console.log(`pendingRerunSteps=${realValidationFinalReport.summary.pendingRerunSteps}`)
  console.log(`pendingBrowserQaItems=${realValidationFinalReport.summary.pendingBrowserQaItems}`)
  console.log(`pendingPreviewRoutes=${realValidationFinalReport.summary.pendingPreviewRoutes}`)
  console.log(`pendingPerformanceRoutes=${realValidationFinalReport.summary.pendingPerformanceRoutes}`)
  console.log(`releaseBlockers=${releaseBlockerRegister.blockers.length}`)
}

main()
