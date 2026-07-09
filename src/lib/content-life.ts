// 用途：内容生命事实解析。保持原始节点轻量，把可被场景和灯塔吸收的事实集中派生。
import type { Node, Path, Relation, WorldEvent } from './types'
import { isPublicVisible } from './visibility'

export type ContentLifeNodeFact = {
  id: string
  slug: string
  title: string
  summary: string
  aiReadableSummary: string
  areaId: string
  visibility: Node['visibility']
  lifeStage: Node['lifeStage']
  status: 'emerging' | 'growing' | 'ready' | 'archived' | 'quiet'
  relationReasons: string[]
  pathIds: string[]
  timelineEventIds: string[]
  recommendedPathIds: string[]
}

export function getNodeDisplayTitle(node: Node) {
  return node.worldTitle ?? node.title
}

export function getNodeAiReadableSummary(node: Node): string {
  return node.ai?.summary?.trim() || node.summary?.trim() || getNodeDisplayTitle(node)
}

export function getNodeLifeStatus(node: Node): ContentLifeNodeFact['status'] {
  if (node.lifeStage === 'archive' || node.lifeStage === 'relic') return 'archived'
  if (node.lifeStage === 'dormant' || node.lifeStage === 'silent') return 'quiet'
  if (node.lifeStage === 'fruit' || node.lifeStage === 'bloom') return 'ready'
  if (node.lifeStage === 'growing' || node.lifeStage === 'sprout') return 'growing'
  return 'emerging'
}

export function getNodeRelationReasons(node: Node, relations: Relation[]): string[] {
  return relations
    .filter((relation) => relation.from === node.id || relation.to === node.id)
    .map((relation) => relation.note?.trim())
    .filter((note): note is string => Boolean(note))
}

export function getNodePathIds(node: Node, paths: Path[]): string[] {
  return paths
    .filter((path) => path.visibility === 'public' && path.nodeSlugs.includes(node.slug))
    .map((path) => path.id)
}

export function getNodeTimelineEventIds(node: Node, events: WorldEvent[]): string[] {
  return events
    .filter((event) => !event.visibility || isPublicVisible(event.visibility))
    .filter((event) => (event.nodeIds ?? []).includes(node.id))
    .map((event) => event.id)
}

export function buildContentLifeNodeFact(input: {
  node: Node
  paths: Path[]
  relations: Relation[]
  events: WorldEvent[]
}): ContentLifeNodeFact {
  const pathIds = getNodePathIds(input.node, input.paths)

  return {
    id: input.node.id,
    slug: input.node.slug,
    title: getNodeDisplayTitle(input.node),
    summary: input.node.summary ?? '',
    aiReadableSummary: getNodeAiReadableSummary(input.node),
    areaId: input.node.areaId,
    visibility: input.node.visibility,
    lifeStage: input.node.lifeStage,
    status: getNodeLifeStatus(input.node),
    relationReasons: getNodeRelationReasons(input.node, input.relations),
    pathIds,
    timelineEventIds: getNodeTimelineEventIds(input.node, input.events),
    recommendedPathIds: input.node.featured?.pathCore || input.node.featured?.recommended ? pathIds : [],
  }
}

export function buildContentLifeFacts(input: {
  nodes: Node[]
  paths: Path[]
  relations: Relation[]
  events: WorldEvent[]
}): ContentLifeNodeFact[] {
  return input.nodes
    .filter((node) => isPublicVisible(node.visibility))
    .map((node) => buildContentLifeNodeFact({ node, paths: input.paths, relations: input.relations, events: input.events }))
}
