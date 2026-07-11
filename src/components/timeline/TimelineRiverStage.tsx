'use client'

import { getImageProps } from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, RotateCcw, Waves } from 'lucide-react'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { SceneInspector } from '@/components/world/primitives/SceneInspector'
import { SceneTransitionLink } from '@/components/world/migration/SceneTransitionLink'
import { WorldExitRail } from '@/components/world/primitives/WorldExitRail'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import { readTimelineAnchor, writeTimelineAnchor } from '@/lib/runtime/timeline-position'
import type { TimelineEventView, TimelineViewModel } from '@/lib/scenes/build-timeline-model'
import { TimelineRiverPath } from './TimelineRiverPath'
import styles from './TimelineRiverStage.module.css'

const eventOffsets = [
  { x: -12, y: -7 },
  { x: 10, y: -8 },
  { x: -14, y: 8 },
  { x: 12, y: 8 },
  { x: 0, y: 13 },
]
const mobileEventOffsets = [{ x: -20, y: -6 }, { x: 20, y: -6 }, { x: 0, y: 10 }, { x: -19, y: 8 }, { x: 19, y: 8 }]

function TimelineBackdrop({ model, imageRef, onLoad, onError }: { model: TimelineViewModel; imageRef: RefObject<HTMLImageElement | null>; onLoad: () => void; onError: () => void }) {
  const { props: desktop } = getImageProps({ src: model.asset.desktop.src, alt: '', width: model.asset.desktop.width, height: model.asset.desktop.height, sizes: '100vw', quality: 82, priority: true })
  const { props: mobile } = getImageProps({ src: model.asset.mobile.src, alt: '', width: model.asset.mobile.width, height: model.asset.mobile.height, sizes: '100vw', quality: 78, priority: true })
  return <picture className={styles.picture}><source media="(max-width: 767px)" srcSet={mobile.srcSet} /><img {...desktop} ref={imageRef} className={styles.image} aria-hidden="true" onLoad={onLoad} onError={onError} /></picture>
}

