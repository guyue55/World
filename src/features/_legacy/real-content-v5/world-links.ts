import { realContentItems } from './data'

export type RealTimelineEvent = {
  id: string
  title: string
  period: string
  contentId: string
  description: string
  privacy: 'public' | 'private-redacted'
}

export type RealExhibition = {
  id: string
  title: string
  theme: string
  contentIds: string[]
  status: 'seeded' | 'needs-more-content' | 'ready-local'
}

export type RealReadingPath = {
  id: string
  title: string
  intent: string
  contentIds: string[]
  nextAction: string
}

export const realTimelineEvents: RealTimelineEvent[] = [
  {
    id: 'world-origin-moment',
    title: '决定把博客变成世界',
    period: 'V0 → V1',
    contentId: 'why-build-word-life',
    description: '这是世界化方向的起点。',
    privacy: 'public',
  },
  {
    id: 'worldification-moment',
    title: 'V4 世界化重构完成',
    period: 'V4',
    contentId: 'engineering-world-skeleton',
    description: '世界入口、Atlas、内容节点、时间河和 AI 灯塔被统一到 /world。',
    privacy: 'public',
  },
  {
    id: 'protected-memory-seed',
    title: '私密记忆被安全接入时间河',
    period: 'V5',
    contentId: 'redacted-memory-signal',
    description: '仅保留脱敏信号，证明私密内容可以被边界化管理。',
    privacy: 'private-redacted',
  },
]

export const realExhibitions: RealExhibition[] = [
  {
    id: 'origin-of-floating-world',
    title: '古月浮屿起源展',
    theme: '从博客到个人数字世界',
    contentIds: ['why-build-word-life', 'engineering-world-skeleton'],
    status: 'ready-local',
  },
  {
    id: 'ai-boundary-exhibition',
    title: 'AI 灯塔边界展',
    theme: 'AI 如何协作而不越权',
    contentIds: ['ai-is-lighthouse'],
    status: 'needs-more-content',
  },
]

export const realReadingPaths: RealReadingPath[] = [
  {
    id: 'first-enter-world-real-content',
    title: '第一次进入真实内容世界',
    intent: '让新访客理解古月浮屿为什么不是普通博客。',
    contentIds: ['why-build-word-life', 'ai-is-lighthouse', 'engineering-world-skeleton'],
    nextAction: '进入 /world 继续探索 Atlas 与内容节点。',
  },
  {
    id: 'creator-maintenance-path',
    title: '创作者维护路径',
    intent: '让维护者理解内容、素材、隐私和 AI 边界。',
    contentIds: ['engineering-world-skeleton', 'ai-is-lighthouse', 'redacted-memory-signal'],
    nextAction: '进入 V6 私密档案与 AI 世界助手深化。',
  },
]

export function resolveContentIds(contentIds: string[]) {
  return contentIds
    .map((id) => realContentItems.find((item) => item.id === id))
    .filter((item): item is (typeof realContentItems)[number] => Boolean(item))
}

export function getBrokenRealContentReferences() {
  const refs = [
    ...realTimelineEvents.map((event) => event.contentId),
    ...realExhibitions.flatMap((exhibition) => exhibition.contentIds),
    ...realReadingPaths.flatMap((path) => path.contentIds),
  ]
  return refs.filter((id) => !realContentItems.some((item) => item.id === id))
}
