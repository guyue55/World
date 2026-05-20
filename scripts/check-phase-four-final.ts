import fs from 'node:fs'
import path from 'node:path'
import phaseFiveEntryGate from '../data/release/phase-five-entry-gate.json'
import phaseFourContentOpsFinalReport from '../data/domains/content/phase-four-content-ops-final-report.json'
import phaseFourContentSeeds from '../data/domains/content/phase-four-content-seeds.json'
import phaseFiveHandoffPreparation from '../data/release/phase-five-handoff-preparation.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFourContentOpsFinalReport.completedBatches.length !== 4) {
    errors.push('phase four final report must record 4 batches')
  }

  if (phaseFourContentOpsFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseFourContentOpsFinalReport.phaseFiveEntryDecision !== 'phase-five-planning-allowed-private-implementation-not-started') {
    errors.push('phase five entry decision mismatch')
  }

  if (phaseFiveEntryGate.notYetImplemented.length < 6) {
    errors.push('phase five notYetImplemented too few')
  }

  if (!phaseFiveEntryGate.entryRules.some((rule) => rule.includes('独立隔离'))) {
    errors.push('phase five entry rules must require private isolation')
  }

  if (phaseFourContentSeeds.items.some((seed) => seed.visibility !== 'public')) {
    errors.push('all phase four content seeds must remain public')
  }

  if (!phaseFiveHandoffPreparation.rules.some((rule) => rule.includes('不得进入 public build'))) {
    errors.push('phase five handoff must still protect public build')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-four-final']) errors.push('package missing check:phase-four-final')
  if (!pkg.scripts['phase-four-final:print']) errors.push('package missing phase-four-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase four final check passed.')
}

main()
