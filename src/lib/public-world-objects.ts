import { getAreaLinks, type AreaLink } from './atlas'
import { getAllAreas } from './areas'
import { getPublicNodes } from './nodes'
import { getAllPaths } from './paths'
import { getPublicWorldEvents } from './world-events'
import type { Area, Node, Path, WorldEvent } from './types'

export type PublicNodeReference = {
  id: string
  slug: string
  href: string
  title: string
  areaId: string
  areaTitle: string
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
  areaLinks: AreaLink[]
  nodeRefs: PublicNodeReference[]
  pathRefs: PublicPathReference[]
  timelineRefs: PublicTimelineReference[]
  nodeById: Map<string, Node>
  nodeBySlug: Map<string, Node>
  areaById: Map<string, Area>
}

function nodeTitle(node: Node) {
  return node.worldTitle ?? node.title
}

function nodeReference(node: Node, areaById: Map<string, Area>): PublicNodeReference {
  const area = areaById.get(node.areaId)

  return {
    id: node.id,
    slug: node.slug,
    href: `/node/${node.slug}`,
    title: nodeTitle(node),
    areaId: node.areaId,
    areaTitle: area?.worldName ?? node.areaId,
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
  const nodeRefs = nodes.map((node) => nodeReference(node, areaById))
  const nodeRefBySlug = new Map(nodeRefs.map((node) => [node.slug, node]))
  const nodeRefById = new Map(nodeRefs.map((node) => [node.id, node]))

  return {
    areas,
    nodes,
    paths,
    events,
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

    if (!node.slug || !nodeTitle(node)) issues.push(`公开节点缺少 slug 或标题：${node.id}`)
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
  }

  for (const pathRef of index.pathRefs) {
    if (!pathRef.href.startsWith('/paths/')) issues.push(`公开路径 href 非法：${pathRef.id} -> ${pathRef.href}`)
    if (!pathRef.title) issues.push(`公开路径引用缺少标题：${pathRef.id}`)
  }

  return issues
}
