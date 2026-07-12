export type AmbientResourceSnapshot = {
  adapters: number
  rafCallbacks: number
  tickerListeners: number
  timers: number
  eventListeners: number
  animations: number
  audioContexts: number
  audioSources: number
}

export type AmbientAdapter<TSignals> = {
  start(signals: TSignals): void
  tick(deltaMs: number, signals: TSignals): void
  update(signals: TSignals): void
  pause(): void
  resume(signals: TSignals): void
  dispose(): void
  debugResources(): AmbientResourceSnapshot
}

export type AmbientFrameDriver = {
  request(callback: (now: number) => void): number
  cancel(id: number): void
  now(): number
}

export function emptyAmbientResources(): AmbientResourceSnapshot {
  return { adapters: 0, rafCallbacks: 0, tickerListeners: 0, timers: 0, eventListeners: 0, animations: 0, audioContexts: 0, audioSources: 0 }
}

const defaultFrameDriver: AmbientFrameDriver = {
  request: (callback) => window.requestAnimationFrame(callback),
  cancel: (id) => window.cancelAnimationFrame(id),
  now: () => performance.now(),
}

export class AmbientScheduler<TSignals> {
  private adapter: AmbientAdapter<TSignals> | null = null
  private adapterId: string | null = null
  private signals: TSignals | null = null
  private frameId: number | null = null
  private lastTickAt = 0
  private readonly pauseReasons = new Set<string>()
  private readonly minimumFrameMs: number

  constructor(private readonly frames: AmbientFrameDriver = defaultFrameDriver, maximumFps = 30) {
    if (!Number.isFinite(maximumFps) || maximumFps <= 0) throw new RangeError('Ambient Scheduler maximumFps must be positive.')
    this.minimumFrameMs = 1_000 / maximumFps
  }

  get activeAdapterId() { return this.adapterId }

  register(id: string, adapter: AmbientAdapter<TSignals>, signals: TSignals) {
    if (!id) throw new Error('Ambient adapter id is required.')
    this.disposeActive()
    this.adapterId = id
    this.adapter = adapter
    this.signals = signals
    adapter.start(signals)
    if (this.pauseReasons.size > 0) adapter.pause()
    else {
      this.lastTickAt = this.frames.now()
      this.schedule()
    }
  }

  update(signals: TSignals) {
    this.signals = signals
    this.adapter?.update(signals)
  }

  setPaused(reason: string, paused: boolean) {
    const wasPaused = this.pauseReasons.size > 0
    if (paused) this.pauseReasons.add(reason)
    else this.pauseReasons.delete(reason)
    const isPaused = this.pauseReasons.size > 0
    if (wasPaused === isPaused || !this.adapter || !this.signals) return
    if (isPaused) {
      this.cancelFrame()
      this.adapter.pause()
    } else {
      this.lastTickAt = this.frames.now()
      this.adapter.resume(this.signals)
      this.schedule()
    }
  }

  leave(id: string) {
    if (this.adapterId === id) this.disposeActive()
  }

  dispose() {
    this.disposeActive()
    this.pauseReasons.clear()
  }

  debugResources(): AmbientResourceSnapshot {
    if (!this.adapter) return emptyAmbientResources()
    const owned = this.adapter.debugResources()
    return { ...owned, adapters: 1, rafCallbacks: this.frameId === null ? 0 : 1 }
  }

  private schedule() {
    if (this.frameId !== null || !this.adapter || this.pauseReasons.size > 0) return
    this.frameId = this.frames.request((now) => {
      this.frameId = null
      if (!this.adapter || !this.signals || this.pauseReasons.size > 0) return
      const deltaMs = Math.max(0, now - this.lastTickAt)
      if (deltaMs >= this.minimumFrameMs) {
        this.lastTickAt = now
        this.adapter.tick(deltaMs, this.signals)
      }
      this.schedule()
    })
  }

  private cancelFrame() {
    if (this.frameId === null) return
    this.frames.cancel(this.frameId)
    this.frameId = null
  }

  private disposeActive() {
    this.cancelFrame()
    this.adapter?.dispose()
    this.adapter = null
    this.adapterId = null
    this.signals = null
    this.lastTickAt = 0
  }
}
