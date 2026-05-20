import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateFreezeContract from '../data/release-candidate-freeze-contract.json'
import releaseCandidateFreezeRecord from '../data/release-candidate-freeze-record.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateFreezeContract.freezeScope.length < 7) {
    errors.push('freeze scope too small')
  }

  if (releaseCandidateFreezeContract.allowedChanges.length < 6) {
    errors.push('allowed changes too few')
  }

  ;['new product feature routes', 'automatic release-ready flip', 'private vault public exposure'].forEach((item) => {
    if (!releaseCandidateFreezeContract.forbiddenChanges.includes(item)) {
      errors.push(`missing forbidden change: ${item}`)
    }
  })

  if (releaseCandidateFreezeRecord.releaseDecision !== 'not-ready-for-release') {
    errors.push('freeze record must keep not-ready-for-release')
  }

  if (releaseCandidateFreezeRecord.approvals.length !== 0) {
    errors.push('freeze record approvals must start empty')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-freeze']) errors.push('package missing check:release-candidate-freeze')
  if (!pkg.scripts['release-candidate-freeze:print']) errors.push('package missing release-candidate-freeze:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate freeze check passed.')
}

main()
