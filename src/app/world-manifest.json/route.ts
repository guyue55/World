import manifest from '../../../data/core/world-manifest.json'
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json(manifest)
}
