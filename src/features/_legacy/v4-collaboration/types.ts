export type V4CollaborationRole =
  | 'owner'
  | 'co-author'
  | 'family-curator'
  | 'editor'
  | 'reviewer'
  | 'guest-viewer'
  | 'ai-agent'
  | 'legacy-recipient'

export type V4CollaborationGate = {
  action: string
  requiredRole: V4CollaborationRole
  requiresHumanApproval: boolean
  auditRequired: boolean
}

export const v4CollaborationGates: V4CollaborationGate[] = [
  { action: 'invite collaborator', requiredRole: 'owner', requiresHumanApproval: true, auditRequired: true },
  { action: 'submit draft', requiredRole: 'editor', requiresHumanApproval: false, auditRequired: true },
  { action: 'approve publish', requiredRole: 'owner', requiresHumanApproval: true, auditRequired: true },
  { action: 'AI suggest edit', requiredRole: 'ai-agent', requiresHumanApproval: true, auditRequired: true },
]
