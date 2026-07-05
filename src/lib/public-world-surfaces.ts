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

export type HomeDynamicWorldSurface = {
  eyebrow: string
  title: string
  description: string
  routes: DynamicWorldRouteSignal[]
  primaryHref: string
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
    eyebrow: 'DYNAMIC WORLD',
    title: '先看入口，再进入宇宙',
    description: '不用一次理解所有层级。先按目的选择入口：看全貌、看变化、走短路径、找导览，或者直接检索公开档案。',
    primaryHref: pathHref,
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
