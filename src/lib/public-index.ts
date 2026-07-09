import type { Area, Node } from './types'
import { buildContentLifeFacts } from './content-life'
import { getPublicNodes } from './nodes'
import { getAllAreas } from './areas'
import { getAllPaths } from './paths'
import { getArchiveProjections, getHomeProjections } from './projections'
import { getAllRelations } from './relations'
import { getPublicStarGraph } from './star-lines'
import { getPublicWorldEvents, getWorldState } from './world-events'
import { isPublicVisible } from './visibility'

export type PublicWorldIndex = {
  generatedAt: string
  state: ReturnType<typeof getWorldState>
  areas: Array<Pick<Area, 'id' | 'worldName' | 'realName' | 'description' | 'level' | 'status' | 'icon' | 'order'> & { accessLabel: '公开区域' | '公开节点投影' }>
  nodes: Array<Pick<Node, 'id' | 'slug' | 'title' | 'worldTitle' | 'type' | 'areaId' | 'summary' | 'tags' | 'visibility' | 'lifeStage' | 'featured' | 'createdAt' | 'updatedAt'>>
  paths: ReturnType<typeof getAllPaths>
  events: ReturnType<typeof getPublicWorldEvents>
  contentLifeFacts: ReturnType<typeof buildContentLifeFacts>
  projections: {
    home: ReturnType<typeof getHomeProjections>
    archive: ReturnType<typeof getArchiveProjections>
  }
  graph: ReturnType<typeof getPublicStarGraph>
}

export function createPublicWorldIndex(): PublicWorldIndex {
  const publicNodes = getPublicNodes()
  const paths = getAllPaths()
  const events = getPublicWorldEvents()
  const publicAreaIds = new Set(publicNodes.map((node) => node.areaId))
  const areas = getAllAreas()
    .filter((area) => isPublicVisible(area.defaultVisibility) || publicAreaIds.has(area.id))
    .map((area) => ({
      id: area.id,
      worldName: area.worldName,
      realName: area.realName,
      description: area.description,
      level: area.level,
      status: area.status,
      icon: area.icon,
      order: area.order,
      accessLabel: isPublicVisible(area.defaultVisibility) ? '公开区域' as const : '公开节点投影' as const,
    }))
  const nodes = publicNodes.map((node) => ({
    id: node.id,
    slug: node.slug,
    title: node.title,
    worldTitle: node.worldTitle,
    type: node.type,
    areaId: node.areaId,
    summary: node.summary,
    tags: node.tags,
    visibility: node.visibility,
    lifeStage: node.lifeStage,
    featured: node.featured,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
  }))

  return {
    generatedAt: new Date().toISOString(),
    state: getWorldState(),
    areas,
    nodes,
    paths,
    events,
    contentLifeFacts: buildContentLifeFacts({
      nodes: publicNodes,
      paths,
      relations: getAllRelations(),
      events,
    }),
    projections: {
      home: getHomeProjections(),
      archive: getArchiveProjections(),
    },
    graph: getPublicStarGraph(),
  }
}
