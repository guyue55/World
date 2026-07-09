// 用途：灯塔低光运行器。服务端只读公开世界索引，不调用 Provider，不写入世界源数据。
import { getRecommendationsForHome } from '@/lib/lighthouse-recommend'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import type { PublicNodeReference } from '@/lib/public-world-objects'
import { buildAIContextSlice, type AIContextCandidate } from './context-policy'
import { buildLighthouseRuntimeEnvelope, getLighthouseRuntimeGovernance } from './lighthouse-governance'
import { getLocalAIProviderStatus } from './provider'

export type LighthouseIntent = 'ask' | 'explain' | 'recommend' | 'route' | 'summarize'

export type LighthouseSource = {
  slug: string
  title: string
  href: string
  reason: string
}

export type LighthouseRecommendation = {
  title: string
  href: string
  reason: string
  type: 'node' | 'path' | 'fallback'
}

export type LighthouseRuntimeResponse = {
  answer: string
  recommendations: LighthouseRecommendation[]
  sources: LighthouseSource[]
  mode: 'low-light'
  intent: LighthouseIntent
  fallback: {
    active: boolean
    reason: string
    actions: Array<{ href: string; label: string }>
  }
  limits: string[]
  auditSummary: {
    providerStatus: 'disabled-dry-run'
    writesWorldSource: false
    publicContextCount: number
    excludedContextCount: number
    requestId: string
    questionDigest: string
    sourceIds: string[]
    excludedReasons: string[]
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
    outputSummary: string
  }
}

function inferIntent(question: string): LighthouseIntent {
  if (/总结|概括|summary/i.test(question)) return 'summarize'
  if (/解释|为什么|是什么|explain/i.test(question)) return 'explain'
  if (/推荐|看什么|下一步|recommend/i.test(question)) return 'recommend'
  if (/去哪|路线|路径|route|where/i.test(question)) return 'route'
  return 'ask'
}

function matchesQuestion(node: PublicNodeReference, question: string) {
  const query = question.toLowerCase()
  return [node.title, node.aiReadableSummary, node.areaTitle, node.lifeStage, node.status]
    .some((value) => String(value).toLowerCase().includes(query))
}

function sourceFromNode(node: PublicNodeReference): LighthouseSource {
  const relationReason = node.relationReasons[0]
  const reason = relationReason
    ? `公开关系理由：${relationReason}`
    : `公开节点摘要：${node.aiReadableSummary}`

  return {
    slug: node.slug,
    title: node.title,
    href: node.href,
    reason,
  }
}

function contextCandidates(nodes: PublicNodeReference[]): AIContextCandidate[] {
  return nodes.map((node) => ({
    id: node.id,
    title: node.title,
    summary: node.aiReadableSummary,
    visibility: 'public',
  }))
}

export function runLowLightLighthouse(question: string): LighthouseRuntimeResponse {
  const startedAt = Date.now()
  const governance = getLighthouseRuntimeGovernance()
  const envelope = buildLighthouseRuntimeEnvelope(question, startedAt)
  const publicWorld = getPublicWorldObjectIndex()
  const provider = getLocalAIProviderStatus()
  const intent = inferIntent(envelope.normalizedQuestion)
  const context = buildAIContextSlice(contextCandidates(publicWorld.nodeRefs))

  const matchedSources = publicWorld.nodeRefs
    .filter((node) => matchesQuestion(node, envelope.normalizedQuestion))
    .slice(0, governance.contextPolicy.sourceLimit)
    .map(sourceFromNode)

  const sources = matchedSources.length > 0
    ? matchedSources
    : getRecommendationsForHome(publicWorld.nodes, publicWorld.paths, governance.contextPolicy.recommendationLimit).map((item) => {
        if (item.type === 'node' && item.node) {
          return { slug: item.node.slug, title: item.node.title, href: item.node.href, reason: item.reason }
        }
        if (item.type === 'path' && item.path) {
          return { slug: '', title: item.path.title, href: item.path.href, reason: item.reason }
        }
        return { slug: '', title: '公开入口', href: '/paths', reason: '低光 fallback 推荐公开路径。' }
      })

  const recommendations: LighthouseRecommendation[] = sources
    .slice(0, governance.contextPolicy.recommendationLimit)
    .map((source) => ({
      title: source.title,
      href: source.href,
      reason: source.reason,
      type: source.slug ? 'node' : source.href.startsWith('/paths/') ? 'path' : 'fallback',
    }))

  const answer = matchedSources.length > 0
    ? `灯塔在公开世界索引中找到 ${matchedSources.length} 条相关线索。你可以先打开来源，再沿路径或地图继续探索。`
    : '灯塔当前以低光模式运行，没有调用实时 AI Provider。下面给出公开路径和节点推荐，你仍然可以继续探索。'

  return {
    answer,
    recommendations,
    sources,
    mode: 'low-light',
    intent,
    fallback: {
      active: provider.realTimeAIProviderEnabled === false,
      reason: '真实 AI Provider 未启用；当前使用公开事实源的本地只读推荐。',
      actions: governance.runtime.fallbackActions,
    },
    limits: [
      '只读取 public / semiPublic 摘要事实源。',
      '不读取 private / family / partner / vault / sealed / silent 内容。',
      '不写入、不发布、不删除、不修改可见性。',
    ],
    auditSummary: {
      providerStatus: provider.status,
      writesWorldSource: provider.writesWorldSource,
      publicContextCount: context.allowed.length,
      excludedContextCount: context.excluded.length,
      requestId: envelope.requestId,
      questionDigest: envelope.questionDigest,
      sourceIds: sources.map((source) => source.slug || source.href),
      excludedReasons: Array.from(new Set(context.excluded.map((item) => item.reason))).slice(0, 3),
      cache: envelope.cache,
      timeout: {
        ...envelope.timeout,
        elapsedMs: Math.max(0, Date.now() - startedAt),
      },
      outputSummary: `${intent} / sources=${sources.length} / recommendations=${recommendations.length} / fallback=${provider.realTimeAIProviderEnabled === false}`,
    },
  }
}
