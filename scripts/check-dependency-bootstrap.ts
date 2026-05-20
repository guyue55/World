import fs from 'node:fs'
import path from 'node:path'
import dependencyBootstrapContract from '../data/dependency-bootstrap-contract.json'
import dependencyBootstrapRecord from '../data/dependency-bootstrap-record.json'
import lintExecutionReadiness from '../data/lint-execution-readiness.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const latestLintAttempt = lintExecutionReadiness.latestAttempt as { exitCode?: number } | undefined


  if (dependencyBootstrapContract.requiredTools.length < 6) {
    errors.push('dependency bootstrap required tools too few')
  }

  if (!dependencyBootstrapContract.failureClasses.includes('permission-denied')) {
    errors.push('dependency bootstrap must classify permission-denied')
  }

  if (dependencyBootstrapRecord.status !== 'pending-real-install') {
    errors.push('dependency bootstrap record must remain pending until real install')
  }

  if (dependencyBootstrapRecord.checks.length < dependencyBootstrapContract.requiredTools.length) {
    errors.push('dependency bootstrap record checks too few')
  }

  if (lintExecutionReadiness.currentStatus === 'passed' && latestLintAttempt?.exitCode !== 0) {
    errors.push('lint cannot be passed without exitCode 0')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:dependency-bootstrap']) errors.push('package missing check:dependency-bootstrap')
  if (!pkg.scripts['dependency-bootstrap:print']) errors.push('package missing dependency-bootstrap:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Dependency bootstrap check passed.')
}

main()
