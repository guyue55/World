import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateAcceptanceScannerContract from '../data/release-candidate-acceptance-scanner-contract.json'
import releaseCandidateAcceptanceEvidenceManifest from '../data/release-candidate-acceptance-evidence-manifest.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateAcceptanceScannerContract.output !== 'reports/release-candidate-acceptance-summary.json') {
    errors.push('unexpected scanner output')
  }

  if (releaseCandidateAcceptanceScannerContract.statusRules.length < 5) {
    errors.push('scanner status rules too few')
  }

  if (releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.length < 9) {
    errors.push('acceptance evidence manifest too small')
  }

  if (!releaseCandidateAcceptanceScannerContract.rules.some((rule) => rule.includes('不改 data'))) {
    errors.push('scanner must not change data sources')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['release-candidate-acceptance:scan']) errors.push('package missing release-candidate-acceptance:scan')
  if (!pkg.scripts['check:release-candidate-acceptance-scanner']) errors.push('package missing check:release-candidate-acceptance-scanner')
  if (!pkg.scripts['release-candidate-acceptance-scanner:print']) errors.push('package missing release-candidate-acceptance-scanner:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate acceptance scanner check passed.')
}

main()
