import phaseSevenReleaseEvidenceLedger from '../data/phase-seven-release-evidence-ledger.json'
import phaseSevenReleaseScopeContract from '../data/phase-seven-release-scope-contract.json'

function main() {
  console.log(`${phaseSevenReleaseScopeContract.name}`)
  console.log(`stageProgress=${phaseSevenReleaseScopeContract.stageProgress}`)
  console.log(`focus=${phaseSevenReleaseScopeContract.focus.length}`)
  console.log(`releaseReady=${phaseSevenReleaseEvidenceLedger.releaseReady}`)
  console.log(`evidenceItems=${phaseSevenReleaseEvidenceLedger.items.length}`)
  console.log(`pending=${phaseSevenReleaseEvidenceLedger.items.filter((item) => item.status.startsWith('pending')).length}`)
}

main()
