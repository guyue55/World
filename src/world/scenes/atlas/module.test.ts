import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWorldSignalSnapshot } from '@/world/runtime/signals'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from '@/world/runtime/clock'
import { buildAtlasAmbientProjection, createAtlasAmbientAdapter } from './module'

const model = {
  nodes: [
    { id: 'fresh-bloom', areaId: 'origin', lifeStage: 'bloom' as const, status: 'ready' as const, updatedAt: '2026-07-11T08:00:00.000Z', importance: 1, relationReasons: ['同一条主线'] },
    { id: 'old-dormant', areaId: 'archive', lifeStage: 'dormant' as const, status: 'quiet' as const, updatedAt: '2024-01-01T00:00:00.000Z', importance: 0.6, relationReasons: ['历史沉淀'] },
  ],
  links: [{ id: 'origin-archive', from: 'origin', to: 'archive', reason: '沉淀为档案' }],
}

const signals = buildWorldSignalSnapshot({
  time: buildWorldTimeSnapshot(new Date('2026-07-12T08:00:00.000Z').getTime(), WORLD_TIME_ZONE),
  journey: { visitCount: 3, returnGap: 'same-day', currentPathId: null, recentNodeIds: ['fresh-bloom'] },
})

test('Atlas 星体生命由真实生命周期、新鲜度、访问和重要度确定投影', () => {
  const first = buildAtlasAmbientProjection(model, signals, 2_000)
  const second = buildAtlasAmbientProjection(model, signals, 2_000)
  assert.deepEqual(first, second)
  assert.ok(first.nodeLife['fresh-bloom'].energy > first.nodeLife['old-dormant'].energy)
  assert.ok(first.nodeLife['fresh-bloom'].energy <= 1)
  assert.equal(first.linkFlow['origin-archive'].hasReason, true)
})

class FakeStyle {
  values = new Map<string, string>()
  setProperty(name: string, value: string) { this.values.set(name, value) }
  removeProperty(name: string) { this.values.delete(name) }
}

function fakeElement(attributes: Record<string, string>) {
  const style = new FakeStyle()
  return { style, getAttribute: (name: string) => attributes[name] ?? null, setAttribute: (name: string, value: string) => { attributes[name] = value }, removeAttribute: (name: string) => { delete attributes[name] } }
}

test('Atlas adapter 只更新缓存语义对象，pause/dispose 后清理状态', () => {
  const node = fakeElement({ 'data-atlas-node': 'fresh-bloom' })
  const link = fakeElement({ 'data-atlas-link': 'origin-archive', 'data-atlas-link-active': 'true' })
  const hostStyle = new FakeStyle()
  const attributes: Record<string, string> = {}
  const host = {
    style: hostStyle,
    setAttribute(name: string, value: string) { attributes[name] = value },
    removeAttribute(name: string) { delete attributes[name] },
    querySelectorAll(selector: string) { return selector.includes('node') ? [node] : [link] },
  } as unknown as HTMLElement
  const controller = new AbortController()
  const adapter = createAtlasAmbientAdapter(host, model, { signal: controller.signal })
  adapter.start(signals)
  adapter.tick(1_000, signals)
  assert.equal(attributes['data-atlas-ambient'], 'running')
  assert.ok(node.style.values.has('--atlas-node-life'))
  assert.ok(link.style.values.has('--atlas-link-offset'))
  adapter.pause()
  assert.equal(attributes['data-atlas-ambient'], 'paused')
  controller.abort()
  assert.equal(attributes['data-atlas-ambient'], undefined)
  assert.equal(node.style.values.size, 0)
  assert.equal(link.style.values.size, 0)
})
