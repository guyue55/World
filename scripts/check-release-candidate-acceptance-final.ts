import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateAcceptanceFinalReport from '../data/release/release-candidate-acceptance-final-report.json'
import releaseCandidateAcceptanceReadiness from '../data/release/release-candidate-acceptance-readiness.json'
import releaseCandidateSignoffRecord from '../data/release/release-candidate-signoff-record.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateAcceptanceFinalReport.completedBatches.length !== 4) {
    errors.push('release candidate acceptance final report must record 4 batches')
  }

  if (releaseCandidateAcceptanceFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (releaseCandidateAcceptanceReadiness.status !== 'acceptance-structure-ready-real-scan-pending') {
    errors.push('acceptance readiness status mismatch')
  }

  const statuses = releaseCandidateAcceptanceReadiness.items.map((item) => item.status)
  if (!statuses.includes('pending-real-run')) errors.push('readiness must include pending-real-run')
  if (!statuses.includes('pending-signoff')) errors.push('readiness must include pending-signoff')
  if (!statuses.includes('blocked')) errors.push('readiness must include blocked release-ready')

  if (releaseCandidateSignoffRecord.status !== 'pending-signoff') {
    errors.push('candidate signoff must remain pending-signoff')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-acceptance-final']) errors.push('package missing check:release-candidate-acceptance-final')
  if (!pkg.scripts['release-candidate-acceptance-final:print']) errors.push('package missing release-candidate-acceptance-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate acceptance final check passed.')
}

main()
