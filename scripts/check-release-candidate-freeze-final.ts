import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateFreezeFinalReport from '../data/release-candidate-freeze-final-report.json'
import releaseCandidateFreezeReadiness from '../data/release-candidate-freeze-readiness.json'
import releaseCandidateSignoffRecord from '../data/release-candidate-signoff-record.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateFreezeFinalReport.completedBatches.length !== 4) {
    errors.push('release candidate freeze final report must record 4 batches')
  }

  if (releaseCandidateFreezeFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (releaseCandidateFreezeReadiness.status !== 'candidate-freeze-ready-real-signoff-pending') {
    errors.push('candidate freeze readiness status mismatch')
  }

  if (!releaseCandidateFreezeReadiness.items.some((item) => item.status === 'blocked')) {
    errors.push('readiness must include blocked release-ready')
  }

  if (!releaseCandidateFreezeReadiness.items.some((item) => item.status === 'pending-signoff')) {
    errors.push('readiness must include pending-signoff')
  }

  if (releaseCandidateSignoffRecord.status !== 'pending-signoff') {
    errors.push('signoff record must remain pending-signoff')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-final']) errors.push('package missing check:release-candidate-final')
  if (!pkg.scripts['release-candidate-final:print']) errors.push('package missing release-candidate-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate freeze final check passed.')
}

main()
