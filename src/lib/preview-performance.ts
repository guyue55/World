import previewSmokeExecutionContract from '../../data/preview-smoke-execution-contract.json'
import previewSmokeConfig from '../../data/preview-smoke-config.json'
import performanceExecutionContract from '../../data/performance-execution-contract.json'
import performanceMeasurementRecords from '../../data/performance-measurement-records.json'

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
