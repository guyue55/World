'use client'

import { getImageProps } from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ArrowRight, Compass, Map, RotateCcw, Route } from 'lucide-react'
import { gsap } from 'gsap'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { WorldExitRail } from '@/components/world/primitives/WorldExitRail'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import { readPathProgress, resetPathProgress } from '@/lib/runtime/path-progress'
import type { JourneyPathView, PathDetailModel, PathsOverviewModel } from '@/lib/scenes/build-path-model'
import { JourneyWaypoint, type JourneyWaypointStatus } from './JourneyWaypoint'
import styles from './JourneyRouteStage.module.css'

function PathBackdrop({ model, imageRef, onLoad, onError }: { model: PathsOverviewModel | PathDetailModel; imageRef: RefObject<HTMLImageElement | null>; onLoad: () => void; onError: () => void }) {
  const { props: desktop } = getImageProps({ src: model.asset.desktop.src, alt: '', width: model.asset.desktop.width, height: model.asset.desktop.height, sizes: '100vw', quality: 82, priority: true })
  const { props: mobile } = getImageProps({ src: model.asset.mobile.src, alt: '', width: model.asset.mobile.width, height: model.asset.mobile.height, sizes: '100vw', quality: 78, priority: true })
  return <picture className={styles.picture}><source media="(max-width: 767px)" srcSet={mobile.srcSet} /><img {...desktop} ref={imageRef} className={styles.image} aria-hidden="true" onLoad={onLoad} onError={onError} /></picture>
}

function statusFor(index: number, currentIndex: number): JourneyWaypointStatus {
  if (index < currentIndex) return 'walked'
  if (index === currentIndex) return 'current'
  if (index === currentIndex + 1) return 'reachable'
  return 'unreached'
}

function OverviewRoutes({ paths, activeId, onSelect }: { paths: JourneyPathView[]; activeId: string; onSelect: (id: string) => void }) {
  return <div className={styles.overviewRoutes} aria-label="可选择的星路">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((path) => <path key={path.id} d={path.routeD} data-active={path.id === activeId} />)}
    </svg>
    {paths.map((path, index) => {
      const positions = [{ x: 82, y: 17 }, { x: 87, y: 50 }, { x: 82, y: 80 }, { x: 57, y: 26 }, { x: 58, y: 69 }, { x: 34, y: 48 }]
      const position = positions[index]
      return <button key={path.id} type="button" style={{ '--route-x': `${position.x}%`, '--route-y': `${position.y}%` } as React.CSSProperties} data-active={path.id === activeId} onClick={() => onSelect(path.id)} data-path-route={path.id}><Route aria-hidden="true" size={14} /><span>{path.title}</span></button>
    })}
  </div>
}

export function PathsOverviewStage({ model }: { model: PathsOverviewModel }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [activeId, setActiveId] = useState(model.featured[0]?.id ?? '')
  const active = model.featured.find((path) => path.id === activeId) ?? model.featured[0]
  const fallbackItems = model.allPaths.map((path) => ({ id: path.id, href: path.href, title: path.title, description: `${path.steps.length} 站 · 约 ${path.estimatedMinutes} 分钟` }))
  useEffect(() => { const image = imageRef.current; if (!image?.complete) return; if (image.naturalWidth > 0) setImageReady(true); else setImageFailed(true) }, [])
  return <div className={styles.stage} data-image-ready={imageReady} data-image-failed={imageFailed}>
    <WorldViewport sceneId="paths" label="古月浮屿星路岔口" className={styles.viewport} background={<div className={styles.backgroundFallback} />} fallback={<AccessibleSceneList title="公开路径列表" items={fallbackItems} className={styles.staticFallback} />}>
      <PathBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
      <div className={styles.veil} aria-hidden="true" />
      <header className={styles.arrival}><p>PATHS · 星路</p><h1 className="world-scene-title">{model.title}</h1><span>{model.arrivalLine}</span></header>
      <OverviewRoutes paths={model.featured} activeId={activeId} onSelect={setActiveId} />
      {active ? <aside className={styles.routeLedger} data-testid="path-route-ledger">
        <p>{active.audienceLabel} · {active.steps.length} 站 · 约 {active.estimatedMinutes} 分钟</p>
        <h2>{active.title}</h2><span>{active.description}</span>
        <div>{active.areaTitles.slice(0, 4).map((area) => <i key={area}>{area}</i>)}</div>
        <Link href={active.href}>踏上这条路 <ArrowRight size={15} aria-hidden="true" /></Link>
      </aside> : null}
      <div className={styles.exitRail}><WorldExitRail exits={[{ href: '/atlas', label: '星图' }, { href: '/archive', label: '档案馆' }]} /></div>
    </WorldViewport>
  </div>
}

