// 用途：灯塔问答 API，低光模式下返回静态推荐，不调用真实 AI

import { NextResponse } from 'next/server'
import { getLighthouseRuntimeGovernance, normalizeLighthouseQuestion } from '@/server/ai/lighthouse-governance'
import { runLowLightLighthouse } from '@/server/ai/lighthouse-runtime'

export const dynamic = 'force-static'

export function GET(request: Request) {
  const governance = getLighthouseRuntimeGovernance()
  const { searchParams } = new URL(request.url)
  const question = normalizeLighthouseQuestion(searchParams.get('q') ?? '')

  if (!question) {
    return NextResponse.json({ error: '问题不能为空' }, { status: 400 })
  }

  const response = NextResponse.json(runLowLightLighthouse(question))
  response.headers.set('cache-control', governance.runtime.cachePolicy)
  response.headers.set('x-worldos-lighthouse-mode', governance.runtime.mode)
  response.headers.set('x-worldos-provider-status', governance.runtime.providerStatus)
  response.headers.set('x-worldos-question-max-length', String(governance.runtime.maxQuestionLength))
  return response
}
