import fs from 'node:fs'
import path from 'node:path'
import evidenceCollectorPlan from '../data/evidence-collector-plan.json'
import realExecutionRunnerPlan from '../data/real-execution-runner-plan.json'
import realExecutionResultSummary from '../data/real-execution-result-summary.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []
  if (realExecutionRunnerPlan.runnerReady !== false) errors.push('runnerReady must remain false')
  if (realExecutionRunnerPlan.modes.length < 5) errors.push('runner modes too few')
  if (realExecutionRunnerPlan.modes.some((mode) => mode.safe !== true)) errors.push('all runner modes must be safe')
  if (evidenceCollectorPlan.collectorReady !== false) errors.push('collectorReady must remain false')
  if (evidenceCollectorPlan.outputs.length < 4) errors.push('collector outputs too few')
  if (realExecutionResultSummary.realExecutionPassed !== false) errors.push('realExecutionPassed must remain false')
  if (releaseReadinessTransitionGate.releaseReady !== false) errors.push('releaseReady must remain false')
  if (!exists('scripts/print-phase-fourteen-evidence-sprint.ts')) errors.push('missing evidence sprint print script')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fourteen-runner']) errors.push('package missing check:phase-fourteen-runner')
  if (!pkg.scripts['phase-fourteen-evidence-sprint:print']) errors.push('package missing phase-fourteen-evidence-sprint:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fourteen runner check passed.')
}

main()
