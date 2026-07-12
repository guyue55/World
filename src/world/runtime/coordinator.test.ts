import assert from 'node:assert/strict'
import test from 'node:test'
import type { AmbientAdapter, AmbientFrameDriver } from './scheduler'
import { WorldAmbientCoordinator } from './coordinator'
import { buildWorldSignalSnapshot } from './signals'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from './clock'

class FakeVisibility {
  hidden = false
  listeners = new Set<() => void>()
  addEventListener(_type: 'visibilitychange', listener: () => void) { this.listeners.add(listener) }
  removeEventListener(_type: 'visibilitychange', listener: () => void) { this.listeners.delete(listener) }
  setHidden(value: boolean) { this.hidden = value; this.listeners.forEach((listener) => listener()) }
}

function createFrames(): AmbientFrameDriver & { pending: number } {
  let nextId = 1
  const callbacks = new Map<number, (now: number) => void>()
  return {
    request(callback) { const id = nextId++; callbacks.set(id, callback); return id },
    cancel(id) { callbacks.delete(id) },
    now: () => 0,
    get pending() { return callbacks.size },
  }
}

function createAdapter() {
  const calls = { start: 0, update: 0, pause: 0, resume: 0, dispose: 0 }
  const adapter: AmbientAdapter<ReturnType<typeof buildWorldSignalSnapshot>> = {
    start: () => { calls.start += 1 },
    tick: () => {},
    update: () => { calls.update += 1 },
    pause: () => { calls.pause += 1 },
    resume: () => { calls.resume += 1 },
    dispose: () => { calls.dispose += 1 },
    debugResources: () => ({ adapters: 0, rafCallbacks: 0, tickerListeners: 0, timers: 0, eventListeners: 0, animations: 0, audioContexts: 0, audioSources: 0 }),
  }
  return { adapter, calls }
}

const signals = buildWorldSignalSnapshot({ time: buildWorldTimeSnapshot(new Date('2026-07-12T08:00:00Z').getTime(), WORLD_TIME_ZONE) })

test('Coordinator 接续挂载前注册，并且只拥有一个 active adapter 与 rAF', () => {
  const frames = createFrames()
  const visibility = new FakeVisibility()
  const coordinator = new WorldAmbientCoordinator(frames)
  const first = createAdapter()
  const second = createAdapter()
  const leaveFirst = coordinator.enterScene('gateway', first.adapter, signals)
  assert.equal(first.calls.start, 0)
  coordinator.mount(visibility)
  assert.equal(first.calls.start, 1)
  assert.equal(frames.pending, 1)
  const leaveSecond = coordinator.enterScene('atlas', second.adapter, signals)
  assert.equal(first.calls.dispose, 1)
  assert.equal(second.calls.start, 1)
  assert.equal(frames.pending, 1)
  leaveFirst()
  assert.equal(second.calls.dispose, 0)
  leaveSecond()
  assert.equal(second.calls.dispose, 1)
  coordinator.dispose()
  assert.deepEqual(coordinator.debugResources(), { adapters: 0, rafCallbacks: 0, tickerListeners: 0, timers: 0, eventListeners: 0, animations: 0, audioContexts: 0, audioSources: 0 })
})

test('Coordinator 统一响应 quiet、hidden、signal update 和重新挂载', () => {
  const frames = createFrames()
  const visibility = new FakeVisibility()
  const coordinator = new WorldAmbientCoordinator(frames)
  coordinator.mount(visibility)
  const scene = createAdapter()
  coordinator.enterScene('gateway', scene.adapter, signals)
  coordinator.setQuiet(true)
  assert.equal(frames.pending, 0)
  assert.equal(scene.calls.pause, 1)
  visibility.setHidden(true)
  coordinator.setQuiet(false)
  assert.equal(scene.calls.resume, 0)
  visibility.setHidden(false)
  assert.equal(scene.calls.resume, 1)
  coordinator.updateSignals(signals)
  assert.equal(scene.calls.update, 1)
  coordinator.dispose()
  assert.equal(visibility.listeners.size, 0)
  coordinator.mount(visibility)
  assert.equal(visibility.listeners.size, 1)
  coordinator.dispose()
})
