import { WorldRuntimeLifecycle, type VisibilitySource } from './lifecycle'
import { AmbientScheduler, emptyAmbientResources, type AmbientAdapter, type AmbientFrameDriver, type AmbientResourceSnapshot } from './scheduler'

type PendingScene<TSignals> = {
  token: symbol
  id: string
  adapter: AmbientAdapter<TSignals>
  signals: TSignals
}

export class WorldAmbientCoordinator<TSignals> {
  private scheduler: AmbientScheduler<TSignals> | null = null
  private lifecycle: WorldRuntimeLifecycle<TSignals> | null = null
  private active: PendingScene<TSignals> | null = null
  private quiet = false

  constructor(private readonly frames?: AmbientFrameDriver) {}

  mount(visibility: VisibilitySource) {
    if (this.lifecycle) return
    this.scheduler = new AmbientScheduler<TSignals>(this.frames)
    this.lifecycle = new WorldRuntimeLifecycle(this.scheduler, visibility)
    this.lifecycle.mount()
    this.lifecycle.setQuiet(this.quiet)
    if (this.active) this.lifecycle.enterScene(this.active.id, this.active.adapter, this.active.signals)
  }

  enterScene(id: string, adapter: AmbientAdapter<TSignals>, signals: TSignals) {
    const token = Symbol(id)
    const previous = this.active
    this.active = { token, id, adapter, signals }
    if (this.lifecycle) this.lifecycle.enterScene(id, adapter, signals)
    else if (previous) previous.adapter.dispose()

    return () => {
      if (this.active?.token !== token) return
      this.lifecycle?.leaveScene(id)
      if (!this.lifecycle) adapter.dispose()
      this.active = null
    }
  }

  updateSignals(signals: TSignals) {
    if (!this.active) return
    this.active.signals = signals
    this.lifecycle?.updateSignals(signals)
  }

  setQuiet(quiet: boolean) {
    this.quiet = quiet
    this.lifecycle?.setQuiet(quiet)
  }

  debugResources(): AmbientResourceSnapshot {
    return this.lifecycle?.debugResources() ?? emptyAmbientResources()
  }

  dispose() {
    this.lifecycle?.dispose()
    if (!this.lifecycle) this.active?.adapter.dispose()
    this.lifecycle = null
    this.scheduler = null
    this.active = null
    this.quiet = false
  }
}
