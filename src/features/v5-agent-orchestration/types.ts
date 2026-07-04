export type V5AgentKind =
  | 'content-curator'
  | 'memory-organizer'
  | 'exhibition-planner'
  | 'risk-reviewer'
  | 'publishing-assistant'
  | 'ops-monitor'
  | 'migration-assistant'

export type V5AgentProfile = {
  id: string
  kind: V5AgentKind
  capabilities: string[]
  costLimit: number
  canAuthorizeOtherAgents: false
  canPublishWithoutOwner: false
  canReadVaultRaw: false
}

export type V5RuntimeTask = {
  id: string
  agentId: string
  action: string
  status: 'planned' | 'review-required' | 'approved' | 'rejected' | 'rolled-back'
}
