import type { SensorySoundscape } from '@/lib/sensory-audio'

type AudioGroup = { gain: GainNode; sources: OscillatorNode[] }

export type ProceduralSoundscapePatch = {
  sceneId: string
  ambientFrequencies: [number, number]
  ambientGain: number
  motifFrequencies: number[]
}

export function buildProceduralSoundscapePatch(soundscape: SensorySoundscape): ProceduralSoundscapePatch {
  const root = Math.max(48, soundscape.frequency / 3)
  const motifBase = soundscape.sceneId === 'lighthouse' ? soundscape.frequency : soundscape.sceneId === 'gateway' ? soundscape.frequency * .75 : 0
  return {
    sceneId: soundscape.sceneId,
    ambientFrequencies: [root, root * 1.502],
    ambientGain: Math.min(.008, soundscape.maxGain * .12),
    motifFrequencies: motifBase ? [motifBase, motifBase * 1.25, motifBase * 1.5] : [],
  }
}

export class SoundscapeEngine {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private activeLoop: AudioGroup | null = null
  private activeCue: AudioGroup | null = null
  private armed = false
  private volume = 0
  private currentScene: string | null = null

  private readonly onVisibility = () => {
    if (!this.context || !this.armed) return
    if (document.hidden) void this.context.suspend()
    else void this.context.resume()
  }

  async arm(volume: number) {
    if (!this.context) {
      const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext
      if (!AudioContextCtor) return false
      this.context = new AudioContextCtor()
      this.master = this.context.createGain()
      this.master.gain.value = 0
      this.master.connect(this.context.destination)
      document.addEventListener('visibilitychange', this.onVisibility)
    }
    await this.context.resume()
    this.armed = true
    this.setVolume(volume)
    return true
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(.7, volume))
    if (!this.context || !this.master) return
    this.master.gain.cancelScheduledValues(this.context.currentTime)
    this.master.gain.setTargetAtTime(this.volume, this.context.currentTime, .08)
  }

  async setScene(soundscape: SensorySoundscape, volume: number) {
    if (!this.context || !this.master || !this.armed) return false
    if (this.context.state === 'suspended' && !document.hidden) await this.context.resume()
    this.setVolume(volume)
    const patch = buildProceduralSoundscapePatch(soundscape)
    const now = this.context.currentTime
    const nextGain = this.context.createGain()
    nextGain.gain.setValueAtTime(.0001, now)
    nextGain.gain.exponentialRampToValueAtTime(Math.max(.0002, patch.ambientGain), now + .65)
    nextGain.connect(this.master)
    const sources = patch.ambientFrequencies.map((frequency, index) => {
      const oscillator = this.context!.createOscillator()
      oscillator.type = index === 0 ? 'sine' : 'triangle'
      oscillator.frequency.setValueAtTime(frequency, now)
      oscillator.detune.setValueAtTime(index === 0 ? -4 : 5, now)
      oscillator.connect(nextGain)
      oscillator.start(now)
      return oscillator
    })
    const previous = this.activeLoop
    this.activeLoop = { gain: nextGain, sources }
    this.currentScene = soundscape.sceneId
    if (previous) {
      previous.gain.gain.cancelScheduledValues(now)
      previous.gain.gain.setTargetAtTime(.0001, now, .2)
      window.setTimeout(() => this.stopGroup(previous), 800)
    }
    this.playMotif(patch)
    return true
  }

  private playMotif(patch: ProceduralSoundscapePatch) {
    if (!this.context || !this.master || patch.motifFrequencies.length === 0) return
    if (this.activeCue) this.stopGroup(this.activeCue)
    const now = this.context.currentTime
    const cueGain = this.context.createGain()
    cueGain.gain.setValueAtTime(.0001, now)
    cueGain.connect(this.master)
    const sources = patch.motifFrequencies.map((frequency, index) => {
      const oscillator = this.context!.createOscillator()
      const start = now + index * .16
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, start)
      cueGain.gain.setValueAtTime(.0001, start)
      cueGain.gain.exponentialRampToValueAtTime(.026, start + .025)
      cueGain.gain.exponentialRampToValueAtTime(.0001, start + .14)
      oscillator.connect(cueGain)
      oscillator.start(start)
      oscillator.stop(start + .16)
      return oscillator
    })
    this.activeCue = { gain: cueGain, sources }
    window.setTimeout(() => {
      if (this.activeCue?.gain === cueGain) this.activeCue = null
      this.stopGroup({ gain: cueGain, sources })
    }, 760)
  }

  private stopGroup(group: AudioGroup | null) {
    if (!group) return
    for (const source of group.sources) {
      try { source.stop() } catch { /* 已自然结束的短音无需重复停止。 */ }
      source.disconnect()
    }
    group.gain.disconnect()
  }

  async mute() {
    this.armed = false
    this.stopGroup(this.activeLoop)
    this.stopGroup(this.activeCue)
    this.activeLoop = null
    this.activeCue = null
    if (this.context) await this.context.suspend()
  }

  async dispose() {
    await this.mute()
    document.removeEventListener('visibilitychange', this.onVisibility)
    await this.context?.close()
    this.context = null
    this.master = null
    this.currentScene = null
  }

  getSnapshot() {
    return { armed: this.armed, contextCreated: Boolean(this.context), sceneId: this.currentScene, loopCount: this.activeLoop ? 1 : 0, cueCount: this.activeCue ? 1 : 0, volume: this.volume }
  }
}

declare global {
  interface Window { webkitAudioContext?: typeof AudioContext }
}
