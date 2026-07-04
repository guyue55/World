import releaseCandidateAcceptanceFinalReport from '../data/release/release-candidate-acceptance-final-report.json'
import releaseCandidateAcceptanceReadiness from '../data/release/release-candidate-acceptance-readiness.json'

function main() {
  console.log(`${releaseCandidateAcceptanceFinalReport.name}`)
  console.log(`stageProgress=${releaseCandidateAcceptanceFinalReport.stageProgress}`)
  console.log(`decision=${releaseCandidateAcceptanceFinalReport.decision}`)
  console.log(`releaseDecision=${releaseCandidateAcceptanceFinalReport.releaseDecision}`)
  console.log(`completedBatches=${releaseCandidateAcceptanceFinalReport.completedBatches.length}`)
  console.log(`readinessItems=${releaseCandidateAcceptanceReadiness.items.length}`)
  console.log(`readinessStatus=${releaseCandidateAcceptanceReadiness.status}`)
}

main()
