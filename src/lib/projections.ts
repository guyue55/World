import type { Node } from './types'
import { getPublicNodes } from './nodes'
import { getAllWorldEvents } from './world-events'

export type ProjectionTarget = 'home' | 'atlas' | 'timeline' | 'archive' | 'path' | 'detail' | 'ask'

export type NodeProjection = {
  nodeId: string
  slug: string
  title: string
  summary?: string
  target: ProjectionTarget
  displayType:
    | 'star'
    | 'paper'
    | 'device'
    | 'timeline-event'
    | 'card'
    | 'archive-record'
    | 'path-step'
    | 'guide'
  weight: number
}

export function projectNode(node: Node, target: ProjectionTarget): NodeProjection {
  const displayTypeByTarget: Record<ProjectionTarget, NodeProjection['displayType']> = {
    home: 'star',
    atlas: 'star',
    timeline: 'timeline-event',
    archive: 'archive-record',
    path: 'path-step',
    detail: 'paper',
    ask: 'guide',
  }

  const featuredWeight = node.featured?.home || node.featured?.representative ? 30 : 0
  const stageWeight = node.lifeStage === 'bloom' || node.lifeStage === 'fruit' ? 20 : 0

  return {
    nodeId: node.id,
    slug: node.slug,
    title: node.worldTitle ?? node.title,
    summary: node.summary,
    target,
    displayType: displayTypeByTarget[target],
    weight: featuredWeight + stageWeight + node.tags.length,
  }
}

export function getHomeProjections(): NodeProjection[] {
  return getPublicNodes()
    .filter((node) => node.featured?.home || node.featured?.representative)
    .map((node) => projectNode(node, 'home'))
    .sort((a, b) => b.weight - a.weight)
}

export function getAtlasProjections(areaId?: string): NodeProjection[] {
  return getPublicNodes()
    .filter((node) => (areaId ? node.areaId === areaId : true))
    .map((node) => projectNode(node, 'atlas'))
    .sort((a, b) => b.weight - a.weight)
}

export function getArchiveProjections(): NodeProjection[] {
  return getPublicNodes()
    .map((node) => projectNode(node, 'archive'))
    .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
}

export function getTimelineProjectionCount(): number {
  return getAllWorldEvents().length
}
