import type { V2Actor, V2AuditEvent } from './domain'

export function createAuditEvent(params: {
  actor: V2Actor
  action: string
  resource: string
  allowed: boolean
  reason: string
}): V2AuditEvent {
  return {
    id: `audit-${params.action}-${Date.now()}`,
    actorId: params.actor.id,
    action: params.action,
    resource: params.resource,
    allowed: params.allowed,
    reason: params.reason,
    createdAt: new Date().toISOString(),
  }
}

export class InMemoryAuditLog {
  private readonly events: V2AuditEvent[] = []

  record(event: V2AuditEvent) {
    this.events.push(event)
    return event
  }

  list() {
    return [...this.events]
  }
}

export const v2AuditLog = new InMemoryAuditLog()
