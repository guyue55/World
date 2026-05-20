import fs from 'node:fs'
import path from 'node:path'
import contentTopicPillars from '../data/domains/content/content-topic-pillars.json'
import personalBrandSystem from '../data/domains/content/personal-brand-system.json'
import phaseEightProductionFinalReport from '../data/release/phase-eight-production-final-report.json'
import phaseNineBrandScopeContract from '../data/domains/content/phase-nine-brand-scope-contract.json'
import phaseNineEntryGate from '../data/release/phase-nine-entry-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseNineEntryGate.entryDecision !== 'phase-nine-planning-allowed-real-content-ecosystem-and-brand-not-started') {
    errors.push('phase nine entry decision mismatch')
  }

  if (phaseEightProductionFinalReport.productionDecision !== 'production-not-live') {
    errors.push('production decision must remain production-not-live')
  }

  if (phaseNineBrandScopeContract.focus.length < 7) errors.push('phase nine focus too small')
  if (!phaseNineBrandScopeContract.nonGoals.includes('AI autonomous publishing')) errors.push('must forbid AI autonomous publishing')

  if (personalBrandSystem.voice.length < 6) errors.push('brand voice too small')
  if (!personalBrandSystem.contentBoundaries.includes('不暴露私密档案')) errors.push('brand boundary must forbid private exposure')

  if (contentTopicPillars.pillars.length < 6) errors.push('topic pillars too few')
  const unsafePillars = contentTopicPillars.pillars.filter((item) => item.visibility !== 'public')
  if (unsafePillars.length > 0) errors.push(`all phase-nine pillars must be public: ${unsafePillars.map((item) => item.id).join(', ')}`)

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-nine-brand-scope']) errors.push('package missing check:phase-nine-brand-scope')
  if (!pkg.scripts['phase-nine-brand-scope:print']) errors.push('package missing phase-nine-brand-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase nine brand scope check passed.')
}

main()