export function TimelineRiverStage({ model }: { model: TimelineViewModel }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const eventLayerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const wheelLockedRef = useRef(false)
  const [enhanced, setEnhanced] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [activeAnchorId, setActiveAnchorId] = useState(model.latestAnchorId)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)

  const eventById = useMemo(() => new Map(model.events.map((event) => [event.id, event])), [model.events])
  const anchorIds = useMemo(() => model.anchors.map((anchor) => anchor.id), [model.anchors])
  const activeAnchorIndex = Math.max(0, model.anchors.findIndex((anchor) => anchor.id === activeAnchorId))
  const activeAnchor = model.anchors[activeAnchorIndex] ?? model.anchors.at(-1)
  const activeEvents = (activeAnchor?.eventIds ?? []).map((id) => eventById.get(id)).filter((event): event is TimelineEventView => Boolean(event))
  const visibleEvents = activeEvents.slice(0, eventOffsets.length)
  const activeEventIndex = activeEventId ? activeEvents.findIndex((event) => event.id === activeEventId) : -1
  const activeEvent = activeEventIndex >= 0 ? activeEvents[activeEventIndex] : null

  useEffect(() => {
    setEnhanced(true)
    setActiveAnchorId(readTimelineAnchor(anchorIds, model.latestAnchorId))
  }, [anchorIds, model.latestAnchorId])

  useEffect(() => {
    const image = imageRef.current
    if (!image?.complete) return
    if (image.naturalWidth > 0) setImageReady(true)
    else setImageFailed(true)
  }, [])

  useLayoutEffect(() => {
    const layer = eventLayerRef.current
    if (!layer) return
    let cancelled = false
    let cleanup = () => {}

    void import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const media = gsap.matchMedia()
      let tween: ReturnType<typeof gsap.fromTo> | null = null
      const syncVisibility = () => {
        if (!tween) return
        if (document.hidden) tween.pause()
        else tween.resume()
      }
      media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
        const reduced = Boolean(context.conditions?.reduceMotion)
        tween = gsap.fromTo(
          layer.querySelectorAll('[data-time-event]'),
          { autoAlpha: 0, scale: reduced ? 1 : 0.72 },
          { autoAlpha: 1, scale: 1, duration: reduced || document.hidden ? 0 : 0.48, stagger: reduced ? 0 : 0.07, ease: 'back.out(1.4)' },
        )
        syncVisibility()
      })
      document.addEventListener('visibilitychange', syncVisibility)
      cleanup = () => {
        document.removeEventListener('visibilitychange', syncVisibility)
        tween?.kill()
        media.revert()
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [activeAnchorId])

  const selectAnchor = useCallback((anchorId: string) => {
    if (!anchorIds.includes(anchorId)) return
    setActiveAnchorId(anchorId)
    setActiveEventId(null)
    writeTimelineAnchor(anchorId)
  }, [anchorIds])

  const moveAnchor = useCallback((direction: number) => {
    const nextIndex = Math.min(model.anchors.length - 1, Math.max(0, activeAnchorIndex + direction))
    selectAnchor(model.anchors[nextIndex]?.id ?? model.latestAnchorId)
  }, [activeAnchorIndex, model.anchors, model.latestAnchorId, selectAnchor])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24 || wheelLockedRef.current) return
      wheelLockedRef.current = true
      moveAnchor(event.deltaY > 0 ? -1 : 1)
      window.setTimeout(() => { wheelLockedRef.current = false }, 420)
      event.preventDefault()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (!stage.contains(document.activeElement)) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') moveAnchor(-1)
      else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') moveAnchor(1)
      else if (event.key === 'Home') selectAnchor(model.anchors[0]?.id ?? model.latestAnchorId)
      else if (event.key === 'End') selectAnchor(model.latestAnchorId)
      else return
      event.preventDefault()
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => { stage.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKeyDown) }
  }, [model.anchors, model.latestAnchorId, moveAnchor, selectAnchor])

  const fallbackItems = model.events.map((event) => ({ id: event.id, href: event.nodeHref ?? `#${event.id}`, title: `${event.date} · ${event.title}`, description: event.description }))

  return (
    <div ref={stageRef} className={styles.stage} data-enhanced={enhanced ? 'true' : 'false'} data-image-ready={imageReady ? 'true' : 'false'} data-image-failed={imageFailed ? 'true' : 'false'} tabIndex={-1}>
      <WorldViewport sceneId="timeline" label="古月浮屿时间河" className={styles.viewport} background={<div className={styles.backgroundFallback} />} fallback={<AccessibleSceneList title="时间河事件列表" items={fallbackItems} className={styles.staticFallback} />}>
        <TimelineBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
        <div className={styles.veil} aria-hidden="true" />
        <TimelineRiverPath anchors={model.anchors} activeAnchorId={activeAnchorId} />

        <header className={styles.arrival}>
          <p>TIME RIVER · 时间河</p>
          <h1 className="world-scene-title">{model.title}</h1>
          <span>{activeAnchor ? `${activeAnchor.dateLabel}，${activeAnchor.eventIds.length} 道水纹` : model.arrivalLine}</span>
        </header>

        <div className={styles.anchorLayer} aria-label="时间锚点">
          {model.anchors.map((anchor) => (
            <button key={anchor.id} type="button" style={{ '--anchor-x': `${anchor.x}%`, '--anchor-y': `${anchor.y}%`, '--anchor-mobile-x': `${anchor.mobileX}%`, '--anchor-mobile-y': `${anchor.mobileY}%` } as React.CSSProperties} className={styles.anchorButton} aria-label={`前往 ${anchor.dateLabel}，${anchor.eventIds.length} 条事件`} aria-pressed={anchor.id === activeAnchorId} onClick={() => selectAnchor(anchor.id)} data-time-anchor={anchor.id}>
              <span>{anchor.dateLabel}</span><small>{anchor.eventIds.length}</small>
            </button>
          ))}
        </div>

        {activeAnchor ? (
          <div ref={eventLayerRef} className={styles.eventLayer} aria-label={`${activeAnchor.dateLabel}事件`}>
            {visibleEvents.map((event, index) => {
              const offset = eventOffsets[index]
              const mobileOffset = mobileEventOffsets[index]
              return (
                <button key={event.id} id={event.id} type="button" data-time-event={event.id} className={styles.eventMarker} style={{ '--event-x': `${activeAnchor.x + offset.x}%`, '--event-y': `${activeAnchor.y + offset.y}%`, '--event-mobile-x': `${activeAnchor.mobileX + mobileOffset.x}%`, '--event-mobile-y': `${activeAnchor.mobileY + mobileOffset.y}%` } as React.CSSProperties} onClick={() => setActiveEventId(event.id)}>
                  <i aria-hidden="true" /><span>{event.title}</span>
                </button>
              )
            })}
          </div>
        ) : null}

        <nav className={styles.timeRail} aria-label="河段导航">
          <button type="button" onClick={() => moveAnchor(-1)} disabled={activeAnchorIndex === 0} aria-label="较早河段"><ArrowLeft aria-hidden="true" /></button>
          <div><strong>{activeAnchor?.dateLabel}</strong><small>{activeAnchor?.seasonLabel}</small></div>
          <button type="button" onClick={() => moveAnchor(1)} disabled={activeAnchorIndex === model.anchors.length - 1} aria-label="较新河段"><ArrowRight aria-hidden="true" /></button>
          <button type="button" onClick={() => selectAnchor(model.latestAnchorId)} aria-label="回到最新河段" title="回到最新河段"><RotateCcw aria-hidden="true" /></button>
        </nav>

        <div className={styles.exitRail}><WorldExitRail exits={[{ href: '/atlas', label: '星图' }, { href: '/archive', label: '档案馆' }]} /></div>

        <SceneInspector open={Boolean(activeEvent)} title={activeEvent?.title ?? '时间水纹'} onClose={() => setActiveEventId(null)}>
          {activeEvent ? <div className={styles.inspectorBody} data-testid="timeline-event-inspector">
            <p className={styles.inspectorKicker}><Waves size={14} aria-hidden="true" /> {activeEvent.date} · {activeEvent.typeLabel}</p>
            <p>{activeEvent.description}</p>
            <p className={styles.eventMeta}>{activeEvent.areaLabels.join(' · ') || '世界公共河段'} · {activeEvent.actorLabel}</p>
            {activeEvent.nodeHref ? <SceneTransitionLink href={activeEvent.nodeHref} destination={{ href: activeEvent.nodeHref, sceneId: 'node', objectId: activeEvent.id, transitionObject: 'ripple', accessibleLabel: `从时间河进入 ${activeEvent.nodeTitle ?? '相关地点'}` }} sourceObjectId={activeEvent.id} className={styles.nodeLink}>{activeEvent.nodeTitle ?? '进入相关地点'} <ArrowRight size={15} aria-hidden="true" /></SceneTransitionLink> : null}
            <div className={styles.inspectorNav}>
              <button type="button" disabled={activeEventIndex <= 0} onClick={() => setActiveEventId(activeEvents[activeEventIndex - 1]?.id ?? null)}>上一道</button>
              <button type="button" disabled={activeEventIndex >= activeEvents.length - 1} onClick={() => setActiveEventId(activeEvents[activeEventIndex + 1]?.id ?? null)}>下一道</button>
            </div>
          </div> : null}
        </SceneInspector>

        <div className={styles.riverStatus}><CalendarDays size={14} aria-hidden="true" /><span>{model.anchors.length} 个时间锚 · {model.events.length} 条公开事件</span></div>
      </WorldViewport>
    </div>
  )
}
