import fs from 'node:fs'
import path from 'node:path'
import nonCommandEvidenceFeedbackContract from '../data/domains/content/non-command-evidence-feedback-contract.json'
import nonCommandEvidenceFeedbackRecord from '../data/domains/content/non-command-evidence-feedback-record.json'
import browserQaRecords from '../data/domains/experience/browser-qa-records.json'
import previewSmokeConfig from '../data/release/preview-smoke-config.json'
import performanceMeasurementRecords from '../data/engineering/performance-measurement-records.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (nonCommandEvidenceFeedbackContract.evidenceTypes.length < 3) {
    errors.push('non-command evidence types too few')
  }

  ;['browser-qa', 'preview-smoke', 'performance'].forEach((id) => {
    if (!nonCommandEvidenceFeedbackContract.evidenceTypes.some((item) => item.id === id)) {
      errors.push(`missing evidence type: ${id}`)
    }
  })

  if (nonCommandEvidenceFeedbackRecord.status !== 'pending-real-feedback') {
    errors.push('feedback record must remain pending-real-feedback')
  }

  if (browserQaRecords.matrix.length < 5) {
    errors.push('browser QA matrix too small')
  }

  if (previewSmokeConfig.routes.length < 10) {
    errors.push('preview smoke routes too few')
  }

  if (performanceMeasurementRecords.routes.length < 6) {
    errors.push('performance routes too few')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:non-command-evidence']) errors.push('package missing check:non-command-evidence')
  if (!pkg.scripts['non-command-evidence:print']) errors.push('package missing non-command-evidence:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Non-command evidence check passed.')
}

main()
