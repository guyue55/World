import fs from 'node:fs'
import path from 'node:path'
import prePhaseFourTaskboard from '../data/versions/archive/pre-phase-four-taskboard.json'
import releaseCandidateAcceptanceFinalReport from '../data/release/release-candidate-acceptance-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (prePhaseFourTaskboard.completedStructureLines.length < 13) {
    errors.push('completed structure lines too few')
  }

  ;['real dry-run execution', 'manual candidate signoff', 'AI boundary review'].forEach((item) => {
    if (!prePhaseFourTaskboard.mustNotSkipBeforePhaseFour.includes(item)) {
      errors.push(`missing must-not-skip item: ${item}`)
    }
  })

  if (!prePhaseFourTaskboard.carryForwardToPhaseFour.includes('release-ready remains not-ready')) {
    errors.push('carry-forward must keep release-ready not-ready')
  }

  if (releaseCandidateAcceptanceFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:pre-phase-four-taskboard']) errors.push('package missing check:pre-phase-four-taskboard')
  if (!pkg.scripts['pre-phase-four-taskboard:print']) errors.push('package missing pre-phase-four-taskboard:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Pre phase-four taskboard check passed.')
}

main()
