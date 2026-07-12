import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import type { Area, Node } from '@/lib/types'
import { getWorldSceneAsset } from '@/lib/world-scene-assets'

type ExplorationGroup = {
  id: string
  title: string
  description: string
  items: Array<{ node: Node; reason: string }>
}

export type NodePathContext = {
  pathId: string
  pathTitle: string
  stepIndex: number
  stepCount: number
  nextNode: { slug: string; title: string } | null
}

export type NodePlaceModel = {
  node: Node
  area?: Area
  title: string
  summary: string
  readingMinutes: number | null
  lifeSignal: { status: 'emerging' | 'growing' | 'ready' | 'archived' | 'quiet'; relationCount: number; pathCount: number; timelineEventCount: number; recommendedPathCount: number }
  relationDoors: Array<{ id: string; title: string; reason: string; href: string; groupTitle: string; x: number; y: number; mobileY: number }>
  pathContext: NodePathContext | null
  pathExits: Array<{ id: string; title: string; href: string }>
  asset: ReturnType<typeof getWorldSceneAsset>
  contentRevisionSha256: string | null
}

const doorPositions = [{ x: 21, y: 53 }, { x: 77, y: 47 }, { x: 30, y: 72 }, { x: 70, y: 69 }, { x: 45, y: 38 }, { x: 58, y: 80 }]

export function buildNodePlaceModel({ index, node, readingMinutes, groups, pathContext }: { index: PublicWorldObjectIndex; node: Node; readingMinutes: number | null; groups: ExplorationGroup[]; pathContext: NodePathContext | null }): NodePlaceModel {
  const area = index.areaById.get(node.areaId)
  const fact = index.contentLifeFacts.find((item) => item.id === node.id)
  const reference = index.nodeRefs.find((item) => item.id === node.id)
  const seen = new Set<string>()
  const relationDoors = groups.flatMap((group) => group.items.map((item) => ({ group, item }))).filter(({ item }) => {
    if (seen.has(item.node.id)) return false
    seen.add(item.node.id)
    return true
  }).slice(0, 6).map(({ group, item }, positionIndex) => {
    const position = doorPositions[positionIndex]
    return { id: item.node.id, title: item.node.worldTitle ?? item.node.title, reason: item.reason, href: `/node/${item.node.slug}?fromNode=${node.slug}&via=relation`, groupTitle: group.title, x: position.x, y: position.y, mobileY: 42 + positionIndex * 8 }
  })
  const pathExits = index.paths.filter((path) => path.nodeSlugs.includes(node.slug)).slice(0, 4).map((path) => ({ id: path.id, title: path.title, href: `/paths/${path.id}` }))
  return {
    node,
    area,
    title: node.worldTitle ?? node.title,
    summary: node.summary ?? '这处地点正在等待下一次生长。',
    readingMinutes,
    lifeSignal: {
      status: fact?.status ?? 'emerging',
      relationCount: fact?.relationReasons.length ?? relationDoors.length,
      pathCount: fact?.pathIds.length ?? pathExits.length,
      timelineEventCount: fact?.timelineEventIds.length ?? 0,
      recommendedPathCount: fact?.recommendedPathIds.length ?? 0,
    },
    relationDoors,
    pathContext,
    pathExits,
    asset: getWorldSceneAsset('node'),
    contentRevisionSha256: reference?.contentRevisionSha256 ?? null,
  }
}
