import type { NodePlaceModel } from '@/lib/scenes/build-node-model'
import type { WorldSignalSnapshot } from '@/world/runtime/signals'
import { emptyAmbientResources, type AmbientAdapter, type AmbientResourceSnapshot } from '@/world/runtime/scheduler'

type NodeAmbientModel = {
  status: NodePlaceModel['lifeSignal']['status']
  lifeStage: NodePlaceModel['node']['lifeStage']
  relationCount: number
}

const statusLight: Record<NodeAmbientModel['status'], number> = { emerging: 0.48, growing: 0.62, ready: 0.78, archived: 0.4, quiet: 0.3 }
const stageLight: Record<NodeAmbientModel['lifeStage'], number> = { seed: 0.38, sprout: 0.5, growing: 0.64, bloom: 0.82, fruit: 0.76, archive: 0.38, relic: 0.3, dormant: 0.24, silent: 0.18 }
const properties = ['--node-window-light', '--node-distant-drift', '--node-dust-light', '--node-season-warmth'] as const

export function buildNodeAmbientProjection(model: NodeAmbientModel, signals: WorldSignalSnapshot, elapsedMs: number) {
  const daylight = Math.sin(signals.time.dayProgress * Math.PI)
  const periodFactor = signals.time.dayPeriod === 'night' ? 0.28 : signals.time.dayPeriod === 'dawn' || signals.time.dayPeriod === 'dusk' ? 0.55 : 0.8
  const seasonalWarmth = signals.time.season === 'summer' ? 0.35 : signals.time.season === 'autumn' ? 0.72 : signals.time.season === 'winter' ? 0.82 : 0.55
  return {
    windowLight: Math.min(1, Math.max(0.2, periodFactor * 0.56 + daylight * 0.18 + statusLight[model.status] * 0.16 + stageLight[model.lifeStage] * 0.1)),
    distantDrift: Math.sin(elapsedMs / 18_000 + signals.time.seasonProgress) * 2.4,
    dustLight: Math.min(0.78, 0.18 + model.relationCount * 0.045 + statusLight[model.status] * 0.18),
    seasonalWarmth,
    season: signals.time.season,
  }
}

export function createNodeAmbientAdapter(host: HTMLElement, model: NodeAmbientModel, options: { signal: AbortSignal }): AmbientAdapter<WorldSignalSnapshot> {
  let elapsedMs = 0
  let running = false
  let disposed = false
  let listenerCount = 0
  const apply = (signals: WorldSignalSnapshot) => {
    const value = buildNodeAmbientProjection(model, signals, elapsedMs)
    host.style.setProperty('--node-window-light', value.windowLight.toFixed(4))
    host.style.setProperty('--node-distant-drift', `${value.distantDrift.toFixed(3)}px`)
    host.style.setProperty('--node-dust-light', value.dustLight.toFixed(4))
    host.style.setProperty('--node-season-warmth', value.seasonalWarmth.toFixed(4))
    host.setAttribute('data-node-season', value.season)
  }
  const dispose = () => {
    if (disposed) return
    disposed = true; running = false
    options.signal.removeEventListener('abort', dispose); listenerCount = 0
    properties.forEach((property) => host.style.removeProperty(property))
    host.removeAttribute('data-node-ambient'); host.removeAttribute('data-node-season')
  }
  return {
    start(signals) { if (!disposed) { running = true; host.setAttribute('data-node-ambient', 'running'); options.signal.addEventListener('abort', dispose, { once: true }); listenerCount = 1; apply(signals) } },
    tick(deltaMs, signals) { if (running && !disposed) { elapsedMs += Math.min(100, Math.max(0, deltaMs)); apply(signals) } },
    update(signals) { if (!disposed) apply(signals) },
    pause() { if (!disposed) { running = false; host.setAttribute('data-node-ambient', 'paused') } },
    resume(signals) { if (!disposed) { running = true; host.setAttribute('data-node-ambient', 'running'); apply(signals) } },
    dispose,
    debugResources(): AmbientResourceSnapshot { return disposed ? emptyAmbientResources() : { ...emptyAmbientResources(), eventListeners: listenerCount } },
  }
}
