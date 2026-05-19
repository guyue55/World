import type { Node } from './types'
import { getPublicNodes } from './nodes'
import { getAllAreas } from './areas'
import { getAllPaths } from './paths'
import { getArchiveProjections, getHomeProjections } from './projections'
import { getPublicStarGraph } from './star-lines'
import { getAllWorldEvents, getWorldState } from './world-events'

export type PublicWorldIndex = {
  generatedAt: string
  state: ReturnType<typeof getWorldState>
  areas: ReturnType<typeof getAllAreas>
  nodes: Array<Pick<Node, 'id' | 'slug' | 'title' | 'worldTitle' | 'type' | 'areaId' | 'summary' | 'tags' | 'visibility' | 'lifeStage' | 'createdAt' | 'updatedAt'>>
  paths: ReturnType<typeof getAllPaths>
  events: ReturnType<typeof getAllWorldEvents>
  projections: {
    home: ReturnType<typeof getHomeProjections>
    archive: ReturnType<typeof getArchiveProjections>
  }
  graph: ReturnType<typeof getPublicStarGraph>
}

export function createPublicWorldIndex(): PublicWorldIndex {
  const nodes = getPublicNodes().map((node) => ({
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
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
  }))

  return {
    generatedAt: new Date().toISOString(),
    state: getWorldState(),
    areas: getAllAreas(),
    nodes,
    paths: getAllPaths(),
    events: getAllWorldEvents(),
    projections: {
      home: getHomeProjections(),
      archive: getArchiveProjections(),
    },
    graph: getPublicStarGraph(),
  }
}
