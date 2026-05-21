export type V6AuditStatus = 'allowed' | 'denied' | 'review-required' | 'rolled-back' | 'redacted'

export type V6AuditEvent = {
  id: string
  actorId: string
  action: string
  status: V6AuditStatus
  createdAt: string
  metadata?: Record<string, string | number | boolean>
}

export class V6AuditRecorder {
  private readonly events: V6AuditEvent[] = []

  record(event: Omit<V6AuditEvent, 'createdAt'>) {
    this.events.push({ ...event, createdAt: '2026-05-20T00:00:00.000Z' })
  }

  list() {
    return [...this.events]
  }

  hasAction(action: string) {
    return this.events.some((event) => event.action === action)
  }
}
