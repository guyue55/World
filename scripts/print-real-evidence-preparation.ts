import realEvidencePreparationFinalReport from '../data/release/real-evidence-preparation-final-report.json'
import releaseReadyEvidenceMatrix from '../data/release/release-ready-evidence-matrix.json'

function main() {
  console.log(`${realEvidencePreparationFinalReport.name}`)
  console.log(`stageProgress=${realEvidencePreparationFinalReport.stageProgress}`)
  console.log(`decision=${realEvidencePreparationFinalReport.decision}`)
  console.log(`releaseDecision=${realEvidencePreparationFinalReport.releaseDecision}`)
  console.log(`completedBatches=${realEvidencePreparationFinalReport.completedBatches.length}`)
  console.log(`evidenceItems=${releaseReadyEvidenceMatrix.items.length}`)
  console.log(`matrixStatus=${releaseReadyEvidenceMatrix.status}`)
}

main()
