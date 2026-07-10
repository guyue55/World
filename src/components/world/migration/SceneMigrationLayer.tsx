'use client'

import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import { getMigrationServerSnapshot, getMigrationSnapshot, subscribeMigration } from '@/lib/runtime/scene-migration'
import styles from './SceneMigrationLayer.module.css'

const targetPoints: Record<string, { x: number; y: number }> = {
  gateway: { x: 50, y: 50 }, atlas: { x: 52, y: 44 }, timeline: { x: 58, y: 49 }, archive: { x: 50, y: 56 }, paths: { x: 51, y: 61 }, node: { x: 50, y: 48 }, lighthouse: { x: 69, y: 38 },
}

export function SceneMigrationLayer() {
  const snapshot = useSyncExternalStore(subscribeMigration, getMigrationSnapshot, getMigrationServerSnapshot)
  const objectRef = useRef<HTMLSpanElement>(null)
  const washRef = useRef<HTMLSpanElement>(null)
  const state = snapshot.state
  const active = state.kind === 'leaving' || state.kind === 'inTransit' || state.kind === 'arriving'
  const target = active ? state.target : null

  useLayoutEffect(() => {
    const object = objectRef.current
    const wash = washRef.current
    if (!object || !wash || !active || !target || !snapshot.geometry) return
    let cancelled = false
    let cleanup: (() => void) | undefined
    const geometry = snapshot.geometry
    const point = targetPoints[target.sceneId] ?? targetPoints.node
    void import('gsap').then(({ gsap }) => {
      const context = gsap.context(() => {
        gsap.killTweensOf([object, wash])
        const sourceX = geometry.left + geometry.width / 2
        const sourceY = geometry.top + geometry.height / 2
        gsap.set(object, { x: sourceX, y: sourceY, xPercent: -50, yPercent: -50, width: Math.min(96, Math.max(24, geometry.width)), height: Math.min(72, Math.max(24, geometry.height)), opacity: 1, scale: 1 })
        gsap.to(wash, { opacity: state.kind === 'arriving' ? 0 : .65, duration: .18, overwrite: true })
        if (state.kind === 'leaving') gsap.to(object, { scale: .72, duration: .14, ease: 'power2.inOut', overwrite: true })
        if (state.kind === 'inTransit') gsap.to(object, { x: window.innerWidth * .5, y: window.innerHeight * .48, scale: target.transitionObject === 'beam' ? 1.3 : .92, rotate: target.transitionObject === 'document' ? -5 : 0, duration: .28, ease: 'power2.inOut', overwrite: true })
        if (state.kind === 'arriving') gsap.to(object, { x: window.innerWidth * point.x / 100, y: window.innerHeight * point.y / 100, scale: target.transitionObject === 'star' ? .22 : 1.12, opacity: 0, duration: .34, ease: 'power3.out', overwrite: true })
      })
      if (cancelled) context.revert()
      else cleanup = () => context.revert()
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [active, snapshot.geometry, snapshot.requestId, state.kind, target])

  return <div className={styles.layer} data-testid="scene-migration-layer" data-active={active ? 'true' : 'false'} data-migration-state={state.kind} data-migration-object={target?.transitionObject ?? 'none'} aria-hidden="true">
    <span ref={washRef} className={styles.wash} />
    <span ref={objectRef} className={styles.object} data-object={target?.transitionObject ?? 'door'} style={{ '--migration-color': snapshot.geometry?.color ?? '#d8b875' } as React.CSSProperties} />
  </div>
}
