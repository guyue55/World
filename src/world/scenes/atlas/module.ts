import type { AtlasLinkView, AtlasNodeView } from '@/lib/scenes/build-atlas-model'
import type { WorldSignalSnapshot } from '@/world/runtime/signals'
import { emptyAmbientResources, type AmbientAdapter, type AmbientResourceSnapshot } from '@/world/runtime/scheduler'

type AtlasAmbientModel = {
  nodes: Array<Pick<AtlasNodeView, 'id' | 'areaId' | 'lifeStage' | 'status' | 'updatedAt' | 'importance' | 'relationReasons'>>
  links: Array<Pick<AtlasLinkView, 'id' | 'from' | 'to' | 'reason'>>
}

const stageWeight: Record<AtlasNodeView['lifeStage'], number> = {
  seed: 0.42, sprout: 0.55, growing: 0.7, bloom: 1, fruit: 0.92,
  archive: 0.4, relic: 0.32, dormant: 0.24, silent: 0.16,
}
const statusWeight: Record<AtlasNodeView['status'], number> = {
  emerging: 0.52, growing: 0.72, ready: 1, archived: 0.42, quiet: 0.28,
}
const nodeProperties = ['--atlas-node-life', '--atlas-node-phase'] as const
const linkProperties = ['--atlas-link-offset'] as const
const hostProperties = ['--atlas-field-breathe'] as const

function hash(value: string) {
  let result = 0
  for (const character of value) result = (result * 33 + character.charCodeAt(0)) % 1009
  return result / 1009
}

export function buildAtlasAmbientProjection(model: AtlasAmbientModel, signals: WorldSignalSnapshot, elapsedMs: number) {
  const recent = new Set(signals.journey.recentNodeIds)
  const nodeLife = Object.fromEntries(model.nodes.map((node) => {
    const updatedEpoch = Date.parse(node.updatedAt)
    const ageDays = Number.isFinite(updatedEpoch) ? Math.max(0, (signals.time.nowEpochMs - updatedEpoch) / 86_400_000) : 365
    const freshness = Math.max(0, 1 - ageDays / 365)
    const reasonWeight = Math.min(0.08, node.relationReasons.length * 0.025)
    const energy = Math.min(1, Math.max(0.12,
      stageWeight[node.lifeStage] * 0.38
      + statusWeight[node.status] * 0.28
      + freshness * 0.14
      + node.importance * 0.12
      + reasonWeight
      + (recent.has(node.id) ? 0.08 : 0),
    ))
    const phase = (hash(node.id) + signals.time.dayProgress + elapsedMs / 12_000) % 1
    return [node.id, { energy, phase, areaId: node.areaId }]
  }))
  const linkFlow = Object.fromEntries(model.links.map((link, index) => [link.id, {
    hasReason: Boolean(link.reason.trim()),
    offset: -((elapsedMs / 90 + index * 7) % 120),
  }]))
  return { nodeLife, linkFlow }
}

export function createAtlasAmbientAdapter(
  host: HTMLElement,
  model: AtlasAmbientModel,
  options: { signal: AbortSignal },
): AmbientAdapter<WorldSignalSnapshot> {
  let elapsedMs = 0
  let running = false
  let disposed = false
  let listenerCount = 0
  let nodes: HTMLElement[] = []
  let links: HTMLElement[] = []

  const apply = (signals: WorldSignalSnapshot) => {
    const projection = buildAtlasAmbientProjection(model, signals, elapsedMs)
    host.style.setProperty('--atlas-field-breathe', (0.5 + Math.sin(elapsedMs / 3_200 + signals.time.dayProgress * Math.PI * 2) * 0.5).toFixed(4))
    nodes.forEach((element) => {
      const id = element.getAttribute('data-atlas-node') ?? ''
      const life = projection.nodeLife[id]
      if (!life) return
      element.style.setProperty('--atlas-node-life', life.energy.toFixed(4))
      element.style.setProperty('--atlas-node-phase', life.phase.toFixed(4))
      element.setAttribute('data-atlas-life-source', 'public-node-fact')
    })
    links.forEach((element) => {
      const id = element.getAttribute('data-atlas-link') ?? ''
      const flow = projection.linkFlow[id]
      if (!flow) return
      element.style.setProperty('--atlas-link-offset', flow.offset.toFixed(3))
      element.setAttribute('data-atlas-reasoned', flow.hasReason ? 'true' : 'false')
    })
  }

  const dispose = () => {
    if (disposed) return
    disposed = true
    running = false
    options.signal.removeEventListener('abort', dispose)
    listenerCount = 0
    nodes.forEach((element) => { nodeProperties.forEach((property) => element.style.removeProperty(property)); element.removeAttribute('data-atlas-life-source') })
    links.forEach((element) => { linkProperties.forEach((property) => element.style.removeProperty(property)); element.removeAttribute('data-atlas-reasoned') })
    host.removeAttribute('data-atlas-ambient')
    hostProperties.forEach((property) => host.style.removeProperty(property))
    nodes = []
    links = []
  }

  return {
    start(signals) {
      if (disposed) return
      nodes = Array.from(host.querySelectorAll<HTMLElement>('[data-atlas-node]'))
      links = Array.from(host.querySelectorAll<HTMLElement>('[data-atlas-link]'))
      running = true
      host.setAttribute('data-atlas-ambient', 'running')
      options.signal.addEventListener('abort', dispose, { once: true })
      listenerCount = 1
      apply(signals)
    },
    tick(deltaMs, signals) { if (running && !disposed) { elapsedMs += Math.min(100, Math.max(0, deltaMs)); apply(signals) } },
    update(signals) { if (!disposed) apply(signals) },
    pause() { if (!disposed) { running = false; host.setAttribute('data-atlas-ambient', 'paused') } },
    resume(signals) { if (!disposed) { running = true; host.setAttribute('data-atlas-ambient', 'running'); apply(signals) } },
    dispose,
    debugResources(): AmbientResourceSnapshot { return disposed ? emptyAmbientResources() : { ...emptyAmbientResources(), eventListeners: listenerCount } },
  }
}
