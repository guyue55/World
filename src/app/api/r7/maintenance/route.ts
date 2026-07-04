import { NextResponse } from 'next/server'
import { r7MaintenanceQueue } from '@/features/r7-world-evolution'
import { requireOwner } from '@/lib/owner-auth'

export function GET(request: Request) {
  const guard = requireOwner(request, 'owner-only-maintenance-suggestions')
  if (!guard.allowed) return guard.response
  return NextResponse.json({ scope: 'owner-only-maintenance-suggestions', items: r7MaintenanceQueue }, { headers: { 'cache-control': 'no-store' } })
}
