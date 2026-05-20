export type V4AuditEvent = {
  id: string
  actorId: string
  action: string
  status: 'allowed' | 'denied' | 'review-required'
  createdAt: string
  metadata?: Record<string, string | number | boolean>
}

export class V4AuditRecorder {
  private readonly events: V4AuditEvent[] = []

  record(event: Omit<V4AuditEvent, 'createdAt'>) {
    const createdAt = '2026-05-20T00:00:00.000Z'
    this.events.push({ ...event, createdAt })
  }

  list() {
    return [...this.events]
  }

  hasAction(action: string) {
    return this.events.some((event) => event.action === action)
  }
}
