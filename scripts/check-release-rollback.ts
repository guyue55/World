import fs from 'node:fs'
import path from 'node:path'
import releaseRollbackContract from '../data/release-rollback-contract.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseRollbackContract.failureScenarios.length < 7) {
    errors.push('rollback failure scenarios too few')
  }

  if (releaseRollbackContract.rollbackRules.length < 4) {
    errors.push('rollback rules too few')
  }

  ;['browser-qa-failed', 'preview-smoke-failed', 'blocker-open'].forEach((id) => {
    if (!releaseRollbackContract.failureScenarios.some((item) => item.id === id)) {
      errors.push(`missing failure scenario: ${id}`)
    }
  })

  if (!releaseRollbackContract.rules.some((rule) => rule.includes('不自动关闭阻断项'))) {
    errors.push('rollback must not auto-close blockers')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-rollback']) errors.push('package missing check:release-rollback')
  if (!pkg.scripts['release-rollback:print']) errors.push('package missing release-rollback:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release rollback check passed.')
}

main()
