import qualityRadar from '../../data/foundation-quality-radar.json'
import { evaluateWorldKernel } from './world-kernel'
import { validateExtensionRegistry } from './extensions'
import { validateFallbackStrategy } from './fallbacks'
import { validateExportContract } from './export-contract'

export type QualityDimensionScore = {
  id: string
  weight: number
  score: number
  description: string
}

export type FoundationQualityReport = {
  totalScore: number
  pass: boolean
  dimensions: QualityDimensionScore[]
}

export function getFoundationQualityRadar() {
  return qualityRadar
}

export function evaluateFoundationQuality(): FoundationQualityReport {
  const kernel = evaluateWorldKernel()
  const extensionErrors = validateExtensionRegistry().filter((issue) => issue.severity === 'error').length
  const fallbackErrors = validateFallbackStrategy().filter((issue) => issue.severity === 'error').length
  const exportErrors = validateExportContract().filter((issue) => issue.severity === 'error').length

  const dimensions = qualityRadar.dimensions.map((dimension) => {
    let score = dimension.weight

    if (dimension.id === 'boundary' && kernel.blockingErrors > 0) score = 0
    if (dimension.id === 'future' && extensionErrors > 0) score = Math.max(0, score - 8)
    if (dimension.id === 'fallback' && fallbackErrors > 0) score = 0
    if (dimension.id === 'interoperability' && exportErrors > 0) score = Math.max(0, score - 8)
    if (dimension.id === 'craft' && kernel.warnings > 8) score = Math.max(0, score - 3)

    return {
      id: dimension.id,
      weight: dimension.weight,
      score,
      description: dimension.description,
    }
  })

  const totalScore = dimensions.reduce((sum, item) => sum + item.score, 0)

  return {
    totalScore,
    pass: totalScore >= qualityRadar.minimumTotalScore && kernel.blockingErrors === 0,
    dimensions,
  }
}
