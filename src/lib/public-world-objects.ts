import { getAreaLinks, type AreaLink } from './atlas'
import { getAllAreas } from './areas'
import { buildContentLifeFacts, getNodeAiReadableSummary, getNodeDisplayTitle, type ContentLifeNodeFact } from './content-life'
import { getPublicNodes } from './nodes'
import { getAllPaths } from './paths'
import { getAllRelations } from './relations'
import { getPublicWorldEvents } from './world-events'
import type { Area, Node, Path, Relation, WorldEvent } from './types'

export type PublicNodeReference = {
  id: string
  slug: string
  href: string
  title: string
  aiReadableSummary: string
  areaId: string
  areaTitle: string
  lifeStage: Node['lifeStage']
  status: ContentLifeNodeFact['status']
  pathIds: string[]
  timelineEventIds: string[]
  relationReasons: string[]
}

export type PublicPathReference = {
  id: string
  href: string
  title: string
  nodeRefs: PublicNodeReference[]
}

export type PublicTimelineReference = {
  id: string
  title: string
  date: string
  nodeRefs: PublicNodeReference[]
  areaIds: string[]
}

export type PublicWorldObjectIndex = {
  areas: Area[]
  nodes: Node[]
  paths: Path[]
  events: WorldEvent[]
  relations: Relation[]
  contentLifeFacts: ContentLifeNodeFact[]
  areaLinks: AreaLink[]
  nodeRefs: PublicNodeReference[]
  pathRefs: PublicPathReference[]
  timelineRefs: PublicTimelineReference[]
  nodeById: Map<string, Node>
  nodeBySlug: Map<string, Node>
  areaById: Map<string, Area>
}

function nodeReference(
  node: Node,
  areaById: Map<string, Area>,
  factByNodeId: Map<string, ContentLifeNodeFact>,
): PublicNodeReference {
  const area = areaById.get(node.areaId)
  const fact = factByNodeId.get(node.id)

  return {
    id: node.id,
    slug: node.slug,
    href: `/node/${node.slug}`,
    title: fact?.title ?? getNodeDisplayTitle(node),
    aiReadableSummary: fact?.aiReadableSummary ?? getNodeAiReadableSummary(node),
    areaId: node.areaId,
    areaTitle: area?.worldName ?? node.areaId,
    lifeStage: node.lifeStage,
    status: fact?.status ?? 'emerging',
    pathIds: fact?.pathIds ?? [],
    timelineEventIds: fact?.timelineEventIds ?? [],
    relationReasons: fact?.relationReasons ?? [],
  }
}

export function getPublicWorldObjectIndex(): PublicWorldObjectIndex {
  const areas = getAllAreas()
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const nodes = getPublicNodes().filter((node) => areaById.has(node.areaId))
  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const nodeBySlug = new Map(nodes.map((node) => [node.slug, node]))
  const paths = getAllPaths()
  const events = getPublicWorldEvents()
  const relations = getAllRelations()
  const contentLifeFacts = buildContentLifeFacts({ nodes, paths, relations, events })
  const factByNodeId = new Map(contentLifeFacts.map((fact) => [fact.id, fact]))
  const nodeRefs = nodes.map((node) => nodeReference(node, areaById, factByNodeId))
  const nodeRefBySlug = new Map(nodeRefs.map((node) => [node.slug, node]))
  const nodeRefById = new Map(nodeRefs.map((node) => [node.id, node]))

  return {
    areas,
    nodes,
    paths,
    events,
    relations,
    contentLifeFacts,
    areaLinks: getAreaLinks().filter((link) => areaById.has(link.from) && areaById.has(link.to)),
    nodeRefs,
    pathRefs: paths.map((path) => ({
      id: path.id,
      href: `/paths/${path.id}`,
      title: path.title,
      nodeRefs: path.nodeSlugs.map((slug) => nodeRefBySlug.get(slug)).filter((node): node is PublicNodeReference => Boolean(node)),
    })),
    timelineRefs: events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      nodeRefs: (event.nodeIds ?? []).map((id) => nodeRefById.get(id)).filter((node): node is PublicNodeReference => Boolean(node)),
      areaIds: (event.areaIds ?? []).filter((id) => areaById.has(id)),
    })),
    nodeById,
    nodeBySlug,
    areaById,
  }
}

export function getPublicWorldObjectConsistencyIssues(index = getPublicWorldObjectIndex()): string[] {
  const issues: string[] = []
  const seenSlugs = new Set<string>()

  for (const node of index.nodes) {
    if (seenSlugs.has(node.slug)) issues.push(`公开节点 slug 重复：${node.slug}`)
    seenSlugs.add(node.slug)

    if (!node.slug || !getNodeDisplayTitle(node)) issues.push(`公开节点缺少 slug 或标题：${node.id}`)
    if (!index.areaById.has(node.areaId)) issues.push(`公开节点指向不存在区域：${node.id} -> ${node.areaId}`)
  }

  for (const path of index.paths) {
    if (!path.id || !path.title) issues.push(`公开路径缺少 id 或标题：${path.id}`)
    for (const slug of path.nodeSlugs) {
      if (!index.nodeBySlug.has(slug)) issues.push(`公开路径引用不存在或非公开节点：${path.id} -> ${slug}`)
    }
  }

  for (const event of index.events) {
    for (const nodeId of event.nodeIds ?? []) {
      if (!index.nodeById.has(nodeId)) issues.push(`公开事件引用不存在或非公开节点：${event.id} -> ${nodeId}`)
    }
    for (const areaId of event.areaIds ?? []) {
      if (!index.areaById.has(areaId)) issues.push(`公开事件引用不存在区域：${event.id} -> ${areaId}`)
    }
  }

  for (const nodeRef of index.nodeRefs) {
    if (!nodeRef.href.startsWith('/node/')) issues.push(`公开节点 href 非法：${nodeRef.id} -> ${nodeRef.href}`)
    if (!nodeRef.title) issues.push(`公开节点引用缺少标题：${nodeRef.id}`)
    if (!nodeRef.aiReadableSummary || nodeRef.aiReadableSummary.length < 18) issues.push(`公开节点缺少 AI 可读摘要：${nodeRef.id}`)
    if (nodeRef.relationReasons.length === 0) issues.push(`公开节点缺少关系理由：${nodeRef.id}`)
    if (nodeRef.pathIds.length === 0) issues.push(`公开节点没有被路径吸收：${nodeRef.id}`)
  }

  for (const pathRef of index.pathRefs) {
    if (!pathRef.href.startsWith('/paths/')) issues.push(`公开路径 href 非法：${pathRef.id} -> ${pathRef.href}`)
    if (!pathRef.title) issues.push(`公开路径引用缺少标题：${pathRef.id}`)
  }

  return issues
}
