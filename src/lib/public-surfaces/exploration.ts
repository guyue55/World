// 用途：Atlas + Timeline + Lighthouse + Node 探索类 surface 构建器（从 public-world-surfaces 拆出）。
// 与 public-world-surfaces.ts 保持相同的公开层语义：只输出公开可见的信号，不携带私密数据。
import type { AreaLink } from '../atlas'
import type { Area, Node, Path, Visibility, WorldEvent } from '../types'
import { isPublicVisible } from '../visibility'
import type {
  AtlasConstellationSurface,
  LighthouseConsoleSurface,
  LighthouseQuestionSignal,
  LighthousePathSignal,
  LighthouseNodeSignal,
  NodeNextStepSurface,
  NodeOpeningSurface,
  TimelineRiverSurface,
} from '../public-world-surfaces'

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
    guideTitle: '看完地图之后，选择一条真实路线',
    guideDescription: '地图负责让你看见空间；继续探索时，请从公开路径、档案馆或时间流进入，不需要猜按钮会去哪里。',
    actions: [
      {
        href: '/paths',
        label: '走精选路径',
        title: '按路线进入',
        description: '适合第一次来或不知道从哪里开始的访客。',
        tone: 'primary',
      },
      {
        href: '/archive',
        label: '查公开节点',
        title: '进入档案馆',
        description: '适合已经知道关键词，想直接检索内容的人。',
        tone: 'quiet',
      },
      {
        href: '/timeline',
        label: '看时间流',
        title: '沿时间继续',
        description: '适合想知道世界最近如何生长的人。',
        tone: 'quiet',
      },
    ],
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
    boundaryNotice: '灯塔当前只读公开索引：不调用实时 AI、不读取私密内容、不写入世界、不替造物主决定公开或删除。',
    fallbackActions: [
      {
        href: '/paths',
        label: '按路径走',
        description: '不提问也能用精选路径进入世界。',
      },
      {
        href: '/archive',
        label: '去档案馆搜',
        description: '直接检索公开节点、标签和摘要。',
      },
      {
        href: '/atlas',
        label: '回地图看全貌',
        description: '从公开区域重新选择方向。',
      },
    ],
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

export function buildNodeNextStepSurface(node: Node, area: Area | undefined, sameAreaCount: number): NodeNextStepSurface {
  const areaLabel = area && isPublicArea(area) ? area.worldName : '当前星域'

  return {
    title: '读完之后，继续往哪里走',
    description: `读完「${node.worldTitle ?? node.title}」之后，你仍在 ${areaLabel}。可以回到这片星域、进入档案馆检索，或改走一条精选路径。所有出口仍然只进入公开层。`,
    actions: [
      {
        href: area ? `/atlas#cluster-${area.id}` : '/atlas',
        label: `回到${area ? '这片星域' : '世界地图'}`,
        description: area ? `${sameAreaCount} 个同区域公开节点` : '重新选择公开区域',
        tone: 'primary',
      },
      {
        href: '/archive',
        label: '去档案馆检索',
        description: '按标题、标签或摘要继续找内容',
        tone: 'quiet',
      },
      {
        href: '/paths',
        label: '换一条路径',
        description: '用路线降低继续探索的门槛',
        tone: 'quiet',
      },
    ],
  }
}
