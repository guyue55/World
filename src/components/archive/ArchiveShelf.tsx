import type { ArchiveShelfView } from '@/lib/scenes/build-archive-model'
import styles from './ArchiveHallStage.module.css'

export function ArchiveShelf({ shelf, visibleCount, active, onSelect }: { shelf: ArchiveShelfView; visibleCount: number; active: boolean; onSelect: () => void }) {
  return (
    <button type="button" className={styles.shelf} style={{ left: `${shelf.x}%`, top: `${shelf.y}%` }} onClick={onSelect} aria-pressed={active} aria-label={`${shelf.title}馆藏，当前 ${visibleCount} 卷`} data-archive-shelf={shelf.areaId} data-lit={visibleCount > 0 ? 'true' : 'false'}>
      <span aria-hidden="true" />
      <strong>{shelf.title}</strong>
      <small>{visibleCount} / {shelf.recordIds.length}</small>
    </button>
  )
}
