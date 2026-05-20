export type V4GovernanceArea =
  | 'users'
  | 'roles'
  | 'plugins'
  | 'ai-calls'
  | 'publishing'
  | 'private-access'
  | 'exports'
  | 'audit-events'
  | 'cost-budget'

export type V4GovernanceControl = {
  area: V4GovernanceArea
  control: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  evidenceRequired: boolean
}

export const v4GovernanceControls: V4GovernanceControl[] = [
  { area: 'private-access', control: 'vault encryption proof', severity: 'critical', evidenceRequired: true },
  { area: 'plugins', control: 'plugin sandbox review', severity: 'critical', evidenceRequired: true },
  { area: 'ai-calls', control: 'prompt leakage guard', severity: 'high', evidenceRequired: true },
  { area: 'cost-budget', control: 'monthly AI budget alert', severity: 'medium', evidenceRequired: true },
]
