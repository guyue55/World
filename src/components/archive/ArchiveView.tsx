'use client'

import { useMemo, useState } from 'react'
import type { Area, Node } from '@/lib/types'
import { searchNodes } from '@/lib/search'
import { NodeCard } from '@/components/node/NodeCard'

export function ArchiveView({ nodes, areas }: { nodes: Node[]; areas: Area[] }) {
  const [query, setQuery] = useState('')
  const [areaId, setAreaId] = useState('all')
  const [lifeStage, setLifeStage] = useState('all')

  const filtered = useMemo(() => {
    let result = searchNodes(nodes, query)
    if (areaId !== 'all') result = result.filter((node) => node.areaId === areaId)
    if (lifeStage !== 'all') result = result.filter((node) => node.lifeStage === lifeStage)
    return result
  }, [nodes, query, areaId, lifeStage])

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-world border border-ink/10 bg-white/45 p-4 md:grid-cols-[1fr_220px_220px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索一颗星、一份卷宗或一个旧想法"
          className="rounded-full border border-ink/10 bg-white/70 px-5 py-3 outline-none"
        />
        <select value={areaId} onChange={(event) => setAreaId(event.target.value)} className="rounded-full border border-ink/10 bg-white/70 px-5 py-3">
          <option value="all">全部区域</option>
          {areas.map((area) => <option key={area.id} value={area.id}>{area.worldName}</option>)}
        </select>
        <select value={lifeStage} onChange={(event) => setLifeStage(event.target.value)} className="rounded-full border border-ink/10 bg-white/70 px-5 py-3">
          <option value="all">全部阶段</option>
          {['seed','sprout','growing','bloom','fruit','archive','relic','dormant','silent'].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-world border border-ink/10 bg-white/45 p-8 text-ink/60">
          罗盘没有找到对应的星。也许它还没有被命名。
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((node) => <NodeCard key={node.id} node={node} />)}
        </div>
      )}
    </section>
  )
}
