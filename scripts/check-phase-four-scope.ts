import fs from 'node:fs'
import path from 'node:path'
import phaseFourScopeContract from '../data/core/phase-four-scope-contract.json'
import phaseFourContentProgram from '../data/domains/content/phase-four-content-program.json'
import prePhaseFourFinalReport from '../data/release/pre-phase-four-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFourScopeContract.focus.length < 7) {
    errors.push('phase four focus too small')
  }

  ;['private vault implementation', 'AI autonomous publishing', 'automatic release-ready flip'].forEach((item) => {
    if (!phaseFourScopeContract.nonGoals.includes(item)) {
      errors.push(`missing non-goal: ${item}`)
    }
  })

  if (!phaseFourScopeContract.entryGuards.includes('release-ready remains not-ready')) {
    errors.push('entry guards must keep release-ready not-ready')
  }

  if (phaseFourContentProgram.firstMonthCadence.length !== 4) {
    errors.push('first month cadence must include 4 weeks')
  }

  if (prePhaseFourFinalReport.phaseFourEntryDecision !== 'phase-four-planning-allowed-release-ready-blocked') {
    errors.push('phase four entry decision mismatch')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-four-scope']) errors.push('package missing check:phase-four-scope')
  if (!pkg.scripts['phase-four-scope:print']) errors.push('package missing phase-four-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase four scope check passed.')
}

main()
