import releaseCandidateFreezeContract from '../data/release-candidate-freeze-contract.json'
import releaseCandidateFreezeRecord from '../data/release-candidate-freeze-record.json'

function main() {
  console.log(`${releaseCandidateFreezeContract.name}`)
  console.log(`stageProgress=${releaseCandidateFreezeContract.stageProgress}`)
  console.log(`candidateId=${releaseCandidateFreezeRecord.candidateId}`)
  console.log(`freezeScope=${releaseCandidateFreezeContract.freezeScope.length}`)
  console.log(`allowedChanges=${releaseCandidateFreezeContract.allowedChanges.length}`)
  console.log(`forbiddenChanges=${releaseCandidateFreezeContract.forbiddenChanges.length}`)
  console.log(`releaseDecision=${releaseCandidateFreezeRecord.releaseDecision}`)
}

main()
