export type V6AiRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type V6AiSuggestionStatus = 'review-required' | 'owner-review-required' | 'forbidden' | 'approved-summary-only'

export interface V6AiStageRecord {
  id: string
  version: string
  round: string
  stage: string
  batches: string[]
  status: 'complete'
  productionLive: false
}

export interface V6AiApprovalItem {
  id: string
  kind: string
  title: string
  risk: V6AiRiskLevel
  status: V6AiSuggestionStatus
  source: string
  allowedExecution: boolean
}

export interface V6AiAuditEvent {
  id: string
  actor: string
  action: string
  target: string
  result: string
  rawPrivateContentAccessed: boolean
}

export interface V6AiMemoryNode {
  id: string
  label: string
  visibility: 'public' | 'redacted'
  kind: string
}

export interface V6AiMemoryEdge {
  from: string
  to: string
  relation: string
  visibility: 'public' | 'redacted'
}

export interface V6AiDashboard {
  stageCount: number
  completedStages: number
  approvalItems: number
  blockedItems: number
  auditEvents: number
  memoryNodes: number
  productionLive: false
}

export interface V6AiBoundaryViolation {
  id: string
  message: string
  severity: V6AiRiskLevel
}
