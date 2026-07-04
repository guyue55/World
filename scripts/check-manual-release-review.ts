import fs from 'node:fs'
import path from 'node:path'
import manualReleaseReviewContract from '../data/release/manual-release-review-contract.json'
import manualReleaseReviewRecord from '../data/release/manual-release-review-record.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (manualReleaseReviewContract.checklist.length < 8) {
    errors.push('manual release checklist too short')
  }

  const required = manualReleaseReviewContract.checklist.filter((item) => item.required)
  if (required.length < 7) {
    errors.push('required manual release items too few')
  }

  if (manualReleaseReviewRecord.status !== 'pending-manual-review') {
    errors.push('manual release review must remain pending by default')
  }

  if (manualReleaseReviewRecord.items.some((item) => item.status !== 'pending')) {
    errors.push('manual release review items must start pending')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:manual-release-review']) errors.push('package missing check:manual-release-review')
  if (!pkg.scripts['manual-release-review:print']) errors.push('package missing manual-release-review:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Manual release review check passed.')
}

main()
