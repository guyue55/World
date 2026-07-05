import type { TimelineFilters as TimelineFilterState } from '@/lib/timeline'

type TimelineFilterOption = {
  value: string
  label: string
}

export function TimelineFilters({
  filters,
  types,
  actors,
  onChange,
}: {
  filters: TimelineFilterState
  types: TimelineFilterOption[]
  actors: TimelineFilterOption[]
  onChange: (filters: TimelineFilterState) => void
}) {
  return (
    <section className="flex flex-col gap-3 rounded-world border border-ink/10 bg-white/45 p-4 shadow-soft md:flex-row md:items-center">
      <select
        value={filters.type}
        onChange={(event) => onChange({ ...filters, type: event.target.value })}
        className="rounded-full border border-ink/10 bg-white/75 px-4 py-3"
      >
        <option value="all">全部事件类型</option>
        {types.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
      </select>
      <select
        value={filters.actor}
        onChange={(event) => onChange({ ...filters, actor: event.target.value })}
        className="rounded-full border border-ink/10 bg-white/75 px-4 py-3"
      >
        <option value="all">全部行动者</option>
        {actors.map((actor) => <option key={actor.value} value={actor.value}>{actor.label}</option>)}
      </select>
      <button
        type="button"
        onClick={() => onChange({ type: 'all', actor: 'all' })}
        className="rounded-full border border-ink/10 bg-paper/80 px-4 py-3 text-sm text-ink/60"
      >
        清空过滤
      </button>
    </section>
  )
}
