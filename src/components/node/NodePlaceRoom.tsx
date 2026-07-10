'use client'

import { getImageProps } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { Archive, ArrowDown, BookOpen, Lightbulb, Map, Waves } from 'lucide-react'
import { gsap } from 'gsap'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { SceneTransitionLink } from '@/components/world/migration/SceneTransitionLink'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import type { NodePlaceModel } from '@/lib/scenes/build-node-model'
import { NodeJourneyControls } from './NodeJourneyControls'
import { NodePassport } from './NodePassport'
import styles from './NodePlaceRoom.module.css'

function NodeBackdrop({ model, imageRef, onLoad, onError }: { model: NodePlaceModel; imageRef: RefObject<HTMLImageElement | null>; onLoad: () => void; onError: () => void }) {
  const { props: desktop } = getImageProps({ src: model.asset.desktop.src, alt: '', width: model.asset.desktop.width, height: model.asset.desktop.height, sizes: '100vw', quality: 82, priority: true })
  const { props: mobile } = getImageProps({ src: model.asset.mobile.src, alt: '', width: model.asset.mobile.width, height: model.asset.mobile.height, sizes: '100vw', quality: 78, priority: true })
  return <picture className={styles.picture}><source media="(max-width:767px)" srcSet={mobile.srcSet} /><img {...desktop} ref={imageRef} className={styles.image} aria-hidden="true" onLoad={onLoad} onError={onError} /></picture>
}

export function NodePlaceRoom({ model }: { model: NodePlaceModel }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const roomRef = useRef<HTMLDivElement>(null)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => { const image = imageRef.current; if (!image?.complete) return; if (image.naturalWidth > 0) setImageReady(true); else setImageFailed(true) }, [])
  useEffect(() => { if (!roomRef.current) return; const media = gsap.matchMedia(); media.add('(prefers-reduced-motion: no-preference)', () => gsap.fromTo(roomRef.current!.querySelectorAll('[data-room-object]'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: .06, duration: .5, ease: 'power2.out' })); return () => media.revert() }, [])
  const fallbackItems = [{ id: 'reading', href: '#reading', title: '展开正文', description: model.summary }, ...model.relationDoors.map((door) => ({ id: door.id, href: door.href, title: door.title, description: door.reason }))]
  return <div ref={roomRef} className={styles.stage} data-image-ready={imageReady} data-image-failed={imageFailed}>
    <WorldViewport sceneId="node" label={`${model.title}内容地点`} className={styles.viewport} background={<div className={styles.backgroundFallback} />} fallback={<AccessibleSceneList title={model.title} items={fallbackItems} className={styles.staticFallback} />}>
      <NodeBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
      <div className={styles.veil} aria-hidden="true" />
      <header className={styles.arrival} data-room-object><p>NODE · {model.area?.worldName ?? model.node.areaId}</p><h1 className="world-scene-title">{model.title}</h1><span>{model.summary}</span></header>
      <NodePassport node={model.node} area={model.area} lifeSignal={model.lifeSignal} compact className={styles.passport} />
      <div className={styles.relationDoors} aria-label="相邻地点">
        {model.relationDoors.map((door) => <SceneTransitionLink key={door.id} href={door.href} destination={{ href: door.href, sceneId: 'node', objectId: door.id, transitionObject: 'door', accessibleLabel: `穿过关系门抵达 ${door.title}` }} sourceObjectId={model.node.id} data-room-object style={{ '--door-x': `${door.x}%`, '--door-y': `${door.y}%`, '--door-mobile-y': `${door.mobileY}%` } as React.CSSProperties}><i aria-hidden="true" /><span>{door.title}</span><small>{door.groupTitle}</small></SceneTransitionLink>)}
      </div>
      <a href="#reading" className={styles.readingDoor} data-room-object><BookOpen size={17} /><span>展开这里的正文</span><small>{model.readingMinutes ? `约 ${model.readingMinutes} 分钟` : '轻量记录'}</small><ArrowDown size={16} /></a>
      {model.pathContext ? <div className={styles.journey}><NodeJourneyControls context={model.pathContext} /></div> : null}
      <nav className={styles.exits} aria-label="地点出口"><Link href={`/atlas#${model.node.areaId}`} title="回所在星域"><Map size={17} /><span>星图</span></Link><Link href="/timeline" title="查看时间河"><Waves size={17} /><span>时间</span></Link><Link href="/archive" title="进入档案馆"><Archive size={17} /><span>档案</span></Link><SceneTransitionLink href={`/ask?fromNode=${model.node.slug}`} destination={{ href: `/ask?fromNode=${model.node.slug}`, sceneId: 'lighthouse', objectId: model.node.id, transitionObject: 'beam', accessibleLabel: `从 ${model.title} 向灯塔问路` }} sourceObjectId={model.node.id} title="询问灯塔"><Lightbulb size={17} /><span>灯塔</span></SceneTransitionLink></nav>
    </WorldViewport>
  </div>
}
