import highFidelityPolishContract from '../../data/domains/experience/high-fidelity-polish-review-v1.json'

export type HighFidelityPolishContract = typeof highFidelityPolishContract

export type HighFidelityPolishSummary = {
  name: string
  version: string
  localOnly: boolean
  targetScore: number
  dimensionCount: number
  pillarCount: number
  reportPath: string
  requiredFallbackCount: number
  allowedOpenDefects: string[]
  dimensions: Array<{
    id: string
    label: string
    minimumScore: number
  }>
}

export function getHighFidelityPolishContract(): HighFidelityPolishContract {
  return highFidelityPolishContract
}

export function getHighFidelityPolishSummary(): HighFidelityPolishSummary {
  return {
    name: highFidelityPolishContract.name,
    version: highFidelityPolishContract.version,
    localOnly: highFidelityPolishContract.scope.localOnly,
    targetScore: highFidelityPolishContract.thresholds.minOverallScore,
    dimensionCount: highFidelityPolishContract.dimensions.length,
    pillarCount: highFidelityPolishContract.pillars.length,
    reportPath: highFidelityPolishContract.reports.m29,
    requiredFallbackCount: highFidelityPolishContract.requiredFallbackFiles.length,
    allowedOpenDefects: highFidelityPolishContract.acceptance.allowedOpenDefectSeverity,
    dimensions: highFidelityPolishContract.dimensions.map((dimension) => ({
      id: dimension.id,
      label: dimension.label,
      minimumScore: dimension.minimumScore,
    })),
  }
}
