'use client'

import { useMemo, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { clampSoundscapeVolume, getSensoryAudioRegistry, getSoundscapeForScene } from '@/lib/sensory-audio'
import { useWorldRuntime } from './WorldRuntimeProvider'

type BrowserAudioContext = typeof AudioContext

function getAudioContext(): BrowserAudioContext | undefined {
  return window.AudioContext ?? window.webkitAudioContext
}

declare global {
  interface Window {
    webkitAudioContext?: BrowserAudioContext
  }
}

export function RuntimeSoundscapeControl() {
  const runtime = useWorldRuntime()
  const registry = useMemo(() => getSensoryAudioRegistry(), [])
  const soundscape = useMemo(() => getSoundscapeForScene(runtime.currentScene), [runtime.currentScene])
  const audioContextRef = useRef<AudioContext | null>(null)
  const [lastPlayedScene, setLastPlayedScene] = useState<string | null>(null)

  const disabled = runtime.soundMode === 'muted' || runtime.sensoryMode === 'silent'
  const canPlay = runtime.soundMode === 'enabled' && runtime.sensoryMode !== 'silent'

  function playPreview() {
    if (runtime.sensoryMode === 'silent') return
    const AudioContextCtor = getAudioContext()
    if (!AudioContextCtor) return

    const context = audioContextRef.current ?? new AudioContextCtor()
    audioContextRef.current = context

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const now = context.currentTime
    const volume = clampSoundscapeVolume(runtime.soundVolume)
    const maxGain = Math.min(soundscape.maxGain * volume, registry.runtime.maxVolume * 0.08)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(soundscape.frequency, now)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(Math.max(maxGain, 0.0002), now + 0.025)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + soundscape.durationMs / 1000)

    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(now)
    oscillator.stop(now + soundscape.durationMs / 1000 + 0.04)
    setLastPlayedScene(runtime.currentScene)
  }

  return (
    <aside
      data-testid="runtime-soundscape-control"
      data-sound-mode={runtime.soundMode}
      data-soundscape-scene={soundscape.sceneId}
      data-sensory-mode={runtime.sensoryMode}
      className="pointer-events-none fixed bottom-4 right-4 z-40 w-[min(20rem,calc(100vw-2rem))] text-xs text-ink/62 md:bottom-6 md:right-6"
    >
      <div className="pointer-events-auto rounded-[1rem] border border-white/70 bg-white/78 p-3 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">声景：{soundscape.label}</p>
            <p className="mt-1 truncate text-ink/50">{disabled ? '默认静音，主动开启后才试音' : soundscape.reason}</p>
          </div>
          <button
            type="button"
            aria-label={canPlay ? '关闭声景' : '开启声景'}
            aria-pressed={canPlay}
            className={canPlay
              ? 'grid h-10 w-10 shrink-0 place-items-center rounded-[0.85rem] bg-ink text-paper'
              : 'grid h-10 w-10 shrink-0 place-items-center rounded-[0.85rem] bg-paper text-ink transition hover:bg-white'}
            onClick={() => {
              if (canPlay) {
                runtime.setSoundMode('muted')
                return
              }
              runtime.setSoundMode('enabled')
              playPreview()
            }}
          >
            {canPlay ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <input
            aria-label="声景音量"
            type="range"
            min="0"
            max={registry.runtime.maxVolume}
            step="0.05"
            value={runtime.soundVolume}
            className="min-w-0 flex-1 accent-ink"
            onChange={(event) => runtime.setSoundVolume(clampSoundscapeVolume(Number(event.target.value)))}
            disabled={runtime.soundMode === 'muted'}
          />
          <button
            type="button"
            className="rounded-[0.75rem] bg-ink/5 px-3 py-2 font-semibold text-ink/62 transition hover:bg-ink/10 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canPlay}
            onClick={playPreview}
          >
            试音
          </button>
        </div>
        <p className="mt-2 truncate text-[11px] text-ink/42">
          {lastPlayedScene === runtime.currentScene ? '刚刚播放过此场景提示音' : registry.runtime.lazyLoadPolicy}
        </p>
      </div>
    </aside>
  )
}
