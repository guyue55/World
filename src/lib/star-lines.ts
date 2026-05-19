import type { Node, Relation } from './types'
import { getAllRelations } from './relations'
import { getNodeById, getPublicNodes } from './nodes'
import { isPublicVisible } from './visibility'

export type StarLineNode = {
  id: string
  slug: string
  title: string
  areaId: string
  lifeStage: string
}

export type StarLine = {
  id: string
  from: string
  to: string
  type: Relation['type']
  strength: Relation['strength']
}

export type StarGraph = {
  nodes: StarLineNode[]
  lines: StarLine[]
}

function toStarLineNode(node: Node): StarLineNode {
  return {
    id: node.id,
    slug: node.slug,
    title: node.worldTitle ?? node.title,
    areaId: node.areaId,
    lifeStage: node.lifeStage,
  }
}

export function getPublicStarGraph(): StarGraph {
  const publicNodes = getPublicNodes()
  const publicNodeIds = new Set(publicNodes.map((node) => node.id))
  const nodes = publicNodes.map(toStarLineNode)

  const lines = getAllRelations()
    .filter((relation) => publicNodeIds.has(relation.from) && publicNodeIds.has(relation.to))
    .map((relation) => ({
      id: relation.id ?? `${relation.from}-${relation.to}`,
      from: relation.from,
      to: relation.to,
      type: relation.type,
      strength: relation.strength,
    }))

  return { nodes, lines }
}

export function getLocalStarGraph(nodeId: string): StarGraph {
  const relations = getAllRelations().filter((relation) => relation.from === nodeId || relation.to === nodeId)
  const ids = new Set<string>([nodeId])

  relations.forEach((relation) => {
    ids.add(relation.from)
    ids.add(relation.to)
  })

  const nodes = Array.from(ids)
    .map((id) => getNodeById(id))
    .filter((node): node is Node => Boolean(node && isPublicVisible(node.visibility)))
    .map(toStarLineNode)

  const visibleIds = new Set(nodes.map((node) => node.id))
  const lines = relations
    .filter((relation) => visibleIds.has(relation.from) && visibleIds.has(relation.to))
    .map((relation) => ({
      id: relation.id ?? `${relation.from}-${relation.to}`,
      from: relation.from,
      to: relation.to,
      type: relation.type,
      strength: relation.strength,
    }))

  return { nodes, lines }
}
