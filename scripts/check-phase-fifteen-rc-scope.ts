import fs from 'node:fs'
import path from 'node:path'
import dependencyEslintBlockerFixPlan from '../data/dependency-eslint-blocker-fix-plan.json'
import phaseFifteenEntryGate from '../data/phase-fifteen-entry-gate.json'
import phaseFifteenRcScopeContract from '../data/phase-fifteen-rc-scope-contract.json'
import releaseCandidatePlan from '../data/release-candidate-plan.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseFifteenEntryGate.entryDecision !== 'phase-fifteen-planning-allowed-real-command-execution-and-release-candidate-not-started') {
    errors.push('phase fifteen entry decision mismatch')
  }
  if (phaseFifteenRcScopeContract.focus.length < 8) errors.push('phase fifteen focus too small')
  if (!phaseFifteenRcScopeContract.nonGoals.includes('ignore eslint permission blocker')) {
    errors.push('must forbid ignoring eslint blocker')
  }
  if (releaseCandidatePlan.releaseCandidateReady !== false) errors.push('releaseCandidateReady must remain false')
  if (releaseCandidatePlan.requiredEvidence.length < 8) errors.push('required evidence too few')
  if (dependencyEslintBlockerFixPlan.fixReady !== false) errors.push('fixReady must remain false')
  if (dependencyEslintBlockerFixPlan.fixSteps.length < 5) errors.push('fix steps too few')
  if (dependencyEslintBlockerFixPlan.fixSteps.some((step) => step.manualReview !== true)) {
    errors.push('all fix steps must require manual review')
  }
  if (releaseReadinessTransitionGate.releaseReady !== false) errors.push('releaseReady must remain false')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fifteen-rc-scope']) errors.push('package missing check:phase-fifteen-rc-scope')
  if (!pkg.scripts['phase-fifteen-rc-scope:print']) errors.push('package missing phase-fifteen-rc-scope:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fifteen RC scope check passed.')
}

main()
