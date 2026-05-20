import nodes from '../../data/domains/experience/nodes.json'
import type { Node } from './types'
import { isPublicVisible } from './visibility'

export function getAllNodes(): Node[] {
  return nodes as Node[]
}

export function getPublicNodes(): Node[] {
  return getAllNodes().filter((node) => isPublicVisible(node.visibility))
}

export function getNodeBySlug(slug: string): Node | undefined {
  return getAllNodes().find((node) => node.slug === slug)
}

export function getNodeById(id: string): Node | undefined {
  return getAllNodes().find((node) => node.id === id)
}

export function getPublicNodesByArea(areaId: string): Node[] {
  return getPublicNodes().filter((node) => node.areaId === areaId)
}

export function getFeaturedNodes(): Node[] {
  return getPublicNodes().filter((node) => node.featured?.home || node.featured?.representative)
}
