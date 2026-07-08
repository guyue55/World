'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { r3TimelineEvents } from '@/features/r3-content-life'
import { useWorldRuntime } from './WorldRuntimeProvider'

const allArea = 'all'

export function DynamicTimeRiver() {
  const { reducedMotion } = useWorldRuntime()
  const [area, setArea] = useState<string>(allArea)
  const [expanded, setExpanded] = useState<string>(r3TimelineEvents[0]?.nodeId ?? '')
  const areas = useMemo(() => [allArea, ...Array.from(new Set(r3TimelineEvents.map((event) => event.area)))], [])
  const events = useMemo(() => r3TimelineEvents.filter((event) => area === allArea || event.area === area).slice(0, 12), [area])

  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-moss">TIME RIVER</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">时间河可以筛选、展开和回望。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">它不再只是静态 timeline，而是根据区域过滤事件，并把节点生命阶段作为水面上的光标。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {areas.map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${item === area ? 'bg-ink text-white' : 'bg-white/70 text-ink/65 hover:bg-white'}`}
              onClick={() => setArea(item)}
            >
              {item === allArea ? '全部区域' : item}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-8 space-y-4 before:absolute before:left-5 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-lake/25">
        {events.map((event, index) => {
          const isExpanded = expanded === event.nodeId
          return (
            <motion.article
              key={`${event.nodeId}-${event.date}`}
              className="relative ml-12 rounded-[1.5rem] border border-white/60 bg-sand/50 p-5 transition hover:bg-white/72"
              initial={reducedMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.04 }}
            >
              <span className="absolute -left-[2.45rem] top-6 h-4 w-4 rounded-full border-2 border-white bg-lake shadow-soft" />
              <button type="button" className="w-full text-left" onClick={() => setExpanded(isExpanded ? '' : event.nodeId)}>
                <p className="text-xs font-semibold tracking-[0.24em] text-ink/40">{event.date} · {event.area}</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{event.title}</h3>
              </button>
              {isExpanded ? (
                <motion.div initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 rounded-2xl bg-white/62 p-4 text-sm leading-7 text-ink/62">
                  <p>事件类型：{event.eventType}</p>
                  <p>生命阶段：{event.lifeStage}</p>
                  <p>节点编号：{event.nodeId}</p>
                </motion.div>
              ) : null}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
