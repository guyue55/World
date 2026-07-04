export type R4Visibility = 'public' | 'semi-public' | 'private' | 'sealed' | 'public-draft'
export type R4Energy = 'low' | 'medium' | 'high'
export type R4DangerLevel = 'safe' | 'guarded' | 'danger' | 'critical'

export type R4InboxItem = {
  id: string
  title: string
  kind: string
  rawInput: string
  suggestedArea: string
  suggestedVisibility: R4Visibility
  suggestedLifeStage: string
  nextAction: string
  risk: 'low' | 'medium' | 'high' | 'privacy'
}

export type R4ConsolePanel = {
  id: string
  title: string
  purpose: string
  primaryAction: string
  metric: string
}

export type R4NodeOperation = {
  id: string
  worldName: string
  realName: string
  dangerLevel: R4DangerLevel
  requiresConfirmation: boolean
  description: string
}

export type R4MaintenanceTask = {
  id: string
  title: string
  energy: R4Energy
  area: string
  reason: string
  expectedResult: string
}

export type R4PermissionRisk = {
  id: string
  title: string
  severity: 'medium' | 'high' | 'critical'
  rule: string
  status: 'guarded' | 'open'
}

export type R4AuditEvent = {
  id: string
  actor: string
  action: string
  target: string
  result: string
  requiresReview: boolean
}

export type R4Summary = {
  stages: number
  batches: number
  inboxItems: number
  panels: number
  tasks: number
  risks: number
  openRisks: number
  auditEvents: number
  worldHealth: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
