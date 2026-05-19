import manifest from '../../../data/world-manifest.json'
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json(manifest)
}
