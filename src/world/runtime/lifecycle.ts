import { AmbientScheduler, type AmbientAdapter, type AmbientResourceSnapshot } from './scheduler'

export type VisibilitySource = {
  hidden: boolean
  addEventListener(type: 'visibilitychange', listener: () => void): void
  removeEventListener(type: 'visibilitychange', listener: () => void): void
}

export class WorldRuntimeLifecycle<TSignals> {
  private mounted = false
  private disposed = false
  private ownedListeners = 0
  private readonly onVisibilityChange = () => this.scheduler.setPaused('hidden', this.visibility.hidden)
  private readonly onAbort = () => this.dispose()

  constructor(
    private readonly scheduler: AmbientScheduler<TSignals>,
    private readonly visibility: VisibilitySource,
    private readonly signal?: AbortSignal,
  ) {}

  mount() {
    if (this.mounted || this.disposed) return
    if (this.signal?.aborted) { this.dispose(); return }
    this.mounted = true
    this.visibility.addEventListener('visibilitychange', this.onVisibilityChange)
    this.ownedListeners += 1
    if (this.signal) {
      this.signal.addEventListener('abort', this.onAbort, { once: true })
      this.ownedListeners += 1
    }
    this.onVisibilityChange()
  }

  enterScene(id: string, adapter: AmbientAdapter<TSignals>, signals: TSignals) {
    if (this.disposed) throw new Error('World runtime lifecycle is disposed.')
    if (!this.mounted) this.mount()
    this.scheduler.register(id, adapter, signals)
  }

  updateSignals(signals: TSignals) {
    if (!this.disposed) this.scheduler.update(signals)
  }

  setQuiet(quiet: boolean) {
    if (!this.disposed) this.scheduler.setPaused('quiet', quiet)
  }

  leaveScene(id: string) {
    if (!this.disposed) this.scheduler.leave(id)
  }

  debugResources(): AmbientResourceSnapshot {
    const resources = this.scheduler.debugResources()
    return { ...resources, eventListeners: resources.eventListeners + this.ownedListeners }
  }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    if (this.mounted) {
      this.visibility.removeEventListener('visibilitychange', this.onVisibilityChange)
      this.ownedListeners -= 1
      this.mounted = false
    }
    if (this.signal && this.ownedListeners > 0) {
      this.signal.removeEventListener('abort', this.onAbort)
      this.ownedListeners -= 1
    }
    this.scheduler.dispose()
    this.ownedListeners = 0
  }
}
