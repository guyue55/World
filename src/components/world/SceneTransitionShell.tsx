'use client'

import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { getSceneTransitionForPathnames, type SceneTransitionMotion } from '@/lib/scene-transition'
import { useWorldRuntime } from './WorldRuntimeProvider'

function varsForMotion(motion: SceneTransitionMotion, compactMotion: boolean) {
  return compactMotion ? motion.compactFrom : motion.from
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
      showContentStatically(content)
      previousPathnameRef.current = pathname
      return
    }

    if (runtime.reducedMotion) {
      showContentStatically(content)
      previousPathnameRef.current = pathname
      return
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

          if (reduceMotion) {
            gsap.set(content, { ...transitionRuntime.motion.reducedMotion, clearProps: 'transform,visibility' })
            return
          }

          gsap.fromTo(
            content,
            varsForMotion(transitionRuntime.motion, compactMotion),
            {
              ...transitionRuntime.motion.to,
              overwrite: 'auto',
              clearProps: 'transform,visibility',
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
  }, [pathname, runtime.compactMotion, runtime.reducedMotion, transitionRuntime])

  return (
    <div
      data-testid="scene-transition-shell"
      data-scene-transition={transitionRuntime.transition.id}
      data-scene-motion={transitionRuntime.motion.id}
      data-scene-from={transitionRuntime.fromScene.id}
      data-scene-to={transitionRuntime.toScene.id}
      data-reduced-motion={runtime.reducedMotion ? 'true' : 'false'}
    >
      {shouldDescribeTransition ? (
        <p
          data-testid="scene-transition-static-cue"
          aria-live="polite"
          className="sr-only"
        >
          从{transitionRuntime.fromScene.title}到{transitionRuntime.toScene.title}：
          {runtime.reducedMotion
            ? transitionRuntime.transition.reducedMotionFallback
            : transitionRuntime.transition.intent}
        </p>
      ) : null}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          ref={contentRef}
          data-testid="scene-transition-content"
          initial={false}
          animate={{ opacity: 1 }}
          exit={runtime.reducedMotion ? { opacity: 1 } : { opacity: 0.98 }}
          transition={{ duration: runtime.reducedMotion ? 0 : 0.12, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
