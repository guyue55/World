import { NextResponse } from 'next/server'
import { getR7PublicWorldLog } from '@/features/r7-world-evolution'

export function GET() {
  return NextResponse.json({ scope: 'public-world-log-summary', events: getR7PublicWorldLog() })
}
