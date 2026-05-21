import type { RealContentCollection, RealContentItem } from './model'

export const realContentItems: RealContentItem[] = [
  {
    id: 'why-build-word-life',
    title: '为什么我要把博客做成一个世界',
    subtitle: '从普通博客到个人数字宇宙的第一篇入口文章',
    kind: 'article',
    domain: 'world',
    status: 'ready',
    visibility: 'public',
    summary: '解释古月浮屿的核心动机：不是堆页面，而是建立一个能容纳技术、生活、记忆与 AI 协作的个人世界。',
    body: '古月浮屿不是传统意义的博客。它对外是可探索的数字世界，对内是内容和记忆的工作台，对未来是可以持续生长的个人档案系统。',
    tags: ['world', 'origin', 'blog-to-world'],
    routeHint: '/world',
    worldNodeId: 'world-gateway',
    assetIds: ['cosmic-gateway-placeholder'],
  },
  {
    id: 'ai-is-lighthouse',
    title: 'AI 是灯塔，不是太阳',
    subtitle: 'AI 协作边界的公开说明',
    kind: 'article',
    domain: 'ai',
    status: 'ready',
    visibility: 'public',
    summary: 'AI 可以照亮、建议、解释和维护，但不能替代人决定世界，也不能越过私密边界。',
    body: 'AI 在古月浮屿中承担灯塔角色：提供方向、风险提示和维护建议。所有高风险动作都必须经过人工确认。',
    tags: ['ai', 'boundary', 'lighthouse'],
    routeHint: '/lighthouse',
    worldNodeId: 'ai-lighthouse',
    assetIds: ['lighthouse-diagram-placeholder'],
  },
  {
    id: 'engineering-world-skeleton',
    title: '工程化地基：让世界可长期维护',
    subtitle: '模块化、高内聚低耦合与质量门禁',
    kind: 'project-log',
    domain: 'technology',
    status: 'curated',
    visibility: 'public',
    summary: '记录为什么这个项目必须采用模块化、页面化、组件化和严格门禁。',
    body: '古月浮屿未来可能成长为中型项目，因此 V1 到 V5 的每一次重构都必须保证结构清晰、边界明确、脚本可验证。',
    tags: ['engineering', 'architecture', 'quality'],
    routeHint: '/status',
    worldNodeId: 'world-state-orbit',
    assetIds: [],
  },
  {
    id: 'a-day-in-floating-islands',
    title: '浮屿上的一天',
    subtitle: '生活内容如何进入世界',
    kind: 'life-note',
    domain: 'life',
    status: 'draft',
    visibility: 'public',
    summary: '用一篇轻量生活笔记验证生活内容如何变成世界节点。',
    body: '生活内容不需要被写成技术文章。它可以是一段观察、一张照片、一条时间河里的涟漪。',
    tags: ['life', 'note', 'island'],
    routeHint: '/world',
    worldNodeId: 'content-node-field',
    assetIds: [],
  },
  {
    id: 'redacted-memory-signal',
    title: '一段被保护的记忆信号',
    subtitle: '只保留脱敏存在性',
    kind: 'timeline-event',
    domain: 'memory',
    status: 'draft',
    visibility: 'private-redacted',
    summary: '这是一条脱敏记忆信号，仅用于证明私密内容可以被边界化管理。',
    body: '此内容不包含私密原始信息，仅保留时间河中的脱敏存在性。',
    tags: ['memory', 'redacted'],
    routeHint: '/time-river',
    worldNodeId: 'memory-river',
    assetIds: [],
  },
]

export const realContentCollections: RealContentCollection[] = [
  {
    id: 'homepage-entry-collection',
    title: '世界入口精选',
    description: '首页和 /world 首屏应展示的真实内容集合。',
    itemIds: ['why-build-word-life', 'ai-is-lighthouse', 'engineering-world-skeleton'],
    purpose: 'homepage',
  },
  {
    id: 'world-origin-exhibition',
    title: '世界起源展',
    description: '解释古月浮屿从博客进化为个人数字世界的主题展览。',
    itemIds: ['why-build-word-life', 'engineering-world-skeleton'],
    purpose: 'exhibition',
  },
  {
    id: 'memory-river-seed',
    title: '时间河种子',
    description: '时间河中的真实或脱敏事件种子。',
    itemIds: ['a-day-in-floating-islands', 'redacted-memory-signal'],
    purpose: 'timeline',
  },
]

export function getPublicRealContentItems() {
  return realContentItems.filter((item) => item.visibility === 'public')
}

export function getRedactedRealContentItems() {
  return realContentItems.filter((item) => item.visibility === 'private-redacted')
}

export function getReadyRealContentItems() {
  return realContentItems.filter((item) => item.status === 'ready' || item.status === 'curated')
}

export function getCollectionItems(collection: RealContentCollection) {
  return collection.itemIds
    .map((id) => realContentItems.find((item) => item.id === id))
    .filter((item): item is RealContentItem => Boolean(item))
}
