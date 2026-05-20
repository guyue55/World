import fs from 'node:fs'
import path from 'node:path'
import phaseFiveScopeContract from '../data/core/phase-five-scope-contract.json'
import privateArchiveBoundaryPolicy from '../data/domains/archive/private-archive-boundary-policy.json'
import phaseFiveEntryGate from '../data/release/phase-five-entry-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFiveScopeContract.focus.length < 7) errors.push('phase five focus too small')
  ;['private', 'family', 'partner', 'vault', 'sealed', 'silent'].forEach((tier) => {
    if (!phaseFiveScopeContract.visibilityTiers.includes(tier)) errors.push(`missing visibility tier: ${tier}`)
  })
  if (!phaseFiveScopeContract.nonGoals.includes('storing real private content in repository')) {
    errors.push('scope must forbid storing real private content')
  }
  if (!phaseFiveScopeContract.entryGuards.includes('public build must exclude private tiers')) {
    errors.push('scope must guard public build')
  }
  if (privateArchiveBoundaryPolicy.layers.some((layer) => layer.publicBuild !== 'excluded')) {
    errors.push('all private archive layers must be excluded from public build')
  }
  if (phaseFiveEntryGate.entryDecision !== 'phase-five-planning-allowed-private-implementation-not-started') {
    errors.push('phase five entry gate decision mismatch')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-five-scope']) errors.push('package missing check:phase-five-scope')
  if (!pkg.scripts['phase-five-scope:print']) errors.push('package missing phase-five-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase five scope check passed.')
}

main()
