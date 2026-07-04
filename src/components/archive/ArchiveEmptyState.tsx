import type { ArchiveFilters } from '@/lib/archive'

export function ArchiveEmptyState({ filters, onReset }: { filters: ArchiveFilters; onReset: () => void }) {
  const active = [
    filters.query && `关键词「${filters.query}」`,
    filters.areaId !== 'all' && `区域 ${filters.areaId}`,
    filters.type !== 'all' && `类型 ${filters.type}`,
    filters.lifeStage !== 'all' && `阶段 ${filters.lifeStage}`,
    filters.tag !== 'all' && `标签 #${filters.tag}`,
  ].filter(Boolean)

  return (
    <div className="rounded-world border border-ink/10 bg-white/45 p-8 text-ink/70 shadow-soft">
      <h2 className="break-words text-2xl font-semibold">罗盘没有找到对应的星</h2>
      <p className="mt-3 break-words leading-8">
        {active.length > 0
          ? `当前筛选：${active.join('、')}。可以放宽条件，或者让这颗星在未来被命名。`
          : '也许它还没有被命名，或者它仍在私密层静静发光。'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-full bg-ink px-5 py-3 text-paper"
      >
        清空筛选
      </button>
    </div>
  )
}
