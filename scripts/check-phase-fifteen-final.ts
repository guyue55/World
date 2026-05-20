import fs from 'node:fs'
import path from 'node:path'
import phaseFifteenRcFinalReport from '../data/phase-fifteen-rc-final-report.json'
import realCommandExecutionAttempts from '../data/real-command-execution-attempts.json'
import realExecutionResultSummary from '../data/real-execution-result-summary.json'
import releaseCandidateManifest from '../data/release-candidate-manifest.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'
import v1CurrentStageClosureStatus from '../data/v1-current-stage-closure-status.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseFifteenRcFinalReport.completedBatches.length !== 4) {
    errors.push('phase fifteen final report must record 4 batches')
  }
  if (phaseFifteenRcFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }
  if (phaseFifteenRcFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }
  if (phaseFifteenRcFinalReport.rcDecision !== 'release-candidate-structure-prepared-real-command-pass-not-complete') {
    errors.push('rcDecision mismatch')
  }
  if (realCommandExecutionAttempts.allRequiredCommandsPassed !== false) {
    errors.push('allRequiredCommandsPassed must remain false')
  }
  if (realExecutionResultSummary.realExecutionPassed !== false) {
    errors.push('realExecutionPassed must remain false')
  }
  if (releaseCandidateManifest.releaseCandidateReady !== false) {
    errors.push('releaseCandidateReady must remain false')
  }
  if (releaseCandidateManifest.packageGenerated !== false) {
    errors.push('packageGenerated must remain false')
  }
  if (releaseReadinessTransitionGate.releaseReady !== false) {
    errors.push('releaseReady must remain false')
  }
  if (v1CurrentStageClosureStatus.remainingStructuralStages !== 0) {
    errors.push('remainingStructuralStages must be 0')
  }
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fifteen-final']) errors.push('package missing check:phase-fifteen-final')
  if (!pkg.scripts['phase-fifteen-final:print']) errors.push('package missing phase-fifteen-final:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fifteen final check passed.')
}

main()
