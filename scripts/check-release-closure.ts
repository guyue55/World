import fs from 'node:fs'
import path from 'node:path'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'
import releaseReadyMatrix from '../data/release/release-ready-matrix.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release final report must remain not-ready-for-release')
  }

  if (releasePreparationFinalReport.completedReleasePrepBatches.length !== 4) {
    errors.push('release prep final report must record 4 completed batches')
  }

  const requiredPending = releaseReadyMatrix.items.filter((item) => item.required && item.status !== 'passed' && item.status !== 'closed')
  if (requiredPending.length < 1) {
    errors.push('release ready matrix should still show pending required items')
  }

  if (releaseBlockerRegister.blockers.some((blocker) => blocker.severity === 'P0' && blocker.status === 'open') === false) {
    errors.push('at least one P0 blocker must remain open until real evidence exists')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('ReleaseClosurePanel')) {
    errors.push('status groups must include ReleaseClosurePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-closure']) errors.push('package missing check:release-closure')
  if (!pkg.scripts['release-closure:print']) errors.push('package missing release-closure:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release closure check passed.')
}

main()
