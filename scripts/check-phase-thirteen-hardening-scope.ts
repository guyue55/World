import fs from 'node:fs'
import path from 'node:path'
import dependencyBuildEvidenceMatrix from '../data/release/dependency-build-evidence-matrix.json'
import phaseThirteenEntryGate from '../data/release/phase-thirteen-entry-gate.json'
import phaseThirteenHardeningScopeContract from '../data/core/phase-thirteen-hardening-scope-contract.json'
import securityBaselineImplementationPlan from '../data/domains/governance/security-baseline-implementation-plan.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseThirteenEntryGate.entryDecision !== 'phase-thirteen-planning-allowed-real-implementation-hardening-and-evidence-not-started') {
    errors.push('phase thirteen entry decision mismatch')
  }
  if (phaseThirteenHardeningScopeContract.focus.length < 8) errors.push('phase thirteen focus too small')
  if (!phaseThirteenHardeningScopeContract.nonGoals.includes('claim release-ready without real evidence')) {
    errors.push('must forbid fake release-ready')
  }
  if (dependencyBuildEvidenceMatrix.evidenceReady !== false) errors.push('evidenceReady must remain false')
  if (dependencyBuildEvidenceMatrix.checks.length < 8) errors.push('evidence checks too few')
  if (dependencyBuildEvidenceMatrix.checks.some((item) => item.status === 'passed')) errors.push('evidence checks must not be pre-marked passed')
  if (securityBaselineImplementationPlan.securityBaselineReady !== false) errors.push('securityBaselineReady must remain false')
  if (securityBaselineImplementationPlan.baseline.length < 6) errors.push('security baseline too small')
  if (securityBaselineImplementationPlan.baseline.some((item) => item.required !== true)) errors.push('security baseline must be required')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-thirteen-hardening-scope']) errors.push('package missing check:phase-thirteen-hardening-scope')
  if (!pkg.scripts['phase-thirteen-hardening-scope:print']) errors.push('package missing phase-thirteen-hardening-scope:print')
  if (!pkg.scripts['phase-thirteen-security:print']) errors.push('package missing phase-thirteen-security:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase thirteen hardening scope check passed.')
}

main()
