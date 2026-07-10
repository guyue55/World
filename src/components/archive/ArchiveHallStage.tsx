'use client'

import { getImageProps } from 'next/image'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { WorldExitRail } from '@/components/world/primitives/WorldExitRail'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import type { ArchiveViewModel } from '@/lib/scenes/build-archive-model'
import { ArchiveView } from './ArchiveView'
import styles from './ArchiveHallStage.module.css'

function ArchiveBackdrop({ model, imageRef, onLoad, onError }: { model: ArchiveViewModel; imageRef: RefObject<HTMLImageElement | null>; onLoad: () => void; onError: () => void }) {
  const { props: desktop } = getImageProps({ src: model.asset.desktop.src, alt: '', width: model.asset.desktop.width, height: model.asset.desktop.height, sizes: '100vw', quality: 82, priority: true })
  const { props: mobile } = getImageProps({ src: model.asset.mobile.src, alt: '', width: model.asset.mobile.width, height: model.asset.mobile.height, sizes: '100vw', quality: 78, priority: true })
  return <picture className={styles.picture}><source media="(max-width: 767px)" srcSet={mobile.srcSet} /><img {...desktop} ref={imageRef} className={styles.image} aria-hidden="true" onLoad={onLoad} onError={onError} /></picture>
}

export function ArchiveHallStage({ model }: { model: ArchiveViewModel }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => { setEnhanced(true); const image = imageRef.current; if (image?.complete) { if (image.naturalWidth > 0) setImageReady(true); else setImageFailed(true) } }, [])
  const fallbackItems = model.records.map((record) => ({ id: record.id, href: record.href, title: record.title, description: `${record.areaTitle} · ${record.typeLabel}` }))
  return (
    <div className={styles.stage} data-enhanced={enhanced ? 'true' : 'false'} data-image-ready={imageReady ? 'true' : 'false'} data-image-failed={imageFailed ? 'true' : 'false'}>
      <WorldViewport sceneId="archive" label="月下公开档案馆" className={styles.viewport} background={<div className={styles.backgroundFallback} />} fallback={<AccessibleSceneList title="公开馆藏列表" items={fallbackItems} className={styles.staticFallback} />}>
        <ArchiveBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
        <div className={styles.veil} aria-hidden="true" />
        <header className={styles.arrival}><p>ARCHIVE · 档案馆</p><h1 className="world-scene-title">{model.title}</h1><span>{model.arrivalLine}</span></header>
        <ArchiveView model={model} />
        <div className={styles.exitRail}><WorldExitRail exits={[{ href: '/atlas', label: '星图' }, { href: '/paths', label: '路径' }]} /></div>
      </WorldViewport>
    </div>
  )
}
