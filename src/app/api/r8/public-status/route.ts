import { NextResponse } from 'next/server'
import { getR8Summary, r8Roadmap } from '@/features/r8-public-operations'

export function GET() {
  return NextResponse.json({ version: r8Roadmap.version, name: r8Roadmap.name, summary: getR8Summary() })
}
