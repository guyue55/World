import { assertV4Permission, type V4Actor } from './auth'
import { V4AuditRecorder } from './audit'

export type V4PluginExecutionRequest = {
  pluginName: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  wantsVaultRawAccess: boolean
  wantsExternalPublish: boolean
}

export function evaluateV4PluginExecution(actor: V4Actor, request: V4PluginExecutionRequest, audit: V4AuditRecorder) {
  assertV4Permission(actor, 'plugin.enable')

  if (request.wantsVaultRawAccess) {
    audit.record({ id: `audit-${request.pluginName}-vault-deny`, actorId: actor.id, action: 'plugin.vault.raw', status: 'denied' })
    return { allowed: false, reason: 'raw vault access is forbidden' }
  }

  if (request.wantsExternalPublish || request.riskLevel === 'critical' || request.riskLevel === 'high') {
    audit.record({ id: `audit-${request.pluginName}-review`, actorId: actor.id, action: 'plugin.execute', status: 'review-required' })
    return { allowed: false, reason: 'manual review required' }
  }

  audit.record({ id: `audit-${request.pluginName}-allow`, actorId: actor.id, action: 'plugin.execute', status: 'allowed' })
  return { allowed: true, reason: 'allowed in sandbox' }
}
