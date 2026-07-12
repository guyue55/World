import assert from 'node:assert/strict'
import test from 'node:test'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import { worldExperienceManifest, getExperienceForPathname } from '@/world/experience/manifest'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from './clock'
import { buildWorldSignalSnapshot } from './signals'
import { createWorldRuntimeStore } from './store'

function initialSnapshot() {
  return {
    signals: buildWorldSignalSnapshot({ time: buildWorldTimeSnapshot(new Date('2026-07-12T00:00:00Z').getTime(), WORLD_TIME_ZONE) }),
    scene: createSceneContext('gateway', '/'),
    migration: { kind: 'idle' as const },
    sound: { mode: 'muted' as const, volume: 0.35, sessionArmed: false },
  }
}

test('唯一 Experience Manifest 覆盖七场景且按真实路由匹配', () => {
  assert.deepEqual(Object.keys(worldExperienceManifest).sort(), ['archive', 'atlas', 'gateway', 'lighthouse', 'node', 'paths', 'timeline'])
  const routes = [['/', 'gateway'], ['/atlas', 'atlas'], ['/timeline', 'timeline'], ['/archive', 'archive'], ['/paths/tech-ai', 'paths'], ['/node/example', 'node'], ['/ask', 'lighthouse']] as const
  for (const [pathname, sceneId] of routes) assert.equal(getExperienceForPathname(pathname).id, sceneId)
  for (const entry of Object.values(worldExperienceManifest)) {
    assert.ok(entry.acceptedSignals.every((signal) => ['time', 'content', 'journey', 'runtime', 'lighthouse'].includes(signal)))
    assert.ok(entry.requiredModes.includes('static'))
  }
})

test('Signal Snapshot 只含低频可解释状态', () => {
  const signals = initialSnapshot().signals
  assert.deepEqual(Object.keys(signals).sort(), ['content', 'journey', 'lighthouse', 'runtime', 'time'])
  const serialized = JSON.stringify(signals)
  for (const privateParameter of ['riverSpeed', 'beamAngle', 'particleCount']) assert.equal(serialized.includes(privateParameter), false)
})

test('Store 归约时钟、场景、旅程、声音与灯塔事件', () => {
  const store = createWorldRuntimeStore(initialSnapshot())
  const nextTime = buildWorldTimeSnapshot(new Date('2026-07-12T01:00:00Z').getTime(), WORLD_TIME_ZONE)
  store.dispatch({ type: 'clock/ticked', snapshot: nextTime })
  store.dispatch({ type: 'scene/entered', context: createSceneContext('atlas', '/atlas') })
  store.dispatch({ type: 'scene/focused', objectId: 'area-tech' })
  store.dispatch({ type: 'journey/progressed', pathId: 'tech-ai', nodeId: 'node-kavita-reader-pipeline' })
  store.dispatch({ type: 'sound/changed', preference: { mode: 'enabled', volume: 0.2, sessionArmed: true } })
  store.dispatch({ type: 'lighthouse/status', status: { mode: 'low-light', state: 'retrieving' } })
  const snapshot = store.getSnapshot()
  assert.equal(snapshot.signals.time.nowEpochMs, nextTime.nowEpochMs)
  assert.equal(snapshot.scene.sceneId, 'atlas')
  assert.equal(snapshot.scene.focusedObjectId, 'area-tech')
  assert.equal(snapshot.signals.journey.currentPathId, 'tech-ai')
  assert.deepEqual(snapshot.signals.journey.recentNodeIds, ['node-kavita-reader-pipeline'])
  assert.equal(snapshot.sound.mode, 'enabled')
  assert.equal(snapshot.signals.lighthouse.state, 'retrieving')
})

test('分片订阅不会被无关声音更新唤醒', () => {
  const store = createWorldRuntimeStore(initialSnapshot())
  let timeNotifications = 0
  const unsubscribe = store.subscribeSelector((snapshot) => snapshot.signals.time.dayPeriod, () => { timeNotifications += 1 })
  store.dispatch({ type: 'sound/changed', preference: { mode: 'enabled', volume: 0.25, sessionArmed: true } })
  assert.equal(timeNotifications, 0)
  store.dispatch({ type: 'clock/ticked', snapshot: buildWorldTimeSnapshot(new Date('2026-07-12T09:00:00Z').getTime(), WORLD_TIME_ZONE) })
  assert.equal(timeNotifications, 1)
  unsubscribe()
  assert.equal(store.debugListenerCount(), 0)
})
