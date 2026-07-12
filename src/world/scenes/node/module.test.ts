import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWorldSignalSnapshot } from '@/world/runtime/signals'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from '@/world/runtime/clock'
import { buildNodeAmbientProjection, createNodeAmbientAdapter } from './module'

const signals = buildWorldSignalSnapshot({ time: buildWorldTimeSnapshot(new Date('2026-12-12T12:00:00Z').getTime(), WORLD_TIME_ZONE) })
const model = { status: 'ready' as const, lifeStage: 'bloom' as const, relationCount: 4 }

test('Node 窗光和远景由时间、季节与内容生命确定投影', () => {
  const first = buildNodeAmbientProjection(model, signals, 1_000)
  const second = buildNodeAmbientProjection(model, signals, 1_000)
  assert.deepEqual(first, second)
  assert.ok(first.windowLight >= 0 && first.windowLight <= 1)
  assert.ok(first.distantDrift >= -8 && first.distantDrift <= 8)
  assert.ok(first.windowBreathe >= 0 && first.windowBreathe <= 1)
  assert.equal(first.season, 'winter')
  const dormant = buildNodeAmbientProjection({ ...model, status: 'quiet', lifeStage: 'dormant' }, signals, 1_000)
  assert.ok(first.windowLight > dormant.windowLight)
})

class FakeStyle { values = new Map<string, string>(); setProperty(name: string, value: string) { this.values.set(name, value) }; removeProperty(name: string) { this.values.delete(name) } }

test('Node adapter pause 后保持静态，dispose 清理属性', () => {
  const style = new FakeStyle(); const attrs: Record<string, string> = {}
  const host = { style, setAttribute(name: string, value: string) { attrs[name] = value }, removeAttribute(name: string) { delete attrs[name] } } as unknown as HTMLElement
  const controller = new AbortController(); const adapter = createNodeAmbientAdapter(host, model, { signal: controller.signal })
  adapter.start(signals); adapter.tick(1_000, signals)
  assert.equal(attrs['data-node-ambient'], 'running')
  assert.ok(style.values.has('--node-window-light'))
  assert.ok(style.values.has('--node-window-breathe'))
  adapter.pause(); assert.equal(attrs['data-node-ambient'], 'paused')
  controller.abort(); assert.equal(attrs['data-node-ambient'], undefined); assert.equal(style.values.size, 0)
})
