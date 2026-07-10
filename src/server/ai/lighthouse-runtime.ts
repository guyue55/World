// 用途：灯塔低光运行器。服务端只读公开世界索引，不调用 Provider，不写入世界源数据。
import { getRecommendationsForHome } from '@/lib/lighthouse-recommend'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import type { PublicNodeReference } from '@/lib/public-world-objects'
import { buildAIContextSlice, type AIContextCandidate } from './context-policy'
import { buildLighthouseRuntimeEnvelope, getLighthouseRuntimeGovernance } from './lighthouse-governance'
import { getLocalAIProviderStatus } from './provider'
import type { SceneContext } from '@/lib/scenes/scene-context'
import type { AIContextSlice } from './context-policy'

export type LighthouseIntent = 'ask' | 'explain' | 'recommend' | 'route' | 'summarize' | 'boundary' | 'unknown'

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

export type LighthouseGroundedNextStep = {
  title: string
  href: string
  reason: string
  type: 'node' | 'path' | 'scene' | 'fallback'
}

export type LighthouseGrounding = {
  status: 'grounded' | 'fallback' | 'refusal' | 'no-evidence'
  basis: string[]
  publicOnly: true
  sourceCount: number
  confidence: 'high' | 'medium' | 'low'
}

export type LighthouseRuntimeResponse = {
  answer: string
  recommendations: LighthouseRecommendation[]
  sources: LighthouseSource[]
  nextSteps: LighthouseGroundedNextStep[]
  grounding: LighthouseGrounding
  mode: 'live-provider' | 'low-light'
  intent: LighthouseIntent
  fallback: {
    active: boolean
    reason: string
    actions: Array<{ href: string; label: string }>
  }
  limits: string[]
  auditSummary: {
    providerStatus: string
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
    elapsedMs: number
    cached: boolean
    provider?: string
    model?: string
    inputTokens?: number
    outputTokens?: number
  }
}

function inferIntent(question: string): LighthouseIntent {
  if (/私密|隐私|保险箱|vault|private|family|partner|sealed|silent/i.test(question)) return 'boundary'
  if (/找不到|不存在|未知|没有内容|unknown|missing/i.test(question)) return 'unknown'
  if (/总结|概括|summary/i.test(question)) return 'summarize'
  if (/解释|为什么|是什么|explain/i.test(question)) return 'explain'
  if (/推荐|看什么|下一步|recommend/i.test(question)) return 'recommend'
  if (/在哪|哪里|去哪|路线|路径|route|where/i.test(question)) return 'route'
  return 'ask'
}

function matchesQuestion(node: PublicNodeReference, question: string) {
  const query = question.toLowerCase()
  const terms = query.split(/[\s,，。！？?/.、]+/).filter((term) => term.length >= 2)
  const haystack = [node.title, node.slug, node.aiReadableSummary, node.areaTitle, node.lifeStage, node.status]
    .join(' ')
    .toLowerCase()
  return terms.length > 0
    ? terms.some((term) => haystack.includes(term))
    : haystack.includes(query)
}

