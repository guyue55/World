import type { GatewayViewModel } from '@/lib/scenes/build-gateway-model'
import type { WorldSignalSnapshot } from '@/world/runtime/signals'
import { emptyAmbientResources, type AmbientAdapter, type AmbientResourceSnapshot } from '@/world/runtime/scheduler'

type GatewayAmbientModel = Pick<GatewayViewModel, 'featuredPlaces'> | { featuredPlaceCount: number }

const visualProperties = [
  '--gateway-star-pulse',
  '--gateway-star-drift',
  '--gateway-fog-shift',
  '--gateway-fog-shift-far',
  '--gateway-island-lift',
  '--gateway-beacon-angle',
  '--gateway-sky-light',
] as const

function placeCount(model: GatewayAmbientModel) {
  return 'featuredPlaces' in model ? model.featuredPlaces.length : model.featuredPlaceCount
}

function dateSeed(dateKey: string) {
  let value = 0
  for (const character of dateKey) value = (value * 31 + character.charCodeAt(0)) % 997
  return value / 997
}

export function createGatewayAmbientAdapter(
  host: HTMLElement,
  model: GatewayAmbientModel,
  options: { signal: AbortSignal },
): AmbientAdapter<WorldSignalSnapshot> {
  let elapsedMs = 0
  let running = false
  let disposed = false
  let listenerCount = 0

  const apply = (signals: WorldSignalSnapshot) => {
    const seed = dateSeed(signals.time.worldDateKey) + placeCount(model) * 0.07
    const phase = signals.time.dayProgress * Math.PI * 2 + elapsedMs / 8_500 + seed
    const contentEnergy = Math.min(1, (signals.content.updatedNodeIds.length + signals.content.activePathIds.length) / 4)
    host.style.setProperty('--gateway-star-pulse', (0.5 + Math.sin(phase * 1.7) * 0.22 + contentEnergy * 0.12).toFixed(4))
    host.style.setProperty('--gateway-star-drift', `${(Math.sin(phase * 0.31) * 8).toFixed(3)}px`)
    host.style.setProperty('--gateway-fog-shift', `${(Math.sin(phase * 0.19) * 16).toFixed(3)}px`)
    host.style.setProperty('--gateway-fog-shift-far', `${(Math.sin(phase * 0.19) * -8.8).toFixed(3)}px`)
    host.style.setProperty('--gateway-island-lift', `${(Math.sin(phase * 0.43) * 3).toFixed(3)}px`)
    host.style.setProperty('--gateway-beacon-angle', `${(-9 + Math.sin(phase * 0.13) * 13).toFixed(3)}deg`)
    host.style.setProperty('--gateway-sky-light', (0.18 + Math.sin(signals.time.dayProgress * Math.PI) * 0.25).toFixed(4))
  }

  const dispose = () => {
    if (disposed) return
    disposed = true
    running = false
    options.signal.removeEventListener('abort', dispose)
    listenerCount = 0
    visualProperties.forEach((property) => host.style.removeProperty(property))
    host.removeAttribute('data-gateway-ambient')
  }

  return {
    start(signals) {
      if (disposed) return
      running = true
      host.setAttribute('data-gateway-ambient', 'running')
      options.signal.addEventListener('abort', dispose, { once: true })
      listenerCount = 1
      apply(signals)
    },
    tick(deltaMs, signals) {
      if (!running || disposed) return
      elapsedMs += Math.min(100, Math.max(0, deltaMs))
      apply(signals)
    },
    update(signals) {
      if (!disposed) apply(signals)
    },
    pause() {
      if (disposed) return
      running = false
      host.setAttribute('data-gateway-ambient', 'paused')
    },
    resume(signals) {
      if (disposed) return
      running = true
      host.setAttribute('data-gateway-ambient', 'running')
      apply(signals)
    },
    dispose,
    debugResources(): AmbientResourceSnapshot {
      return disposed ? emptyAmbientResources() : { ...emptyAmbientResources(), eventListeners: listenerCount }
    },
  }
}
