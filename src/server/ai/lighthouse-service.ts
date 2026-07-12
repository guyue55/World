import type { SceneContext } from '@/lib/scenes/scene-context'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildAIContextSlice, type AIContextCandidate } from './context-policy'
import { runLowLightLighthouse, type LighthouseRuntimeResponse } from './lighthouse-runtime'
import { digestLighthouseQuestion, recordLighthouseAudit } from './lighthouse-audit'
import { createDisabledLighthouseProvider } from './provider/disabled'
import { createOpenAILighthouseProvider } from './provider/openai'
import type { LighthouseProvider } from './provider/types'

type ServiceOptions = {
  provider?: LighthouseProvider
  candidates?: AIContextCandidate[]
  timeoutMs?: number
  now?: () => number
  disableCache?: boolean
  signal?: AbortSignal
}

type CacheEntry = { expiresAt: number; value: LighthouseRuntimeResponse }
const cache = new Map<string, CacheEntry>()

function publicCandidates(): AIContextCandidate[] {
  return getPublicWorldObjectIndex().nodeRefs.map((node) => ({ id: node.id, title: node.title, summary: node.aiReadableSummary, visibility: 'public' }))
}

function configuredProvider() {
  const openai = createOpenAILighthouseProvider()
  return openai.enabled ? openai : createDisabledLighthouseProvider()
}

function selectProviderContext(candidates: AIContextCandidate[], question: string) {
  const terms = question.toLowerCase().split(/[\s,，。！？?/.、]+/).filter((term) => term.length >= 2)
  return candidates
    .map((candidate, index) => {
      const haystack = `${candidate.title} ${candidate.summary ?? ''}`.toLowerCase()
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0)
      return { candidate, index, score }
    })
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, 24)
    .map((item) => item.candidate)
}

export async function answerLighthouseQuestion(question: string, sceneContext?: SceneContext, options: ServiceOptions = {}) {
  const now = options.now ?? Date.now
  const startedAt = now()
  const digest = digestLighthouseQuestion(`${question}|${sceneContext?.sourcePath ?? ''}|${sceneContext?.focusedObjectId ?? ''}`)
  const cached = cache.get(digest)
  if (!options.disableCache && cached && cached.expiresAt > startedAt) {
    const value = { ...cached.value, auditSummary: { ...cached.value.auditSummary, cached: true, elapsedMs: 0 } }
    recordLighthouseAudit({ requestId: value.auditSummary.requestId, questionDigest: digest, mode: value.mode, providerStatus: value.auditSummary.providerStatus, sourceCount: value.sources.length, elapsedMs: 0, cached: true })
    return value
  }

  const candidates = options.candidates ?? publicCandidates()
  // 公开灯塔永远忽略调用方声称的 authorized，权限事实只来自公开服务端索引。
  const context = buildAIContextSlice(candidates.map(({ authorized: _authorized, ...candidate }) => candidate))
  const lowLight = runLowLightLighthouse(question, sceneContext, context)
  const provider = options.provider ?? configuredProvider()
  const providerContext = selectProviderContext(context.allowed, question)
  let answer = lowLight

  if (provider.enabled && providerContext.length > 0 && lowLight.grounding.status !== 'refusal') {
    const controller = new AbortController()
    let timeout: ReturnType<typeof setTimeout> | undefined
    let abortFromRequest = () => controller.abort()
    const guardResult = new Promise<Awaited<ReturnType<LighthouseProvider['answer']>>>((resolve) => {
      abortFromRequest = () => {
        controller.abort()
        resolve({ status: 'error', reason: '浏览器已取消问路请求。', provider: provider.id })
      }
      options.signal?.addEventListener('abort', abortFromRequest, { once: true })
      timeout = setTimeout(() => {
        controller.abort()
        resolve({ status: 'timeout', reason: 'Provider 请求超过服务端时间预算。', provider: provider.id })
      }, options.timeoutMs ?? 5_500)
    })
    let result: Awaited<ReturnType<LighthouseProvider['answer']>>
    try {
      result = await Promise.race([provider.answer({
        question,
        context: providerContext.map((item) => ({ id: item.id, title: item.title, summary: item.summary ?? '' })),
        signal: controller.signal,
      }), guardResult])
    } catch (error) {
      result = { status: 'error', reason: error instanceof Error ? error.message : 'Provider adapter 抛出未知异常。', provider: provider.id }
    }
    if (timeout) clearTimeout(timeout)
    options.signal?.removeEventListener('abort', abortFromRequest)
    if (result.status === 'success') {
      const allowedIds = new Set(providerContext.map((item) => item.id))
      const sourceIds = result.output.sourceIds.filter((id) => allowedIds.has(id))
      if (sourceIds.length > 0) {
        const sourceById = new Map(getPublicWorldObjectIndex().nodeRefs.map((node) => [node.id, {
          slug: node.slug,
          title: node.title,
          href: node.href,
          reason: node.relationReasons[0] ?? node.aiReadableSummary,
          contentRevisionSha256: node.contentRevisionSha256,
        }]))
        const sources = sourceIds.map((id) => sourceById.get(id)).filter((source): source is NonNullable<typeof source> => Boolean(source))
        if (sources.length > 0) {
          answer = {
            ...lowLight,
            answer: result.output.answer,
            mode: 'live-provider',
            fallback: { ...lowLight.fallback, active: false, reason: '' },
            sources,
            grounding: { status: 'grounded', basis: sources.map((source) => source.reason), publicOnly: true, sourceCount: sources.length, confidence: sources.length > 1 ? 'high' : 'medium' },
            auditSummary: { ...lowLight.auditSummary, providerStatus: 'live-provider', provider: result.provider, model: result.model, inputTokens: result.inputTokens, outputTokens: result.outputTokens },
          }
        }
      }
    } else {
      answer = { ...lowLight, fallback: { ...lowLight.fallback, active: true, reason: result.reason }, auditSummary: { ...lowLight.auditSummary, providerStatus: result.status } }
    }
  }

  answer = { ...answer, auditSummary: { ...answer.auditSummary, elapsedMs: Math.max(0, now() - startedAt), cached: false } }
  if (!options.disableCache) cache.set(digest, { expiresAt: startedAt + answer.auditSummary.cache.ttlSeconds * 1_000, value: answer })
  recordLighthouseAudit({ requestId: answer.auditSummary.requestId, questionDigest: digest, mode: answer.mode, providerStatus: answer.auditSummary.providerStatus, sourceCount: answer.sources.length, elapsedMs: answer.auditSummary.elapsedMs, cached: false })
  return answer
}

export function clearLighthouseCache() { cache.clear() }
