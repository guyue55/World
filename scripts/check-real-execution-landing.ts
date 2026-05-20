import fs from 'node:fs'
import path from 'node:path'
import realExecutionLandingFinalReport from '../data/real-execution-landing-final-report.json'
import realExecutionLandingReadiness from '../data/real-execution-landing-readiness.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'
import manualReleaseReviewRecord from '../data/manual-release-review-record.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (realExecutionLandingFinalReport.completedBatches.length !== 4) {
    errors.push('real execution landing must record 4 batches')
  }

  if (realExecutionLandingFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (realExecutionLandingReadiness.status !== 'landing-ready-real-run-pending') {
    errors.push('landing readiness status mismatch')
  }

  if (!realExecutionLandingReadiness.items.some((item) => item.status === 'blocked')) {
    errors.push('landing readiness must include blocked release-ready')
  }

  if (manualReleaseReviewRecord.status !== 'pending-manual-review') {
    errors.push('manual review must remain pending')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:real-execution-landing']) errors.push('package missing check:real-execution-landing')
  if (!pkg.scripts['real-execution-landing:print']) errors.push('package missing real-execution-landing:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real execution landing check passed.')
}

main()
