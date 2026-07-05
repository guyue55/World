import type { AreaLink } from './atlas'
import type { Area, Node, Path, Visibility, WorldEvent } from './types'
import { isPublicVisible } from './visibility'

export type AtlasAreaSignal = {
  id: string
  href: string
  icon?: string
  title: string
  subtitle: string
  description: string
  publicNodeCount: number
  accessLabel: string
}

export type AtlasAreaLineSignal = {
  id: string
  fromId: string
  toId: string
  label: string
  type: string
}

export type AtlasConstellationSurface = {
  areas: AtlasAreaSignal[]
  links: AtlasAreaLineSignal[]
}

export type TimelineRiverSignal = {
  id: string
  date: string
  dateLabel: string
  title: string
  description: string
  actorLabel: string
  areaLabel: string
  href?: string
}

export type TimelineRiverSurface = {
  items: TimelineRiverSignal[]
  totalCount: number
}

export type LighthouseQuestionSignal = {
  title: string
  answer: string
}

export type LighthousePathSignal = {
  id: string
  href: string
  title: string
  description: string
  caption: string
}

export type LighthouseNodeSignal = {
  id: string
  href: string
  title: string
  summary?: string
  caption: string
}

export type LighthouseConsoleSurface = {
  questions: LighthouseQuestionSignal[]
  paths: LighthousePathSignal[]
  nodes: LighthouseNodeSignal[]
}

export type NodeOpeningSurface = {
  title: string
  description: string
  areaLabel: string
  lifeStageLabel: string
  readingLabel: string
}

export type DynamicWorldRouteSignal = {
  id: 'home' | 'path' | 'atlas' | 'timeline' | 'ask' | 'archive'
  href: string
  shortLabel: string
  title: string
  description: string
  caption: string
  intent: string
}

export type HomeEntrySignal = {
  id: 'path' | 'atlas' | 'archive' | 'ask'
  href: string
  label: string
  title: string
  description: string
  note: string
  tone: 'primary' | 'quiet'
}

export type HomeDynamicWorldSurface = {
  eyebrow: string
  title: string
  description: string
  entryTitle: string
  entryDescription: string
  entryPoints: HomeEntrySignal[]
  routes: DynamicWorldRouteSignal[]
  primaryHref: string
}

export type DynamicWorldCapabilitySignal = {
  id: string
  title: string
  status: 'active' | 'low-light' | 'guarded' | 'blocked'
  statusLabel: string
  description: string
  href?: string
}

export type DynamicWorldStatusSurface = {
  eyebrow: string
  title: string
  description: string
  runtimeLabel: string
  boundaryLabel: string
  capabilities: DynamicWorldCapabilitySignal[]
  metrics: Array<{
    label: string
    value: number
    note: string
  }>
}

export type ArchiveDynamicNodeSignal = {
  id: string
  href: string
  title: string
  summary?: string
  caption: string
}

export type ArchiveDynamicTagSignal = {
  tag: string
  count: number
}

export type ArchiveDynamicSurface = {
  eyebrow: string
  title: string
  description: string
  boundaryLabel: string
  searchPlaceholder: string
  featuredNodes: ArchiveDynamicNodeSignal[]
  recentNodes: ArchiveDynamicNodeSignal[]
  tags: ArchiveDynamicTagSignal[]
  metrics: Array<{
    label: string
    value: number
    note: string
  }>
}

export type PathsDirectoryAudienceSignal = {
  audience: string
  count: number
}

export type PathsDirectoryPathSignal = {
  id: string
  href: string
  title: string
  description: string
  audience: string
  estimatedMinutes: number
  nodeCount: number
  entryNodeTitle?: string
}

export type PathsDirectorySurface = {
  eyebrow: string
  title: string
  description: string
  metrics: Array<{
    label: string
    value: string
    note: string
  }>
  audiences: PathsDirectoryAudienceSignal[]
  paths: PathsDirectoryPathSignal[]
}

export type AboutIdentityCardSignal = {
  title: string
  body: string
}

