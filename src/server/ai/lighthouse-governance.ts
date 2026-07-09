import { createHash } from 'node:crypto'
import lighthouseRuntimeGovernance from '../../../data/domains/ai/lighthouse-runtime-governance.json'

export type LighthouseRuntimeGovernance = typeof lighthouseRuntimeGovernance

export type LighthouseRuntimeEnvelope = {
  normalizedQuestion: string
  questionDigest: string
  requestId: string
  cache: {
    policy: string
    ttlSeconds: number
    staleWhileRevalidateSeconds: number
    commonQuestion: boolean
  }
  timeout: {
    budgetMs: number
    cancellable: true
    elapsedMs: number
    timedOut: false
  }
}

export function getLighthouseRuntimeGovernance(): LighthouseRuntimeGovernance {
  return lighthouseRuntimeGovernance
}

export function normalizeLighthouseQuestion(question: string): string {
  return question
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, lighthouseRuntimeGovernance.runtime.maxQuestionLength)
}

export function buildLighthouseRuntimeEnvelope(question: string, startedAt = Date.now()): LighthouseRuntimeEnvelope {
  const normalizedQuestion = normalizeLighthouseQuestion(question)
  const digest = createHash('sha256').update(normalizedQuestion || 'empty').digest('hex').slice(0, 16)
  const commonQuestion = lighthouseRuntimeGovernance.runtime.commonQuestionCache.includes(normalizedQuestion)

  return {
    normalizedQuestion,
    questionDigest: digest,
    requestId: `lh-${digest}`,
    cache: {
      policy: lighthouseRuntimeGovernance.runtime.cachePolicy,
      ttlSeconds: lighthouseRuntimeGovernance.runtime.cacheTtlSeconds,
      staleWhileRevalidateSeconds: lighthouseRuntimeGovernance.runtime.staleWhileRevalidateSeconds,
      commonQuestion,
    },
    timeout: {
      budgetMs: lighthouseRuntimeGovernance.runtime.timeoutMs,
      cancellable: true,
      elapsedMs: Math.max(0, Date.now() - startedAt),
      timedOut: false,
    },
  }
}
