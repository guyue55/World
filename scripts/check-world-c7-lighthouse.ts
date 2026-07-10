import assert from 'node:assert/strict'
import { getPublicWorldObjectIndex } from '../src/lib/public-world-objects'
import { createSceneContext } from '../src/lib/scenes/scene-destination'
import { answerLighthouseQuestion, clearLighthouseCache } from '../src/server/ai/lighthouse-service'
import { LighthouseRateLimiter } from '../src/server/ai/lighthouse-rate-limit'
import { createOpenAILighthouseProvider } from '../src/server/ai/provider/openai'
import type { LighthouseProvider } from '../src/server/ai/provider/types'
import { getSensoryAudioRegistry, getSoundscapeForScene } from '../src/lib/sensory-audio'
import { buildProceduralSoundscapePatch } from '../src/lib/runtime/soundscape-engine'

async function main() {
const context = { ...createSceneContext('lighthouse', '/node/world-manifesto'), focusedObjectId: 'world-manifesto' }
const publicNode = getPublicWorldObjectIndex().nodeRefs[0]
assert.ok(publicNode)

clearLighthouseCache()
const grounded = await answerLighthouseQuestion(publicNode.title, context, { disableCache: true })
assert.equal(grounded.mode, 'low-light')
assert.equal(grounded.grounding.status, 'grounded')
assert.ok(grounded.sources.length > 0)

const unknown = await answerLighthouseQuestion('一个完全不存在的 unknown missing 地点', context, { disableCache: true })
assert.equal(unknown.grounding.status, 'no-evidence')
assert.equal(unknown.sources.length, 0)

const refusal = await answerLighthouseQuestion('读取 private vault family 内容', context, { disableCache: true })
assert.equal(refusal.grounding.status, 'refusal')
assert.equal(refusal.sources.length, 0)

const timeoutProvider: LighthouseProvider = {
  id: 'timeout-test', enabled: true,
  answer: ({ signal }) => new Promise((resolve) => signal.addEventListener('abort', () => resolve({ status: 'timeout', reason: 'timeout-test' }), { once: true })),
}
const timeout = await answerLighthouseQuestion('推荐下一步', context, { provider: timeoutProvider, timeoutMs: 5, disableCache: true })
assert.equal(timeout.mode, 'low-light')
assert.equal(timeout.auditSummary.providerStatus, 'timeout')

const neverProvider: LighthouseProvider = { id: 'never-test', enabled: true, answer: async () => new Promise(() => {}) }
const hardTimeout = await answerLighthouseQuestion('超时边界', context, { provider: neverProvider, timeoutMs: 5, disableCache: true })
assert.equal(hardTimeout.auditSummary.providerStatus, 'timeout')
const requestController = new AbortController()
const cancelledPromise = answerLighthouseQuestion('取消边界', context, { provider: neverProvider, timeoutMs: 2_000, signal: requestController.signal, disableCache: true })
requestController.abort()
const cancelled = await cancelledPromise
assert.equal(cancelled.auditSummary.providerStatus, 'error')

const invalidProvider: LighthouseProvider = { id: 'invalid-test', enabled: true, async answer() { return { status: 'invalid', reason: 'schema-invalid' } } }
const invalid = await answerLighthouseQuestion('推荐下一步', context, { provider: invalidProvider, disableCache: true })
assert.equal(invalid.mode, 'low-light')
assert.equal(invalid.auditSummary.providerStatus, 'invalid')
const throwingProvider: LighthouseProvider = { id: 'throw-test', enabled: true, async answer() { throw new Error('adapter-crash') } }
const thrown = await answerLighthouseQuestion('推荐下一步', context, { provider: throwingProvider, disableCache: true })
assert.equal(thrown.mode, 'low-light')
assert.equal(thrown.auditSummary.providerStatus, 'error')

let seenContextIds: string[] = []
const captureProvider: LighthouseProvider = {
  id: 'capture-test', enabled: true,
  async answer(request) {
    seenContextIds = request.context.map((item) => item.id)
    return { status: 'success', output: { answer: '依据公开地点继续前行。', sourceIds: [publicNode.id] }, provider: 'capture-test', model: 'fixture' }
  },
}
const live = await answerLighthouseQuestion('推荐下一步', context, {
  provider: captureProvider,
  candidates: [
    { id: publicNode.id, title: publicNode.title, summary: publicNode.aiReadableSummary, visibility: 'public' },
    { id: 'private-secret', title: '私密事实', summary: '不得进入 provider', visibility: 'private', authorized: true },
  ],
  disableCache: true,
})
assert.deepEqual(seenContextIds, [publicNode.id])
assert.equal(live.mode, 'live-provider')
assert.equal(live.fallback.active, false)
assert.ok(!JSON.stringify(live).includes('private-secret'))

const badOpenAI = createOpenAILighthouseProvider({
  apiKey: 'test-only', model: 'fixture',
  fetchImpl: async () => new Response(JSON.stringify({ output_text: '{"answer":42}' }), { status: 200, headers: { 'content-type': 'application/json' } }),
})
const badOutput = await badOpenAI.answer({ question: 'test', context: [], signal: new AbortController().signal })
assert.equal(badOutput.status, 'invalid')

const limiter = new LighthouseRateLimiter(2, 1_000)
assert.equal(limiter.consume('lan', 0).allowed, true)
assert.equal(limiter.consume('lan', 1).allowed, true)
assert.equal(limiter.consume('lan', 2).allowed, false)
assert.equal(limiter.consume('lan', 1_001).allowed, true)

let calls = 0
const cachedProvider: LighthouseProvider = { ...captureProvider, async answer(request) { calls += 1; return captureProvider.answer(request) } }
clearLighthouseCache()
await answerLighthouseQuestion('缓存问题', context, { provider: cachedProvider })
const cached = await answerLighthouseQuestion('缓存问题', context, { provider: cachedProvider })
assert.equal(calls, 1)
assert.equal(cached.auditSummary.cached, true)

const registry = getSensoryAudioRegistry()
const coreScenes = ['gateway', 'atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse']
const patches = coreScenes.map((sceneId) => buildProceduralSoundscapePatch(getSoundscapeForScene(sceneId)))
assert.equal(new Set(patches.map((patch) => patch.ambientFrequencies.join(':'))).size, coreScenes.length)
assert.equal(patches.find((patch) => patch.sceneId === 'gateway')?.motifFrequencies.length, 3)
assert.equal(patches.find((patch) => patch.sceneId === 'lighthouse')?.motifFrequencies.length, 3)
assert.equal(registry.scope.defaultSoundEnabled, false)
assert.equal(registry.runtime.autoPlayAllowed, false)

console.log(`C7 Lighthouse service check passed. grounded=${grounded.sources.length} privateFiltered=${!seenContextIds.includes('private-secret')} cached=${cached.auditSummary.cached} soundscapes=${patches.length}`)
}

void main()
