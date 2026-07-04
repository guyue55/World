import fs from 'node:fs'
import path from 'node:path'
import evidenceCollectorPlan from '../data/release/evidence-collector-plan.json'
import manualSignoffPreparationChecklist from '../data/release/manual-signoff-preparation-checklist.json'
import phaseFifteenEntryGate from '../data/release/phase-fifteen-entry-gate.json'
import phaseFourteenEvidenceSprintFinalReport from '../data/release/phase-fourteen-evidence-sprint-final-report.json'
import realExecutionBlockerLedger from '../data/release/real-execution-blocker-ledger.json'
import realExecutionQueue from '../data/engineering/real-execution-queue.json'
import realExecutionResultSummary from '../data/engineering/real-execution-result-summary.json'
import realExecutionRunnerPlan from '../data/engineering/real-execution-runner-plan.json'
import releaseReadinessTransitionGate from '../data/release/release-readiness-transition-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseFourteenEvidenceSprintFinalReport.completedBatches.length !== 4) {
    errors.push('phase fourteen final report must record 4 batches')
  }
  if (phaseFourteenEvidenceSprintFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }
  if (phaseFourteenEvidenceSprintFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }
  if (phaseFourteenEvidenceSprintFinalReport.evidenceDecision !== 'real-execution-evidence-sprint-structure-ready-real-command-pass-not-complete') {
    errors.push('evidenceDecision mismatch')
  }

  const flags = [
    realExecutionQueue.executionQueueReady,
    realExecutionBlockerLedger.blockerLedgerReady,
    realExecutionResultSummary.realExecutionPassed,
    manualSignoffPreparationChecklist.manualSignoffReady,
    realExecutionRunnerPlan.runnerReady,
    evidenceCollectorPlan.collectorReady,
    releaseReadinessTransitionGate.transitionAllowed,
    releaseReadinessTransitionGate.releaseReady,
  ]

  if (flags.some((flag) => flag !== false)) {
    errors.push('all phase fourteen readiness flags must remain false')
  }

  if (realExecutionResultSummary.passed !== 0) errors.push('passed must remain 0 until real commands pass')
  if (releaseReadinessTransitionGate.conditions.some((condition) => condition.met !== false)) {
    errors.push('release conditions must remain false')
  }
  if (phaseFourteenEvidenceSprintFinalReport.phaseFifteenEntryDecision !== 'phase-fifteen-planning-allowed-real-command-execution-and-release-candidate-not-started') {
    errors.push('phase fifteen entry decision mismatch')
  }
  if (!phaseFifteenEntryGate.mustNotDo.includes('ignore eslint permission blocker')) {
    errors.push('phase fifteen gate must forbid ignoring eslint blocker')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fourteen-final']) errors.push('package missing check:phase-fourteen-final')
  if (!pkg.scripts['phase-fourteen-final:print']) errors.push('package missing phase-fourteen-final:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fourteen final check passed.')
}

main()
