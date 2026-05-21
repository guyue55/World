import type { ContentSeed } from './model'

export const contentSeeds: ContentSeed[] = [
  {
    id: 'origin-of-word-life',
    title: 'word-life 的世界入口',
    summary: '解释为什么这个项目不是普通博客，而是个人数字宇宙。',
    channel: 'home',
    status: 'ready',
    visibility: 'public',
    tags: ['world', 'origin'],
  },
  {
    id: 'ai-as-lighthouse',
    title: 'AI 是灯塔，不是太阳',
    summary: '说明 AI 的建议、审计和边界，不允许自动越权。',
    channel: 'lighthouse',
    status: 'ready',
    visibility: 'public',
    tags: ['ai', 'boundary'],
  },
  {
    id: 'redacted-family-memory',
    title: '家庭记忆脱敏信号',
    summary: '仅保留脱敏存在性，不暴露任何私密原文。',
    channel: 'constellation',
    status: 'draft',
    visibility: 'private-redacted',
    tags: ['family', 'redacted'],
  },
  {
    id: 'round-timeline',
    title: '从第一轮到第三轮',
    summary: '记录项目从仓库化、体验兑现到生产化准备的演进。',
    channel: 'time-river',
    status: 'ready',
    visibility: 'public',
    tags: ['timeline', 'round'],
  },
]

export function getPublicContentSeeds() {
  return contentSeeds.filter((seed) => seed.visibility === 'public')
}

export function getRedactedContentSeeds() {
  return contentSeeds.filter((seed) => seed.visibility === 'private-redacted')
}
