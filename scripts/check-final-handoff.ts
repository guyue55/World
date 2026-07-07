// 用途：检查最终交接
import fs from 'node:fs'
import path from 'node:path'
import phaseTwoFinalHandoffGate from '../data/release/phase-two-final-handoff-gate.json'
import phaseTwoFinalCheckMatrix from '../data/release/phase-two-final-check-matrix.json'
import nextStageReadiness from '../data/release/next-stage-readiness.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const latestLintAttempt = lintExecutionReadiness.latestAttempt as { exitCode?: number } | undefined


  if (phaseTwoFinalHandoffGate.handoffScope.completedPhaseTwoBatches !== 12) {
    errors.push('handoff gate must record 12 phase two batches')
  }

  if (phaseTwoFinalHandoffGate.handoffScope.completedHardeningBatches !== 3) {
    errors.push('handoff gate must record 3 hardening batches')
  }

  if (!phaseTwoFinalHandoffGate.cannotClaim.includes('lint-passed')) {
    errors.push('handoff gate must explicitly forbid claiming lint-passed')
  }

  if (phaseTwoFinalCheckMatrix.checks.length < 9) {
    errors.push('final check matrix must include at least 9 checks')
  }

  if (nextStageReadiness.tracks.length < 3) {
    errors.push('next stage readiness must include 3 tracks')
  }

  if (lintExecutionReadiness.currentStatus === 'passed' && latestLintAttempt?.exitCode !== 0) {
    errors.push('lint cannot be marked passed unless latest attempt exitCode is 0')
  }



  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:final-handoff']) {
    errors.push('package missing check:final-handoff')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Final handoff check passed.')
}

main()
