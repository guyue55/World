import { NextResponse } from 'next/server'
import { r6ExportJobs } from '@/features/r6-service-bridge'
import { requireOwner } from '@/lib/owner-auth'

export function GET(request: Request) {
  const guard = requireOwner(request, 'owner-only-export-index')
  if (!guard.allowed) return guard.response
  return NextResponse.json({ scope: 'owner-only-export-index', jobs: r6ExportJobs }, { headers: { 'cache-control': 'no-store' } })
}

export function POST(request: Request) {
  const guard = requireOwner(request, 'owner-only-export-create')
  if (!guard.allowed) return guard.response
  return NextResponse.json(
    { ok: true, status: 'queued', note: 'R6 export job creation is owner-gated and ready for the persistent queue adapter.' },
    { status: 202, headers: { 'cache-control': 'no-store' } },
  )
}
