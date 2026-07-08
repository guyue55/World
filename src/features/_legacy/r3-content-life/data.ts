
import areaDensityData from '../../../data/r3-content-life/area-density.json'
import contentPathsData from '../../../data/r3-content-life/content-paths.json'
import extensionRegistry from '../../../data/r3-content-life/extension-registry.json'
import lifecycleRules from '../../../data/r3-content-life/lifecycle-rules.json'
import publicIndexPolicy from '../../../data/r3-content-life/public-index-policy.json'
import relationGraph from '../../../data/r3-content-life/relation-graph.json'
import roadmap from '../../../data/r3-content-life/roadmap.json'
import timelineEvents from '../../../data/r3-content-life/timeline-events.json'
import worldNodesData from '../../../data/r3-content-life/world-nodes.json'
import type { R3AreaDensity, R3ContentPath, R3Summary, R3TimelineEvent, R3WorldNode } from './types'

export const r3Roadmap = roadmap
export const r3Stages = roadmap.stages
export const r3Batches = roadmap.batches
export const r3WorldNodes = worldNodesData.nodes as R3WorldNode[]
export const r3ContentPaths = contentPathsData.paths as R3ContentPath[]
export const r3AreaDensity = areaDensityData.areas as R3AreaDensity[]
export const r3Relations = relationGraph.relations
export const r3TimelineEvents = timelineEvents.events as R3TimelineEvent[]
export const r3LifecycleRules = lifecycleRules
export const r3PublicIndexPolicy = publicIndexPolicy
export const r3Extensions = extensionRegistry.items

export function getR3Summary(): R3Summary {
  const publicNodes = r3WorldNodes.filter((node) => node.visibility === 'public').length
  const semiPublicNodes = r3WorldNodes.filter((node) => node.visibility === 'semi-public').length
  const averageMaturity = Math.round(r3WorldNodes.reduce((total, node) => total + node.maturity, 0) / r3WorldNodes.length)

  return {
    stages: r3Stages.length,
    batches: r3Batches.length,
    nodes: r3WorldNodes.length,
    paths: r3ContentPaths.length,
    areas: r3AreaDensity.length,
    publicNodes,
    semiPublicNodes,
    averageMaturity,
    productionLive: Boolean(roadmap.productionLive),
    releaseReady: Boolean(roadmap.releaseReady),
    cleanProductionReady: Boolean(roadmap.cleanProductionReady),
  }
}

export function getR3FeaturedNodes(limit = 8): R3WorldNode[] {
  return [...r3WorldNodes]
    .sort((left, right) => right.maturity - left.maturity)
    .slice(0, limit)
}

export function getR3NodesByPath(pathId: string): R3WorldNode[] {
  const path = r3ContentPaths.find((item) => item.id === pathId)
  if (!path) return []
  return path.nodes
    .map((nodeId) => r3WorldNodes.find((node) => node.id === nodeId))
    .filter((node): node is R3WorldNode => Boolean(node))
}

export function getR3NodesByArea(areaId: string): R3WorldNode[] {
  return r3WorldNodes.filter((node) => node.area === areaId)
}
