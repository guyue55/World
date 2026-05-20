import releaseDryRunHandoffFinalReport from '../data/release-dry-run-handoff-final-report.json'
import releaseDryRunHandoffReadiness from '../data/release-dry-run-handoff-readiness.json'

function main() {
  console.log(`${releaseDryRunHandoffFinalReport.name}`)
  console.log(`stageProgress=${releaseDryRunHandoffFinalReport.stageProgress}`)
  console.log(`decision=${releaseDryRunHandoffFinalReport.decision}`)
  console.log(`releaseDecision=${releaseDryRunHandoffFinalReport.releaseDecision}`)
  console.log(`completedBatches=${releaseDryRunHandoffFinalReport.completedBatches.length}`)
  console.log(`readinessItems=${releaseDryRunHandoffReadiness.items.length}`)
  console.log(`readinessStatus=${releaseDryRunHandoffReadiness.status}`)
}

main()
