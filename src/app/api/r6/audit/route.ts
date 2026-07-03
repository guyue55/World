import { NextResponse } from 'next/server'
import { r6AuditEvents } from '@/features/r6-service-bridge'

export function GET() {
  return NextResponse.json({ scope: 'owner-only-audit-index', events: r6AuditEvents })
}
