import consolidation from '../../data/world-kernel/world-kernel-consolidation-v1.json'
import scriptMap from '../../data/world-kernel/script-consolidation-map.json'

export type WorldKernelConsolidationProgress = keyof typeof consolidation.progress

export const WORLD_KERNEL_CANONICAL_SOURCES = consolidation.canonicalSources
export const WORLD_KERNEL_LEGACY_ADAPTERS = consolidation.legacyAdapters
export const WORLD_KERNEL_FORMAL_RUNTIME = consolidation.formalRuntime
export const WORLD_KERNEL_FORMAL_PUBLIC_ROUTES = consolidation.formalPublicRoutes
export const WORLD_KERNEL_LONG_TERM_CHECKS = consolidation.longTermChecks
export const WORLD_KERNEL_SCRIPT_GATE_MAP = scriptMap.longTermGates

export function getWorldKernelConsolidationStatus() {
  return {
    name: consolidation.name,
    status: consolidation.status,
    progress: consolidation.progress,
    blockedByExternalProductionEvidence: consolidation.progress.K5_productionEvidence,
  }
}

export function getWorldKernelCanonicalSource(name: keyof typeof consolidation.canonicalSources) {
  return WORLD_KERNEL_CANONICAL_SOURCES[name]
}
