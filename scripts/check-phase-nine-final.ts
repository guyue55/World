import fs from 'node:fs'
import path from 'node:path'
import contentCalendarPlan from '../data/content-calendar-plan.json'
import phaseNineContentBrandFinalReport from '../data/phase-nine-content-brand-final-report.json'
import phaseTenEntryGate from '../data/phase-ten-entry-gate.json'
import publicWorldBookPublishingPlan from '../data/public-world-book-publishing-plan.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseNineContentBrandFinalReport.completedBatches.length !== 4) {
    errors.push('phase nine final report must record 4 batches')
  }

  if (phaseNineContentBrandFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseNineContentBrandFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }

  if (phaseNineContentBrandFinalReport.contentDecision !== 'content-ecosystem-structure-ready-real-publication-not-started') {
    errors.push('content decision mismatch')
  }

  if (contentCalendarPlan.publicationReady !== false) {
    errors.push('publicationReady must remain false')
  }

  if (publicWorldBookPublishingPlan.worldBookReady !== false) {
    errors.push('worldBookReady must remain false')
  }

  if (phaseNineContentBrandFinalReport.phaseTenEntryDecision !== 'phase-ten-planning-allowed-intelligent-operations-and-multi-device-expansion-not-started') {
    errors.push('phase ten entry decision mismatch')
  }

  if (!phaseTenEntryGate.mustNotDo.includes('AI autonomous publishing')) {
    errors.push('phase ten gate must forbid AI autonomous publishing')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-nine-final']) errors.push('package missing check:phase-nine-final')
  if (!pkg.scripts['phase-nine-final:print']) errors.push('package missing phase-nine-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase nine final check passed.')
}

main()
