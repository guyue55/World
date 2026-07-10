'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const activeNodesRef = useRef<Array<AudioScheduledSourceNode | GainNode>>([])
  const [lastPlayedScene, setLastPlayedScene] = useState<string | null>(null)
  const [audioArmed, setAudioArmed] = useState(false)

  const disabled = runtime.soundMode === 'muted' || runtime.sensoryMode === 'silent' || !audioArmed
  const canPlay = runtime.soundMode === 'enabled' && runtime.sensoryMode !== 'silent' && audioArmed

  const stopActiveSound = useCallback(() => {
    for (const node of activeNodesRef.current) {
      try {
        if ('stop' in node) node.stop()
      } catch {
        // A short cue may already have ended; stopping twice is harmless.
      }
      try {
        node.disconnect()
      } catch {
        // Disconnected nodes should not block browsing.
      }
    }
    activeNodesRef.current = []
  }, [])

  const playPreview = useCallback(() => {
    if (runtime.sensoryMode === 'silent') return
    const AudioContextCtor = getAudioContext()
    if (!AudioContextCtor) return

    stopActiveSound()
    const context = audioContextRef.current ?? new AudioContextCtor()
    audioContextRef.current = context
    if (context.state === 'suspended') void context.resume()

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
    activeNodesRef.current = [oscillator, gain]
    setLastPlayedScene(runtime.currentScene)
  }, [registry.runtime.maxVolume, runtime.currentScene, runtime.sensoryMode, runtime.soundVolume, soundscape.durationMs, soundscape.frequency, soundscape.maxGain, stopActiveSound])

  useEffect(() => {
    if (!canPlay) {
      stopActiveSound()
      return
    }
    playPreview()
    return stopActiveSound
  }, [canPlay, playPreview, stopActiveSound])

  useEffect(() => () => {
    stopActiveSound()
    void audioContextRef.current?.close()
  }, [stopActiveSound])

  return (
    <aside
      data-testid="runtime-soundscape-control"
      data-soundscape-control={soundscape.sceneId}
      data-sound-mode={runtime.soundMode}
      data-audio-armed={audioArmed ? 'true' : 'false'}
      data-soundscape-scene={soundscape.sceneId}
      data-sensory-mode={runtime.sensoryMode}
      data-scene-switch-policy={registry.runtime.sceneSwitchPolicy}
      className="pointer-events-none fixed right-14 top-2 z-40 text-xs text-ink/62 md:bottom-6 md:right-6 md:top-auto"
    >
      <div className="pointer-events-auto rounded-full border border-white/70 bg-white/82 p-2 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-2">
          <span className="sr-only">声景：{soundscape.label}。{disabled ? '默认静音，主动开启后才试音' : soundscape.reason}</span>
          <button
            type="button"
            aria-label={canPlay ? '关闭声景' : '开启本次声景'}
            aria-pressed={canPlay}
            className={canPlay
              ? 'grid h-10 w-10 shrink-0 place-items-center rounded-[0.85rem] bg-ink text-paper'
              : 'grid h-10 w-10 shrink-0 place-items-center rounded-[0.85rem] bg-paper text-ink transition hover:bg-white'}
            onClick={() => {
              if (canPlay) {
                setAudioArmed(false)
                runtime.setSoundMode('muted')
                stopActiveSound()
                return
              }
              setAudioArmed(true)
              runtime.setSoundMode('enabled')
            }}
          >
            {canPlay ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          {runtime.soundMode === 'enabled' && (
            <input
              aria-label="声景音量"
              type="range"
              min="0"
              max={registry.runtime.maxVolume}
              step="0.05"
              value={runtime.soundVolume}
              className="hidden w-20 min-w-0 flex-1 accent-ink md:block"
              onChange={(event) => runtime.setSoundVolume(clampSoundscapeVolume(Number(event.target.value)))}
              disabled={runtime.sensoryMode === 'silent'}
            />
          )}
        </div>
        <div className="sr-only">
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
            disabled={runtime.sensoryMode === 'silent'}
            onClick={playPreview}
          >
            试音
          </button>
        </div>
        <p className="sr-only">
          {lastPlayedScene === runtime.currentScene ? '刚刚播放过此场景提示音' : registry.runtime.lazyLoadPolicy}
        </p>
      </div>
    </aside>
  )
}
