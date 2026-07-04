import observabilityMetrics from '../../data/operations/observability-metrics.json'
import { evaluateWorldKernel } from './world-kernel'
import { evaluateFoundationQuality } from './foundation-quality'
import { getPublicNodes } from './nodes'
import { getAllRelations } from './relations'
import { getAllPaths } from './paths'
import { getAllWorldEvents } from './world-events'
import { getDocumentationRegistry, getAdrIndex } from './documentation-registry'
import { getFallbackRules } from './fallbacks'

export type ObservabilityMetric = {
  id: string
  source: string
  target: string
}

export type ObservabilitySnapshot = {
  metrics: Array<ObservabilityMetric & { value: number | string }>
}

export function getObservabilityMetrics(): ObservabilityMetric[] {
  return observabilityMetrics.metrics as ObservabilityMetric[]
}

export function createObservabilitySnapshot(): ObservabilitySnapshot {
  const kernel = evaluateWorldKernel()
  const foundation = evaluateFoundationQuality()

  const values: Record<string, number | string> = {
    kernelScore: kernel.score,
    blockingErrors: kernel.blockingErrors,
    foundationScore: foundation.totalScore,
    publicNodeCount: getPublicNodes().length,
    relationCount: getAllRelations().length,
    pathCount: getAllPaths().length,
    worldEventCount: getAllWorldEvents().length,
    registeredDocs: getDocumentationRegistry().requiredDocs.length,
    adrCount: getAdrIndex().records.length,
    fallbackCount: getFallbackRules().length,
  }

  return {
    metrics: getObservabilityMetrics().map((metric) => ({
      ...metric,
      value: values[metric.id] ?? 'unknown',
    })),
  }
}
