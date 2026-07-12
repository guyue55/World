'use client'

import Link from 'next/link'
import { getImageProps } from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Archive, ArrowRight, Map, Route, RotateCcw } from 'lucide-react'
import { gsap } from 'gsap'
import { WorldViewport } from '@/components/world/primitives/WorldViewport'
import { SceneObjectButton } from '@/components/world/primitives/SceneObjectButton'
import { AccessibleSceneList } from '@/components/world/primitives/AccessibleSceneList'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import type { GatewayDirection, GatewayViewModel } from '@/lib/scenes/build-gateway-model'
import { createGatewayAmbientAdapter } from '@/world/scenes/gateway/module'
import styles from './WorldGatewayStage.module.css'

const directionIcons = {
  atlas: Map,
  paths: Route,
  archive: Archive,
}

const gatewayStars = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 97,
  y: (index * 53 + 7) % 62,
  size: 1 + (index % 3),
}))

function GatewayBackdrop({
  model,
  imageRef,
  onLoad,
  onError,
}: {
  model: GatewayViewModel
  imageRef: RefObject<HTMLImageElement | null>
  onLoad: () => void
  onError: () => void
}) {
  const { props: desktop } = getImageProps({
    src: model.asset.desktop.src,
    alt: '',
    width: model.asset.desktop.width,
    height: model.asset.desktop.height,
    sizes: '100vw',
    quality: 82,
    priority: true,
  })
  const { props: mobile } = getImageProps({
    src: model.asset.mobile.src,
    alt: '',
    width: model.asset.mobile.width,
    height: model.asset.mobile.height,
    sizes: '100vw',
    quality: 78,
    priority: true,
  })

  return (
    <picture className={styles.picture}>
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
      <img
        {...desktop}
        ref={imageRef}
        aria-hidden="true"
        onLoad={onLoad}
        onError={onError}
        className={styles.image}
      />
    </picture>
  )
}

function DirectionObject({ direction }: { direction: GatewayDirection }) {
  const Icon = directionIcons[direction.sceneId as keyof typeof directionIcons] ?? Map
  return (
    <SceneObjectButton
      href={direction.href}
      destination={direction}
      sourceObjectId={direction.objectId ?? direction.sceneId}
      label={direction.accessibleLabel}
      icon={<Icon aria-hidden="true" size={17} />}
      className={styles.directionObject}
      selected={false}
    >
      <span className={styles.directionCopy}>
        <strong>{direction.title}</strong>
        <small>{direction.shortLabel}</small>
      </span>
    </SceneObjectButton>
  )
}

