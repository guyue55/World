import { NextResponse } from 'next/server'
import { r6ServiceHealth } from '@/features/r6-service-bridge'

export function GET() {
  return NextResponse.json(r6ServiceHealth)
}
