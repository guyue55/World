'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, FileSearch } from 'lucide-react'
import { gsap } from 'gsap'
import type { ArchiveFilters as ArchiveFilterState } from '@/lib/archive'
import { readArchiveContext, writeArchiveContext } from '@/lib/runtime/archive-context'
import type { ArchiveRecordView, ArchiveViewModel } from '@/lib/scenes/build-archive-model'
import { SceneInspector } from '@/components/world/primitives/SceneInspector'
import { ArchiveFilters } from './ArchiveFilters'
import { ArchiveShelf } from './ArchiveShelf'
import styles from './ArchiveHallStage.module.css'

const initialFilters: ArchiveFilterState = { query: '', areaId: 'all', type: 'all', lifeStage: 'all', tag: 'all', sort: 'newest' }
const recordPositions = [{ x: 39, y: 48 }, { x: 49, y: 43 }, { x: 60, y: 49 }, { x: 42, y: 62 }, { x: 54, y: 62 }, { x: 66, y: 58 }]

function sortRecords(records: ArchiveRecordView[], sort: ArchiveFilterState['sort']) {
  return [...records].sort((left, right) => {
    if (sort === 'title') return left.title.localeCompare(right.title, 'zh-CN')
    return sort === 'oldest' ? left.date.localeCompare(right.date) : right.date.localeCompare(left.date)
  })
}

export function ArchiveView({ model }: { model: ArchiveViewModel }) {
  const recordLayerRef = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState<ArchiveFilterState>(initialFilters)
  const [matchedIds, setMatchedIds] = useState<Set<string> | null>(null)
  const [searchState, setSearchState] = useState<'idle' | 'loading' | 'ready'>('idle')
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const stored = readArchiveContext({ ...initialFilters, recordId: null })
    setFilters({ query: stored.query, areaId: stored.areaId, type: stored.type, lifeStage: stored.lifeStage, tag: stored.tag, sort: stored.sort })
    setActiveRecordId(model.records.some((record) => record.id === stored.recordId) ? stored.recordId : null)
    setRestored(true)
  }, [model.records])

  useEffect(() => {
    if (!restored) return
    writeArchiveContext({ ...filters, recordId: activeRecordId })
  }, [activeRecordId, filters, restored])

  useEffect(() => {
    const query = filters.query.trim()
    let cancelled = false
    if (!query) {
      setMatchedIds(null)
      setSearchState('idle')
      return
    }
    setSearchState('loading')
    void import('fuse.js').then(({ default: Fuse }) => {
      if (cancelled) return
      const fuse = new Fuse(model.records, { keys: ['title', 'summary', 'tags', 'areaTitle', 'typeLabel', 'lifeStageLabel'], threshold: 0.3, ignoreLocation: true, minMatchCharLength: 1 })
      setMatchedIds(new Set(fuse.search(query).map((result) => result.item.id)))
      setSearchState('ready')
    })
    return () => { cancelled = true }
  }, [filters.query, model.records])

  const filtered = useMemo(() => sortRecords(model.records.filter((record) => {
    if (matchedIds && !matchedIds.has(record.id)) return false
    if (filters.areaId !== 'all' && record.areaId !== filters.areaId) return false
    if (filters.type !== 'all' && record.type !== filters.type) return false
    if (filters.lifeStage !== 'all' && record.lifeStage !== filters.lifeStage) return false
    if (filters.tag !== 'all' && !record.tags.includes(filters.tag)) return false
    return true
  }), filters.sort), [filters.areaId, filters.lifeStage, filters.sort, filters.tag, filters.type, matchedIds, model.records])

  const visibleCountByShelf = useMemo(() => new Map(model.shelves.map((shelf) => [shelf.id, filtered.filter((record) => record.shelfId === shelf.id).length])), [filtered, model.shelves])
  const visibleRecords = filtered.slice(0, recordPositions.length)
  const activeRecord = model.records.find((record) => record.id === activeRecordId) ?? null

  useLayoutEffect(() => {
    const layer = recordLayerRef.current
    if (!layer) return
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
      const reduced = Boolean(context.conditions?.reduceMotion)
      gsap.fromTo(layer.querySelectorAll('[data-archive-record]'), { autoAlpha: 0, y: reduced ? 0 : 12 }, { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.38, stagger: reduced ? 0 : 0.05, ease: 'power2.out' })
    })
    return () => media.revert()
  }, [filtered])

  const reset = () => { setFilters(initialFilters); setActiveRecordId(null) }

  return (
    <>
      <div className={styles.shelfLayer} aria-label="档案馆分区">
        {model.shelves.map((shelf) => <ArchiveShelf key={shelf.id} shelf={shelf} visibleCount={visibleCountByShelf.get(shelf.id) ?? 0} active={filters.areaId === shelf.areaId} onSelect={() => setFilters((current) => ({ ...current, areaId: current.areaId === shelf.areaId ? 'all' : shelf.areaId }))} />)}
      </div>

      <div ref={recordLayerRef} className={styles.recordLayer} aria-label="当前点亮卷宗">
        {visibleRecords.map((record, index) => <button key={record.id} type="button" data-archive-record={record.id} className={styles.recordMarker} style={{ left: `${recordPositions[index].x}%`, top: `${recordPositions[index].y}%` }} onClick={() => setActiveRecordId(record.id)}><i aria-hidden="true" /><span>{record.title}</span></button>)}
      </div>

      <section className={styles.catalogueDesk} aria-label="档案馆检索台" data-testid="archive-catalogue-desk">
        <div className={styles.resultStatus}><FileSearch size={15} aria-hidden="true" /><span>{filtered.length} / {model.records.length} 卷</span></div>
        <ArchiveFilters filters={filters} model={model} searchState={searchState} onChange={setFilters} onReset={reset} />
        {filtered.length === 0 ? <div className={styles.emptyState} data-testid="archive-empty"><strong>这一组抽屉是空的</strong><span>放宽关键词或筛选，馆藏仍在原位。</span><button type="button" onClick={reset}>清除条件</button></div> : null}
      </section>

      <SceneInspector open={Boolean(activeRecord)} title={activeRecord?.title ?? '公开卷宗'} onClose={() => setActiveRecordId(null)}>
        {activeRecord ? <div className={styles.inspectorBody} data-testid="archive-record-inspector"><p className={styles.inspectorKicker}>{activeRecord.areaTitle} · {activeRecord.typeLabel}</p><p>{activeRecord.summary}</p><p className={styles.recordMeta}>{activeRecord.lifeStageLabel} · {activeRecord.tags.slice(0, 3).map((tag) => `#${tag}`).join(' ')}</p><Link href={activeRecord.href} className={styles.nodeLink} data-archive-enter-node>展开卷宗 <ArrowRight size={15} aria-hidden="true" /></Link></div> : null}
      </SceneInspector>
    </>
  )
}
