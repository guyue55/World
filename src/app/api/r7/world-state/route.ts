import { NextResponse } from 'next/server'
import { r7WorldHealth, r7WorldState } from '@/features/r7-world-evolution'

export function GET() {
  return NextResponse.json({ state: r7WorldState, health: r7WorldHealth })
}
