import { NextResponse } from 'next/server'
import { createPublicWorldIndex } from '@/lib/public-index'

export function GET() {
  return NextResponse.json(createPublicWorldIndex())
}
