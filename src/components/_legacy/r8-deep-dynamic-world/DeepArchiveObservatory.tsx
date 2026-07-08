'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Area, Node } from '@/lib/types'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

const all = 'all'
type ViewMode = 'constellation' | 'table' | 'cards'

export function DeepArchiveObservatory({ nodes, areas }: { nodes: Node[]; areas: Area[] }) {
  const { markJourney } = useWorldRuntime()
  const [query, setQuery] = useState('')
  const [areaId, setAreaId] = useState(all)
  const [viewMode, setViewMode] = useState<ViewMode>('constellation')
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return nodes
      .filter((node) => areaId === all || node.areaId === areaId)
      .filter((node) => {
        if (!normalized) return true
        return [node.title, node.worldTitle, node.summary, ...node.tags].filter(Boolean).join(' ').toLowerCase().includes(normalized)
      })
      .slice(0, 48)
  }, [areaId, nodes, query])

  const areaOptions = useMemo(() => areas.filter((area) => nodes.some((node) => node.areaId === area.id)), [areas, nodes])

  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">REALITY OBSERVATORY</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">档案馆进入现实观测模式。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">这里不追求梦幻，而追求快速查找：搜索、区域筛选、视图切换和节点回到世界。</p>
        </div>
        <div className="flex rounded-full bg-sand/65 p-1">
          {(['constellation', 'cards', 'table'] as const).map((mode) => (
            <button key={mode} type="button" onClick={() => setViewMode(mode)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${viewMode === mode ? 'bg-ink text-white' : 'text-ink/55 hover:bg-white/70'}`}>
              {mode === 'constellation' ? '星群' : mode === 'cards' ? '卡片' : '表格'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_18rem]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、摘要、标签……" className="rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-ink/30" />
        <select value={areaId} onChange={(event) => setAreaId(event.target.value)} className="rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-ink/30">
          <option value={all}>全部区域</option>
          {areaOptions.map((area) => <option key={area.id} value={area.id}>{area.worldName}｜{area.realName}</option>)}
        </select>
      </div>
      <p className="mt-4 text-sm text-ink/52">当前观测 {filtered.length} / {nodes.length} 个公开节点。</p>

      {viewMode === 'table' ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/70 bg-white/72">
          {filtered.map((node) => (
            <Link key={node.id} href={`/node/${node.slug}`} onClick={() => markJourney(`/node/${node.slug}`, node.worldTitle ?? node.title)} className="grid gap-2 border-b border-ink/5 p-4 text-sm transition hover:bg-sand/55 md:grid-cols-[1.3fr_0.6fr_0.6fr]">
              <span className="font-semibold text-ink">{node.worldTitle ?? node.title}</span>
              <span className="text-ink/50">{node.type}</span>
              <span className="text-ink/50">{node.lifeStage}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className={`mt-6 grid gap-4 ${viewMode === 'constellation' ? 'md:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
          {filtered.map((node, index) => (
            <Link key={node.id} href={`/node/${node.slug}`} onClick={() => markJourney(`/node/${node.slug}`, node.worldTitle ?? node.title)} className={`group rounded-[1.6rem] border border-white/65 bg-white/72 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white ${viewMode === 'constellation' && index % 5 === 0 ? 'md:translate-y-8' : ''}`}>
              <p className="text-xs font-semibold tracking-[0.24em] text-moss">{node.type} · {node.lifeStage}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{node.worldTitle ?? node.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/58">{node.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {node.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-sand px-2 py-1 text-[11px] text-ink/48">{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
