import fs from 'node:fs'
import path from 'node:path'
import phaseEightEntryGate from '../data/release/phase-eight-entry-gate.json'
import phaseSevenReleaseDashboard from '../data/release/phase-seven-release-dashboard.json'
import phaseSevenReleaseEvidenceLedger from '../data/release/phase-seven-release-evidence-ledger.json'
import phaseSevenReleaseFinalReport from '../data/release/phase-seven-release-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseSevenReleaseFinalReport.completedBatches.length !== 4) {
    errors.push('phase seven final report must record 4 batches')
  }

  if (phaseSevenReleaseFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseSevenReleaseDashboard.releaseReady !== false) {
    errors.push('release dashboard must keep releaseReady=false')
  }

  if (phaseSevenReleaseEvidenceLedger.releaseReady !== false) {
    errors.push('evidence ledger must keep releaseReady=false')
  }

  const passedRequired = phaseSevenReleaseEvidenceLedger.items.filter((item) => item.required && item.status === 'passed')
  if (passedRequired.length > 0) {
    errors.push(`required evidence cannot be pre-marked passed: ${passedRequired.map((item) => item.id).join(', ')}`)
  }

  if (phaseSevenReleaseFinalReport.phaseEightEntryDecision !== 'phase-eight-planning-allowed-real-production-release-not-started') {
    errors.push('phase eight entry decision mismatch')
  }

  if (!phaseEightEntryGate.mustNotDo.includes('claim release-ready without evidence')) {
    errors.push('phase eight gate must forbid fake release-ready')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-seven-final']) errors.push('package missing check:phase-seven-final')
  if (!pkg.scripts['phase-seven-final:print']) errors.push('package missing phase-seven-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase seven final check passed.')
}

main()
