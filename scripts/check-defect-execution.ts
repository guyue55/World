import fs from 'node:fs'
import path from 'node:path'
import defectExecutionQueue from '../data/engineering/defect-execution-queue.json'
import defectExecutionQueueContract from '../data/engineering/defect-execution-queue-contract.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (defectExecutionQueueContract.sources.length < 5) {
    errors.push('defect sources too few')
  }

  if (!defectExecutionQueueContract.severity.includes('P0') || !defectExecutionQueueContract.severity.includes('P1')) {
    errors.push('defect severity must include P0/P1')
  }

  if (!defectExecutionQueueContract.allowedStatuses.includes('verified')) {
    errors.push('defect statuses must include verified')
  }

  if (defectExecutionQueue.status !== 'ready-for-real-defects') {
    errors.push('defect queue must be ready-for-real-defects')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('release blockers must remain visible')
  }

  const evidencePage = read('src/app/evidence/page.tsx')
  if (!evidencePage.includes('DefectExecutionPanel')) {
    errors.push('evidence page must include DefectExecutionPanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:defect-execution']) errors.push('package missing check:defect-execution')
  if (!pkg.scripts['defect-execution:print']) errors.push('package missing defect-execution:print')
  if (!pkg.scripts['defect-execution:write']) errors.push('package missing defect-execution:write')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Defect execution check passed.')
}

main()
