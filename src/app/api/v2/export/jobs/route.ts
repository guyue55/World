import { createAuditEvent, v2AuditLog } from '@/server/v2/audit'
import { getActorFromRequest } from '@/server/v2/context'
import { jsonResult, ok } from '@/server/v2/response'
import { requirePermission } from '@/server/v2/permissions'

export function GET(request: Request) {
  const actor = getActorFromRequest(request)
  const guard = requirePermission(actor, 'export.run')
  const audit = v2AuditLog.record(createAuditEvent({
    actor,
    action: 'export.run',
    resource: 'export:jobs',
    allowed: guard.allowed,
    reason: guard.reason,
  }))

  if (!guard.allowed) {
    return jsonResult({ ok: false, status: 403, error: guard.reason, audit })
  }

  return jsonResult({
    ...ok({
      jobs: [
        {
          id: 'export-public-json',
          type: 'public-json-export',
          status: 'planned',
        },
      ],
    }),
    audit,
  })
}
