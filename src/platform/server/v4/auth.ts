export type V4ActorRole = 'owner' | 'co-author' | 'editor' | 'reviewer' | 'guest-viewer' | 'ai-agent'

export type V4Actor = {
  id: string
  role: V4ActorRole
  permissions: string[]
}

const rolePermissions: Record<V4ActorRole, string[]> = {
  owner: ['collaboration.invite', 'draft.review', 'publish.approve', 'plugin.enable', 'vault.read.metadata'],
  'co-author': ['draft.write', 'draft.submit'],
  editor: ['draft.write', 'draft.submit'],
  reviewer: ['draft.review'],
  'guest-viewer': ['content.read'],
  'ai-agent': ['suggestion.create'],
}

export function createV4Actor(id: string, role: V4ActorRole): V4Actor {
  return { id, role, permissions: rolePermissions[role] ?? [] }
}

export function canV4(actor: V4Actor, permission: string): boolean {
  return actor.permissions.includes(permission)
}

export function assertV4Permission(actor: V4Actor, permission: string) {
  if (!canV4(actor, permission)) {
    throw new Error(`V4 permission denied: ${actor.role} cannot ${permission}`)
  }
}
