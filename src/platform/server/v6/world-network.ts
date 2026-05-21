import { V6AuditRecorder } from './audit'

export type V6WorldNetworkNode = {
  id: string
  visibility: 'public' | 'trusted' | 'family' | 'private'
}

export type V6WorldEvent = {
  id: string
  worldId: string
  summary: string
  containsPrivateRawContent: false
}

export function discoverV6World(node: V6WorldNetworkNode, audit: V6AuditRecorder) {
  if (node.visibility === 'private') {
    audit.record({ id: `audit-${node.id}-discover-redacted`, actorId: 'system', action: 'world.discover', status: 'redacted' })
    return { id: node.id, visible: false, capabilities: [] as string[] }
  }

  audit.record({ id: `audit-${node.id}-discover`, actorId: 'system', action: 'world.discover', status: 'allowed' })
  return { id: node.id, visible: true, capabilities: ['summary', 'public-events'] }
}

export function createV6WorldEvent(node: V6WorldNetworkNode, audit: V6AuditRecorder): V6WorldEvent {
  audit.record({ id: `audit-${node.id}-event`, actorId: 'system', action: 'world.event', status: node.visibility === 'private' ? 'redacted' : 'allowed' })
  return {
    id: `event-${node.id}`,
    worldId: node.id,
    summary: node.visibility === 'private' ? 'redacted private world signal' : 'public world update',
    containsPrivateRawContent: false,
  }
}
