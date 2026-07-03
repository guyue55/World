import { NextResponse } from 'next/server'
import { r6ExportJobs } from '@/features/r6-service-bridge'

export function GET() {
  return NextResponse.json({ scope: 'owner-only-export-index', jobs: r6ExportJobs })
}
