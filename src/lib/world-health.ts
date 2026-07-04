import { getAllAreas } from './areas'
import { getAllNodes, getPublicNodes } from './nodes'
import { getAllPaths } from './paths'
import { getAllRelations } from './relations'
import { getAllWorldEvents } from './world-events'

export type WorldHealth = {
  areaCount: number
  nodeCount: number
  publicNodeCount: number
  relationCount: number
  pathCount: number
  eventCount: number
  nodesWithoutSummary: number
  publicNodesWithoutContent: number
  status: 'healthy' | 'needs-care'
}

export function getWorldHealth(): WorldHealth {
  const areas = getAllAreas()
  const nodes = getAllNodes()
  const publicNodes = getPublicNodes()
  const relations = getAllRelations()
  const paths = getAllPaths()
  const events = getAllWorldEvents()

  const nodesWithoutSummary = publicNodes.filter((node) => !node.summary).length
  const publicNodesWithoutContent = publicNodes.filter((node) => !node.contentPath).length

  return {
    areaCount: areas.length,
    nodeCount: nodes.length,
    publicNodeCount: publicNodes.length,
    relationCount: relations.length,
    pathCount: paths.length,
    eventCount: events.length,
    nodesWithoutSummary,
    publicNodesWithoutContent,
    status: nodesWithoutSummary === 0 ? 'healthy' : 'needs-care',
  }
}
