import assert from 'node:assert/strict'
import test from 'node:test'
import {
  WORLD_SOUND_PROTOTYPE,
  analyzePrototypeSamples,
  renderPrototypeSamples,
} from './prototype'

test('世界声音样板是 90 秒可删除循环，并让入口与灯塔共享同源变奏', () => {
  assert.equal(WORLD_SOUND_PROTOTYPE.durationSeconds, 90)
  assert.equal(WORLD_SOUND_PROTOTYPE.source, 'project-generated-procedural')
  assert.equal(WORLD_SOUND_PROTOTYPE.license, 'project-owned-runtime-synthesis')
  assert.equal(WORLD_SOUND_PROTOTYPE.ambientVoices.length, 4)
  assert.deepEqual(WORLD_SOUND_PROTOTYPE.gatewayMotif.intervals, WORLD_SOUND_PROTOTYPE.lighthouseMotif.intervals)
  assert.ok(WORLD_SOUND_PROTOTYPE.lighthouseMotif.rootHz > WORLD_SOUND_PROTOTYPE.gatewayMotif.rootHz)
})

test('离线渲染确定、峰值受控且循环接缝低于冻结阈值', () => {
  const options = { sampleRate: 8_000, durationSeconds: 90 }
  const first = renderPrototypeSamples(options)
  const second = renderPrototypeSamples(options)
  assert.deepEqual(first.subarray(0, 2_048), second.subarray(0, 2_048))
  const analysis = analyzePrototypeSamples(first, options.sampleRate)
  assert.ok(analysis.peakLinear > 0.01)
  assert.ok(analysis.peakLinear <= 0.12)
  assert.ok(analysis.seamDelta <= 0.002)
  assert.ok(analysis.dcOffset <= 0.001)
  assert.equal(analysis.nonFiniteSamples, 0)
})
