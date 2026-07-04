export type V6AgentRole =
  | 'curator-agent'
  | 'memory-agent'
  | 'research-agent'
  | 'writing-agent'
  | 'risk-agent'
  | 'ops-agent'
  | 'migration-agent'
  | 'legacy-agent'

export type V6AgentSocietyMember = {
  id: string
  role: V6AgentRole
  canSelfEscalate: false
  canAuthorizeOtherAgents: false
  highRiskRequiresHumanApproval: true
}

export type V6AutonomousTask = {
  id: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  status: 'planned' | 'review-required' | 'approved' | 'rejected' | 'rolled-back'
}
