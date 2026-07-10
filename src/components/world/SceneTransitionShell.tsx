'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getSceneTransitionForPathnames, type SceneTransitionMotion } from '@/lib/scene-transition'
import type { WorldTransitionState } from '@/lib/world-runtime-state'
import { useWorldRuntime } from './WorldRuntimeProvider'
import { SceneMigrationLayer } from './migration/SceneMigrationLayer'
import { beginSceneMigration, cancelSceneMigration, markSceneMigrationArriving, restoreSceneMigrationFocus, settleSceneMigration } from '@/lib/runtime/scene-migration'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import { getSceneForPathname } from '@/lib/scene-runtime'
import type { SceneId } from '@/lib/scenes/scene-context'

function varsForMotion(motion: SceneTransitionMotion, compactMotion: boolean) {
  return compactMotion ? motion.compactFrom : motion.from
}

function shouldReduceSceneMotion(runtime: ReturnType<typeof useWorldRuntime>) {
  return runtime.motionMode !== 'full'
}

function showContentStatically(content: HTMLElement) {
  content.style.opacity = '1'
  content.style.visibility = ''
  content.style.transform = ''
}

export function SceneTransitionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/'
  const previousPathnameRef = useRef(pathname)
  const contentRef = useRef<HTMLDivElement>(null)
  const hasMountedRef = useRef(false)
  const runtime = useWorldRuntime()
  const [shellTransitionState, setShellTransitionState] = useState<WorldTransitionState>(runtime.transitionState)

  const transitionRuntime = useMemo(
    () => getSceneTransitionForPathnames(previousPathnameRef.current, pathname),
    [pathname]
  )
  const shouldDescribeTransition = transitionRuntime.fromScene.id !== transitionRuntime.toScene.id

  useEffect(() => {
    const scene = getSceneForPathname(pathname)
    const context = createSceneContext(scene.id as SceneId, pathname)
    markSceneMigrationArriving()
    settleSceneMigration(context, runtime.motionMode !== 'full')
    const focusTimer = window.setTimeout(restoreSceneMigrationFocus, 500)
    return () => window.clearTimeout(focusTimer)
  }, [pathname, runtime.motionMode])

  useEffect(() => () => cancelSceneMigration('unmount'), [])

  useEffect(() => {
    const onPopState = () => {
      const element = (document.querySelector('[data-world-scene]') ?? document.querySelector('[data-world-exit-rail]') ?? document.body) as HTMLElement
      const targetScene = getSceneForPathname(window.location.pathname)
      beginSceneMigration({ source: createSceneContext(runtime.currentScene as SceneId, pathname), target: { href: window.location.pathname, sceneId: targetScene.id as SceneId, transitionObject: 'door', accessibleLabel: '返回上一处世界空间' }, element, reduced: runtime.motionMode !== 'full' })
    }
    const onRouteError = () => cancelSceneMigration('route-error')
    window.addEventListener('popstate', onPopState)
    window.addEventListener('unhandledrejection', onRouteError)
    return () => { window.removeEventListener('popstate', onPopState); window.removeEventListener('unhandledrejection', onRouteError) }
  }, [pathname, runtime.currentScene, runtime.motionMode])

  useEffect(() => {
    const content = contentRef.current
    if (!content) return
    let cancelled = false
    let cleanup: (() => void) | undefined
    const timers: number[] = []
    const setLater = (state: WorldTransitionState, delay: number) => {
      timers.push(window.setTimeout(() => {
        if (!cancelled) setShellTransitionState(state)
      }, delay))
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      setShellTransitionState(runtime.transitionState)
      showContentStatically(content)
      previousPathnameRef.current = pathname
      return
    }

    if (shouldReduceSceneMotion(runtime)) {
      setShellTransitionState('reduced')
      showContentStatically(content)
      previousPathnameRef.current = pathname
      return
    }

    setShellTransitionState(shouldDescribeTransition ? 'leaving' : 'arriving')
    if (shouldDescribeTransition) {
      setLater('preview', 90)
      setLater('arriving', 180)
    }

    void import('gsap').then(({ gsap }) => {
      if (cancelled) return

      const mm = gsap.matchMedia()
      cleanup = () => mm.revert()
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          compactMotion: '(max-width: 767px)',
        },
        (context) => {
          const reduceMotion = Boolean(context.conditions?.reduceMotion)
          const compactMotion = Boolean(context.conditions?.compactMotion) || runtime.compactMotion

          if (reduceMotion || runtime.motionMode !== 'full') {
            gsap.set(content, { ...transitionRuntime.motion.reducedMotion, clearProps: 'transform,visibility' })
            setShellTransitionState('reduced')
            return
          }

          gsap.fromTo(
            content,
            varsForMotion(transitionRuntime.motion, compactMotion),
            {
              ...transitionRuntime.motion.to,
              overwrite: 'auto',
              clearProps: 'transform,visibility',
              onComplete: () => setShellTransitionState('settled'),
            }
          )
        }
      )
    })

    previousPathnameRef.current = pathname
    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
      cleanup?.()
    }
  }, [pathname, runtime.compactMotion, runtime.motionMode, runtime.reducedMotion, runtime.transitionState, transitionRuntime])

  return (
    <div
      data-testid="scene-transition-shell"
      data-scene-transition={transitionRuntime.transition.id}
      data-scene-motion={transitionRuntime.motion.id}
      data-scene-from={transitionRuntime.fromScene.id}
      data-scene-to={transitionRuntime.toScene.id}
      data-scene-state={runtime.sceneState}
      data-transition-state={shellTransitionState}
      data-motion-mode={runtime.motionMode}
      data-sensory-mode={runtime.sensoryMode}
      data-permission-mode={runtime.sceneRuntime.permissionMode}
      data-network-mode={runtime.sceneRuntime.networkMode}
      data-reduced-motion={runtime.reducedMotion ? 'true' : 'false'}
    >
      <SceneMigrationLayer />
      <p data-testid="scene-transition-static-cue" className="sr-only" aria-live="polite">
        {shouldDescribeTransition
          ? `从${transitionRuntime.fromScene.title}抵达${transitionRuntime.toScene.title}`
          : `当前抵达${transitionRuntime.toScene.title}`}
      </p>
      <div
        key={pathname}
        ref={contentRef}
        data-testid="scene-transition-content"
        data-current-scene={runtime.currentScene}
        data-scene-fallback={runtime.sceneRuntime.fallbackState.sceneFallback ? 'true' : 'false'}
      >
        {children}
      </div>
    </div>
  )
}
