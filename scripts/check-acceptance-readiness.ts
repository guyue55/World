import fs from 'node:fs'
import path from 'node:path'
import acceptanceReadinessContract from '../data/release/acceptance-readiness-contract.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'
import phaseTwoExperienceAcceptanceChecklist from '../data/domains/experience/phase-two-experience-acceptance-checklist.json'
import stageCompletionGate from '../data/release/stage-completion-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (acceptanceReadinessContract.executionGroups.length < 5) {
    errors.push('acceptance execution groups too few')
  }

  if (phaseTwoExperienceAcceptanceChecklist.routes.length < 10) {
    errors.push('phase two route acceptance checklist too small')
  }

  if (lintExecutionReadiness.requiredCommand !== 'npm run lint') {
    errors.push('lint readiness must require npm run lint')
  }

  if (stageCompletionGate.currentStatus === 'complete') {
    errors.push('stage completion gate must not be complete during readiness work')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts.lint?.includes('eslint')) errors.push('package.json lint script must use eslint')
  if (!pkg.scripts['check:world-core']?.includes('check:acceptance-readiness')) {
    errors.push('check:world-core must include check:acceptance-readiness')
  }



  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Acceptance readiness check passed.')
}

main()
