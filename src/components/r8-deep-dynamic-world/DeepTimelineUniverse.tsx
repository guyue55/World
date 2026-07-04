'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Area, Node, WorldEvent } from '@/lib/types'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

const all = 'all'

function findAreaName(areaIds: string[] | undefined, areas: Area[]) {
  const area = areas.find((item) => areaIds?.includes(item.id))
  return area?.worldName ?? '世界事件'
}

function findNodeTitle(nodeIds: string[] | undefined, nodes: Node[]) {
  const node = nodes.find((item) => nodeIds?.includes(item.id))
  return node?.worldTitle ?? node?.title ?? '未关联节点'
}

export function DeepTimelineUniverse({ events, nodes, areas }: { events: WorldEvent[]; nodes: Node[]; areas: Area[] }) {
  const { reducedMotion } = useWorldRuntime()
  const eventTypes = useMemo(() => [all, ...Array.from(new Set(events.map((event) => event.type)))], [events])
  const [type, setType] = useState(all)
  const [expandedId, setExpandedId] = useState(events[0]?.id ?? '')
  const visibleEvents = useMemo(() => events.filter((event) => type === all || event.type === type).slice(0, 14), [events, type])

  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">LIVING TIME RIVER</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">时间河开始真正流动。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">筛选事件类型，展开时间涟漪，观察节点如何在时间里成长，而不是只阅读静态列表。</p>
        </div>
        <div className="flex max-w-3xl flex-wrap gap-2">
          {eventTypes.map((item) => (
            <button key={item} type="button" onClick={() => setType(item)} className={`rounded-full px-3 py-2 text-[11px] font-semibold transition ${type === item ? 'bg-ink text-white' : 'bg-white/70 text-ink/55 hover:bg-white'}`}>
              {item === all ? '全部' : item}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-8 space-y-4 before:absolute before:left-4 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-lake/25">
        {visibleEvents.map((event, index) => {
          const expanded = expandedId === event.id
          return (
            <motion.article
              key={event.id}
              className={`relative ml-10 rounded-[1.6rem] border p-5 transition ${expanded ? 'border-ink bg-ink text-white shadow-soft' : 'border-white/60 bg-white/70 text-ink hover:bg-white'}`}
              animate={reducedMotion ? undefined : { x: expanded ? [0, 5, 0] : 0 }}
              transition={{ duration: 3.2, repeat: expanded ? Infinity : 0 }}
            >
              <button type="button" className="absolute -left-[2.85rem] top-5 h-8 w-8 rounded-full border border-white bg-gold shadow-soft" onClick={() => setExpandedId(event.id)} aria-label={`展开 ${event.title}`} />
              <button type="button" className="w-full text-left" onClick={() => setExpandedId(expanded ? '' : event.id)}>
                <span className={`text-xs font-semibold tracking-[0.22em] ${expanded ? 'text-white/55' : 'text-moss'}`}>{event.date} · {findAreaName(event.areaIds, areas)}</span>
                <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${expanded ? 'text-white/70' : 'text-ink/60'}`}>{event.description}</p>
              </button>
              {expanded ? (
                <div className="mt-4 grid gap-3 rounded-2xl bg-white/10 p-4 text-sm text-white/70 md:grid-cols-3">
                  <span>关联：{findNodeTitle(event.nodeIds, nodes)}</span>
                  <span>角色：{event.actor ?? 'system'}</span>
                  <span>涟漪：第 {index + 1} 层</span>
                </div>
              ) : null}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
