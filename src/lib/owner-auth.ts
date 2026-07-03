import { NextResponse } from 'next/server'

export type OwnerGuardResult =
  | { allowed: true }
  | { allowed: false; response: NextResponse }

function extractBearerToken(request: Request) {
  const authorization = request.headers.get('authorization') ?? ''
  const prefix = 'Bearer '
  if (authorization.startsWith(prefix)) return authorization.slice(prefix.length).trim()
  return request.headers.get('x-guyue-owner-token')?.trim() ?? ''
}

export function isOwnerRequest(request: Request) {
  const configuredToken = process.env.GUYUE_OWNER_TOKEN ?? process.env.R8_OWNER_TOKEN
  if (!configuredToken) return false
  return extractBearerToken(request) === configuredToken
}

export function requireOwner(request: Request, scope = 'owner-only'): OwnerGuardResult {
  if (isOwnerRequest(request)) return { allowed: true }

  return {
    allowed: false,
    response: NextResponse.json(
      {
        ok: false,
        scope,
        error: 'owner_auth_required',
        note: 'This endpoint is reserved for the owner workspace and requires a server-configured owner token.',
      },
      { status: 403, headers: { 'cache-control': 'no-store' } },
    ),
  }
}
