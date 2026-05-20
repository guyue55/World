import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'
import releaseReadyMatrix from '../data/release/release-ready-matrix.json'

function main() {
  console.log(`${releasePreparationFinalReport.name}`)
  console.log(`stageProgress=${releasePreparationFinalReport.stageProgress}`)
  console.log(`decision=${releasePreparationFinalReport.decision}`)
  console.log(`releaseDecision=${releasePreparationFinalReport.releaseDecision}`)
  console.log(`completedReleasePrepBatches=${releasePreparationFinalReport.completedReleasePrepBatches.length}`)
  console.log(`readinessItems=${releaseReadyMatrix.items.length}`)
  console.log(`requiredPending=${releaseReadyMatrix.items.filter((item) => item.required && item.status !== 'passed' && item.status !== 'closed').length}`)
}

main()
