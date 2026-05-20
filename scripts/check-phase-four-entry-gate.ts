import fs from 'node:fs'
import path from 'node:path'
import phaseFourEntryGate from '../data/phase-four-entry-gate.json'
import prePhaseFourTaskboard from '../data/pre-phase-four-taskboard.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFourEntryGate.structureEntryConditions.length < 4) {
    errors.push('structure entry conditions too few')
  }

  if (phaseFourEntryGate.realEvidenceBlockers.length < 5) {
    errors.push('real evidence blockers too few')
  }

  if (phaseFourEntryGate.entryDecision !== 'phase-four-planning-allowed-release-ready-blocked') {
    errors.push('entry decision must keep release-ready blocked')
  }

  if (!phaseFourEntryGate.rules.some((rule) => rule.includes('第四阶段规划允许'))) {
    errors.push('entry rules must allow phase-four planning only')
  }

  if (!prePhaseFourTaskboard.carryForwardToPhaseFour.includes('release-ready remains not-ready')) {
    errors.push('taskboard must carry forward release-ready not-ready')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-four-entry-gate']) errors.push('package missing check:phase-four-entry-gate')
  if (!pkg.scripts['phase-four-entry-gate:print']) errors.push('package missing phase-four-entry-gate:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase four entry gate check passed.')
}

main()