export type AboutDynamicSurface = {
  eyebrow: string
  title: string
  description: string
  identityCards: AboutIdentityCardSignal[]
  actions: Array<{
    href: string
    label: string
    style: 'primary' | 'secondary' | 'tertiary'
  }>
}

export type ManifestoRuleSignal = {
  title: string
  description: string
}

export type ManifestoDynamicSurface = {
  eyebrow: string
  title: string
  description: string
  rules: ManifestoRuleSignal[]
  summaryLabel: string
  summaryQuote: string
  actions: Array<{
    href: string
    label: string
    style: 'primary' | 'secondary' | 'tertiary'
  }>
}

export type PathJourneyStepSignal = {
  id: string
  href: string
  title: string
  summary?: string
  caption: string
  orderLabel: string
}

export type PathJourneySurface = {
  eyebrow: string
  title: string
  description: string
  boundaryLabel: string
  estimatedLabel: string
  audienceLabel: string
  steps: PathJourneyStepSignal[]
  nextPaths: Array<{
    id: string
    href: string
    title: string
    description: string
  }>
  metrics: Array<{
    label: string
    value: number | string
    note: string
  }>
}

function isPublicArea(area: Area) {
  return isPublicVisible(area.defaultVisibility)
}

function isEventPublic(visibility?: Visibility) {
  return !visibility || isPublicVisible(visibility)
}

function formatEventDate(date: string) {
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return date
  return `${year}.${month}.${day}`
}

function actorLabel(actor?: WorldEvent['actor']) {
  const labels: Record<NonNullable<WorldEvent['actor']>, string> = {
    creator: '创作者',
    rule: '规则',
    ai: 'AI 建议',
    system: '系统',
  }

  return labels[actor ?? 'system']
}

export function buildAtlasConstellationSurface(
  areas: Area[],
  nodes: Node[],
  links: AreaLink[],
  limit = 8,
): AtlasConstellationSurface {
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicNodeCountByArea = new Map<string, number>()

  publicNodes.forEach((node) => {
    publicNodeCountByArea.set(node.areaId, (publicNodeCountByArea.get(node.areaId) ?? 0) + 1)
  })

  const visibleAreas = areas
    .filter((area) => area.level === 1)
    .filter((area) => isPublicArea(area) || (publicNodeCountByArea.get(area.id) ?? 0) > 0)
    .slice(0, limit)
    .map((area) => ({
      id: area.id,
      href: `#cluster-${area.id}`,
      icon: area.icon,
      title: area.worldName,
      subtitle: area.realName,
      description: area.description,
      publicNodeCount: publicNodeCountByArea.get(area.id) ?? 0,
      accessLabel: isPublicArea(area) ? '公开星域' : '有限公开',
    }))

  const visibleAreaIds = new Set(visibleAreas.map((area) => area.id))

  return {
    areas: visibleAreas,
    links: links
      .filter((link) => visibleAreaIds.has(link.from) && visibleAreaIds.has(link.to))
      .map((link) => ({
        id: link.id,
        fromId: link.from,
        toId: link.to,
        label: link.label,
        type: link.type,
      })),
  }
}

export function buildTimelineRiverSurface(
  events: WorldEvent[],
  nodes: Node[],
  areas: Area[],
  limit = 7,
): TimelineRiverSurface {
  const publicNodeById = new Map(nodes.filter((node) => isPublicVisible(node.visibility)).map((node) => [node.id, node]))
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const items = events
    .filter((event) => isEventPublic(event.visibility))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map((event) => {
      const linkedNode = (event.nodeIds ?? []).map((id) => publicNodeById.get(id)).find(Boolean)
      const linkedArea = (event.areaIds ?? []).map((id) => areaById.get(id)).find(Boolean)

      return {
        id: event.id,
        date: event.date,
        dateLabel: formatEventDate(event.date),
        title: event.title,
        description: event.description,
        actorLabel: actorLabel(event.actor),
        areaLabel: linkedArea && isPublicArea(linkedArea) ? linkedArea.worldName : '公开事件',
        href: linkedNode ? `/node/${linkedNode.slug}` : undefined,
      }
    })

  return {
    items,
    totalCount: events.filter((event) => isEventPublic(event.visibility)).length,
  }
}

