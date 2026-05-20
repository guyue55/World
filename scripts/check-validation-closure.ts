import fs from 'node:fs'
import path from 'node:path'
import realValidationFinalReport from '../data/release/real-validation-final-report.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const latestLintAttempt = lintExecutionReadiness.latestAttempt as { exitCode?: number } | undefined


  if (realValidationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('real validation final report must not mark release ready')
  }

  if (realValidationFinalReport.summary.pendingRerunSteps < 1) {
    errors.push('pending rerun steps should remain visible')
  }

  if (realValidationFinalReport.summary.pendingBrowserQaItems < 1) {
    errors.push('pending browser QA should remain visible')
  }

  if (realValidationFinalReport.summary.pendingPreviewRoutes < 1) {
    errors.push('pending preview routes should remain visible')
  }

  if (realValidationFinalReport.summary.pendingPerformanceRoutes < 1) {
    errors.push('pending performance routes should remain visible')
  }

  if (releaseBlockerRegister.blockers.length < 4) {
    errors.push('release blocker register must include at least four blockers')
  }

  if (lintExecutionReadiness.currentStatus === 'passed' && latestLintAttempt?.exitCode !== 0) {
    errors.push('lint cannot be passed without exitCode 0')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('ValidationClosurePanel')) {
    errors.push('status groups must include ValidationClosurePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:validation-closure']) {
    errors.push('package missing check:validation-closure')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Validation closure check passed.')
}

main()
