import { V5AuditRecorder } from './audit'

export type V5PluginPackage = {
  id: string
  reviewStatus: 'draft' | 'reviewing' | 'approved' | 'deprecated' | 'blocked'
  installed: boolean
  enabled: boolean
  highRisk: boolean
}

export function installV5Plugin(plugin: V5PluginPackage, ownerId: string, audit: V5AuditRecorder): V5PluginPackage {
  if (plugin.reviewStatus !== 'approved') {
    audit.record({ id: `audit-${plugin.id}-install-deny`, actorId: ownerId, action: 'plugin.install', status: 'denied' })
    throw new Error('Plugin must be approved before install')
  }

  audit.record({ id: `audit-${plugin.id}-install`, actorId: ownerId, action: 'plugin.install', status: 'allowed' })
  return { ...plugin, installed: true, enabled: !plugin.highRisk }
}
