'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { clampSoundscapeVolume, getSensoryAudioRegistry, getSoundscapeForScene } from '@/lib/sensory-audio'
import type { SoundscapeEngine } from '@/lib/runtime/soundscape-engine'
import { useWorldRuntime } from './WorldRuntimeProvider'

export function RuntimeSoundscapeControl() {
  const runtime = useWorldRuntime()
  const registry = useMemo(() => getSensoryAudioRegistry(), [])
  const soundscape = useMemo(() => getSoundscapeForScene(runtime.currentScene), [runtime.currentScene])
  const engineRef = useRef<SoundscapeEngine | null>(null)
  const [audioArmed, setAudioArmed] = useState(false)
  const [engineSnapshot, setEngineSnapshot] = useState({ contextCreated: false, contextState: 'none', quiet: false, loopCount: 0, cueCount: 0, sceneId: null as string | null, lastError: null as string | null })
  const enabled = audioArmed && runtime.soundMode === 'enabled'
  const audible = enabled && runtime.sensoryMode === 'full' && engineSnapshot.contextState === 'running'

  const disable = useCallback(async () => {
    const engine = engineRef.current
    setAudioArmed(false)
    runtime.setSoundMode('muted')
    await engine?.mute()
    setEngineSnapshot(engine?.getSnapshot() ?? { contextCreated: false, contextState: 'none', quiet: false, loopCount: 0, cueCount: 0, sceneId: null, lastError: null })
  }, [runtime])

  const enable = useCallback(async () => {
    if (runtime.sensoryMode === 'silent') return
    const { SoundscapeEngine } = await import('@/lib/runtime/soundscape-engine')
    const engine = engineRef.current ?? new SoundscapeEngine()
    engineRef.current = engine
    try {
      const armed = await engine.arm(runtime.soundVolume)
      if (!armed) return
      await engine.setQuiet(runtime.sensoryMode !== 'full')
      setAudioArmed(true)
      runtime.setSoundMode('enabled')
      await engine.setScene(soundscape, runtime.soundVolume)
      setEngineSnapshot(engine.getSnapshot())
    } catch {
      await engine.dispose()
      engineRef.current = null
      setAudioArmed(false)
      runtime.setSoundMode('muted')
      setEngineSnapshot({ contextCreated: false, contextState: 'none', quiet: false, loopCount: 0, cueCount: 0, sceneId: null, lastError: 'audio-runtime-error' })
    }
  }, [runtime, soundscape])

  useEffect(() => {
    if (!enabled) return
    const engine = engineRef.current
    if (!engine) return
    if (engine.getSnapshot().sceneId === soundscape.sceneId) {
      engine.setVolume(runtime.soundVolume)
      setEngineSnapshot(engine.getSnapshot())
      return
    }
    void engine.setScene(soundscape, runtime.soundVolume).then(() => setEngineSnapshot(engine.getSnapshot()))
  }, [enabled, runtime.soundVolume, soundscape])

  useEffect(() => {
    const engine = engineRef.current
    if (!engine || !enabled) return
    void engine.setQuiet(runtime.sensoryMode !== 'full').then(() => setEngineSnapshot(engine.getSnapshot()))
  }, [enabled, runtime.sensoryMode])

  useEffect(() => {
    if (runtime.sensoryMode === 'silent' && audioArmed) void disable()
  }, [audioArmed, disable, runtime.sensoryMode])

  useEffect(() => () => { void engineRef.current?.dispose(); engineRef.current = null }, [])

  return <aside data-testid="runtime-soundscape-control" data-soundscape-control={soundscape.sceneId} data-sound-mode={runtime.soundMode} data-audio-armed={audioArmed ? 'true' : 'false'} data-audio-context={engineSnapshot.contextCreated ? engineSnapshot.contextState : 'none'} data-audio-quiet={engineSnapshot.quiet ? 'true' : 'false'} data-audio-error={engineSnapshot.lastError ?? ''} data-audio-loops={engineSnapshot.loopCount} data-audio-cues={engineSnapshot.cueCount} data-soundscape-scene={soundscape.sceneId} data-sensory-mode={runtime.sensoryMode} className="pointer-events-none fixed right-14 top-2 z-40 text-xs text-ink/62 md:bottom-6 md:right-6 md:top-auto">
    <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-white/70 bg-white/88 p-2 shadow-soft backdrop-blur-xl">
      <span className="sr-only">声景：{soundscape.label}。{audible ? soundscape.reason : enabled ? '当前处于静谧或后台暂停状态。' : '默认静音，点击后才创建声音。'}</span>
      <button type="button" aria-label={enabled ? '关闭声景' : '开启本次声景'} aria-pressed={enabled} className={enabled ? 'grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-paper' : 'grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-paper text-ink transition hover:bg-white'} onClick={() => { if (enabled) void disable(); else void enable() }}>{enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}</button>
      {enabled ? <input aria-label="声景音量" type="range" min="0" max={registry.runtime.maxVolume} step="0.05" value={runtime.soundVolume} className="hidden w-20 accent-ink md:block" onChange={(event) => runtime.setSoundVolume(clampSoundscapeVolume(Number(event.target.value)))} /> : null}
    </div>
  </aside>
}
