import {
  WORLD_KERNEL_FORMAL_RUNTIME,
  WORLD_KERNEL_LEGACY_ADAPTERS,
  getWorldKernelConsolidationStatus,
} from './world-kernel-registry'

export type WorldKernelRuntimeMode = 'formal-product-runtime' | 'legacy-reference-runtime'

export function getFormalWorldRuntime() {
  return {
    mode: 'formal-product-runtime' as const,
    shell: WORLD_KERNEL_FORMAL_RUNTIME.shell,
    backdrop: WORLD_KERNEL_FORMAL_RUNTIME.backdrop,
    journeyDock: WORLD_KERNEL_FORMAL_RUNTIME.journeyDock,
    routePolicy: WORLD_KERNEL_FORMAL_RUNTIME.routePolicy,
    routeDecision: WORLD_KERNEL_FORMAL_RUNTIME.routeDecision,
    status: getWorldKernelConsolidationStatus().progress.K2_runtimeBoundary,
  }
}

export function getLegacyRuntimePolicy() {
  return {
    mode: 'legacy-reference-runtime' as const,
    policy: WORLD_KERNEL_LEGACY_ADAPTERS.principle,
    legacyDataPrefixes: WORLD_KERNEL_LEGACY_ADAPTERS.legacyDataPrefixes,
    legacyComponentPrefixes: WORLD_KERNEL_LEGACY_ADAPTERS.legacyComponentPrefixes,
    formalAccess: WORLD_KERNEL_LEGACY_ADAPTERS.formalAccess,
  }
}

export function isForbiddenFormalRuntimeToken(token: string) {
  return WORLD_KERNEL_FORMAL_RUNTIME.forbiddenPublicRuntimeImports.some((item) => token.includes(item))
}
