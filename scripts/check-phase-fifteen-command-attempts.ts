import fs from 'node:fs'
import path from 'node:path'
import realCommandExecutionAttempts from '../data/real-command-execution-attempts.json'
import realExecutionQueue from '../data/real-execution-queue.json'
import realExecutionResultSummary from '../data/real-execution-result-summary.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (realCommandExecutionAttempts.allRequiredCommandsPassed !== false) {
    errors.push('allRequiredCommandsPassed must remain false unless all evidence passes')
  }
  if (realCommandExecutionAttempts.results.length < 6) errors.push('command attempt results too few')
  if (realCommandExecutionAttempts.summary.releaseReadyEligible !== false) errors.push('releaseReadyEligible must remain false')
  if (realExecutionQueue.executionQueueReady !== false) errors.push('executionQueueReady must remain false')
  if (realExecutionResultSummary.realExecutionPassed !== false) errors.push('realExecutionPassed must remain false')
  if (releaseReadinessTransitionGate.releaseReady !== false) errors.push('releaseReady must remain false')
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fifteen-command-attempts']) errors.push('package missing check:phase-fifteen-command-attempts')
  if (!pkg.scripts['phase-fifteen-command-attempts:print']) errors.push('package missing phase-fifteen-command-attempts:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fifteen command attempts check passed.')
}

main()
