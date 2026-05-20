import { V5AuditRecorder } from './audit'

export type V5WorldEndpoint = {
  id: string
  url: string
  trustLevel: 'public' | 'trusted' | 'family' | 'private' | 'blocked'
}

export type V5WorldSnapshot = {
  worldId: string
  checksum: string
  includesPrivateRawContent: false
}

export function createV5CrossWorldSnapshot(endpoint: V5WorldEndpoint, audit: V5AuditRecorder): V5WorldSnapshot {
  if (endpoint.trustLevel === 'blocked') {
    audit.record({ id: `audit-${endpoint.id}-blocked`, actorId: 'system', action: 'federation.snapshot', status: 'denied' })
    throw new Error('Blocked world endpoint')
  }

  audit.record({ id: `audit-${endpoint.id}-snapshot`, actorId: 'system', action: 'federation.snapshot', status: 'review-required' })
  return {
    worldId: endpoint.id,
    checksum: `checksum-${endpoint.id}`,
    includesPrivateRawContent: false,
  }
}
