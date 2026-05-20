import fs from 'node:fs'
import path from 'node:path'
import phaseFourteenEntryGate from '../data/release/phase-fourteen-entry-gate.json'
import phaseFourteenExecutionSprintScopeContract from '../data/engineering/phase-fourteen-execution-sprint-scope-contract.json'
import realExecutionBlockerLedger from '../data/release/real-execution-blocker-ledger.json'
import realExecutionQueue from '../data/engineering/real-execution-queue.json'
import releaseReadinessTransitionGate from '../data/release/release-readiness-transition-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseFourteenEntryGate.entryDecision !== 'phase-fourteen-planning-allowed-real-execution-evidence-sprint-not-started') {
    errors.push('phase fourteen entry decision mismatch')
  }
  if (phaseFourteenExecutionSprintScopeContract.focus.length < 8) errors.push('phase fourteen focus too small')
  if (!phaseFourteenExecutionSprintScopeContract.nonGoals.includes('mark pending-real-run as passed')) {
    errors.push('must forbid marking pending-real-run as passed')
  }
  if (realExecutionQueue.executionQueueReady !== false) errors.push('executionQueueReady must remain false')
  if (realExecutionQueue.items.length < 8) errors.push('execution queue items too few')
  if (realExecutionQueue.items.some((item) => item.status === 'passed')) errors.push('execution queue must not be pre-marked passed')
  if (realExecutionBlockerLedger.blockerLedgerReady !== false) errors.push('blockerLedgerReady must remain false')
  if (realExecutionBlockerLedger.blockers.length < 3) errors.push('blockers too few')
  if (releaseReadinessTransitionGate.releaseReady !== false) errors.push('releaseReady must remain false')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fourteen-execution-scope']) errors.push('package missing check:phase-fourteen-execution-scope')
  if (!pkg.scripts['phase-fourteen-execution-scope:print']) errors.push('package missing phase-fourteen-execution-scope:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fourteen execution scope check passed.')
}

main()
