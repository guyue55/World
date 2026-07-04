import roadmap from '../../../data/r8-dynamic-world/roadmap.json'
import interactionSpec from '../../../data/r8-dynamic-world/interaction-spec.json'
import type { R8DynamicStage, R8DynamicSurface, R8DynamicSummary } from './types'

export const r8DynamicRoadmap = roadmap
export const r8DynamicStages = roadmap.stages as R8DynamicStage[]
export const r8DynamicBatches = roadmap.batches as string[]
export const r8RuntimeSignals = interactionSpec.runtimeSignals as string[]
export const r8DynamicSurfaces = interactionSpec.dynamicSurfaces as R8DynamicSurface[]
export const r8DynamicAcceptance = interactionSpec.acceptance as string[]

export function getR8DynamicSummary(): R8DynamicSummary {
  return {
    stages: r8DynamicStages.length,
    batches: r8DynamicBatches.length,
    surfaces: r8DynamicSurfaces.length,
    acceptanceItems: r8DynamicAcceptance.length,
    productionLive: Boolean(roadmap.productionLive),
    releaseReady: Boolean(roadmap.releaseReady),
    cleanProductionReady: Boolean(roadmap.cleanProductionReady),
  }
}
