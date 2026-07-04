import { createAuditEvent, v2AuditLog } from '@/server/v2/audit'
import { getActorFromRequest } from '@/server/v2/context'
import { jsonResult, ok } from '@/server/v2/response'
import { requirePermission } from '@/server/v2/permissions'
import { v2Repository } from '@/server/v2/repository'

export function GET(request: Request) {
  const actor = getActorFromRequest(request)
  const guard = requirePermission(actor, 'content.read')
  const audit = v2AuditLog.record(createAuditEvent({
    actor,
    action: 'content.read',
    resource: 'content:public',
    allowed: guard.allowed,
    reason: guard.reason,
  }))

  if (!guard.allowed) {
    return jsonResult({ ok: false, status: 403, error: guard.reason, audit })
  }

  return jsonResult({
    ...ok({ items: v2Repository.listPublicContent() }),
    audit,
  })
}