export function WorldGatewayStage({ model }: { model: GatewayViewModel }) {
  const runtime = useWorldRuntime()
  const stageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [entered, setEntered] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  const returningJourney = useMemo(
    () => runtime.lastJourney ?? runtime.journeyHistory.find((entry) => entry.path !== '/'),
    [runtime.journeyHistory, runtime.lastJourney],
  )
  const unfinishedPath = useMemo(
    () => runtime.journeyHistory.find((entry) => Boolean(entry.recentPathId)),
    [runtime.journeyHistory],
  )
  const returning = runtime.hydrated && runtime.visitedCount > 1 && Boolean(returningJourney)

  useEffect(() => {
    setEnhanced(true)
    setEntered(returning)
  }, [returning])

  useEffect(() => {
    const image = imageRef.current
    if (!image?.complete) return
    if (image.naturalWidth > 0) setImageReady(true)
    else setImageFailed(true)
  }, [])

  useEffect(() => {
    const host = stageRef.current
    if (!host) return
    const controller = new AbortController()
    const adapter = createGatewayAmbientAdapter(host, model, { signal: controller.signal })
    const leave = runtime.registerAmbientScene('gateway', adapter)
    return () => {
      controller.abort()
      leave()
    }
  }, [model, runtime.registerAmbientScene])

  useLayoutEffect(() => {
    const root = stageRef.current
    if (!root) return
    const media = gsap.matchMedia()

    media.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const reduced = Boolean(context.conditions?.reduceMotion) || runtime.motionPreference !== 'system'
        const duration = reduced ? 0 : context.conditions?.mobile ? 0.42 : 0.72
        const directions = root.querySelectorAll('[data-gateway-direction]')

        if (!entered) {
          gsap.set([leftDoorRef.current, rightDoorRef.current], { xPercent: 0 })
          gsap.set(directions, { autoAlpha: 0, y: reduced ? 0 : 18 })
          return
        }

        const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
        timeline
          .to(leftDoorRef.current, { xPercent: -104, duration }, 0)
          .to(rightDoorRef.current, { xPercent: 104, duration }, 0)
          .to('[data-gateway-arrival]', { autoAlpha: 0.78, y: reduced ? 0 : -8, duration: reduced ? 0 : 0.35 }, duration * 0.35)
          .to(directions, { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.4, stagger: reduced ? 0 : 0.08 }, duration * 0.55)
        return () => timeline.kill()
      },
      root,
    )

    return () => media.revert()
  }, [entered, runtime.motionPreference])

  const fallbackItems = model.directions.map((direction) => ({
    id: direction.sceneId,
    href: direction.href,
    title: direction.title,
    description: direction.description,
  }))

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      data-gateway-stage
      data-arrival-scene="gateway"
      data-arrival-object="world-gate"
      tabIndex={-1}
      data-enhanced={enhanced ? 'true' : 'false'}
      data-entered={entered ? 'true' : 'false'}
      data-image-ready={imageReady ? 'true' : 'false'}
      data-image-failed={imageFailed ? 'true' : 'false'}
    >
      <WorldViewport
        sceneId="gateway"
        label="古月浮屿世界入口"
        className={styles.viewport}
        background={(
          <>
            <div className={styles.imageFallback} />
            <GatewayBackdrop
              model={model}
              imageRef={imageRef}
              onLoad={() => {
                setImageReady(true)
                setImageFailed(false)
              }}
              onError={() => {
                setImageReady(false)
                setImageFailed(true)
              }}
            />
          </>
        )}
        fallback={(
          <div className={styles.staticFallback}>
            <p>欢迎来到古月浮屿。即使动态入口不可用，你仍可以从下面三条路进入。</p>
            <AccessibleSceneList title="选择方向" items={fallbackItems} />
          </div>
        )}
      >
        <div className={styles.spatialBase} data-gateway-spatial-base aria-hidden="true">
          <span className={styles.moon} />
          <span className={`${styles.island} ${styles.islandAtlas}`}><i /></span>
          <span className={`${styles.island} ${styles.islandPaths}`}><i /></span>
          <span className={`${styles.island} ${styles.islandArchive}`}><i /></span>
          <span className={styles.lighthouse}><i /></span>
          <span className={`${styles.routeLine} ${styles.routeAtlas}`} />
          <span className={`${styles.routeLine} ${styles.routePaths}`} />
          <span className={`${styles.routeLine} ${styles.routeArchive}`} />
        </div>

        <div className={styles.ambientLayer} data-gateway-ambient-layer aria-hidden="true">
          <span className={styles.starField}>
            {gatewayStars.map((star) => (
              <i key={star.id} style={{ '--star-x': `${star.x}%`, '--star-y': `${star.y}%`, '--star-size': `${star.size}px` } as React.CSSProperties} />
            ))}
          </span>
          <span className={`${styles.fogBand} ${styles.fogNear}`} />
          <span className={`${styles.fogBand} ${styles.fogFar}`} />
          <span className={styles.beaconBeam} />
        </div>

        <div className={styles.atmosphere} aria-hidden="true" />

        <div className={styles.arrival} data-gateway-arrival>
          <p className={styles.eyebrow}>{returning ? '欢迎回来' : '月下个人世界'}</p>
          <h1 className="world-scene-title">{model.title}</h1>
          <p>{returning ? '上次的灯还亮着。' : model.arrivalLine}</p>
        </div>

        <div ref={leftDoorRef} className={`${styles.door} ${styles.doorLeft}`} aria-hidden="true" />
        <div ref={rightDoorRef} className={`${styles.door} ${styles.doorRight}`} aria-hidden="true" />

        {!entered ? (
          <button type="button" onClick={() => setEntered(true)} className={styles.enterButton} data-testid="gateway-enter">
            <span>推开月门</span>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        ) : null}

        <noscript>
          <style>{'[data-testid="gateway-enter"]{display:none!important}'}</style>
          <nav className={styles.noScriptRail} aria-label="静态世界入口">
            {model.directions.map((direction) => (
              <a key={direction.sceneId} href={direction.href}>{direction.title}</a>
            ))}
          </nav>
        </noscript>

        <div className={styles.directions} aria-label="入口方向">
          {model.directions.map((direction) => (
            <div key={direction.sceneId} data-gateway-direction data-scene-target={direction.sceneId}>
              <DirectionObject direction={direction} />
            </div>
          ))}
        </div>

        {returning && returningJourney ? (
          <aside className={styles.returnDock} aria-label="继续上次旅程" data-testid="gateway-returning">
            <p>上次停在</p>
            <strong>{returningJourney.label}</strong>
            {unfinishedPath?.recentPathId ? <small>未完成路径：{unfinishedPath.label}</small> : null}
            <div>
              <Link href={returningJourney.path}>继续抵达 <ArrowRight aria-hidden="true" size={15} /></Link>
              <button type="button" onClick={runtime.clearJourneyMemory}><RotateCcw aria-hidden="true" size={14} /> 清除</button>
            </div>
          </aside>
        ) : null}

        {entered ? (
          <nav className={styles.placeRail} aria-label="入口附近的地点">
            {model.featuredPlaces.slice(0, 3).map((place) => (
              <Link key={place.id} href={place.href} title={place.summary}>
                <span>{place.areaTitle}</span>
                <strong>{place.title}</strong>
              </Link>
            ))}
          </nav>
        ) : null}

        <p className="sr-only" aria-live="polite">{entered ? '月门已经打开，可以选择地图、路径或档案馆。' : '月门尚未打开。'}</p>
      </WorldViewport>
    </div>
  )
}
