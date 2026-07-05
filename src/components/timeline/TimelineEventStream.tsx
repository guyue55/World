'use client'

import { useMemo, useState } from 'react'
import type { Area, Node, WorldEvent } from '@/lib/types'
import {
  filterTimelineEvents,
  getTimelineFilterOptions,
  groupTimelineEventsByDate,
  type TimelineFilters as TimelineFilterState,
} from '@/lib/timeline'
import { TimelineFilters } from '@/components/timeline/TimelineFilters'
import { WorldEventCard } from '@/components/timeline/WorldEventCard'

const initialFilters: TimelineFilterState = {
  type: 'all',
  actor: 'all',
}

export function TimelineEventStream({
  events,
  nodes,
  areas,
}: {
  events: WorldEvent[]
  nodes: Node[]
  areas: Area[]
}) {
  const [filters, setFilters] = useState<TimelineFilterState>(initialFilters)
  const options = useMemo(() => getTimelineFilterOptions(events), [events])
  const filtered = useMemo(() => filterTimelineEvents(events, filters), [events, filters])
  const groups = useMemo(() => groupTimelineEventsByDate(filtered), [filtered])

  return (
    <section className="space-y-6">
      <TimelineFilters
        filters={filters}
        types={options.types}
        actors={options.actors}
        onChange={setFilters}
      />
      <p className="text-sm text-ink/55">当前显示 {filtered.length} / {events.length} 条公开事件</p>
      {groups.length === 0 ? (
        <div className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-ink">这段时间河暂时没有水纹</h2>
          <p className="mt-3 max-w-2xl leading-8 text-ink/65">
            当前筛选没有命中公开事件。可以放宽事件类型或行动者，或者回到地图从空间入口继续探索。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-night"
            >
              清空过滤
            </button>
            <a href="/atlas" className="rounded-full border border-ink/10 bg-white/75 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
              回到世界地图
            </a>
            <a href="/archive" className="rounded-full border border-ink/10 bg-white/75 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
              去档案馆检索
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.date} className="grid gap-4 lg:grid-cols-[160px_minmax(0,1fr)]">
              <div className="text-sm font-semibold text-moss">{group.date}</div>
              <div className="space-y-4">
                {group.events.map((event) => (
                  <WorldEventCard key={event.id} event={event} nodes={nodes} areas={areas} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
