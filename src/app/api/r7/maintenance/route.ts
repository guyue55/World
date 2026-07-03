import { NextResponse } from 'next/server'
import { r7MaintenanceQueue } from '@/features/r7-world-evolution'

export function GET() {
  return NextResponse.json({ scope: 'owner-only-maintenance-suggestions', items: r7MaintenanceQueue })
}
