import realEvidenceCaptureContract from '../data/release/real-evidence-capture-contract.json'
import realEvidenceCaptureRecord from '../data/release/real-evidence-capture-record.json'

function main() {
  console.log(`${realEvidenceCaptureContract.name}`)
  console.log(`stageProgress=${realEvidenceCaptureContract.stageProgress}`)
  console.log(`commands=${realEvidenceCaptureContract.commands.length}`)
  console.log(`recordStatus=${realEvidenceCaptureRecord.status}`)
  console.log(`output=${realEvidenceCaptureContract.output}`)
}

main()
