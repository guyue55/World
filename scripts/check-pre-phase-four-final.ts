import fs from 'node:fs'
import path from 'node:path'
import prePhaseFourFinalReport from '../data/release/pre-phase-four-final-report.json'
import prePhaseFourFinalReadiness from '../data/release/pre-phase-four-final-readiness.json'
import phaseFourEntryGate from '../data/release/phase-four-entry-gate.json'
import releaseCandidateAcceptanceReadiness from '../data/release/release-candidate-acceptance-readiness.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (prePhaseFourFinalReport.completedBatches.length !== 4) {
    errors.push('pre phase-four final report must record 4 batches')
  }

  if (prePhaseFourFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (prePhaseFourFinalReport.phaseFourEntryDecision !== 'phase-four-planning-allowed-release-ready-blocked') {
    errors.push('phase four entry decision mismatch')
  }

  if (prePhaseFourFinalReadiness.status !== 'pre-phase-four-structure-complete-real-release-pending') {
    errors.push('final readiness status mismatch')
  }

  const statuses = prePhaseFourFinalReadiness.items.map((item) => item.status)
  ;['ready', 'allowed', 'blocked', 'not-ready'].forEach((status) => {
    if (!statuses.includes(status)) errors.push(`missing final readiness status: ${status}`)
  })

  if (phaseFourEntryGate.entryDecision !== 'phase-four-planning-allowed-release-ready-blocked') {
    errors.push('phase four entry gate must remain planning allowed/release blocked')
  }

  if (releaseCandidateAcceptanceReadiness.status !== 'acceptance-structure-ready-real-scan-pending') {
    errors.push('candidate acceptance readiness must remain real scan pending')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:pre-phase-four-final']) errors.push('package missing check:pre-phase-four-final')
  if (!pkg.scripts['pre-phase-four-final:print']) errors.push('package missing pre-phase-four-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Pre phase-four final check passed.')
}

main()
