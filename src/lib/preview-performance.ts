import previewSmokeExecutionContract from '../../data/release/preview-smoke-execution-contract.json'
import previewSmokeConfig from '../../data/release/preview-smoke-config.json'
import performanceExecutionContract from '../../data/engineering/performance-execution-contract.json'
import performanceMeasurementRecords from '../../data/engineering/performance-measurement-records.json'

export function getPreviewSmokeExecutionContract() {
  return previewSmokeExecutionContract
}

export function getPreviewSmokeConfig() {
  return previewSmokeConfig
}

export function getPerformanceExecutionContract() {
  return performanceExecutionContract
}

export function getPerformanceMeasurementRecords() {
  return performanceMeasurementRecords
}

export function getPreviewPerformanceSummary() {
  const previewPending = previewSmokeConfig.routes.filter((route) => route.status !== 'passed').length
  const performancePending = performanceMeasurementRecords.routes.filter((route) => route.status !== 'measured').length

  return {
    stageProgress: previewSmokeExecutionContract.stageProgress,
    previewRoutes: previewSmokeConfig.routes.length,
    previewPending,
    performanceRoutes: performanceMeasurementRecords.routes.length,
    performancePending,
    requiredMetrics: performanceExecutionContract.requiredMetrics.length,
  }
}
