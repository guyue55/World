import phaseFifteenRcFinalReport from '../data/release/phase-fifteen-rc-final-report.json'
import releaseCandidateManifest from '../data/release/release-candidate-manifest.json'
import v1CurrentStageClosureStatus from '../data/release/v1-current-stage-closure-status.json'

function main() {
  console.log(`${phaseFifteenRcFinalReport.name}`)
  console.log(`stageProgress=${phaseFifteenRcFinalReport.stageProgress}`)
  console.log(`decision=${phaseFifteenRcFinalReport.decision}`)
  console.log(`releaseDecision=${phaseFifteenRcFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseFifteenRcFinalReport.productionDecision}`)
  console.log(`rcDecision=${phaseFifteenRcFinalReport.rcDecision}`)
  console.log(`completedBatches=${phaseFifteenRcFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseFifteenRcFinalReport.completedCapabilities.length}`)
  console.log(`attempted=${phaseFifteenRcFinalReport.realCommandAttemptSummary.attempted}`)
  console.log(`passed=${phaseFifteenRcFinalReport.realCommandAttemptSummary.passed}`)
  console.log(`failedOrBlocked=${phaseFifteenRcFinalReport.realCommandAttemptSummary.failedOrBlocked}`)
  console.log(`releaseCandidateReady=${releaseCandidateManifest.releaseCandidateReady}`)
  console.log(`packageGenerated=${releaseCandidateManifest.packageGenerated}`)
  console.log(`remainingStructuralStages=${v1CurrentStageClosureStatus.remainingStructuralStages}`)
}

main()
