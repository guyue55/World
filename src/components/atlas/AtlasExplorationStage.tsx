'use client'

import { getImageProps } from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { LocateFixed, Minus, Plus, RotateCcw } from 'lucide-react'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { WorldExitRail } from '@/components/world/primitives/WorldExitRail'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import type { AtlasViewModel } from '@/lib/scenes/build-atlas-model'
import { AtlasInspector } from './AtlasInspector'
import { AtlasSceneSvg } from './AtlasSceneSvg'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { createAtlasAmbientAdapter } from '@/world/scenes/atlas/module'
import styles from './AtlasExplorationStage.module.css'

type Camera = { x: number; y: number; scale: number }
const wholeMap: Camera = { x: 0, y: 0, scale: 1 }

function AtlasBackdrop({ model, imageRef, onError, onLoad }: { model: AtlasViewModel; imageRef: RefObject<HTMLImageElement | null>; onError: () => void; onLoad: () => void }) {
  const { props: desktop } = getImageProps({ src: model.asset.desktop.src, alt: '', width: model.asset.desktop.width, height: model.asset.desktop.height, sizes: '100vw', quality: 82, priority: true })
  const { props: mobile } = getImageProps({ src: model.asset.mobile.src, alt: '', width: model.asset.mobile.width, height: model.asset.mobile.height, sizes: '100vw', quality: 78, priority: true })
  return (
    <picture className={styles.picture}>
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
      <img {...desktop} ref={imageRef} className={styles.image} aria-hidden="true" onError={onError} onLoad={onLoad} />
    </picture>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function AtlasExplorationStage({ model }: { model: AtlasViewModel }) {
  const runtime = useWorldRuntime()
  const stageRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [focusedAreaId, setFocusedAreaId] = useState<string | null>(null)
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null)
  const [camera, setCamera] = useState<Camera>(wholeMap)

  const areaById = useMemo(() => new Map(model.areas.map((area) => [area.id, area])), [model.areas])
  const nodeById = useMemo(() => new Map(model.nodes.map((node) => [node.id, node])), [model.nodes])
  const focusedArea = focusedAreaId ? areaById.get(focusedAreaId) ?? null : null
  const focusedNode = focusedNodeId ? nodeById.get(focusedNodeId) ?? null : null
  const areaNodes = focusedArea ? model.nodes.filter((node) => node.areaId === focusedArea.id) : []
  const relatedLinks = focusedArea ? model.links.filter((link) => link.from === focusedArea.id || link.to === focusedArea.id) : []

  useEffect(() => setEnhanced(true), [])

  useEffect(() => {
    const image = imageRef.current
    if (!image?.complete) return
    if (image.naturalWidth > 0) setImageReady(true)
    else setImageFailed(true)
  }, [])

  useLayoutEffect(() => {
    const cameraElement = cameraRef.current
    if (!cameraElement) return
    let cancelled = false
    let cleanup = () => {}

    void import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const media = gsap.matchMedia()
      media.add({
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      }, (context) => {
        const reduced = Boolean(context.conditions?.reduceMotion)
        gsap.to(cameraElement, {
          xPercent: camera.x,
          yPercent: camera.y,
          scale: camera.scale,
          duration: reduced || document.hidden ? 0 : 0.7,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
      })
      cleanup = () => {
        gsap.killTweensOf(cameraElement)
        media.revert()
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [camera])

  useEffect(() => {
    const host = stageRef.current
    if (!host) return
    const controller = new AbortController()
    const adapter = createAtlasAmbientAdapter(host, model, { signal: controller.signal })
    const leave = runtime.registerAmbientScene('atlas', adapter)
    return () => { controller.abort(); leave() }
  }, [model, runtime.registerAmbientScene])

  const focusArea = useCallback((areaId: string) => {
    const area = areaById.get(areaId)
    if (!area) return
    setFocusedAreaId(area.id)
    setFocusedNodeId(null)
    setCamera({ x: clamp((50 - area.x) * 0.72, -30, 30), y: clamp((50 - area.y) * 0.72, -24, 24), scale: 1.34 })
  }, [areaById])

  const focusNode = useCallback((nodeId: string) => {
    const node = nodeById.get(nodeId)
    if (!node) return
    setFocusedAreaId(node.areaId)
    setFocusedNodeId(node.id)
    setCamera({ x: clamp((50 - node.x) * 0.82, -32, 32), y: clamp((50 - node.y) * 0.82, -26, 26), scale: 1.52 })
  }, [nodeById])

  const resetMap = useCallback(() => {
    setFocusedAreaId(null)
    setFocusedNodeId(null)
    setCamera(wholeMap)
  }, [])

  const nudge = useCallback((x: number, y: number) => {
    setFocusedAreaId(null)
    setFocusedNodeId(null)
    setCamera((current) => ({ ...current, x: clamp(current.x + x, -32, 32), y: clamp(current.y + y, -26, 26) }))
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (!stage.contains(document.activeElement)) return
      const delta = 6
      if (event.key === 'ArrowLeft') nudge(delta, 0)
      else if (event.key === 'ArrowRight') nudge(-delta, 0)
      else if (event.key === 'ArrowUp') nudge(0, delta)
      else if (event.key === 'ArrowDown') nudge(0, -delta)
      else return
      event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [nudge])

  const fallbackItems = model.areas.map((area) => ({
    id: area.id,
    href: `#atlas-${area.id}`,
    title: area.title,
    description: `${area.realName}，${area.publicNodeCount} 个公开地点`,
  }))

  return (
    <div ref={stageRef} className={styles.stage} data-atlas-stage data-enhanced={enhanced ? 'true' : 'false'} data-image-ready={imageReady ? 'true' : 'false'} data-image-failed={imageFailed ? 'true' : 'false'}>
      <WorldViewport
        sceneId="atlas"
        label="古月浮屿可探索星图"
        className={styles.viewport}
        background={<div className={styles.backgroundFallback} />}
        fallback={<AccessibleSceneList title="星图区域列表" items={fallbackItems} className={styles.staticFallback} />}
      >
        <div ref={cameraRef} className={styles.camera} data-testid="atlas-camera">
          <AtlasBackdrop model={model} imageRef={imageRef} onLoad={() => { setImageReady(true); setImageFailed(false) }} onError={() => { setImageReady(false); setImageFailed(true) }} />
          <div className={styles.imageVeil} aria-hidden="true" />
          <AtlasSceneSvg areas={model.areas} links={model.links} focusedAreaId={focusedAreaId} linkClassName={styles.semanticLink} areaClassName={styles.semanticArea} />

          <div className={styles.hotspotLayer} aria-label="星图区域与地点">
            {model.areas.map((area) => (
              <button
                id={`atlas-${area.id}`}
                key={area.id}
                type="button"
                className={styles.areaHotspot}
                style={{ left: `${area.x}%`, top: `${area.y}%`, '--area-color': area.color } as React.CSSProperties}
                onClick={() => focusArea(area.id)}
                aria-label={`聚焦${area.title}，${area.publicNodeCount} 个公开地点`}
                aria-pressed={focusedAreaId === area.id && !focusedNodeId}
                data-atlas-area={area.id}
              >
                <span aria-hidden="true">{area.icon}</span>
                <strong>{area.title}</strong>
                <small>{area.publicNodeCount}</small>
              </button>
            ))}
            {model.nodes.map((node) => {
              const visible = focusedAreaId === node.areaId
              return (
                <button
                  key={node.id}
                  type="button"
                  className={styles.nodeHotspot}
                  style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-importance': node.importance } as React.CSSProperties}
                  onClick={() => focusNode(node.id)}
                  aria-label={`聚焦地点：${node.title}`}
                  aria-pressed={focusedNodeId === node.id}
                  tabIndex={visible ? 0 : -1}
                  data-visible={visible ? 'true' : 'false'}
                  data-atlas-node={node.id}
                  data-atlas-life-stage={node.lifeStage}
                  data-atlas-life-status={node.status}
                >
                  <i aria-hidden="true" />
                  <span>{node.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        <header className={styles.arrival} data-atlas-arrival>
          <p>ATLAS · 星图穹顶</p>
          <h1 className="world-scene-title">{model.title}</h1>
          <span>{focusedArea ? `已抵达 ${focusedArea.title}` : model.arrivalLine}</span>
        </header>

        <div className={styles.controls} role="group" aria-label="星图视角控制">
          <button type="button" onClick={() => setCamera((current) => ({ ...current, scale: clamp(current.scale + 0.16, 1, 1.7) }))} aria-label="放大星图" title="放大"><Plus aria-hidden="true" /></button>
          <button type="button" onClick={() => setCamera((current) => ({ ...current, scale: clamp(current.scale - 0.16, 1, 1.7) }))} aria-label="缩小星图" title="缩小"><Minus aria-hidden="true" /></button>
          <button type="button" onClick={resetMap} aria-label="返回全图" title="返回全图"><RotateCcw aria-hidden="true" /></button>
        </div>

        <div className={styles.sceneStatus} aria-live="polite">
          <LocateFixed size={14} aria-hidden="true" />
          <span>{focusedNode ? focusedNode.title : focusedArea ? focusedArea.title : `${model.areas.length} 座浮屿 · ${model.totalPublicNodeCount} 个公开地点`}</span>
        </div>

        <div className={styles.exitRail}>
          <WorldExitRail exits={[{ href: '/timeline', label: '时间河' }, { href: '/archive', label: '档案馆' }]} />
        </div>

        <AtlasInspector
          area={focusedArea}
          node={focusedNode}
          areaNodes={areaNodes}
          relatedLinks={relatedLinks}
          areaById={areaById}
          onClose={resetMap}
          onSelectArea={focusArea}
          onSelectNode={focusNode}
        />

        <noscript>
          <nav className={styles.noScriptRail} aria-label="静态星图区域">
            {model.areas.map((area) => <a key={area.id} href={`#atlas-${area.id}`}>{area.title}</a>)}
          </nav>
        </noscript>
      </WorldViewport>
    </div>
  )
}
