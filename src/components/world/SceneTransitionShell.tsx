'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { getSceneTransitionForPathnames, type SceneTransitionMotion } from '@/lib/scene-transition'
import type { WorldTransitionState } from '@/lib/world-runtime-state'
import { useWorldRuntime } from './WorldRuntimeProvider'

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
    const content = contentRef.current
    if (!content) return
    let cancelled = false
    let cleanup: (() => void) | undefined

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

    setShellTransitionState('arriving')
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
      {shouldDescribeTransition ? (
        <p
          data-testid="scene-transition-static-cue"
          aria-live="polite"
          className="sr-only"
        >
          从{transitionRuntime.fromScene.title}到{transitionRuntime.toScene.title}：
          {runtime.motionMode !== 'full'
            ? transitionRuntime.transition.reducedMotionFallback
            : transitionRuntime.transition.intent}
        </p>
      ) : null}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          ref={contentRef}
          data-testid="scene-transition-content"
          data-current-scene={runtime.currentScene}
          data-scene-fallback={runtime.sceneRuntime.fallbackState.sceneFallback ? 'true' : 'false'}
          initial={false}
          animate={{ opacity: 1 }}
          exit={runtime.motionMode !== 'full' ? { opacity: 1 } : { opacity: 0.98 }}
          transition={{ duration: runtime.motionMode !== 'full' ? 0 : 0.12, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
