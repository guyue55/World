import Fuse from 'fuse.js'
import type { Node } from './types'
import { isSearchableVisibility } from './visibility'

export function searchNodes(nodes: Node[], query: string): Node[] {
  const searchable = nodes.filter((node) => isSearchableVisibility(node.visibility))
  const normalizedQuery = query.trim()

  if (!normalizedQuery) return searchable

  const fuse = new Fuse(searchable, {
    keys: ['title', 'worldTitle', 'summary', 'tags', 'type', 'areaId', 'lifeStage'],
    threshold: 0.35,
    ignoreLocation: true,
  })

  return fuse.search(normalizedQuery).map((result) => result.item)
}
