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

function migrationPreviewObjects(objects: string[]) {
  return objects.slice(0, 3).join(' / ')
}

const migrationSteps = [
  { id: 'source', label: '来源' },
  { id: 'leaving', label: '离开' },
  { id: 'preview', label: '预告' },
  { id: 'arriving', label: '抵达' },
  { id: 'settled', label: '沉淀' },
]

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
      <div className="world-container pt-4">
        <p data-testid="scene-transition-static-cue" className="sr-only">
          {shouldDescribeTransition
            ? `从${transitionRuntime.fromScene.title}到${transitionRuntime.toScene.title}`
            : `当前抵达${transitionRuntime.toScene.title}`}
          ：
          {runtime.motionMode !== 'full'
            ? transitionRuntime.transition.reducedMotionFallback
            : transitionRuntime.transition.intent}
        </p>
        <div
          data-testid="scene-migration-cue"
          data-scene-migration-state={shellTransitionState}
          data-scene-migration-from={transitionRuntime.fromScene.id}
          data-scene-migration-to={transitionRuntime.toScene.id}
          data-scene-source-ghost={transitionRuntime.fromScene.title}
          data-scene-target-preview={transitionRuntime.toScene.title}
          aria-live="polite"
          className={shouldDescribeTransition
            ? 'hidden rounded-[1rem] border border-ink/8 bg-white/72 px-4 py-3 text-sm text-ink/62 shadow-soft backdrop-blur md:block'
            : 'sr-only'}
        >
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold text-ink">{shouldDescribeTransition ? '场景迁移' : '场景定位'}</span>
            <span className="text-ink/35">/</span>
            <span>
              {shouldDescribeTransition
                ? `从 ${transitionRuntime.fromScene.title} 抵达 ${transitionRuntime.toScene.title}`
                : `当前抵达 ${transitionRuntime.toScene.title}`}
            </span>
            <span className="text-ink/35">/</span>
            <span>
              {runtime.motionMode !== 'full'
                ? transitionRuntime.transition.reducedMotionFallback
                : transitionRuntime.transition.intent}
            </span>
          </span>
          <span className="mt-3 hidden gap-2 md:grid md:grid-cols-3">
            <span className="rounded-[0.9rem] border border-ink/8 bg-paper/72 px-3 py-2">
              <span className="block text-xs font-semibold tracking-[0.22em] text-moss">来源残影</span>
              <span className="mt-1 block truncate text-sm font-semibold text-ink">{transitionRuntime.fromScene.title}</span>
              <span className="mt-0.5 block truncate text-xs text-ink/48">{transitionRuntime.fromScene.realName}</span>
            </span>
            <span className="rounded-[0.9rem] border border-ink/8 bg-paper/72 px-3 py-2">
              <span className="block text-xs font-semibold tracking-[0.22em] text-moss">目标预告</span>
              <span className="mt-1 block truncate text-sm font-semibold text-ink">{transitionRuntime.toScene.title}</span>
              <span className="mt-0.5 block truncate text-xs text-ink/48">
                {migrationPreviewObjects(transitionRuntime.toScene.objects)}
              </span>
            </span>
            <span className="rounded-[0.9rem] border border-ink/8 bg-paper/72 px-3 py-2">
              <span className="block text-xs font-semibold tracking-[0.22em] text-moss">抵达方式</span>
              <span className="mt-1 block truncate text-sm font-semibold text-ink">{transitionRuntime.motion.label}</span>
              <span className="mt-0.5 block truncate text-xs text-ink/48">{transitionRuntime.toScene.motionGrammar}</span>
            </span>
          </span>
          <span className="mt-3 flex flex-wrap gap-1.5">
            {migrationSteps.map((step) => (
              <span
                key={step.id}
                data-scene-migration-step={step.id}
                className={step.id === shellTransitionState
                  ? 'rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-paper'
                  : 'rounded-full bg-ink/6 px-2.5 py-1 text-xs font-semibold text-ink/45'}
              >
                {step.label}
              </span>
            ))}
          </span>
        </div>
      </div>
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