export function buildLighthouseConsoleSurface({
  questions,
  paths,
  nodes,
}: {
  questions: LighthouseQuestionSignal[]
  paths: Path[]
  nodes: Node[]
}): LighthouseConsoleSurface {
  return {
    questions,
    paths: paths.map((path) => ({
      id: path.id,
      href: `/paths/${path.id}`,
      title: path.title,
      description: path.description,
      caption: `${path.estimatedMinutes ?? 8} 分钟 · ${path.audience}`,
    })),
    nodes: nodes
      .filter((node) => isPublicVisible(node.visibility))
      .map((node) => ({
        id: node.id,
        href: `/node/${node.slug}`,
        title: node.worldTitle ?? node.title,
        summary: node.summary,
        caption: `${node.type} · ${node.lifeStage}`,
      })),
  }
}

export function buildNodeOpeningSurface(node: Node, area: Area | undefined, readingMinutes: number | null): NodeOpeningSurface {
  return {
    title: node.worldTitle ?? node.title,
    description: '节点已进入公开阅读态。先确认位置、阶段和阅读节奏，再进入正文。',
    areaLabel: area && isPublicArea(area) ? area.worldName : '公开节点',
    lifeStageLabel: node.lifeStage,
    readingLabel: readingMinutes ? `约 ${readingMinutes} 分钟` : '短读',
  }
}

export function buildHomeDynamicWorldSurface({
  areas,
  nodes,
  paths,
  events,
}: {
  areas: Area[]
  nodes: Node[]
  paths: Path[]
  events: WorldEvent[]
}): HomeDynamicWorldSurface {
  const publicAreaCount = areas.filter((area) => area.level === 1 && isPublicArea(area)).length
  const publicNodeCount = nodes.filter((node) => isPublicVisible(node.visibility)).length
  const firstPath = paths.find((path) => path.id === 'eight-minute-world')
    ?? paths.find((path) => path.audience === 'first-time')
    ?? paths[0]
  const pathHref = firstPath ? `/paths/${firstPath.id}` : '/atlas'

  return {
    eyebrow: '公开世界入口',
    title: '先选一个入口，再慢慢进入宇宙',
    description: '不用一次理解所有层级。第一次来，先按目的选择入口：走短路径、看全貌、查档案，或者请灯塔指路。',
    entryTitle: '先选一个入口',
    entryDescription: '如果你是第一次来，从这里开始就够了。每个入口都能返回地图，不会把你带进私密层或内部阶段页。',
    primaryHref: pathHref,
    entryPoints: [
      {
        id: 'path',
        href: pathHref,
        label: '我第一次来',
        title: firstPath?.title ?? '8 分钟路径',
        description: firstPath?.description ?? '不需要理解全部宇宙，先走一条短路径。',
        note: firstPath ? `约 ${firstPath.estimatedMinutes ?? 8} 分钟 · 推荐起点` : '推荐先走',
        tone: 'primary',
      },
      {
        id: 'atlas',
        href: '/atlas',
        label: '我想看全貌',
        title: '展开世界地图',
        description: '从区域、节点和连接关系看清这个世界的空间结构。',
        note: `${publicAreaCount} 个公开主区域`,
        tone: 'quiet',
      },
      {
        id: 'archive',
        href: '/archive',
        label: '我想直接找内容',
        title: '进入公开档案馆',
        description: '按标题、标签和摘要检索已经公开的节点。',
        note: `${publicNodeCount} 个公开节点`,
        tone: 'quiet',
      },
      {
        id: 'ask',
        href: '/ask',
        label: '我不知道看什么',
        title: '询问世界灯塔',
        description: '用自然语言说明你的兴趣，让灯塔给你推荐公开路径。',
        note: '只读公开层 · 不读取私密内容',
        tone: 'quiet',
      },
    ],
    routes: [
      {
        id: 'home',
        href: '/',
        shortLabel: '入口',
        title: '世界入口',
        description: '回到公开前厅，重新选择方向。',
        caption: '适合迷路时返回',
        intent: '回到起点',
      },
      {
        id: 'atlas',
        href: '/atlas',
        shortLabel: '地图',
        title: '世界地图',
        description: '从区域和公开节点看全貌，再进入具体星域。',
        caption: `${publicAreaCount} 个公开主区域`,
        intent: '看空间结构',
      },
      {
        id: 'timeline',
        href: '/timeline',
        shortLabel: '时间',
        title: '时间流',
        description: '看世界最近如何生长，哪些事件推动了节点和区域。',
        caption: `${events.filter((event) => isEventPublic(event.visibility)).length} 条近期事件`,
        intent: '看变化',
      },
      {
        id: 'path',
        href: pathHref,
        shortLabel: '路径',
        title: firstPath?.title ?? '8 分钟路径',
        description: firstPath?.description ?? '第一次来不用理解全部宇宙，先走一条短路径。',
        caption: firstPath ? `约 ${firstPath.estimatedMinutes ?? 8} 分钟` : '推荐先走',
        intent: '降低门槛',
      },
      {
        id: 'ask',
        href: '/ask',
        shortLabel: '灯塔',
        title: 'AI 灯塔',
        description: '低光只读导览：回答我在哪、能去哪、下一步看什么。',
        caption: '不读取私密层',
        intent: '请求指路',
      },
      {
        id: 'archive',
        href: '/archive',
        shortLabel: '检索',
        title: '档案馆',
        description: '直接查找已公开、可阅读、可返回的节点。',
        caption: `${publicNodeCount} 个公开节点`,
        intent: '现实检索',
      },
    ],
  }
}

