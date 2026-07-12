import { createSceneContext } from '@/lib/scenes/scene-destination'
import type { SceneContext } from '@/lib/scenes/scene-context'
import type { MigrationSnapshot, SoundPreference } from '@/world/experience/types'
import type { RuntimeEvent } from './events'
import type { WorldSignalSnapshot } from './signals'

export type WorldRuntimeSnapshot = { signals: WorldSignalSnapshot; scene: SceneContext; migration: MigrationSnapshot; sound: SoundPreference }
export type WorldRuntimeStore = {
  getSnapshot(): WorldRuntimeSnapshot
  subscribe(listener: () => void): () => void
  subscribeSelector<T>(selector: (snapshot: WorldRuntimeSnapshot) => T, listener: () => void): () => void
  dispatch(event: RuntimeEvent): void
  debugListenerCount(): number
}

function recent(values: string[], value: string) {
  return [value, ...values.filter((item) => item !== value)].slice(0, 12)
}

export function createWorldRuntimeStore(initial: WorldRuntimeSnapshot, now = Date.now): WorldRuntimeStore {
  let snapshot = initial
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((listener) => listener())
  const replace = (next: WorldRuntimeSnapshot) => { if (next !== snapshot) { snapshot = next; emit() } }

  return {
    getSnapshot: () => snapshot,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener) } },
    subscribeSelector(selector, listener) {
      let selected = selector(snapshot)
      const wrapped = () => {
        const next = selector(snapshot)
        if (Object.is(selected, next)) return
        selected = next
        listener()
      }
      listeners.add(wrapped)
      return () => { listeners.delete(wrapped) }
    },
    dispatch(event) {
      if (event.type === 'clock/ticked') replace({ ...snapshot, signals: { ...snapshot.signals, time: event.snapshot } })
      else if (event.type === 'visibility/changed') replace({ ...snapshot, signals: { ...snapshot.signals, runtime: { ...snapshot.signals.runtime, visibility: event.value } } })
      else if (event.type === 'scene/entered') replace({ ...snapshot, scene: event.context })
      else if (event.type === 'scene/focused') replace({ ...snapshot, scene: { ...snapshot.scene, focusedObjectId: event.objectId } })
      else if (event.type === 'migration/requested') replace({ ...snapshot, migration: { kind: 'leaving', intent: event.intent, startedAt: now() } })
      else if (event.type === 'migration/settled') replace({ ...snapshot, scene: createSceneContext(event.destination.sceneId, event.destination.href), migration: { kind: 'settled', context: createSceneContext(event.destination.sceneId, event.destination.href), settledAt: now() } })
      else if (event.type === 'journey/progressed') replace({ ...snapshot, signals: { ...snapshot.signals, journey: { ...snapshot.signals.journey, currentPathId: event.pathId, recentNodeIds: recent(snapshot.signals.journey.recentNodeIds, event.nodeId) } } })
      else if (event.type === 'sound/changed') replace({ ...snapshot, sound: event.preference })
      else if (event.type === 'lighthouse/status') replace({ ...snapshot, signals: { ...snapshot.signals, lighthouse: event.status } })
    },
    debugListenerCount: () => listeners.size,
  }
}
