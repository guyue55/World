import type { Area, LifeStage, NodeType } from '@/lib/types'
import type { ArchiveFilters as ArchiveFilterState, ArchiveSort } from '@/lib/archive'

export function ArchiveFilters({
  filters,
  areas,
  nodeTypes,
  lifeStages,
  popularTags,
  onChange,
  onReset,
}: {
  filters: ArchiveFilterState
  areas: Area[]
  nodeTypes: NodeType[]
  lifeStages: LifeStage[]
  popularTags: Array<{ tag: string; count: number }>
  onChange: (filters: ArchiveFilterState) => void
  onReset: () => void
}) {
  const update = (patch: Partial<ArchiveFilterState>) => onChange({ ...filters, ...patch })

  return (
    <div className="space-y-4 rounded-world border border-ink/10 bg-white/45 p-4 shadow-soft">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_180px_150px]">
        <input
          value={filters.query}
          onChange={(event) => update({ query: event.target.value })}
          placeholder="搜索标题、摘要、标签或世界名"
          className="min-w-0 rounded-full border border-ink/10 bg-white/75 px-5 py-3 outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        />
        <select value={filters.areaId} onChange={(event) => update({ areaId: event.target.value })} className="min-w-0 rounded-full border border-ink/10 bg-white/75 px-4 py-3">
          <option value="all">全部区域</option>
          {areas.map((area) => <option key={area.id} value={area.id}>{area.worldName}</option>)}
        </select>
        <select value={filters.type} onChange={(event) => update({ type: event.target.value })} className="min-w-0 rounded-full border border-ink/10 bg-white/75 px-4 py-3">
          <option value="all">全部类型</option>
          {nodeTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        <select value={filters.lifeStage} onChange={(event) => update({ lifeStage: event.target.value })} className="min-w-0 rounded-full border border-ink/10 bg-white/75 px-4 py-3">
          <option value="all">全部阶段</option>
          {lifeStages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
        </select>
        <select value={filters.sort} onChange={(event) => update({ sort: event.target.value as ArchiveSort })} className="min-w-0 rounded-full border border-ink/10 bg-white/75 px-4 py-3">
          <option value="newest">最近优先</option>
          <option value="oldest">最早优先</option>
          <option value="title">标题排序</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => update({ tag: 'all' })}
          className={`rounded-full px-3 py-1 text-sm ${filters.tag === 'all' ? 'bg-ink text-paper' : 'bg-white/70 text-ink/65'}`}
        >
          全部标签
        </button>
        {popularTags.map((item) => (
          <button
            key={item.tag}
            type="button"
            onClick={() => update({ tag: item.tag })}
            className={`rounded-full px-3 py-1 text-sm transition ${
              filters.tag === item.tag ? 'bg-ink text-paper' : 'bg-white/70 text-ink/65 hover:bg-white'
            }`}
          >
            #{item.tag} · {item.count}
          </button>
        ))}
        <button
          type="button"
          onClick={onReset}
          className="ml-auto rounded-full border border-ink/10 bg-paper/70 px-3 py-1 text-sm text-ink/60 hover:bg-white"
        >
          清空筛选
        </button>
      </div>
    </div>
  )
}
