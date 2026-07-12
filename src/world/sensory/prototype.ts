export type WorldMotifDraft = {
  rootHz: number
  intervals: readonly number[]
}

export type PrototypeRenderOptions = {
  sampleRate?: number
  durationSeconds?: number
}

export type PrototypeAudioAnalysis = {
  durationSeconds: number
  sampleRate: number
  sampleCount: number
  peakLinear: number
  peakDbfs: number
  rmsLinear: number
  dcOffset: number
  seamDelta: number
  nonFiniteSamples: number
}

const motifIntervals = [1, 1.25, 1.5] as const

export const WORLD_SOUND_PROTOTYPE = {
  id: 'moonlit-islands-world-motif-prototype-v1',
  durationSeconds: 90,
  source: 'project-generated-procedural',
  license: 'project-owned-runtime-synthesis',
  removable: true,
  ambientVoices: [
    { frequencyHz: 49, gain: 0.038, oscillatorType: 'sine' },
    { frequencyHz: 73.5, gain: 0.021, oscillatorType: 'sine' },
    { frequencyHz: 98, gain: 0.008, oscillatorType: 'sine' },
    { frequencyHz: 343, gain: 0.0025, oscillatorType: 'sine' },
  ],
  gatewayMotif: { rootHz: 294, intervals: motifIntervals },
  lighthouseMotif: { rootHz: 523, intervals: motifIntervals },
} as const satisfies {
  id: string
  durationSeconds: number
  source: string
  license: string
  removable: boolean
  ambientVoices: readonly { frequencyHz: number; gain: number; oscillatorType: OscillatorType }[]
  gatewayMotif: WorldMotifDraft
  lighthouseMotif: WorldMotifDraft
}

const tau = Math.PI * 2

function motifSample(time: number, start: number, motif: WorldMotifDraft) {
  const noteDuration = 0.74
  const spacing = 0.58
  let sample = 0
  for (let index = 0; index < motif.intervals.length; index += 1) {
    const local = time - start - index * spacing
    if (local < 0 || local >= noteDuration) continue
    const envelope = Math.sin(Math.PI * local / noteDuration) ** 2
    const frequency = motif.rootHz * motif.intervals[index]
    sample += Math.sin(tau * frequency * local) * envelope * 0.018
  }
  return sample
}

export function sampleWorldSoundPrototype(timeSeconds: number, durationSeconds: number = WORLD_SOUND_PROTOTYPE.durationSeconds) {
  const wrapped = ((timeSeconds % durationSeconds) + durationSeconds) % durationSeconds
  const phase = wrapped / durationSeconds
  const tide = 0.64 + Math.sin(tau * phase * 5) * 0.1 + Math.cos(tau * phase * 3) * 0.06
  const distantLight = 0.7 + Math.sin(tau * phase * 9 + 0.4) * 0.12
  const [deepTide, islandEcho, windowLight, beaconAir] = WORLD_SOUND_PROTOTYPE.ambientVoices
  const ambience = (
    Math.cos(tau * deepTide.frequencyHz * wrapped) * deepTide.gain
    + Math.cos(tau * islandEcho.frequencyHz * wrapped) * islandEcho.gain
    + Math.cos(tau * windowLight.frequencyHz * wrapped) * windowLight.gain * distantLight
    + Math.cos(tau * beaconAir.frequencyHz * wrapped + (1 - Math.cos(tau * phase * 7)) * 0.7) * beaconAir.gain
  ) * tide
  return ambience
    + motifSample(wrapped, 12, WORLD_SOUND_PROTOTYPE.gatewayMotif)
    + motifSample(wrapped, 57, WORLD_SOUND_PROTOTYPE.lighthouseMotif)
}

export function renderPrototypeSamples(options: PrototypeRenderOptions = {}) {
  const sampleRate = options.sampleRate ?? 48_000
  const durationSeconds = options.durationSeconds ?? WORLD_SOUND_PROTOTYPE.durationSeconds
  const samples = new Float32Array(Math.round(sampleRate * durationSeconds))
  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = sampleWorldSoundPrototype(index / sampleRate, durationSeconds)
  }
  return samples
}

export function analyzePrototypeSamples(samples: Float32Array, sampleRate: number): PrototypeAudioAnalysis {
  let peakLinear = 0
  let squareSum = 0
  let sum = 0
  let nonFiniteSamples = 0
  for (const sample of samples) {
    if (!Number.isFinite(sample)) { nonFiniteSamples += 1; continue }
    peakLinear = Math.max(peakLinear, Math.abs(sample))
    squareSum += sample * sample
    sum += sample
  }
  const count = Math.max(1, samples.length - nonFiniteSamples)
  return {
    durationSeconds: samples.length / sampleRate,
    sampleRate,
    sampleCount: samples.length,
    peakLinear,
    peakDbfs: peakLinear > 0 ? 20 * Math.log10(peakLinear) : -Infinity,
    rmsLinear: Math.sqrt(squareSum / count),
    dcOffset: Math.abs(sum / count),
    seamDelta: samples.length > 1 ? Math.abs(samples[0] - samples[samples.length - 1]) : 0,
    nonFiniteSamples,
  }
}
