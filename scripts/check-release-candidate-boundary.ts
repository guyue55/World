import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateChangeBoundaryContract from '../data/release-candidate-change-boundary-contract.json'
import releaseCandidateFreezeRecord from '../data/release-candidate-freeze-record.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateChangeBoundaryContract.allowedPaths.length < 8) {
    errors.push('allowedPaths too few')
  }

  if (releaseCandidateChangeBoundaryContract.protectedPaths.length < 10) {
    errors.push('protectedPaths too few')
  }

  ;['src/app/', 'src/components/', 'src/lib/', 'package.json'].forEach((item) => {
    if (!releaseCandidateChangeBoundaryContract.protectedPaths.includes(item)) {
      errors.push(`missing protected path: ${item}`)
    }
  })

  if (!releaseCandidateChangeBoundaryContract.allowedReasons.includes('defect-fix-with-review')) {
    errors.push('allowed reasons must include defect-fix-with-review')
  }

  if (releaseCandidateFreezeRecord.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-boundary']) errors.push('package missing check:release-candidate-boundary')
  if (!pkg.scripts['release-candidate-boundary:print']) errors.push('package missing release-candidate-boundary:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate boundary check passed.')
}

main()
