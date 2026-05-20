import localAcceptanceRunner from '../../data/release/local-acceptance-runner.json'
import stageClosureUpdateProtocol from '../../data/release/stage-closure-update-protocol.json'
import firstStageAcceptanceReportSchema from '../../data/release/first-stage-acceptance-report-schema.json'

export function getLocalAcceptanceRunner() {
  return localAcceptanceRunner
}

export function getStageClosureUpdateProtocol() {
  return stageClosureUpdateProtocol
}

export function getFirstStageAcceptanceReportSchema() {
  return firstStageAcceptanceReportSchema
}

export function isStageClosureEvidenceReady(report: {
  commands?: Array<{ status: string }>
  manualQa?: { status: string }
  performance?: { status: string }
  previewDeployment?: { status: string; url?: string }
  blockingDefects?: unknown[]
}) {
  return Boolean(
    report.commands?.every((item) => item.status === 'passed') &&
      report.manualQa?.status === 'passed' &&
      report.performance?.status === 'passed' &&
      report.previewDeployment?.status === 'passed' &&
      report.previewDeployment?.url &&
      Array.isArray(report.blockingDefects) &&
      report.blockingDefects.length === 0,
  )
}