export function buildDynamicWorldStatusSurface({
  areas,
  nodes,
  paths,
  events,
}: {
  areas: Area[]
  nodes: Node[]
  paths: Path[]
  events: WorldEvent[]
}): DynamicWorldStatusSurface {
  const publicAreas = areas.filter((area) => area.level === 1 && isPublicArea(area))
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicEvents = events.filter((event) => isEventPublic(event.visibility))

  return {
    eyebrow: 'DYNAMIC WORLD STATUS',
    title: '动态世界已经点亮，但仍只运行在公开层',
    description: '这里汇总当前可见的动态能力。状态面板只展示公开构建后的结果，不暴露私密节点、内部队列或旧阶段实验页。',
    runtimeLabel: '公开运行态',
    boundaryLabel: '服务端守门，前端只体现',
    capabilities: [
      {
        id: 'home-guide',
        title: '首页动态导览',
        status: 'active',
        statusLabel: '已开启',
        description: '首页小地图、短路径入口和动态世界总览已经接入公开 surface。',
        href: '/',
      },
      {
        id: 'atlas-live',
        title: '动态星图',
        status: 'active',
        statusLabel: '已开启',
        description: '世界地图展示公开区域、公开节点数量和可见星线。',
        href: '/atlas',
      },
      {
        id: 'timeline-river',
        title: '时间河',
        status: 'active',
        statusLabel: '已开启',
        description: '时间流展示近期公开事件，并只链接到公开节点。',
        href: '/timeline',
      },
      {
        id: 'lighthouse',
        title: 'AI 灯塔',
        status: 'low-light',
        statusLabel: '低光只读',
        description: '灯塔只做公开导览和路径建议，不读取私密层，不写入世界。',
        href: '/ask',
      },
      {
        id: 'node-opening',
        title: '节点开场仪式',
        status: 'active',
        statusLabel: '已开启',
        description: '公开节点在正文前展示位置、生命阶段和阅读节奏。',
      },
      {
        id: 'external-release',
        title: '外部生产证据',
        status: 'blocked',
        statusLabel: '待补齐',
        description: '真实 Preview/Production URL、线上 smoke、HTTPS、人工签收仍需外部环境完成。',
      },
    ],
    metrics: [
      { label: '公开区域', value: publicAreas.length, note: '进入世界的主空间' },
      { label: '公开节点', value: publicNodes.length, note: '可被地图、档案和灯塔读取' },
      { label: '公开路径', value: paths.length, note: '降低探索门槛' },
      { label: '公开事件', value: publicEvents.length, note: '构成时间河水位' },
    ],
  }
}

function nodeUpdatedAt(node: Node) {
  return new Date(node.updatedAt ?? node.createdAt).getTime()
}

