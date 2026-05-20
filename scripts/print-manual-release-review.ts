import manualReleaseReviewContract from '../data/manual-release-review-contract.json'
import manualReleaseReviewRecord from '../data/manual-release-review-record.json'

function main() {
  console.log(`${manualReleaseReviewContract.name}`)
  console.log(`stageProgress=${manualReleaseReviewContract.stageProgress}`)
  console.log(`checklist=${manualReleaseReviewContract.checklist.length}`)
  console.log(`required=${manualReleaseReviewContract.checklist.filter((item) => item.required).length}`)
  console.log(`recordStatus=${manualReleaseReviewRecord.status}`)
}

main()
