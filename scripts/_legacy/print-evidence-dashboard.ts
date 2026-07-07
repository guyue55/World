import evidenceDashboardContract from '../data/release/evidence-dashboard-contract.json'
import releaseReadyEvidenceMatrix from '../data/release/release-ready-evidence-matrix.json'

function main() {
  console.log(`${evidenceDashboardContract.name}`)
  console.log(`stageProgress=${evidenceDashboardContract.stageProgress}`)
  console.log(`route=${evidenceDashboardContract.route}`)
  console.log(`sections=${evidenceDashboardContract.sections.length}`)
  console.log(`matrixItems=${releaseReadyEvidenceMatrix.items.length}`)
  console.log(`matrixStatus=${releaseReadyEvidenceMatrix.status}`)
}

main()
