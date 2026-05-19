import kernelManifest from '../../data/world-kernel-manifest.json'
import { evaluateWorldSkeletonHealth } from './world-skeleton-health'
import { evaluateWorldInvariants } from './world-invariants'
import { validateFallbackStrategy } from './fallbacks'
import { validateExportContract } from './export-contract'
import { validateCompatibilityMatrix } from './compatibility'
import { validateExtensionRegistry } from './extensions'
import { validateAtlasContract } from './atlas-contract'
import { validateSemanticLayers } from './ontology'
import { validateRelationPolicy } from './relation-policy'
import { evaluateAIBoundary } from './ai-boundary'
import { validateProjectionContracts } from './projection-contracts'

export type KernelIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export type WorldKernelReport = {
  version: string
  score: number
  blockingErrors: number
  warnings: number
  checks: {
    skeleton: ReturnType<typeof evaluateWorldSkeletonHealth>
    invariants: ReturnType<typeof evaluateWorldInvariants>
  }
  issues: KernelIssue[]
}

function toKernelIssue(prefix: string, issue: { id?: string; severity?: string; message?: string }): KernelIssue {
  return {
    id: `${prefix}-${issue.id ?? issue.message ?? 'issue'}`,
    severity: issue.severity === 'error' ? 'error' : 'warning',
    message: issue.message ?? String(issue.id ?? 'unknown issue'),
  }
}

export function getWorldKernelManifest() {
  return kernelManifest
}

export function evaluateWorldKernel(): WorldKernelReport {
  const skeleton = evaluateWorldSkeletonHealth()
  const invariants = evaluateWorldInvariants()

  const issues: KernelIssue[] = [
    ...validateFallbackStrategy().map((issue) => toKernelIssue('fallback', issue)),
    ...validateExportContract().map((issue) => toKernelIssue('export', issue)),
    ...validateCompatibilityMatrix().map((issue) => toKernelIssue('compat', issue)),
    ...validateExtensionRegistry().map((issue) => toKernelIssue('extension', issue)),
    ...validateAtlasContract().map((issue) => toKernelIssue('atlas', issue)),
    ...validateSemanticLayers().map((issue) => toKernelIssue('ontology', issue)),
    ...validateRelationPolicy().map((issue) => toKernelIssue('relation', issue)),
    ...evaluateAIBoundary().map((issue) => toKernelIssue('ai', issue)),
    ...validateProjectionContracts().map((issue) => toKernelIssue('projection', issue)),
    ...invariants
      .filter((item) => !item.passed)
      .map((item) => ({
        id: `invariant-${item.id}`,
        severity: 'error' as const,
        message: `不变量失败：${item.expected} / ${item.actual}`,
      })),
  ]

  const blockingErrors = issues.filter((issue) => issue.severity === 'error').length
  const warnings = issues.filter((issue) => issue.severity === 'warning').length
  const score = Math.max(0, Math.min(100, skeleton.score - blockingErrors * 20 - warnings * 2))

  return {
    version: kernelManifest.version,
    score,
    blockingErrors,
    warnings,
    checks: {
      skeleton,
      invariants,
    },
    issues,
  }
}

export function assertWorldKernelHealthy(): void {
  const report = evaluateWorldKernel()

  if (report.blockingErrors > kernelManifest.healthThresholds.blockingErrors) {
    throw new Error(report.issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }
}