function sourceFromNode(node: PublicNodeReference): LighthouseSource {
  const relationReason = node.relationReasons[0]
  const lifeLoopReason = `生命循环：${node.pathIds.length} 条路径、${node.timelineEventIds.length} 条时间痕迹。`
  const reason = relationReason
    ? `公开关系理由：${relationReason} ${lifeLoopReason}`
    : `公开节点摘要：${node.aiReadableSummary} ${lifeLoopReason}`

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

function sceneNextSteps(): LighthouseGroundedNextStep[] {
  return [
    { title: '打开世界地图', href: '/atlas', reason: '先确认当前位置和公开星域。', type: 'scene' },
    { title: '沿精选路径进入', href: '/paths', reason: '用旅程降低第一次探索门槛。', type: 'scene' },
    { title: '去档案馆检索', href: '/archive', reason: '按节点、标签和摘要继续查找。', type: 'scene' },
  ]
}

function nextStepsFromRecommendations(recommendations: LighthouseRecommendation[]): LighthouseGroundedNextStep[] {
  const steps = recommendations.slice(0, 3).map((item) => ({
    title: item.title,
    href: item.href,
    reason: item.reason,
    type: item.type === 'node' || item.type === 'path' ? item.type : 'fallback' as const,
  }))
  return steps.length > 0 ? steps : sceneNextSteps()
}

function describeSourcePath(sceneContext?: SceneContext) {
  const path = sceneContext?.sourcePath
  if (!path) return '你正站在浮屿灯塔，来路没有被浏览器保留。'
  if (path.startsWith('/node/')) return '你从一个内容地点来到灯塔，光束会优先照向相邻地点与下一站。'
  if (path.startsWith('/paths/')) return '你从一条旅程来到灯塔，当前路线仍会保留在本机浏览上下文中。'
  if (path.startsWith('/atlas')) return '你从星图来到灯塔，可以沿光束进入被点亮的地点。'
  if (path.startsWith('/timeline')) return '你从时间河来到灯塔，可以回看相关地点或继续向前。'
  if (path.startsWith('/archive')) return '你从档案馆来到灯塔，可以打开卷宗对应的地点。'
  return '你正站在浮屿灯塔，来路连接着公开世界入口。'
}

export function runLowLightLighthouse(question: string, sceneContext?: SceneContext, providedContext?: AIContextSlice): LighthouseRuntimeResponse {
  const startedAt = Date.now()
  const governance = getLighthouseRuntimeGovernance()
  const envelope = buildLighthouseRuntimeEnvelope(question, startedAt)
  const publicWorld = getPublicWorldObjectIndex()
  const provider = getLocalAIProviderStatus()
  const intent = inferIntent(envelope.normalizedQuestion)
  const context = providedContext ?? buildAIContextSlice(contextCandidates(publicWorld.nodeRefs))

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

  const isBoundaryQuestion = intent === 'boundary'
  const isUnknownQuestion = intent === 'unknown'
  const finalSources = isBoundaryQuestion || isUnknownQuestion ? [] : sources
  const finalRecommendations = isBoundaryQuestion || isUnknownQuestion ? [] : recommendations
  const nextSteps = isBoundaryQuestion || isUnknownQuestion ? sceneNextSteps() : nextStepsFromRecommendations(recommendations)
  const grounding: LighthouseGrounding = isBoundaryQuestion
    ? {
        status: 'refusal',
        basis: [
          'AI 灯塔只读公开事实源。',
          'private / family / partner / vault / sealed / silent 均被后端上下文策略排除。',
        ],
        publicOnly: true,
        sourceCount: 0,
        confidence: 'high',
      }
    : isUnknownQuestion && matchedSources.length === 0
      ? {
          status: 'no-evidence',
          basis: ['公开索引没有找到足够依据。', '回退到地图、路径和档案馆的静态导览。'],
          publicOnly: true,
          sourceCount: 0,
          confidence: 'low',
        }
      : matchedSources.length > 0
        ? {
            status: 'grounded',
            basis: finalSources.slice(0, 3).map((source) => source.reason),
            publicOnly: true,
            sourceCount: matchedSources.length,
            confidence: matchedSources.length >= 2 ? 'high' : 'medium',
          }
        : {
            status: 'fallback',
            basis: ['未调用实时 AI Provider。', '使用公开路径和节点推荐作为静态导览。'],
            publicOnly: true,
            sourceCount: finalSources.length,
            confidence: 'medium',
          }

  const asksWhere = /在哪|哪里|where/i.test(envelope.normalizedQuestion)
  const answer = isBoundaryQuestion
    ? '不能。灯塔只读取公开事实源，不读取私密档案、保险箱、亲友层或沉默内容，也不会替你改变权限。'
    : isUnknownQuestion && matchedSources.length === 0
      ? '我在公开世界索引里没有找到足够依据。你可以回到地图、路径或档案馆继续查找；如果这是新内容，需要作者先把它放入公开事实源。'
      : asksWhere
        ? describeSourcePath(sceneContext)
        : matchedSources.length > 0
        ? `灯塔在公开世界索引中找到 ${matchedSources.length} 条相关线索。你可以先打开来源，再沿路径或地图继续探索。`
        : '灯塔当前以低光模式运行，没有调用实时 AI Provider。下面给出公开路径和节点推荐，你仍然可以继续探索。'

  return {
    answer,
    recommendations: finalRecommendations,
    sources: finalSources,
    nextSteps,
    grounding,
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
      elapsedMs: Math.max(0, Date.now() - startedAt),
      cached: false,
    },
  }
}
