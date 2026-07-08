import type { Node } from './types'
import { getNodeById } from './nodes'
import { getRelationsFrom, getRelationsTo } from './relations'
import { isPublicVisible } from './visibility'

function visibleNode(node: Node | undefined): node is Node {
  return Boolean(node && isPublicVisible(node.visibility))
}

export function getForwardLinks(nodeId: string): Node[] {
  return getRelationsFrom(nodeId)
    .map((relation) => getNodeById(relation.to))
    .filter(visibleNode)
}

export function getBacklinks(nodeId: string): Node[] {
  return getRelationsTo(nodeId)
    .map((relation) => getNodeById(relation.from))
    .filter(visibleNode)
}
