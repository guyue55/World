'use client'

import { getImageProps } from 'next/image'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ArrowLeft } from 'lucide-react'
import { gsap } from 'gsap'
import { SceneTransitionLink } from '@/components/world/migration/SceneTransitionLink'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import type { LighthouseGuideModel } from '@/lib/scenes/build-lighthouse-model'
import type { LighthouseRuntimeResponse } from '@/server/ai/lighthouse-runtime'
import { PublicLighthouseConsole } from './PublicLighthouseConsole'
import styles from './LighthouseGuideStage.module.css'

function LighthouseBackdrop({ model, imageRef, onLoad, onError }: { model: LighthouseGuideModel; imageRef: RefObject<HTMLImageElement | null>; onLoad: () => void; onError: () => void }) {
  const { props: desktop } = getImageProps({ src: model.asset.desktop.src, alt: '', width: model.asset.desktop.width, height: model.asset.desktop.height, quality: 82, sizes: '100vw', priority: true })
  const { props: mobile } = getImageProps({ src: model.asset.mobile.src, alt: '', width: model.asset.mobile.width, height: model.asset.mobile.height, quality: 78, sizes: '100vw', priority: true })
  return <picture className={styles.picture}><source media="(max-width:767px)" srcSet={mobile.srcSet} /><img {...desktop} ref={imageRef} className={styles.image} aria-hidden="true" onLoad={onLoad} onError={onError} /></picture>
}

function sourceLabel(path: string | null | undefined) {
  if (!path) return '从世界入口抵达'
  if (path.startsWith('/node/')) return '从内容地点抵达'
  if (path.startsWith('/paths')) return '沿旅程抵达'
  if (path.startsWith('/timeline')) return '从时间河抵达'
  if (path.startsWith('/archive')) return '从档案馆抵达'
  if (path.startsWith('/atlas')) return '从星图抵达'
  return '从浮屿世界抵达'
}

export function LighthouseGuideStage({ model, initialResponse }: { model: LighthouseGuideModel; initialResponse: LighthouseRuntimeResponse }) {
  const runtime = useWorldRuntime()
  const stageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const sourcePath = runtime.lastJourney?.path ?? null
  const context = useMemo(() => ({ ...createSceneContext('lighthouse', sourcePath), focusedObjectId: runtime.lastJourney?.recentNodeSlug ?? null, pathId: runtime.lastJourney?.recentPathId ?? null }), [runtime.lastJourney, sourcePath])

  useEffect(() => { const image = imageRef.current; if (!image?.complete) return; if (image.naturalWidth > 0) setImageReady(true); else setImageFailed(true) }, [])
  useEffect(() => {
    if (!stageRef.current) return
    const media = gsap.matchMedia()
    media.add({ full: '(prefers-reduced-motion:no-preference)', desktop: '(min-width:768px)' }, (match) => {
      const conditions = match.conditions as { full: boolean; desktop: boolean }
      if (!conditions.full) return
      const beam = stageRef.current?.querySelector('[data-lighthouse-beam]')
      const signals = stageRef.current?.querySelectorAll('[data-lighthouse-signal]')
      gsap.fromTo(signals ?? [], { autoAlpha: 0, scale: .85 }, { autoAlpha: 1, scale: 1, stagger: .12, duration: .5, ease: 'power2.out' })
      if (beam) gsap.fromTo(beam, { autoAlpha: .28, rotation: conditions.desktop ? -2 : 0, transformOrigin: '0% 50%' }, { autoAlpha: .72, rotation: conditions.desktop ? 2 : 0, duration: 4.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    })
    return () => media.revert()
  }, [])

  const fallbackItems = model.fallbackLinks.map((item) => ({ id: item.href, href: item.href, title: item.title, description: item.reason }))
  return <div ref={stageRef} className={styles.stage} data-image-ready={imageReady} data-image-failed={imageFailed}>
    <WorldViewport sceneId="lighthouse" label="浮屿灯塔导览空间" className={styles.viewport} background={<div className={styles.backgroundFallback}><span className={styles.fallbackMoon} /><span className={styles.fallbackIsland} /><span className={styles.fallbackTower}><i /></span><span className={styles.fallbackBeam} /></div>} fallback={<AccessibleSceneList title="灯塔静态导览" items={fallbackItems} className={styles.staticFallback} />}>
      <LighthouseBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
      <div className={styles.veil} aria-hidden="true" />
      <span className={styles.liveBeam} data-lighthouse-beam aria-hidden="true" />
      <header className={styles.arrival} data-lighthouse-signal><p>LIGHTHOUSE · {sourceLabel(sourcePath)}</p><h1 className="world-scene-title">{model.title}</h1><span>{model.arrivalLine}</span></header>
      <nav className={styles.islandSignals} aria-label="灯塔照亮的下一站">
        {model.routes.slice(0, 3).map((route, index) => <SceneTransitionLink key={route.id} href={route.href} destination={{ href: route.href, sceneId: route.kind === 'node' ? 'node' : route.kind === 'path' ? 'paths' : 'atlas', objectId: route.id, transitionObject: 'beam', accessibleLabel: `沿光束前往 ${route.title}` }} sourceObjectId={route.id} data-lighthouse-signal style={{ '--signal-index': index } as React.CSSProperties}><i aria-hidden="true" /><span>{route.title}</span><small>{route.reason}</small></SceneTransitionLink>)}
      </nav>
      <div className={styles.guide}><PublicLighthouseConsole initialResponse={initialResponse} context={context} quickQuestions={model.quickQuestions} /></div>
      <nav className={styles.exits} aria-label="离开灯塔"><SceneTransitionLink href={sourcePath && sourcePath !== '/ask' ? sourcePath : '/'} destination={{ href: sourcePath && sourcePath !== '/ask' ? sourcePath : '/', sceneId: sourcePath?.startsWith('/node/') ? 'node' : 'gateway', transitionObject: 'beam', accessibleLabel: '沿来路返回' }} sourceObjectId="lighthouse-return"><ArrowLeft size={16} /><span>返回来路</span></SceneTransitionLink></nav>
    </WorldViewport>
  </div>
}
