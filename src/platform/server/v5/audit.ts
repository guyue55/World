export type V5AuditStatus = 'allowed' | 'denied' | 'review-required' | 'rolled-back'

export type V5AuditEvent = {
  id: string
  actorId: string
  action: string
  status: V5AuditStatus
  createdAt: string
  metadata?: Record<string, string | number | boolean>
}

export class V5AuditRecorder {
  private readonly events: V5AuditEvent[] = []

  record(event: Omit<V5AuditEvent, 'createdAt'>) {
    this.events.push({ ...event, createdAt: '2026-05-20T00:00:00.000Z' })
  }

  list() {
    return [...this.events]
  }

  hasAction(action: string) {
    return this.events.some((event) => event.action === action)
  }
}
