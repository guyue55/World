import { NextResponse } from 'next/server'
import { r6AuditEvents } from '@/features/r6-service-bridge'
import { requireOwner } from '@/lib/owner-auth'

export function GET(request: Request) {
  const guard = requireOwner(request, 'owner-only-audit-index')
  if (!guard.allowed) return guard.response
  return NextResponse.json({ scope: 'owner-only-audit-index', events: r6AuditEvents }, { headers: { 'cache-control': 'no-store' } })
}
