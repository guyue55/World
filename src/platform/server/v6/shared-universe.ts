import { V6AuditRecorder } from './audit'

export type V6UniverseRoom = {
  id: string
  spatialPermission: 'public' | 'trusted' | 'family' | 'private'
  semanticFallbackRequired: true
}

export function enterV6UniverseRoom(room: V6UniverseRoom, actorId: string, audit: V6AuditRecorder) {
  if (room.spatialPermission === 'private') {
    audit.record({ id: `audit-${room.id}-enter-review`, actorId, action: 'universe.enter', status: 'review-required' })
    return { allowed: false, reason: 'private room requires owner approval', semanticFallbackRequired: room.semanticFallbackRequired }
  }

  audit.record({ id: `audit-${room.id}-enter`, actorId, action: 'universe.enter', status: 'allowed' })
  return { allowed: true, reason: 'allowed', semanticFallbackRequired: room.semanticFallbackRequired }
}
