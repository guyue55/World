import type { V2Actor } from './domain'

export function getDemoActor(role: V2Actor['role'] = 'owner'): V2Actor {
  return {
    id: `demo-${role}`,
    role,
    displayName: `Demo ${role}`,
  }
}

function hasValidOwnerToken(request: Request) {
  const configuredToken = process.env.GUYUE_OWNER_TOKEN ?? process.env.R8_OWNER_TOKEN
  if (!configuredToken) return false

  const authorization = request.headers.get('authorization') ?? ''
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : request.headers.get('x-guyue-owner-token')?.trim()

  return token === configuredToken
}

export function getActorFromRequest(request: Request): V2Actor {
  if (hasValidOwnerToken(request)) return getDemoActor('owner')
  return getDemoActor('viewer')
}
