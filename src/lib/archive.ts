import archiveProductizationContract from '../../data/archive-productization-contract.json'
import contentInventoryRules from '../../data/content-inventory-rules.json'
import type { Area, Node, NodeType, LifeStage } from './types'

export type ArchiveSort = 'newest' | 'oldest' | 'title'

export type ArchiveFilters = {
  query: string
  areaId: string
  type: string
  lifeStage: string
  tag: string
  sort: ArchiveSort
}

export function getArchiveProductizationContract() {
  return archiveProductizationContract
}

export function getContentInventoryRules() {
  return contentInventoryRules
}

export function getArchiveStats(nodes: Node[], areas: Area[]) {
  const tags = new Set(nodes.flatMap((node) => node.tags))
  const featured = nodes.filter((node) => node.featured?.home || node.featured?.representative)

  return {
    publicNodeCount: nodes.length,
    areaCount: areas.length,
    featuredNodeCount: featured.length,
    tagCount: tags.size,
  }
}

export function getPopularTags(nodes: Node[], limit = 12) {
  const counts = new Map<string, number>()

  nodes.forEach((node) => {
    node.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
  })

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}

export function getNodeTypes(nodes: Node[]): NodeType[] {
  return Array.from(new Set(nodes.map((node) => node.type))).sort() as NodeType[]
}

export function getLifeStages(nodes: Node[]): LifeStage[] {
  return Array.from(new Set(nodes.map((node) => node.lifeStage))).sort() as LifeStage[]
}

export function sortArchiveNodes(nodes: Node[], sort: ArchiveSort) {
  return [...nodes].sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title)
    const aDate = new Date(a.updatedAt ?? a.createdAt).getTime()
    const bDate = new Date(b.updatedAt ?? b.createdAt).getTime()
    return sort === 'oldest' ? aDate - bDate : bDate - aDate
  })
}

export function filterArchiveNodes(nodes: Node[], filters: ArchiveFilters, search: (nodes: Node[], query: string) => Node[]) {
  let result = search(nodes, filters.query)

  if (filters.areaId !== 'all') result = result.filter((node) => node.areaId === filters.areaId)
  if (filters.type !== 'all') result = result.filter((node) => node.type === filters.type)
  if (filters.lifeStage !== 'all') result = result.filter((node) => node.lifeStage === filters.lifeStage)
  if (filters.tag !== 'all') result = result.filter((node) => node.tags.includes(filters.tag))

  return sortArchiveNodes(result, filters.sort)
}
