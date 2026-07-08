import Fuse from 'fuse.js'
import type { Node } from './types'
import { isSearchableVisibility } from './visibility'

export const WORLDOS_SEARCH_WEIGHTS = [
  { name: 'title', weight: 0.34 },
  { name: 'worldTitle', weight: 0.24 },
  { name: 'tags', weight: 0.18 },
  { name: 'summary', weight: 0.12 },
  { name: 'areaId', weight: 0.06 },
  { name: 'type', weight: 0.04 },
  { name: 'lifeStage', weight: 0.02 },
]

export function searchNodes(nodes: Node[], query: string): Node[] {
  const searchable = nodes.filter((node) => isSearchableVisibility(node.visibility))
  const normalizedQuery = query.trim()

  if (!normalizedQuery) return searchable

  const fuse = new Fuse(searchable, {
    keys: WORLDOS_SEARCH_WEIGHTS,
    threshold: 0.32,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
  })

  return fuse
    .search(normalizedQuery)
    .sort((a, b) => (a.score ?? 1) - (b.score ?? 1) || a.item.title.localeCompare(b.item.title, 'zh-CN'))
    .map((result) => result.item)
}
