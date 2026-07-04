import fs from 'node:fs'
import path from 'node:path'
import releaseDryRunHandoffFinalReport from '../data/release/release-dry-run-handoff-final-report.json'
import releaseDryRunHandoffReadiness from '../data/release/release-dry-run-handoff-readiness.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseDryRunHandoffFinalReport.completedBatches.length !== 4) {
    errors.push('release dry-run handoff must record 4 batches')
  }

  if (releaseDryRunHandoffFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (releaseDryRunHandoffReadiness.status !== 'handoff-structure-ready-real-dry-run-pending') {
    errors.push('handoff readiness status mismatch')
  }

  if (!releaseDryRunHandoffReadiness.items.some((item) => item.status === 'blocked')) {
    errors.push('handoff readiness must include blocked release-ready')
  }

  if (!releaseDryRunHandoffReadiness.items.some((item) => item.id === 'real-dry-run' && item.status === 'pending-real-run')) {
    errors.push('real dry-run must remain pending')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-dry-run-handoff']) errors.push('package missing check:release-dry-run-handoff')
  if (!pkg.scripts['release-dry-run-handoff:print']) errors.push('package missing release-dry-run-handoff:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release dry-run handoff check passed.')
}

main()