function archiveNodeSignal(node: Node, areaById: Map<string, Area>): ArchiveDynamicNodeSignal {
  const area = areaById.get(node.areaId)

  return {
    id: node.id,
    href: `/node/${node.slug}`,
    title: node.worldTitle ?? node.title,
    summary: node.summary,
    caption: `${area && isPublicArea(area) ? area.worldName : '公开节点'} · ${node.type}`,
  }
}

export function buildArchiveDynamicSurface(nodes: Node[], areas: Area[], tagLimit = 10): ArchiveDynamicSurface {
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicAreas = areas.filter((area) => area.level === 1 && isPublicArea(area))
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const tagCounts = new Map<string, number>()

  publicNodes.forEach((node) => {
    node.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1))
  })

  const tags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, tagLimit)
    .map(([tag, count]) => ({ tag, count }))

  return {
    eyebrow: 'LIVE ARCHIVE',
    title: '不想漫游时，直接检索公开世界',
    description: '档案馆把公开节点整理成可搜索、可筛选、可返回的现实入口。这里不展示私密层，也不把内部草稿带进公开索引。',
    boundaryLabel: '只读公开索引 · 不含私密层',
    searchPlaceholder: '搜索标题、摘要、标签或世界名',
    featuredNodes: publicNodes
      .filter((node) => node.featured?.representative || node.featured?.home)
      .slice(0, 3)
      .map((node) => archiveNodeSignal(node, areaById)),
    recentNodes: [...publicNodes]
      .sort((a, b) => nodeUpdatedAt(b) - nodeUpdatedAt(a))
      .slice(0, 4)
      .map((node) => archiveNodeSignal(node, areaById)),
    tags,
    metrics: [
      { label: '公开节点', value: publicNodes.length, note: '可被检索和进入' },
      { label: '主区域', value: publicAreas.length, note: '用于空间筛选' },
      { label: '热门标签', value: tags.length, note: '用于快速缩小范围' },
      { label: '代表节点', value: publicNodes.filter((node) => node.featured?.representative).length, note: '适合第一次阅读' },
    ],
  }
}

export function buildPathJourneySurface(path: Path, nodes: Node[], nextPaths: Path[], areas: Area[]): PathJourneySurface {
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const estimatedMinutes = path.estimatedMinutes ?? Math.max(8, publicNodes.length * 4)

  return {
    eyebrow: 'LIVE PATH',
    title: '这条路径是一段可完成的旅程',
    description: '先按顺序走完公开节点，再决定要不要回到地图、进入档案馆，或继续下一条路径。路径只组织公开内容，不把私密层带进前台。',
    boundaryLabel: '只含公开节点 · 可随时返回',
    estimatedLabel: `约 ${estimatedMinutes} 分钟`,
    audienceLabel: path.audience,
    steps: publicNodes.map((node, index) => {
      const area = areaById.get(node.areaId)

      return {
        id: node.id,
        href: `/node/${node.slug}`,
        title: node.worldTitle ?? node.title,
        summary: node.summary,
        caption: `${area && isPublicArea(area) ? area.worldName : '公开节点'} · ${node.type}`,
        orderLabel: `第 ${index + 1} 步`,
      }
    }),
    nextPaths: nextPaths.map((item) => ({
      id: item.id,
      href: `/paths/${item.id}`,
      title: item.title,
      description: item.description,
    })),
    metrics: [
      { label: '公开节点', value: publicNodes.length, note: '按顺序阅读' },
      { label: '预计时间', value: estimatedMinutes, note: '分钟左右' },
      { label: '适合人群', value: path.audience, note: '用于选择路径' },
      { label: '后续路径', value: nextPaths.length, note: '看完之后继续' },
    ],
  }
}

