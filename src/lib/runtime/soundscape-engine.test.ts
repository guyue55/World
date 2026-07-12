import assert from 'node:assert/strict'
import test from 'node:test'
import { getSoundscapeForScene } from '@/lib/sensory-audio'
import { buildProceduralSoundscapePatch, SoundscapeEngine } from './soundscape-engine'

class FakeParam {
  value = 0
  cancelScheduledValues() {}
  setTargetAtTime(value: number) { this.value = value }
  setValueAtTime(value: number) { this.value = value }
  exponentialRampToValueAtTime(value: number) { this.value = value }
}

class FakeGain {
  gain = new FakeParam()
  connect() {}
  disconnect() {}
}

class FakeOscillator {
  type: OscillatorType = 'sine'
  frequency = new FakeParam()
  detune = new FakeParam()
  connect() {}
  disconnect() {}
  start() {}
  stop() {}
}

class FakeAudioContext {
  static created = 0
  state: AudioContextState = 'suspended'
  currentTime = 0
  destination = {}
  constructor() { FakeAudioContext.created += 1 }
  createGain() { return new FakeGain() }
  createOscillator() { return new FakeOscillator() }
  async resume() { this.state = 'running' }
  async suspend() { this.state = 'suspended' }
  async close() { this.state = 'closed' }
}

test('SoundscapeEngine 只在 arm 创建一个上下文，并统一处理 quiet/hidden/mute/dispose', async () => {
  const listeners = new Set<() => void>()
  const fakeDocument = {
    hidden: false,
    addEventListener(_type: string, listener: () => void) { listeners.add(listener) },
    removeEventListener(_type: string, listener: () => void) { listeners.delete(listener) },
  }
  const originalWindow = globalThis.window
  const originalDocument = globalThis.document
  Object.assign(globalThis, {
    window: { AudioContext: FakeAudioContext, setTimeout },
    document: fakeDocument,
  })
  try {
    FakeAudioContext.created = 0
    const engine = new SoundscapeEngine()
    assert.equal(engine.getSnapshot().contextCreated, false)
    assert.equal(FakeAudioContext.created, 0)

    assert.equal(await engine.arm(0.3), true)
    assert.equal(await engine.arm(0.3), true)
    assert.equal(FakeAudioContext.created, 1)
    assert.equal(engine.getSnapshot().contextState, 'running')
    const gateway = getSoundscapeForScene('gateway')
    const gatewayPatch = buildProceduralSoundscapePatch(gateway)
    assert.equal(gatewayPatch.ambientVoices?.length, 4)
    assert.deepEqual(gatewayPatch.motifFrequencies, [294, 367.5, 441])
    await engine.setScene(gateway, 0.3)
    assert.deepEqual({ loops: engine.getSnapshot().loopCount, cues: engine.getSnapshot().cueCount }, { loops: 1, cues: 1 })

    await engine.setQuiet(true)
    assert.equal(engine.getSnapshot().contextState, 'suspended')
    await engine.setQuiet(false)
    assert.equal(engine.getSnapshot().contextState, 'running')

    fakeDocument.hidden = true
    listeners.forEach((listener) => listener())
    await new Promise((resolve) => setTimeout(resolve, 0))
    assert.equal(engine.getSnapshot().contextState, 'suspended')
    fakeDocument.hidden = false
    listeners.forEach((listener) => listener())
    await new Promise((resolve) => setTimeout(resolve, 0))
    assert.equal(engine.getSnapshot().contextState, 'running')

    await engine.mute()
    assert.deepEqual({ armed: engine.getSnapshot().armed, loops: engine.getSnapshot().loopCount, cues: engine.getSnapshot().cueCount }, { armed: false, loops: 0, cues: 0 })
    assert.equal(await engine.arm(0.3), true)
    assert.equal(FakeAudioContext.created, 1)
    await engine.dispose()
    assert.equal(engine.getSnapshot().contextCreated, false)
    assert.equal(listeners.size, 0)
  } finally {
    Object.assign(globalThis, { window: originalWindow, document: originalDocument })
  }
})
