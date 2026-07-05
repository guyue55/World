import fs from 'node:fs'
import path from 'node:path'
import phaseTwoClosureContract from '../data/release/phase-two-closure-contract.json'
import phaseTwoClosureReport from '../data/release/phase-two-closure-report.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'
import stageCompletionGate from '../data/release/stage-completion-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const latestLintAttempt = lintExecutionReadiness.latestAttempt as { exitCode?: number } | undefined


  if (phaseTwoClosureContract.completedBatches.length < 12) {
    errors.push('phase two closure must list 12 completed batches')
  }

  if (phaseTwoClosureReport.summary.experienceRoutesProductized.length < 10) {
    errors.push('phase two closure must cover the 10 core routes')
  }

  if (stageCompletionGate.currentStatus === 'complete') {
    errors.push('phase two closure must not mark stage one complete')
  }

  if (lintExecutionReadiness.currentStatus === 'passed' && latestLintAttempt?.exitCode !== 0) {
    errors.push('lint cannot be marked passed without exitCode 0')
  }

  const scanRisk = read('scripts/scan-lint-risk.ts')
  if (!scanRisk.includes('explicitAnyPattern')) {
    errors.push('lint risk scanner must use pattern-based explicit any detection')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase two closure check passed.')
}

main()
