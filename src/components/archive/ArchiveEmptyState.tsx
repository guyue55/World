import type { Area, LifeStage, NodeType } from '@/lib/types'
import { formatArchiveLifeStage, formatArchiveNodeType, type ArchiveFilters } from '@/lib/archive'

export function ArchiveEmptyState({
  filters,
  areas,
  onReset,
}: {
  filters: ArchiveFilters
  areas: Area[]
  onReset: () => void
}) {
  const areaName = areas.find((area) => area.id === filters.areaId)?.worldName ?? filters.areaId
  const active = [
    filters.query && `关键词「${filters.query}」`,
    filters.areaId !== 'all' && `区域「${areaName}」`,
    filters.type !== 'all' && `类型「${formatArchiveNodeType(filters.type as NodeType)}」`,
    filters.lifeStage !== 'all' && `阶段「${formatArchiveLifeStage(filters.lifeStage as LifeStage)}」`,
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
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-night"
        >
          清空筛选，重新启航
        </button>
        <a href="/ask" className="rounded-full border border-ink/10 bg-white/75 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white">
          找不准关键词？问问灯塔
        </a>
        <a href="/atlas" className="text-sm font-semibold text-moss underline underline-offset-4 hover:text-ink">
          返回世界地图
        </a>
      </div>
    </div>
  )
}
