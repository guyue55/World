import fs from 'node:fs'
import path from 'node:path'
import realEvidencePreparationFinalReport from '../data/real-evidence-preparation-final-report.json'
import releaseReadyEvidenceMatrix from '../data/release-ready-evidence-matrix.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (realEvidencePreparationFinalReport.completedBatches.length !== 4) {
    errors.push('real evidence preparation must record 4 batches')
  }

  if (realEvidencePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('real evidence preparation must keep not-ready-for-release')
  }

  if (releaseReadyEvidenceMatrix.status !== 'prepared-not-satisfied') {
    errors.push('release ready evidence matrix must remain prepared-not-satisfied')
  }

  const requiredPending = releaseReadyEvidenceMatrix.items.filter((item) => item.required && item.status !== 'passed' && item.status !== 'closed')
  if (requiredPending.length < 1) {
    errors.push('release ready evidence matrix must keep pending required evidence')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('release blockers must remain visible')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:real-evidence-preparation']) errors.push('package missing check:real-evidence-preparation')
  if (!pkg.scripts['real-evidence-preparation:print']) errors.push('package missing real-evidence-preparation:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real evidence preparation check passed.')
}

main()
