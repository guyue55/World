export type V2Role = 'owner' | 'admin' | 'operator' | 'editor' | 'reviewer' | 'viewer' | 'family-member'

export type V2Permission =
  | 'content.read'
  | 'content.write'
  | 'content.publish'
  | 'vault.read'
  | 'vault.write'
  | 'ai.suggest'
  | 'audit.read'
  | 'export.run'

export interface V2Actor {
  id: string
  role: V2Role
  displayName: string
}

export interface V2AuditEvent {
  id: string
  actorId: string
  action: string
  resource: string
  allowed: boolean
  createdAt: string
  reason: string
}

export interface V2ContentRecord {
  id: string
  title: string
  slug: string
  visibility: 'public' | 'draft' | 'private'
  body: string
  updatedAt: string
}

export interface V2VaultRecord {
  id: string
  title: string
  encryptedPayloadRef: string
  ownerId: string
  updatedAt: string
}

export interface V2ServiceResult<T> {
  ok: boolean
  status: number
  data?: T
  error?: string
  audit?: V2AuditEvent
}
