import assert from 'node:assert/strict'
import test from 'node:test'
import { WorldClockController, WORLD_TIME_ZONE } from './clock'
import type { VisibilitySource } from './lifecycle'

class FakeVisibility implements VisibilitySource {
  hidden = false
  listeners = new Set<() => void>()
  addEventListener(_type: 'visibilitychange', listener: () => void) { this.listeners.add(listener) }
  removeEventListener(_type: 'visibilitychange', listener: () => void) { this.listeners.delete(listener) }
  setHidden(value: boolean) { this.hidden = value; this.listeners.forEach((listener) => listener()) }
}

function fakeTimers(initialNow: number) {
  let now = initialNow; let nextId = 1
  const timers = new Map<number, () => void>()
  return {
    now: () => now,
    setNow(value: number) { now = value },
    setTimer(callback: () => void) { const id = nextId++; timers.set(id, callback); return id },
    clearTimer(id: number) { timers.delete(id) },
    fire() { const callbacks = [...timers.values()]; timers.clear(); callbacks.forEach((callback) => callback()) },
    count: () => timers.size,
  }
}

test('Clock Controller 每分钟更新，hidden 停止，visible 从当前时间重建', () => {
  const start = new Date('2026-07-11T20:59:00Z').getTime()
  const timers = fakeTimers(start)
  const visibility = new FakeVisibility()
  const snapshots: number[] = []; const states: string[] = []
  const controller = new WorldClockController({
    timeZone: WORLD_TIME_ZONE,
    visibility,
    now: timers.now,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
    onSnapshot: (snapshot) => snapshots.push(snapshot.nowEpochMs),
    onVisibility: (state) => states.push(state),
  })
  controller.start()
  assert.deepEqual(snapshots, [start])
  assert.equal(timers.count(), 1)
  assert.deepEqual(controller.debugResources(), { timers: 1, eventListeners: 1 })

  visibility.setHidden(true)
  timers.setNow(start + 120_000)
  assert.equal(timers.count(), 0)
  assert.deepEqual(snapshots, [start])
  visibility.setHidden(false)
  assert.deepEqual(snapshots, [start, start + 120_000])
  assert.deepEqual(states, ['visible', 'hidden', 'visible'])
  assert.equal(timers.count(), 1)
})

test('minute timer 触发后重新排程，dispose 后资源归零', () => {
  const timers = fakeTimers(new Date('2026-07-12T00:00:30Z').getTime())
  const visibility = new FakeVisibility()
  const snapshots: number[] = []
  const controller = new WorldClockController({ timeZone: WORLD_TIME_ZONE, visibility, now: timers.now, setTimer: timers.setTimer, clearTimer: timers.clearTimer, onSnapshot: (snapshot) => snapshots.push(snapshot.nowEpochMs), onVisibility: () => {} })
  controller.start()
  timers.setNow(new Date('2026-07-12T00:01:00Z').getTime())
  timers.fire()
  assert.equal(snapshots.length, 2)
  assert.equal(timers.count(), 1)
  controller.dispose()
  assert.equal(timers.count(), 0)
  assert.equal(visibility.listeners.size, 0)
  assert.deepEqual(controller.debugResources(), { timers: 0, eventListeners: 0 })
})
