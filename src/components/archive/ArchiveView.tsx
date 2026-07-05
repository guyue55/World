'use client'

import { useMemo, useState } from 'react'
import type { Area, Node } from '@/lib/types'
import { searchNodes } from '@/lib/search'
import {
  filterArchiveNodes,
  formatArchiveSort,
  getArchiveStats,
  getLifeStages,
  getNodeTypes,
  getPopularTags,
  type ArchiveFilters as ArchiveFilterState,
} from '@/lib/archive'
import { NodeCard } from '@/components/node/NodeCard'
import { ArchiveEmptyState } from '@/components/archive/ArchiveEmptyState'
import { ArchiveFilters } from '@/components/archive/ArchiveFilters'
import { ArchiveStats } from '@/components/archive/ArchiveStats'

const initialFilters: ArchiveFilterState = {
  query: '',
  areaId: 'all',
  type: 'all',
  lifeStage: 'all',
  tag: 'all',
  sort: 'newest',
}

export function ArchiveView({ nodes, areas }: { nodes: Node[]; areas: Area[] }) {
  const [filters, setFilters] = useState<ArchiveFilterState>(initialFilters)
  const areaMap = useMemo(() => new Map(areas.map((area) => [area.id, area])), [areas])
  const stats = useMemo(() => getArchiveStats(nodes, areas), [nodes, areas])
  const popularTags = useMemo(() => getPopularTags(nodes), [nodes])
  const nodeTypes = useMemo(() => getNodeTypes(nodes), [nodes])
  const lifeStages = useMemo(() => getLifeStages(nodes), [nodes])

  const filtered = useMemo(() => {
    return filterArchiveNodes(nodes, filters, searchNodes)
  }, [nodes, filters])

  const reset = () => setFilters(initialFilters)

  return (
    <section className="space-y-6">
      <ArchiveStats {...stats} />
      <div id="archive-search">
        <ArchiveFilters
          filters={filters}
          areas={areas}
          nodeTypes={nodeTypes}
          lifeStages={lifeStages}
          popularTags={popularTags}
          onChange={setFilters}
          onReset={reset}
        />
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-ink/55">
        <p>当前显示 {filtered.length} / {nodes.length} 颗公开星体</p>
        <p>排序：{formatArchiveSort(filters.sort)}</p>
      </div>

      {filtered.length === 0 ? (
        <ArchiveEmptyState filters={filters} areas={areas} onReset={reset} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((node) => (
            <NodeCard key={node.id} node={node} area={areaMap.get(node.areaId)} />
          ))}
        </div>
      )}
    </section>
  )
}
