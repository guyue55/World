import type { V2Actor, V2Permission, V2Role } from './domain'

const rolePermissions: Record<V2Role, V2Permission[]> = {
  owner: ['content.read', 'content.write', 'content.publish', 'vault.read', 'vault.write', 'ai.suggest', 'audit.read', 'export.run'],
  admin: ['content.read', 'content.write', 'content.publish', 'ai.suggest', 'audit.read', 'export.run'],
  operator: ['content.read', 'content.write', 'ai.suggest', 'audit.read', 'export.run'],
  editor: ['content.read', 'content.write', 'ai.suggest'],
  reviewer: ['content.read', 'audit.read'],
  viewer: ['content.read'],
  'family-member': ['content.read'],
}

export function hasPermission(actor: V2Actor, permission: V2Permission) {
  return rolePermissions[actor.role].includes(permission)
}

export function requirePermission(actor: V2Actor, permission: V2Permission) {
  if (!hasPermission(actor, permission)) {
    return {
      allowed: false,
      reason: `${actor.role} lacks ${permission}`,
    }
  }

  return {
    allowed: true,
    reason: `${actor.role} has ${permission}`,
  }
}

export function getRolePermissions(role: V2Role) {
  return [...rolePermissions[role]]
}
