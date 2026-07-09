import type { Area, Node, Path, WorldEvent } from './types'

export type SceneDeepInteractionKind = 'atlas' | 'timeline' | 'archive' | 'paths'

export type SceneDeepInteractionStep = {
  id: string
  label: string
  title: string
  body: string
  meta: string
  href?: string
}

export type SceneDeepInteractionModel = {
  kind: SceneDeepInteractionKind
  eyebrow: string
  title: string
  description: string
  activeLabel: string
  stateLabels: [string, string, string]
  steps: SceneDeepInteractionStep[]
}

function titleForNode(node?: Node) {
  return node?.worldTitle ?? node?.title ?? '未命名节点'
}

function nodesForArea(nodes: Node[], areaId: string) {
  return nodes.filter((node) => node.areaId === areaId)
}

function formatDateLabel(date: string) {
  return date.length >= 7 ? date.slice(0, 7) : date
}

export function buildAtlasDeepInteractionModel(areas: Area[], nodes: Node[]): SceneDeepInteractionModel {
  const primaryAreas = areas.filter((area) => area.level === 1).slice(0, 6)
  const steps = primaryAreas.map((area) => {
    const areaNodes = nodesForArea(nodes, area.id)
    const representative = areaNodes.find((node) => node.featured?.representative) ?? areaNodes[0]

    return {
      id: area.id,
      label: area.icon ? `${area.icon} ${area.realName}` : area.realName,
      title: area.worldName,
      body: representative
        ? `聚焦后先看「${titleForNode(representative)}」。它是这片区域的公开入口，能解释区域与节点为什么相连。`
        : area.description,
      meta: `${areaNodes.length} 个公开节点 · ${area.status} · ${area.defaultVisibility}`,
      href: representative ? `/node/${representative.slug}` : `/atlas#${area.id}`,
    }
  })

  return {
    kind: 'atlas',
    eyebrow: 'ATLAS INTERACTION',
    title: '聚焦一个星域，再看节点为什么相连。',
    description: 'Atlas 的主体交互不是浏览卡片，而是区域聚焦、节点预览和关系解释。这里全部来自公开节点与区域事实源。',
    activeLabel: '当前星域',
    stateLabels: ['区域聚焦', '节点预览', '关系解释'],
    steps,
  }
}

export function buildTimelineDeepInteractionModel(events: WorldEvent[], nodes: Node[]): SceneDeepInteractionModel {
  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const steps = events.slice(0, 6).map((event) => {
    const linkedNode = event.nodeIds?.map((id) => nodeById.get(id)).find(Boolean)

    return {
      id: event.id,
      label: formatDateLabel(event.date),
      title: event.title,
      body: linkedNode
        ? `回看这道水纹时，可以进入「${titleForNode(linkedNode)}」理解它留下的节点痕迹。`
        : event.description,
      meta: `${event.type} · ${event.actor ?? 'system'} · ${event.visibility ?? 'public'}`,
      href: linkedNode ? `/node/${linkedNode.slug}` : '/timeline',
    }
  })

  return {
    kind: 'timeline',
    eyebrow: 'TIMELINE INTERACTION',
    title: '选择一道水纹，回看它牵动的节点。',
    description: 'Timeline 的主体交互是时间锚点、事件水位和节点回看。没有强动效时仍保留静态时间分组与链接。',
    activeLabel: '当前水纹',
    stateLabels: ['时间锚点', '事件水位', '节点回看'],
    steps,
  }
}

export function buildArchiveDeepInteractionModel(nodes: Node[], areas: Area[]): SceneDeepInteractionModel {
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const featured = nodes
    .filter((node) => node.featured?.home || node.featured?.representative || node.featured?.recommended)
    .slice(0, 6)

  return {
    kind: 'archive',
    eyebrow: 'ARCHIVE INTERACTION',
    title: '打开一个卷宗，确认它属于哪座书架。',
    description: 'Archive 的主体交互是检索、分区、筛选和卷宗展开。这里先把精选公开节点转成可展开卷宗入口。',
    activeLabel: '当前卷宗',
    stateLabels: ['关键词检索', '书架分区', '卷宗展开'],
    steps: featured.map((node) => {
      const area = areaById.get(node.areaId)
      return {
        id: node.id,
        label: area?.worldName ?? node.type,
        title: titleForNode(node),
        body: node.summary ?? '这个公开节点暂时没有摘要。',
        meta: `${node.type} · ${node.lifeStage} · ${node.tags.slice(0, 3).join(' / ') || '无标签'}`,
        href: `/node/${node.slug}`,
      }
    }),
  }
}

export function buildPathsDeepInteractionModel(paths: Path[], nodes: Node[]): SceneDeepInteractionModel {
  const nodeBySlug = new Map(nodes.map((node) => [node.slug, node]))
  const steps = paths.slice(0, 6).map((path) => {
    const entryNode = path.nodeSlugs.map((slug) => nodeBySlug.get(slug)).find(Boolean)
    const nextNode = path.nodeSlugs.slice(1).map((slug) => nodeBySlug.get(slug)).find(Boolean)

    return {
      id: path.id,
      label: `${path.nodeSlugs.length} 站`,
      title: path.title,
      body: entryNode
        ? `从「${titleForNode(entryNode)}」起步，下一站会指向「${titleForNode(nextNode) ?? '后续节点'}」。`
        : path.description,
      meta: `${path.audience} · 约 ${path.estimatedMinutes ?? 10} 分钟 · ${path.visibility}`,
      href: `/paths/${path.id}`,
    }
  })

  return {
    kind: 'paths',
    eyebrow: 'PATHS INTERACTION',
    title: '选定一条路线，看见起点、下一站和完成感。',
    description: 'Paths 的主体交互是路线进度、下一站、返回地图和完成态。它把公开节点变成可行走的旅程。',
    activeLabel: '当前路线',
    stateLabels: ['路线进度', '下一站', '完成出口'],
    steps,
  }
}
