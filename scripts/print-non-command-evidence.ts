import nonCommandEvidenceFeedbackContract from '../data/domains/content/non-command-evidence-feedback-contract.json'
import nonCommandEvidenceFeedbackRecord from '../data/domains/content/non-command-evidence-feedback-record.json'

function main() {
  console.log(`${nonCommandEvidenceFeedbackContract.name}`)
  console.log(`stageProgress=${nonCommandEvidenceFeedbackContract.stageProgress}`)
  console.log(`evidenceTypes=${nonCommandEvidenceFeedbackContract.evidenceTypes.length}`)
  console.log(`writeTargets=${nonCommandEvidenceFeedbackContract.writeTargets.length}`)
  console.log(`recordStatus=${nonCommandEvidenceFeedbackRecord.status}`)
}

main()
