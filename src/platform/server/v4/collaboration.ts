import { assertV4Permission, type V4Actor } from './auth'
import { V4AuditRecorder } from './audit'

export type V4Draft = {
  id: string
  title: string
  status: 'draft' | 'submitted' | 'approved'
  ownerId: string
}

export function submitV4Draft(actor: V4Actor, draft: V4Draft, audit: V4AuditRecorder): V4Draft {
  assertV4Permission(actor, 'draft.submit')
  const next = { ...draft, status: 'submitted' as const }
  audit.record({ id: `audit-${draft.id}-submit`, actorId: actor.id, action: 'draft.submit', status: 'allowed' })
  return next
}

export function approveV4Draft(actor: V4Actor, draft: V4Draft, audit: V4AuditRecorder): V4Draft {
  assertV4Permission(actor, 'publish.approve')
  const next = { ...draft, status: 'approved' as const }
  audit.record({ id: `audit-${draft.id}-approve`, actorId: actor.id, action: 'publish.approve', status: 'allowed' })
  return next
}
