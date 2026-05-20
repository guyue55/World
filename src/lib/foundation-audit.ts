import auditCriteria from '../../data/domains/governance/foundation-audit-criteria.json'
import certification from '../../data/core/foundation-certification.json'
import { validateRouteManifest } from './route-manifest'
import { validateDependencyGraph } from './dependency-graph'
import { evaluateWorldKernel } from './world-kernel'
import { evaluateFoundationQuality } from './foundation-quality'
import { validateDocumentationRegistry } from './documentation-registry'
import { validateFallbackStrategy } from './fallbacks'
import { getCapabilitySlots } from './extensions'
import { getRuntimeStates } from './runtime-protocol'
import { getRecoveryPaths } from './maintenance'

export type FoundationAuditItem = {
  id: string
  category: string
  required: boolean
  passed: boolean
  detail: string
}

export type FoundationAuditReport = {
  version: string
  pass: boolean
  passRate: number
  certificationStatus: string
  items: FoundationAuditItem[]
}

function item(id: string, category: string, required: boolean, passed: boolean, detail: string): FoundationAuditItem {
  return { id, category, required, passed, detail }
}

export function getFoundationAuditCriteria() {
  return auditCriteria
}

export function getFoundationCertification() {
  return certification
}

export function evaluateFoundationAudit(): FoundationAuditReport {
  const kernel = evaluateWorldKernel()
  const quality = evaluateFoundationQuality()
  const routeIssues = validateRouteManifest()
  const dependencyIssues = validateDependencyGraph()
  const docIssues = validateDocumentationRegistry()
  const fallbackIssues = validateFallbackStrategy()

  const items: FoundationAuditItem[] = [
    item('core-data-present', 'structure', true, kernel.checks.skeleton.summary.nodeCount > 0, `${kernel.checks.skeleton.summary.nodeCount} nodes`),
    item('routes-registered', 'projection', true, routeIssues.filter((issue) => issue.severity === 'error').length === 0, `${routeIssues.length} route issues`),
    item('dependency-graph-valid', 'architecture', true, dependencyIssues.filter((issue) => issue.severity === 'error').length === 0, `${dependencyIssues.length} dependency issues`),
    item('kernel-check-zero-errors', 'kernel', true, kernel.blockingErrors === 0, `${kernel.blockingErrors} blocking errors`),
    item('foundation-gate-passed', 'governance', true, quality.pass, `score=${quality.totalScore}`),
    item('docs-registered', 'documentation', true, docIssues.filter((issue) => issue.severity === 'error').length === 0, `${docIssues.length} doc issues`),
    item('fallbacks-present', 'resilience', true, fallbackIssues.filter((issue) => issue.severity === 'error').length === 0, `${fallbackIssues.length} fallback issues`),
    item('future-slots-reserved', 'future', true, getCapabilitySlots().length >= 10, `${getCapabilitySlots().length} slots`),
    item('operations-defined', 'operations', true, getRuntimeStates().length >= 6, `${getRuntimeStates().length} states`),
    item('recovery-defined', 'resilience', true, getRecoveryPaths().length >= 5, `${getRecoveryPaths().length} recovery paths`),
  ]

  const required = items.filter((auditItem) => auditItem.required)
  const passed = required.filter((auditItem) => auditItem.passed)
  const passRate = required.length === 0 ? 1 : passed.length / required.length

  return {
    version: auditCriteria.version,
    pass: passRate >= auditCriteria.minimumPassRate,
    passRate,
    certificationStatus: certification.status,
    items,
  }
}
