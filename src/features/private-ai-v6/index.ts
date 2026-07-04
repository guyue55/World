import aiRedactedContext from '../../../data/v6-private-archive/ai-redacted-context.json'
import stage01 from '../../../data/v6-private-ai/stage-01-private-archive-boundary.json'
import stage02 from '../../../data/v6-private-ai/stage-02-ai-world-companion.json'
import stage03 from '../../../data/v6-private-ai/stage-03-approval-audit-memory.json'
import stage04 from '../../../data/v6-private-ai/stage-04-closure-handoff.json'
import approvalQueue from '../../../data/v6-private-ai/approval-queue.json'
import auditLedger from '../../../data/v6-private-ai/audit-ledger.json'
import memoryGraph from '../../../data/v6-private-ai/redacted-memory-graph.json'
import type { V6AiApprovalItem, V6AiAuditEvent, V6AiBoundaryViolation, V6AiDashboard, V6AiMemoryEdge, V6AiMemoryNode, V6AiStageRecord } from './types'

const stages = [stage01, stage02, stage03, stage04] as V6AiStageRecord[]
const approvalItems = approvalQueue.items as V6AiApprovalItem[]
const auditEvents = auditLedger.events as V6AiAuditEvent[]
const memoryNodes = memoryGraph.nodes as V6AiMemoryNode[]
const memoryEdges = memoryGraph.edges as V6AiMemoryEdge[]

export function getV6PrivateAiStages(): V6AiStageRecord[] {
  return stages
}

export function getV6AiApprovalItems(): V6AiApprovalItem[] {
  return approvalItems
}

export function getV6AiAuditEvents(): V6AiAuditEvent[] {
  return auditEvents
}

export function getV6AiRedactedMemoryGraph(): { nodes: V6AiMemoryNode[]; edges: V6AiMemoryEdge[] } {
  return { nodes: memoryNodes, edges: memoryEdges }
}

export function getV6AiRedactedContext() {
  return aiRedactedContext
}

export function createV6AiDashboard(): V6AiDashboard {
  return {
    stageCount: stages.length,
    completedStages: stages.filter((stage) => stage.status === 'complete').length,
    approvalItems: approvalItems.length,
    blockedItems: approvalItems.filter((item) => item.status === 'forbidden' || item.risk === 'critical').length,
    auditEvents: auditEvents.length,
    memoryNodes: memoryNodes.length,
    productionLive: false,
  }
}

export function assertV6PrivateAiBoundary(): V6AiBoundaryViolation[] {
  const violations: V6AiBoundaryViolation[] = []
  const context = aiRedactedContext as { forbiddenActions: string[]; forbiddenSources: string[] }

  if (stages.length !== 4 || stages.some((stage) => stage.status !== 'complete')) {
    violations.push({ id: 'stage-completion', severity: 'high', message: 'V6 private AI stages must be complete.' })
  }

  if (!context.forbiddenSources.includes('vault originals')) {
    violations.push({ id: 'vault-source-policy', severity: 'critical', message: 'Vault originals must be forbidden AI sources.' })
  }

  if (!context.forbiddenActions.includes('publish private archive')) {
    violations.push({ id: 'publish-policy', severity: 'critical', message: 'AI must not publish private archive content.' })
  }

  const executablePrivateSuggestions = approvalItems.filter((item) => item.allowedExecution)
  if (executablePrivateSuggestions.length > 0) {
    violations.push({ id: 'auto-execution', severity: 'critical', message: 'AI suggestions cannot execute without owner review.' })
  }

  const rawAccessEvents = auditEvents.filter((event) => event.rawPrivateContentAccessed)
  if (rawAccessEvents.length > 0) {
    violations.push({ id: 'raw-access', severity: 'critical', message: 'Audit ledger reports raw private content access.' })
  }

  const privateGraphLeak = [...memoryNodes.map((node) => node.visibility), ...memoryEdges.map((edge) => edge.visibility)].some((visibility) => visibility !== 'public' && visibility !== 'redacted')
  if (privateGraphLeak) {
    violations.push({ id: 'memory-graph-visibility', severity: 'high', message: 'Memory graph must export only public or redacted visibility.' })
  }

  return violations
}
