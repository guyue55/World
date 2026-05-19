import previewSmokeChecks from '../../data/preview-smoke-checks.json'
import previewDeploymentRecord from '../../data/preview-deployment-record.json'
import performanceRunbook from '../../data/performance-runbook.json'

export function getPreviewSmokeChecks() {
  return previewSmokeChecks
}

export function getPreviewDeploymentRecord() {
  return previewDeploymentRecord
}

export function getPerformanceRunbook() {
  return performanceRunbook
}

export function canCloseAfterPreview(record: {
  previewUrl?: string
  checks?: Record<string, string>
  blockingIssues?: unknown[]
}) {
  return Boolean(
    record.previewUrl &&
      record.checks &&
      Object.values(record.checks).every((status) => status === 'passed') &&
      Array.isArray(record.blockingIssues) &&
      record.blockingIssues.length === 0,
  )
}