export function buildPathsDirectorySurface(paths: Path[], nodes: Node[]): PathsDirectorySurface {
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const nodeMap = new Map(publicNodes.map((n) => [n.slug, n]))

  const audiences = Array.from(new Set(paths.map((p) => p.audience)))
  const audienceStats = audiences.map(audience => ({
    audience,
    count: paths.filter(p => p.audience === audience).length
  }))

  return {
    eyebrow: 'GUIDED PATHS',
    title: '精选路径',
    description: '路径不是分类，而是为不同旅人准备的行走路线。它把星体排成可以理解、可以继续走下去的顺序。',
    metrics: [
      { label: '入口', value: '先走一条路', note: '第一次进入不需要理解全部宇宙，先沿一条公开路径走完即可。' },
      { label: '边界', value: '只含公开节点', note: '路径只读取已审查的公开内容，不把私密层、家庭层或保险箱内容带到前台。' },
      { label: '回路', value: '看完仍能继续', note: '每条路径都能回到地图、进入档案馆，或继续沿相关路径探索。' },
    ],
    audiences: audienceStats,
    paths: paths.map(path => {
      const entryNode = path.nodeSlugs.length > 0 ? nodeMap.get(path.nodeSlugs[0]) : undefined
      return {
        id: path.id,
        href: `/paths/${path.id}`,
        title: path.title,
        description: path.description,
        audience: path.audience,
        estimatedMinutes: path.estimatedMinutes ?? 8,
        nodeCount: path.nodeSlugs.length,
        entryNodeTitle: entryNode ? (entryNode.worldTitle ?? entryNode.title) : undefined
      }
    })
  }
}

export function buildAboutDynamicSurface(): AboutDynamicSurface {
  return {
    eyebrow: 'ABOUT',
    title: '造物主不是简历，而是世界的原点。',
    description: '古月浮屿是一座持续生长的个人数字世界。它对外是可探索的公开前厅，对内是创世台，对未来是档案，对 AI 是可读、可审计、可边界化协作的世界协议。',
    identityCards: [
      {
        title: '这里不是简历页',
        body: '它解释古月浮屿为什么存在：把技术、产品、灵感、生活与记忆安放到一个可长期维护的个人数字世界。',
      },
      {
        title: 'AI 是灯塔，不是太阳',
        body: 'AI 可以导览、整理和提出建议，但不替造物主决定公开、删除、权限或意义。',
      },
      {
        title: '公开层不是完整世界',
        body: '访客看到的是精选世界。私密、家庭、保险箱和沉默内容不会进入公开索引。',
      },
    ],
    actions: [
      { href: '/atlas', label: '进入地图', style: 'primary' },
      { href: '/paths', label: '查看路径', style: 'secondary' },
      { href: '/manifesto', label: '阅读宪章', style: 'tertiary' },
    ]
  }
}

export function buildManifestoDynamicSurface(): ManifestoDynamicSurface {
  return {
    eyebrow: 'MANIFESTO',
    title: '世界宣言',
    description: '古月浮屿不是公共多人 3D 元宇宙，也不是虚拟经济空间。它是一个以内容为节点、以时间为河流、以权限为边界、以 AI 为灯塔的个人数字世界。',
    rules: [
      {
        title: 'AI 是灯塔，不是太阳',
        description: 'AI 只照亮路径、整理线索、提出建议；不自动发布、不删除、不越权读取私密内容。',
      },
      {
        title: '公开层不是完整世界',
        description: '访客看到的是精选前厅。私密、家庭、保险箱和沉默内容不会进入公开索引。',
      },
      {
        title: '入口清澈，深处浩瀚',
        description: '首页只给少数清晰路径，复杂性放在可探索的深处，而不是压到第一屏。',
      },
      {
        title: '前台浪漫，后台清醒，档案可靠',
        description: '世界语言负责体验，现实解释负责理解，稳定数据协议负责长期保存和迁移。',
      },
      {
        title: '世界为生活服务',
        description: '它允许低光、静默、修复和复活，不用更新压力反过来支配生活。',
      },
    ],
    summaryLabel: '一句话',
    summaryQuote: '以内容为星体，以区域为空间，以关系为星线，以时间为河流，以权限为边界，以规则为自然法则。',
    actions: [
      { href: '/about', label: '了解古月', style: 'primary' },
      { href: '/paths', label: '沿路径进入', style: 'secondary' },
      { href: '/ask', label: '点亮灯塔', style: 'tertiary' },
    ]
  }
}
