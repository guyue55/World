import releaseCandidateFreezeFinalReport from '../data/release/release-candidate-freeze-final-report.json'
import releaseCandidateFreezeReadiness from '../data/release/release-candidate-freeze-readiness.json'

function main() {
  console.log(`${releaseCandidateFreezeFinalReport.name}`)
  console.log(`stageProgress=${releaseCandidateFreezeFinalReport.stageProgress}`)
  console.log(`candidateId=${releaseCandidateFreezeFinalReport.candidateId}`)
  console.log(`decision=${releaseCandidateFreezeFinalReport.decision}`)
  console.log(`releaseDecision=${releaseCandidateFreezeFinalReport.releaseDecision}`)
  console.log(`completedBatches=${releaseCandidateFreezeFinalReport.completedBatches.length}`)
  console.log(`readinessItems=${releaseCandidateFreezeReadiness.items.length}`)
  console.log(`readinessStatus=${releaseCandidateFreezeReadiness.status}`)
}

main()
