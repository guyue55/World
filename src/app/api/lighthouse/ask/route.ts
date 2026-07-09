// 用途：灯塔问答 API，低光模式下返回静态推荐，不调用真实 AI

import { NextResponse } from 'next/server'
import { runLowLightLighthouse } from '@/server/ai/lighthouse-runtime'

export const dynamic = 'force-static'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const question = (searchParams.get('q') ?? '').trim()

  if (!question) {
    return NextResponse.json({ error: '问题不能为空' }, { status: 400 })
  }

  return NextResponse.json(runLowLightLighthouse(question))
}
