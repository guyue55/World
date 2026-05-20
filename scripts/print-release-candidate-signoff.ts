import releaseCandidateSignoffContract from '../data/release/release-candidate-signoff-contract.json'
import releaseCandidateSignoffRecord from '../data/release/release-candidate-signoff-record.json'

function main() {
  console.log(`${releaseCandidateSignoffContract.name}`)
  console.log(`stageProgress=${releaseCandidateSignoffContract.stageProgress}`)
  console.log(`checklist=${releaseCandidateSignoffContract.checklist.length}`)
  console.log(`required=${releaseCandidateSignoffContract.checklist.filter((item) => item.required).length}`)
  console.log(`recordStatus=${releaseCandidateSignoffRecord.status}`)
  console.log(`releaseDecision=${releaseCandidateSignoffRecord.releaseDecision}`)
}

main()
