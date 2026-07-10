import { RotateCcw, Search } from 'lucide-react'
import type { ArchiveFilters as ArchiveFilterState, ArchiveSort } from '@/lib/archive'
import type { ArchiveViewModel } from '@/lib/scenes/build-archive-model'
import styles from './ArchiveHallStage.module.css'

export function ArchiveFilters({
  filters,
  model,
  searchState,
  onChange,
  onReset,
}: {
  filters: ArchiveFilterState
  model: ArchiveViewModel
  searchState: 'idle' | 'loading' | 'ready'
  onChange: (filters: ArchiveFilterState) => void
  onReset: () => void
}) {
  const update = (patch: Partial<ArchiveFilterState>) => onChange({ ...filters, ...patch })

  return (
    <div className={styles.filters} data-fuse-state={searchState}>
      <label className={styles.searchField}>
        <Search aria-hidden="true" size={17} />
        <input
          value={filters.query}
          onChange={(event) => update({ query: event.target.value })}
          placeholder="输入卷宗名、摘要或标签"
          aria-label="搜索公开卷宗"
        />
        <small>{searchState === 'loading' ? '检索中' : filters.query ? '模糊检索' : '输入后加载检索器'}</small>
      </label>
      <div className={styles.filterMenus}>
        <select value={filters.areaId} onChange={(event) => update({ areaId: event.target.value })} aria-label="按馆藏分区筛选">
          <option value="all">全部区域</option>
          {model.shelves.map((shelf) => <option key={shelf.areaId} value={shelf.areaId}>{shelf.title}</option>)}
        </select>
        <select value={filters.type} onChange={(event) => update({ type: event.target.value })} aria-label="按卷宗类型筛选">
          <option value="all">全部类型</option>
          {model.options.types.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
        <select value={filters.lifeStage} onChange={(event) => update({ lifeStage: event.target.value })} aria-label="按生命阶段筛选">
          <option value="all">全部阶段</option>
          {model.options.lifeStages.map((stage) => <option key={stage.value} value={stage.value}>{stage.label}</option>)}
        </select>
        <select value={filters.tag} onChange={(event) => update({ tag: event.target.value })} aria-label="按标签筛选">
          <option value="all">全部标签</option>
          {model.options.tags.map((tag) => <option key={tag.value} value={tag.value}>{tag.label}</option>)}
        </select>
        <select value={filters.sort} onChange={(event) => update({ sort: event.target.value as ArchiveSort })} aria-label="卷宗排序">
          <option value="newest">最近优先</option>
          <option value="oldest">最早优先</option>
          <option value="title">标题排序</option>
        </select>
        <button type="button" onClick={onReset} aria-label="清除档案馆筛选" title="清除筛选"><RotateCcw aria-hidden="true" size={16} /></button>
      </div>
    </div>
  )
}