export function JourneyRouteStage({ model }: { model: PathDetailModel }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => { const stored = readPathProgress(model.id, model.steps.length); setCurrentIndex(stored.currentIndex); setCompleted(stored.completed); setSelectedIndex(Math.min(stored.currentIndex, model.steps.length - 1)); const image = imageRef.current; if (!image?.complete) return; if (image.naturalWidth > 0) setImageReady(true); else setImageFailed(true) }, [model.id, model.steps.length])
  useEffect(() => { const root = routeRef.current; if (!root) return; const context = gsap.context(() => gsap.fromTo('[data-path-step]', { autoAlpha: 0, scale: .86 }, { autoAlpha: 1, scale: 1, stagger: .06, duration: .42, ease: 'power2.out' }), root); return () => context.revert() }, [])
  const selected = model.steps[selectedIndex]
  const pathPoints = useMemo(() => model.steps.map((step) => `${step.x},${step.y}`).join(' '), [model.steps])
  const fallbackItems = model.steps.map((step) => ({ id: step.slug, href: step.href, title: `${step.index + 1}. ${step.title}`, description: step.areaTitle }))
  const reset = () => { resetPathProgress(model.id); setCurrentIndex(0); setCompleted(false); setSelectedIndex(0) }
  return <div className={styles.stage} data-image-ready={imageReady} data-image-failed={imageFailed}>
    <WorldViewport sceneId="paths" label={`${model.title}旅程路线`} className={styles.viewport} background={<div className={styles.backgroundFallback} />} fallback={<AccessibleSceneList title={model.title} items={fallbackItems} className={styles.staticFallback} />}>
      <PathBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
      <div className={styles.veil} aria-hidden="true" />
      <header className={styles.detailArrival}><Link href="/paths">PATH · 返回岔口</Link><h1 className="world-scene-title">{model.title}</h1><span>{completed ? '整条星路已经走完。' : `当前位置 ${Math.min(currentIndex + 1, model.steps.length)} / ${model.steps.length}`}</span></header>
      <div ref={routeRef} className={styles.detailRoute} data-testid="journey-route">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={pathPoints} /></svg>
        {model.steps.map((step) => <JourneyWaypoint key={step.slug} step={step} status={completed ? 'walked' : statusFor(step.index, currentIndex)} onSelect={() => setSelectedIndex(step.index)} />)}
      </div>
      {selected && !completed ? <aside className={styles.waypointLedger} data-testid="path-waypoint-ledger">
        <p>{statusFor(selected.index, currentIndex) === 'walked' ? '走过的地点' : selected.index === currentIndex ? '当前位置' : selected.index === currentIndex + 1 ? '下一站' : '远方路标'}</p>
        <h2>{selected.title}</h2><span>{selected.summary}</span>
        {selected.index <= currentIndex + 1 || completed ? <Link href={selected.href}>{selected.index < currentIndex ? '再次抵达' : '进入地点'} <ArrowRight size={15} /></Link> : <small>走完前一站后，这里会亮起。</small>}
      </aside> : null}
      {completed ? <section className={styles.completion} data-testid="path-complete"><Compass aria-hidden="true" /><div><strong>你抵达了这条路的尽头</strong><span>{model.areaTitles.join('、')} 已成为一段完整来路。</span></div>{model.nextPaths[0] ? <Link href={model.nextPaths[0].href}>继续下一条路</Link> : <Link href="/atlas">回望世界</Link>}</section> : null}
      <div className={styles.routeActions}><Link href="/atlas" title="返回星图"><Map size={17} /><span>星图</span></Link><button type="button" onClick={reset} title="重置本路线"><RotateCcw size={17} /><span>重置</span></button></div>
    </WorldViewport>
  </div>
}
