import { NextResponse } from 'next/server'
import { r8FeedbackLoop } from '@/features/r8-public-operations'

export function GET() {
  return NextResponse.json({ channels: r8FeedbackLoop.channels, writeMode: 'static-placeholder-owner-review-required' })
}
