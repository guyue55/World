import type { V2Actor } from './domain'

export function getDemoActor(role: V2Actor['role'] = 'owner'): V2Actor {
  return {
    id: `demo-${role}`,
    role,
    displayName: `Demo ${role}`,
  }
}

export function getActorFromRequest(request: Request): V2Actor {
  const role = request.headers.get('x-guyue-role') as V2Actor['role'] | null
  const safeRole = role ?? 'viewer'

  return getDemoActor(safeRole)
}
