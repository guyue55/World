import releaseCandidateAcceptanceScannerContract from '../data/release-candidate-acceptance-scanner-contract.json'

function main() {
  console.log(`${releaseCandidateAcceptanceScannerContract.name}`)
  console.log(`stageProgress=${releaseCandidateAcceptanceScannerContract.stageProgress}`)
  console.log(`inputManifest=${releaseCandidateAcceptanceScannerContract.inputManifest}`)
  console.log(`output=${releaseCandidateAcceptanceScannerContract.output}`)
  console.log(`statusRules=${releaseCandidateAcceptanceScannerContract.statusRules.length}`)
}

main()
