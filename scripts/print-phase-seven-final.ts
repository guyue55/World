import phaseEightEntryGate from '../data/release/phase-eight-entry-gate.json'
import phaseSevenReleaseEvidenceLedger from '../data/release/phase-seven-release-evidence-ledger.json'
import phaseSevenReleaseFinalReport from '../data/release/phase-seven-release-final-report.json'

function main() {
  console.log(`${phaseSevenReleaseFinalReport.name}`)
  console.log(`stageProgress=${phaseSevenReleaseFinalReport.stageProgress}`)
  console.log(`decision=${phaseSevenReleaseFinalReport.decision}`)
  console.log(`releaseDecision=${phaseSevenReleaseFinalReport.releaseDecision}`)
  console.log(`completedBatches=${phaseSevenReleaseFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseSevenReleaseFinalReport.completedCapabilities.length}`)
  console.log(`releaseReady=${phaseSevenReleaseEvidenceLedger.releaseReady}`)
  console.log(`phaseEightEntryDecision=${phaseSevenReleaseFinalReport.phaseEightEntryDecision}`)
  console.log(`phaseEightFocus=${phaseEightEntryGate.phaseEightCandidateFocus.length}`)
}

main()
