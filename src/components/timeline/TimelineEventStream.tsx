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
    </section>
  )
}
