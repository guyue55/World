import type { SensorySoundscape } from '@/lib/sensory-audio'
import { WORLD_SOUND_PROTOTYPE } from '@/world/sensory/prototype'

type AudioGroup = { gain: GainNode; sources: OscillatorNode[]; nodes: AudioNode[] }

type AmbientVoice = { frequencyHz: number; gain: number; oscillatorType: OscillatorType }

export type ProceduralSoundscapePatch = {
  sceneId: string
  ambientFrequencies: [number, number]
  ambientGain: number
  ambientVoices?: AmbientVoice[]
  motifFrequencies: number[]
}

export function buildProceduralSoundscapePatch(soundscape: SensorySoundscape): ProceduralSoundscapePatch {
  const registered = soundscape.proceduralPatch
  const isWorldPrototypeScene = soundscape.sceneId === 'gateway' || soundscape.sceneId === 'lighthouse'
  const motif = soundscape.sceneId === 'lighthouse' ? WORLD_SOUND_PROTOTYPE.lighthouseMotif : WORLD_SOUND_PROTOTYPE.gatewayMotif
  return {
    sceneId: soundscape.sceneId,
    ambientFrequencies: isWorldPrototypeScene
      ? [WORLD_SOUND_PROTOTYPE.ambientVoices[0].frequencyHz, WORLD_SOUND_PROTOTYPE.ambientVoices[1].frequencyHz]
      : [registered.ambientFrequenciesHz[0], registered.ambientFrequenciesHz[1]],
    ambientGain: isWorldPrototypeScene ? 1 : registered.peakGain,
    ambientVoices: isWorldPrototypeScene ? WORLD_SOUND_PROTOTYPE.ambientVoices.map((voice) => ({ ...voice })) : undefined,
    motifFrequencies: isWorldPrototypeScene ? motif.intervals.map((interval) => motif.rootHz * interval) : [...registered.motifFrequenciesHz],
  }
}

export class SoundscapeEngine {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private activeLoop: AudioGroup | null = null
  private activeCue: AudioGroup | null = null
  private armed = false
  private quiet = false
  private volume = 0
  private currentScene: string | null = null
  private lastError: string | null = null

  private readonly onVisibility = () => {
    if (!this.context || !this.armed) return
    void this.syncSuspension()
  }

  private async syncSuspension() {
    if (!this.context) return
    try {
      if (!this.armed || this.quiet || document.hidden) await this.context.suspend()
      else await this.context.resume()
    } catch (error) {
      this.lastError = error instanceof Error ? error.message : 'audio-lifecycle-error'
      await this.mute()
    }
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
    this.armed = true
    this.lastError = null
    this.setVolume(volume)
    await this.syncSuspension()
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
    if (this.context.state === 'suspended' && !document.hidden && !this.quiet) await this.context.resume()
    this.setVolume(volume)
    const patch = buildProceduralSoundscapePatch(soundscape)
    const now = this.context.currentTime
    const nextGain = this.context.createGain()
    nextGain.gain.setValueAtTime(.0001, now)
    nextGain.gain.exponentialRampToValueAtTime(Math.max(.0002, patch.ambientGain), now + .65)
    nextGain.connect(this.master)
    const voices = patch.ambientVoices ?? patch.ambientFrequencies.map((frequency, index) => ({ frequencyHz: frequency, gain: 1, oscillatorType: index === 0 ? 'sine' as const : 'triangle' as const }))
    const nodes: AudioNode[] = []
    const sources = voices.map((voice, index) => {
      const oscillator = this.context!.createOscillator()
      oscillator.type = voice.oscillatorType
      oscillator.frequency.setValueAtTime(voice.frequencyHz, now)
      oscillator.detune.setValueAtTime(index === 0 ? -4 : 5, now)
      const voiceGain = this.context!.createGain()
      voiceGain.gain.setValueAtTime(voice.gain, now)
      oscillator.connect(voiceGain)
      voiceGain.connect(nextGain)
      nodes.push(voiceGain)
      oscillator.start(now)
      return oscillator
    })
    const previous = this.activeLoop
    this.activeLoop = { gain: nextGain, sources, nodes }
    this.currentScene = soundscape.sceneId
    if (previous) {
      previous.gain.gain.cancelScheduledValues(now)
      previous.gain.gain.setTargetAtTime(.0001, now, .2)
      window.setTimeout(() => this.stopGroup(previous), 800)
    }
    this.playMotif(patch)
    return true
  }

  async setQuiet(value: boolean) {
    this.quiet = value
    await this.syncSuspension()
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
    this.activeCue = { gain: cueGain, sources, nodes: [] }
    window.setTimeout(() => {
      if (this.activeCue?.gain === cueGain) this.activeCue = null
      this.stopGroup({ gain: cueGain, sources, nodes: [] })
    }, 760)
  }

  private stopGroup(group: AudioGroup | null) {
    if (!group) return
    for (const source of group.sources) {
      try { source.stop() } catch { /* 已自然结束的短音无需重复停止。 */ }
      source.disconnect()
    }
    for (const node of group.nodes) node.disconnect()
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
    this.quiet = false
  }

  getSnapshot() {
    return {
      armed: this.armed,
      quiet: this.quiet,
      contextCreated: Boolean(this.context),
      contextState: this.context?.state ?? 'none',
      sceneId: this.currentScene,
      loopCount: this.activeLoop ? 1 : 0,
      cueCount: this.activeCue ? 1 : 0,
      volume: this.volume,
      lastError: this.lastError,
    }
  }
}

declare global {
  interface Window { webkitAudioContext?: typeof AudioContext }
}
