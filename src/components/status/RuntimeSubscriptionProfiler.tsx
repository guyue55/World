'use client'

import { memo, useEffect, useMemo, useRef, useSyncExternalStore, type MutableRefObject } from 'react'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from '@/world/runtime/clock'
import { buildWorldSignalSnapshot } from '@/world/runtime/signals'
import { createWorldRuntimeStore, type WorldRuntimeStore } from '@/world/runtime/store'

export type RuntimeProfilerResult = {
  completed: boolean
  legacyContextRenderDelta: number
  slicedTimeRenderDelta: number
  unrelatedEvent: 'motion-and-sound'
  decision: 'migrate-to-sliced-store' | 'retain-context'
}

declare global {
  interface Window { __WORLDOS_RUNTIME_PROFILE__?: RuntimeProfilerResult }
}

const LegacyTimeConsumer = memo(function LegacyTimeConsumer({ renders }: { renders: MutableRefObject<number> }) {
  const { dayPeriod } = useWorldRuntime()
  renders.current += 1
  return <span>{dayPeriod}</span>
})

const SlicedTimeConsumer = memo(function SlicedTimeConsumer({ store, renders }: { store: WorldRuntimeStore; renders: MutableRefObject<number> }) {
  const dayPeriod = useSyncExternalStore(
    (listener) => store.subscribeSelector((snapshot) => snapshot.signals.time.dayPeriod, listener),
    () => store.getSnapshot().signals.time.dayPeriod,
    () => store.getSnapshot().signals.time.dayPeriod,
  )
  renders.current += 1
  return <span>{dayPeriod}</span>
})

export function RuntimeSubscriptionProfiler() {
  const runtime = useWorldRuntime()
  const runtimeRef = useRef(runtime)
  const started = useRef(false)
  const completed = useRef(false)
  const legacyRenders = useRef(0)
  const slicedRenders = useRef(0)
  const store = useMemo(() => createWorldRuntimeStore({
    signals: buildWorldSignalSnapshot({ time: buildWorldTimeSnapshot(Date.now(), WORLD_TIME_ZONE) }),
    scene: createSceneContext('gateway', '/status'),
    migration: { kind: 'idle' },
    sound: { mode: 'muted', volume: 0.35, sessionArmed: false },
  }), [])
  runtimeRef.current = runtime

  useEffect(() => {
    if (started.current || new URLSearchParams(window.location.search).get('runtime-profile') !== '1') return
    started.current = true
    const timer = window.setTimeout(() => {
      const currentRuntime = runtimeRef.current
      const legacyBefore = legacyRenders.current
      const slicedBefore = slicedRenders.current
      const previousMotion = currentRuntime.motionPreference
      store.dispatch({ type: 'sound/changed', preference: { mode: 'enabled', volume: 0.2, sessionArmed: true } })
      currentRuntime.setMotionPreference(previousMotion === 'off' ? 'reduced' : 'off')
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        const legacyDelta = legacyRenders.current - legacyBefore
        const slicedDelta = slicedRenders.current - slicedBefore
        window.__WORLDOS_RUNTIME_PROFILE__ = {
          completed: true,
          legacyContextRenderDelta: legacyDelta,
          slicedTimeRenderDelta: slicedDelta,
          unrelatedEvent: 'motion-and-sound',
          decision: legacyDelta > slicedDelta ? 'migrate-to-sliced-store' : 'retain-context',
        }
        completed.current = true
        document.documentElement.dataset.runtimeProfileComplete = 'true'
        runtimeRef.current.setMotionPreference(previousMotion)
      }))
    }, 120)
    return () => {
      window.clearTimeout(timer)
      if (!completed.current) started.current = false
    }
  }, [store])

  return <div hidden aria-hidden="true"><LegacyTimeConsumer renders={legacyRenders} /><SlicedTimeConsumer store={store} renders={slicedRenders} /></div>
}
