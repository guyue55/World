import assert from 'node:assert/strict'
import test from 'node:test'
import { AmbientScheduler, emptyAmbientResources, type AmbientAdapter } from './scheduler'
import { WorldRuntimeLifecycle, type VisibilitySource } from './lifecycle'

type Signals = { revision: number }

function createFrameDriver() {
  let nextId = 1
  const callbacks = new Map<number, (now: number) => void>()
  return {
    driver: {
      request(callback: (now: number) => void) { const id = nextId++; callbacks.set(id, callback); return id },
      cancel(id: number) { callbacks.delete(id) },
      now: () => 0,
    },
    flush(now: number) {
      const pending = [...callbacks.values()]
      callbacks.clear()
      pending.forEach((callback) => callback(now))
    },
    count: () => callbacks.size,
  }
}

function createAdapter() {
  const calls = { start: 0, tick: 0, update: 0, pause: 0, resume: 0, dispose: 0, deltas: [] as number[] }
  const adapter: AmbientAdapter<Signals> = {
    start: () => { calls.start += 1 },
    tick: (deltaMs) => { calls.tick += 1; calls.deltas.push(deltaMs) },
    update: () => { calls.update += 1 },
    pause: () => { calls.pause += 1 },
    resume: () => { calls.resume += 1 },
    dispose: () => { calls.dispose += 1 },
    debugResources: () => ({ ...emptyAmbientResources(), animations: 1 }),
  }
  return { adapter, calls }
}

class FakeVisibilitySource implements VisibilitySource {
  hidden = false
  listeners = new Set<() => void>()
  addEventListener(_type: 'visibilitychange', listener: () => void) { this.listeners.add(listener) }
  removeEventListener(_type: 'visibilitychange', listener: () => void) { this.listeners.delete(listener) }
  setHidden(value: boolean) { this.hidden = value; this.listeners.forEach((listener) => listener()) }
}

test('Scheduler 始终只有一个 active adapter，替换时先释放旧场景', () => {
  const frames = createFrameDriver()
  const scheduler = new AmbientScheduler<Signals>(frames.driver)
  const first = createAdapter(); const second = createAdapter()
  scheduler.register('gateway', first.adapter, { revision: 1 })
  assert.equal(first.calls.start, 1)
  assert.equal(scheduler.debugResources().adapters, 1)
  scheduler.register('atlas', second.adapter, { revision: 2 })
  assert.equal(first.calls.dispose, 1)
  assert.equal(second.calls.start, 1)
  assert.equal(scheduler.activeAdapterId, 'atlas')
  assert.equal(frames.count(), 1)
})

test('logical signal update 与 ambient 30fps tick 分离', () => {
  const frames = createFrameDriver()
  const scheduler = new AmbientScheduler<Signals>(frames.driver)
  const scene = createAdapter()
  scheduler.register('gateway', scene.adapter, { revision: 1 })
  scheduler.update({ revision: 2 })
  assert.equal(scene.calls.update, 1)
  assert.equal(scene.calls.tick, 0)
  frames.flush(16)
  assert.equal(scene.calls.tick, 0)
  frames.flush(50)
  assert.equal(scene.calls.tick, 1)
  assert.ok(scene.calls.deltas[0] >= 33)
  assert.equal(scheduler.debugResources().timers, 0)
})

test('hidden 与 quiet 独立暂停，只有全部解除才恢复', () => {
  const frames = createFrameDriver()
  const scheduler = new AmbientScheduler<Signals>(frames.driver)
  const visibility = new FakeVisibilitySource()
  const lifecycle = new WorldRuntimeLifecycle(scheduler, visibility)
  const scene = createAdapter()
  lifecycle.mount()
  lifecycle.enterScene('gateway', scene.adapter, { revision: 1 })
  visibility.setHidden(true)
  assert.equal(scene.calls.pause, 1)
  assert.equal(frames.count(), 0)
  lifecycle.setQuiet(true)
  visibility.setHidden(false)
  assert.equal(scene.calls.resume, 0)
  lifecycle.setQuiet(false)
  assert.equal(scene.calls.resume, 1)
  assert.equal(frames.count(), 1)
})

test('route leave、abort 与 unmount 均释放 adapter、frame 和 listener', () => {
  const frames = createFrameDriver()
  const scheduler = new AmbientScheduler<Signals>(frames.driver)
  const visibility = new FakeVisibilitySource()
  const controller = new AbortController()
  const lifecycle = new WorldRuntimeLifecycle(scheduler, visibility, controller.signal)
  const scene = createAdapter()
  lifecycle.mount()
  lifecycle.enterScene('node', scene.adapter, { revision: 1 })
  lifecycle.leaveScene('node')
  assert.equal(scene.calls.dispose, 1)
  assert.deepEqual(lifecycle.debugResources(), { ...emptyAmbientResources(), eventListeners: 2 })

  const replacement = createAdapter()
  lifecycle.enterScene('atlas', replacement.adapter, { revision: 2 })
  controller.abort()
  assert.equal(replacement.calls.dispose, 1)
  assert.equal(visibility.listeners.size, 0)
  assert.deepEqual(lifecycle.debugResources(), emptyAmbientResources())
  lifecycle.dispose()
  assert.deepEqual(lifecycle.debugResources(), emptyAmbientResources())
})
