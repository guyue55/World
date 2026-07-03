import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ scope: 'owner-only-draft-index', items: [], note: 'R6 keeps node write persistence behind future owner auth.' })
}
