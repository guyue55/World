import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sceneContextSchema } from '@/lib/scenes/scene-context'
import { getLighthouseRuntimeGovernance } from '@/server/ai/lighthouse-governance'
import { lighthouseRateLimiter } from '@/server/ai/lighthouse-rate-limit'
import { answerLighthouseQuestion } from '@/server/ai/lighthouse-service'

export const dynamic = 'force-dynamic'

const governance = getLighthouseRuntimeGovernance()
const requestSchema = z.object({
  question: z.string().trim().min(1).max(governance.runtime.maxQuestionLength),
  context: sceneContextSchema.optional(),
})

export async function POST(request: Request) {
  const rate = lighthouseRateLimiter.consume('local-lan-process')
  if (!rate.allowed) return NextResponse.json({ error: '问路太频繁，请稍后再试。' }, { status: 429, headers: { 'retry-after': String(rate.retryAfterSeconds) } })

  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: '请求格式无效。' }, { status: 400 }) }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: `问题不能为空，且不能超过 ${governance.runtime.maxQuestionLength} 个字符。` }, { status: 400 })

  const answer = await answerLighthouseQuestion(parsed.data.question, parsed.data.context, { signal: request.signal })
  const response = NextResponse.json(answer)
  response.headers.set('cache-control', 'private, no-store')
  response.headers.set('x-worldos-lighthouse-mode', answer.mode)
  response.headers.set('x-ratelimit-remaining', String(rate.remaining))
  response.headers.set('x-worldos-question-max-length', String(governance.runtime.maxQuestionLength))
  return response
}
