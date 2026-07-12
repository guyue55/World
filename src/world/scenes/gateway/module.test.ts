import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWorldSignalSnapshot } from '@/world/runtime/signals'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from '@/world/runtime/clock'
import { createGatewayAmbientAdapter } from './module'

class FakeStyle {
  values = new Map<string, string>()
  setProperty(name: string, value: string) { this.values.set(name, value) }
  removeProperty(name: string) { this.values.delete(name) }
}

function createHost() {
  const attributes = new Map<string, string>()
  const style = new FakeStyle()
  const element = {
    style,
    setAttribute(name: string, value: string) { attributes.set(name, value) },
    removeAttribute(name: string) { attributes.delete(name) },
  } as unknown as HTMLElement
  return { element, style, attributes }
}

const signals = buildWorldSignalSnapshot({
  time: buildWorldTimeSnapshot(new Date('2026-07-12T08:00:00Z').getTime(), WORLD_TIME_ZONE),
  content: { recentNodeIds: ['node-1'], updatedNodeIds: ['node-1'], activePathIds: ['path-1'] },
})

test('Gateway adapter 用世界信号确定性驱动视觉变量，不写 React state', () => {
  const firstHost = createHost()
  const secondHost = createHost()
  const first = createGatewayAmbientAdapter(firstHost.element, { featuredPlaceCount: 3 }, { signal: new AbortController().signal })
  const second = createGatewayAmbientAdapter(secondHost.element, { featuredPlaceCount: 3 }, { signal: new AbortController().signal })
  first.start(signals)
  second.start(signals)
  first.tick(1_000, signals)
  second.tick(1_000, signals)
  assert.deepEqual([...firstHost.style.values], [...secondHost.style.values])
  assert.equal(firstHost.attributes.get('data-gateway-ambient'), 'running')
  assert.ok(firstHost.style.values.has('--gateway-star-pulse'))
  assert.ok(firstHost.style.values.has('--gateway-fog-shift'))
  assert.ok(firstHost.style.values.has('--gateway-beacon-angle'))
})

test('Gateway adapter pause/resume/dispose 保留静态状态并清理资源', () => {
  const host = createHost()
  const controller = new AbortController()
  const adapter = createGatewayAmbientAdapter(host.element, { featuredPlaceCount: 3 }, { signal: controller.signal })
  adapter.start(signals)
  adapter.pause()
  assert.equal(host.attributes.get('data-gateway-ambient'), 'paused')
  adapter.resume(signals)
  assert.equal(host.attributes.get('data-gateway-ambient'), 'running')
  controller.abort()
  assert.deepEqual(adapter.debugResources(), { adapters: 0, rafCallbacks: 0, tickerListeners: 0, timers: 0, eventListeners: 0, animations: 0, audioContexts: 0, audioSources: 0 })
  assert.equal(host.attributes.has('data-gateway-ambient'), false)
})
