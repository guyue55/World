import releaseHandoffPackageContract from '../data/release/release-handoff-package-contract.json'

function main() {
  console.log(`${releaseHandoffPackageContract.name}`)
  console.log(`stageProgress=${releaseHandoffPackageContract.stageProgress}`)
  console.log(`documents=${releaseHandoffPackageContract.requiredDocuments.length}`)
  console.log(`reports=${releaseHandoffPackageContract.requiredReports.length}`)
  console.log(`commands=${releaseHandoffPackageContract.requiredCommands.length}`)
  console.log(`risks=${releaseHandoffPackageContract.handoffRisks.length}`)
}

main()
