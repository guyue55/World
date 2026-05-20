import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateAcceptanceEvidenceManifest from '../data/release-candidate-acceptance-evidence-manifest.json'
import releaseCandidateFreezeFinalReport from '../data/release-candidate-freeze-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.length < 9) {
    errors.push('acceptance evidence items too few')
  }

  ;['release-dry-run-summary', 'candidate-signoff', 'blocker-closure-requests', 'non-command-evidence-notes'].forEach((id) => {
    if (!releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.some((item) => item.id === id)) {
      errors.push(`missing acceptance evidence: ${id}`)
    }
  })

  if (!releaseCandidateAcceptanceEvidenceManifest.acceptanceRules.some((rule) => rule.includes('人工签收 pending'))) {
    errors.push('acceptance rules must mention pending signoff')
  }

  if (releaseCandidateFreezeFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release candidate freeze final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-acceptance-manifest']) errors.push('package missing check:release-candidate-acceptance-manifest')
  if (!pkg.scripts['release-candidate-acceptance-manifest:print']) errors.push('package missing release-candidate-acceptance-manifest:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate acceptance manifest check passed.')
}

main()
