import releaseCandidateRiskAcceptanceContract from '../data/release-candidate-risk-acceptance-contract.json'
import releaseCandidateRiskAcceptanceRecord from '../data/release-candidate-risk-acceptance-record.json'

function main() {
  console.log(`${releaseCandidateRiskAcceptanceContract.name}`)
  console.log(`stageProgress=${releaseCandidateRiskAcceptanceContract.stageProgress}`)
  console.log(`riskTypes=${releaseCandidateRiskAcceptanceContract.riskTypes.length}`)
  console.log(`nonAcceptableRisks=${releaseCandidateRiskAcceptanceContract.nonAcceptableRisks.length}`)
  console.log(`recordStatus=${releaseCandidateRiskAcceptanceRecord.status}`)
}

main()
