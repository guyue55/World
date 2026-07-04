import releaseCandidateChangeBoundaryContract from '../data/release/release-candidate-change-boundary-contract.json'

function main() {
  console.log(`${releaseCandidateChangeBoundaryContract.name}`)
  console.log(`stageProgress=${releaseCandidateChangeBoundaryContract.stageProgress}`)
  console.log(`allowedPaths=${releaseCandidateChangeBoundaryContract.allowedPaths.length}`)
  console.log(`protectedPaths=${releaseCandidateChangeBoundaryContract.protectedPaths.length}`)
  console.log(`allowedReasons=${releaseCandidateChangeBoundaryContract.allowedReasons.length}`)
}

main()
