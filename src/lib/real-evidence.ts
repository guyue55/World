import realExecutionEvidenceLedger from '../../data/real-execution-evidence-ledger.json'
import buildFailurePlaybook from '../../data/build-failure-playbook.json'
import performanceMeasurementRecords from '../../data/performance-measurement-records.json'
import browserQaRecords from '../../data/browser-qa-records.json'

export type RealEvidenceIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getRealExecutionEvidenceLedger() {
  return realExecutionEvidenceLedger
}

export function getBuildFailurePlaybook() {
  return buildFailurePlaybook
}

export function getPerformanceMeasurementRecords() {
  return performanceMeasurementRecords
}

export function getBrowserQaRecords() {
  return browserQaRecords
}

export function validateRealEvidenceReadiness(): RealEvidenceIssue[] {
  const issues: RealEvidenceIssue[] = []

  if (realExecutionEvidenceLedger.status !== 'awaiting-real-execution') {
    issues.push({
      id: 'real-execution-status-overclaim',
      severity: 'error',
      message: '真实执行证据台账不得在未执行前标记完成。',
    })
  }

  if (realExecutionEvidenceLedger.records.length < 8) {
    issues.push({
      id: 'real-execution-records-too-few',
      severity: 'error',
      message: '真实执行记录项不足。',
    })
  }

  if (buildFailurePlaybook.failureTypes.length < 6) {
    issues.push({
      id: 'failure-types-too-few',
      severity: 'warning',
      message: '构建失败类型覆盖偏少。',
    })
  }

  if (performanceMeasurementRecords.routes.length < 5) {
    issues.push({
      id: 'performance-record-routes-too-few',
      severity: 'error',
      message: '性能实测路由记录不足。',
    })
  }

  if (browserQaRecords.matrix.length < 5) {
    issues.push({
      id: 'browser-qa-matrix-too-small',
      severity: 'error',
      message: '浏览器 QA 视口矩阵不足。',
    })
  }

  return issues
}
