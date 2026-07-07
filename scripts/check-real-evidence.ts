// 用途：检查真实证据
import {
  getBrowserQaRecords,
  getBuildFailurePlaybook,
  getPerformanceMeasurementRecords,
  getRealExecutionEvidenceLedger,
  validateRealEvidenceReadiness,
} from '../src/lib/real-evidence'

function main() {
  const issues = validateRealEvidenceReadiness()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const records = new Set(getRealExecutionEvidenceLedger().records.map((item) => item.id))
  ;['exec-install', 'exec-lint', 'exec-typecheck', 'exec-world-core', 'exec-build', 'exec-preview', 'exec-lighthouse', 'exec-browser-qa'].forEach((id) => {
    if (!records.has(id)) errors.push(`missing real execution record: ${id}`)
  })

  const failureTypes = new Set(getBuildFailurePlaybook().failureTypes.map((item) => item.id))
  ;['dependency-install-fail', 'eslint-fail', 'typecheck-fail', 'next-build-fail'].forEach((id) => {
    if (!failureTypes.has(id)) errors.push(`missing failure playbook type: ${id}`)
  })

  if (getPerformanceMeasurementRecords().routes.some((item) => item.status !== 'pending')) {
    warnings.push('performance records contain non-pending status before real measurement')
  }

  if (getBrowserQaRecords().matrix.some((item) => item.status !== 'pending')) {
    warnings.push('browser QA records contain non-pending status before real QA')
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Real evidence readiness check passed. warnings=${warnings.length}`)
}

main()
