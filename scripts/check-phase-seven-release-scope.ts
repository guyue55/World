import fs from 'node:fs'
import path from 'node:path'
import phaseSevenEntryGate from '../data/phase-seven-entry-gate.json'
import phaseSevenReleaseEvidenceLedger from '../data/phase-seven-release-evidence-ledger.json'
import phaseSevenReleaseScopeContract from '../data/phase-seven-release-scope-contract.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseSevenEntryGate.entryDecision !== 'phase-seven-planning-allowed-public-release-and-long-term-operations-not-started') {
    errors.push('phase seven entry decision mismatch')
  }

  if (phaseSevenReleaseScopeContract.focus.length < 7) errors.push('phase seven focus too small')

  if (phaseSevenReleaseScopeContract.nonGoals.includes('claim release-ready without evidence') === false) {
    errors.push('must forbid release-ready claim without evidence')
  }

  if (phaseSevenReleaseEvidenceLedger.releaseReady !== false) {
    errors.push('releaseReady must remain false')
  }

  const required = phaseSevenReleaseEvidenceLedger.items.filter((item) => item.required)
  if (required.length < 10) errors.push('release evidence required items too few')

  const unsafePassed = required.filter((item) => item.status === 'passed')
  if (unsafePassed.length > 0) errors.push(`evidence item must not be pre-marked passed: ${unsafePassed.map((item) => item.id).join(', ')}`)

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-seven-release-scope']) errors.push('package missing check:phase-seven-release-scope')
  if (!pkg.scripts['phase-seven-release-scope:print']) errors.push('package missing phase-seven-release-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase seven release scope check passed.')
}

main()
