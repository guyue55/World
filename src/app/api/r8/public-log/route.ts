import { NextResponse } from 'next/server'
import { r8WorldReleaseLog } from '@/features/r8-public-operations'

export function GET() {
  return NextResponse.json({ events: r8WorldReleaseLog })
}
