import { NextResponse } from 'next/server'
import { requireOwner } from '@/lib/owner-auth'
import { getOwnerReadonlyConsoleLedger } from '@/lib/owner-readonly-console'

export function GET(request: Request) {
  const guard = requireOwner(request, 'owner-only-summary')
  if (!guard.allowed) return guard.response

  return NextResponse.json(
    {
      scope: 'owner-only-summary',
      ledger: getOwnerReadonlyConsoleLedger(),
    },
    { headers: { 'cache-control': 'no-store' } },
  )
}
