// 用途：灯塔低光运行器。服务端只读公开世界索引，不调用 Provider，不写入世界源数据。
import { getRecommendationsForHome } from '@/lib/lighthouse-recommend'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import type { PublicNodeReference } from '@/lib/public-world-objects'
import { buildAIContextSlice, type AIContextCandidate } from './context-policy'
import { getLocalAIProviderStatus } from './provider'

export type LighthouseIntent = 'ask' | 'explain' | 'recommend' | 'route' | 'summarize'

export type LighthouseSource = {
  slug: string
  title: string
  href: string
  reason: string
}

export type LighthouseRuntimeResponse = {
  answer: string
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
  const publicWorld = getPublicWorldObjectIndex()
  const provider = getLocalAIProviderStatus()
  const intent = inferIntent(question)
  const context = buildAIContextSlice(contextCandidates(publicWorld.nodeRefs))

  const matchedSources = publicWorld.nodeRefs
    .filter((node) => matchesQuestion(node, question))
    .slice(0, 4)
    .map(sourceFromNode)

  const sources = matchedSources.length > 0
    ? matchedSources
    : getRecommendationsForHome(publicWorld.nodes, publicWorld.paths, 4).map((item) => {
        if (item.type === 'node' && item.node) {
          return { slug: item.node.slug, title: item.node.title, href: item.node.href, reason: item.reason }
        }
        if (item.type === 'path' && item.path) {
          return { slug: '', title: item.path.title, href: item.path.href, reason: item.reason }
        }
        return { slug: '', title: '公开入口', href: '/paths', reason: '低光 fallback 推荐公开路径。' }
      })

  const answer = matchedSources.length > 0
    ? `灯塔在公开世界索引中找到 ${matchedSources.length} 条相关线索。你可以先打开来源，再沿路径或地图继续探索。`
    : '灯塔当前以低光模式运行，没有调用实时 AI Provider。下面给出公开路径和节点推荐，你仍然可以继续探索。'

  return {
    answer,
    sources,
    mode: 'low-light',
    intent,
    fallback: {
      active: provider.realTimeAIProviderEnabled === false,
      reason: '真实 AI Provider 未启用；当前使用公开事实源的本地只读推荐。',
      actions: [
        { href: '/paths', label: '进入精选路径' },
        { href: '/archive', label: '搜索档案馆' },
        { href: '/atlas', label: '回到世界地图' },
      ],
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
    },
  }
}
