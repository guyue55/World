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
