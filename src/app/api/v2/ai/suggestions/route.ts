import { createAuditEvent, v2AuditLog } from '@/server/v2/audit'
import { getActorFromRequest } from '@/server/v2/context'
import { jsonResult, ok } from '@/server/v2/response'
import { requirePermission } from '@/server/v2/permissions'

export function GET(request: Request) {
  const actor = getActorFromRequest(request)
  const guard = requirePermission(actor, 'ai.suggest')
  const audit = v2AuditLog.record(createAuditEvent({
    actor,
    action: 'ai.suggest',
    resource: 'ai:suggestions',
    allowed: guard.allowed,
    reason: guard.reason,
  }))

  if (!guard.allowed) {
    return jsonResult({ ok: false, status: 403, error: guard.reason, audit })
  }

  return jsonResult({
    ...ok({
      suggestions: [
        {
          id: 'suggestion-v2-1',
          title: '补齐真实服务实现证据',
          state: 'suggested',
          autoPublish: false,
        },
      ],
    }),
    audit,
  })
}
