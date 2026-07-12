import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import {
  WORLD_SOUND_PROTOTYPE,
  analyzePrototypeSamples,
  renderPrototypeSamples,
} from '../src/world/sensory/prototype'

const root = process.cwd()
const outputDir = path.resolve(process.env.WORLDOS_C9_AUDIO_DIR ?? 'docs/90-archive/reports/worldos-living-world/checkpoint-c/c9-2026-07-12/audio')
const temporaryDir = path.resolve('tmp/worldos-c9-audio')
const sampleRate = 48_000
const channels = 1
const bitsPerSample = 16
const renderSeconds = 600
const loopSeconds = WORLD_SOUND_PROTOTYPE.durationSeconds
const wavPath = path.join(temporaryDir, 'world-motif-prototype-10m.wav')
const flacPath = path.join(outputDir, 'world-motif-prototype-10m.flac')
const waveformPath = path.join(outputDir, 'world-motif-prototype-waveform.png')
const spectrumPath = path.join(outputDir, 'world-motif-prototype-spectrum.png')
const reportPath = path.join(outputDir, 'world-motif-prototype-technical-report.json')

fs.mkdirSync(outputDir, { recursive: true })
fs.mkdirSync(temporaryDir, { recursive: true })

function sha256(file: string) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function run(command: string, args: string[]) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')}\n${result.stderr || result.stdout}`)
  return `${result.stdout ?? ''}${result.stderr ?? ''}`
}

function wavHeader(dataBytes: number) {
  const header = Buffer.alloc(44)
  header.write('RIFF', 0)
  header.writeUInt32LE(36 + dataBytes, 4)
  header.write('WAVEfmt ', 8)
  header.writeUInt32LE(16, 16)
  header.writeUInt16LE(1, 20)
  header.writeUInt16LE(channels, 22)
  header.writeUInt32LE(sampleRate, 24)
  header.writeUInt32LE(sampleRate * channels * bitsPerSample / 8, 28)
  header.writeUInt16LE(channels * bitsPerSample / 8, 32)
  header.writeUInt16LE(bitsPerSample, 34)
  header.write('data', 36)
  header.writeUInt32LE(dataBytes, 40)
  return header
}

const loop = renderPrototypeSamples({ sampleRate, durationSeconds: loopSeconds })
const loopAnalysis = analyzePrototypeSamples(loop, sampleRate)
const totalSamples = sampleRate * renderSeconds
const dataBytes = totalSamples * channels * bitsPerSample / 8
const descriptor = fs.openSync(wavPath, 'w')
fs.writeSync(descriptor, wavHeader(dataBytes))
const chunkSamples = sampleRate
const chunk = Buffer.alloc(chunkSamples * 2)
let written = 0
while (written < totalSamples) {
  const count = Math.min(chunkSamples, totalSamples - written)
  for (let offset = 0; offset < count; offset += 1) {
    const sample = Math.max(-1, Math.min(1, loop[(written + offset) % loop.length]))
    chunk.writeInt16LE(Math.round(sample * 32_767), offset * 2)
  }
  fs.writeSync(descriptor, chunk, 0, count * 2)
  written += count
}
fs.closeSync(descriptor)

run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', wavPath, '-compression_level', '8', flacPath])
run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', flacPath, '-filter_complex', 'showwavespic=s=1600x480:colors=5daec6', '-frames:v', '1', waveformPath])
run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', '0', '-t', String(loopSeconds), '-i', flacPath, '-lavfi', 'showspectrumpic=s=1600x900:legend=1:scale=log:color=intensity:stop=2000:drange=100', '-frames:v', '1', spectrumPath])
const loudnessOutput = run('ffmpeg', ['-hide_banner', '-nostats', '-i', flacPath, '-filter_complex', 'ebur128=peak=true', '-f', 'null', '-'])
const truePeakMatch = [...loudnessOutput.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1)
const probe = JSON.parse(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,sample_rate,channels,bits_per_raw_sample', '-of', 'json', flacPath]))
const seamDeltas = Array.from({ length: Math.floor(renderSeconds / loopSeconds) - 1 }, (_, index) => {
  const boundary = (index + 1) * loop.length
  return Math.abs(loop[(boundary - 1) % loop.length] - loop[boundary % loop.length])
})

const report = {
  generatedAt: new Date().toISOString(),
  prototype: WORLD_SOUND_PROTOTYPE,
  render: {
    durationSeconds: renderSeconds,
    loopSeconds,
    sampleRate,
    channels,
    bitsPerSample,
    loopCount: renderSeconds / loopSeconds,
    deterministic: true,
  },
  analysis: {
    ...loopAnalysis,
    truePeakDbfs: truePeakMatch ? Number(truePeakMatch[1]) : null,
    loopBoundaryCount: seamDeltas.length,
    maximumBoundaryDelta: Math.max(0, ...seamDeltas),
    waveformFinding: '技术图已生成；不构成人类听感结论。',
    spectrumFinding: '技术图已生成；不构成人类听感结论。',
  },
  lifecycleContract: {
    beforeUserGestureAudioNetworkBytes: 0,
    audioContextMax: 1,
    ambienceSourceMax: 1,
    cueGroupMax: 1,
    quiet: 'suspend',
    hidden: 'suspend',
    mute: 'stop-sources-and-suspend',
    dispose: 'stop-sources-and-close',
  },
  assets: [flacPath, waveformPath, spectrumPath].map((file) => ({
    path: path.relative(root, file),
    bytes: fs.statSync(file).size,
    sha256: sha256(file),
  })),
  source: {
    path: 'src/world/sensory/prototype.ts',
    sha256: sha256(path.resolve('src/world/sensory/prototype.ts')),
    license: WORLD_SOUND_PROTOTYPE.license,
    generation: WORLD_SOUND_PROTOTYPE.source,
  },
  probe,
  humanListening: {
    status: 'HUMAN_AUDIO_PENDING',
    headphones: 'not-reviewed-by-human',
    speakers: 'not-reviewed-by-human',
  },
}
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
fs.rmSync(wavPath, { force: true })

if (loopAnalysis.peakLinear > 0.12) throw new Error(`sample peak 超限：${loopAnalysis.peakLinear}`)
if (report.analysis.truePeakDbfs === null || report.analysis.truePeakDbfs > -12) throw new Error(`true peak 缺失或超限：${report.analysis.truePeakDbfs}`)
if (report.analysis.maximumBoundaryDelta > 0.002) throw new Error(`循环接缝超限：${report.analysis.maximumBoundaryDelta}`)
if (loopAnalysis.nonFiniteSamples > 0 || loopAnalysis.dcOffset > 0.001) throw new Error('样板包含非法采样或 DC 偏移')

console.log(`C.9 audio prototype technical package generated: duration=${renderSeconds}s truePeak=${report.analysis.truePeakDbfs}dBFS seam=${report.analysis.maximumBoundaryDelta} human=${report.humanListening.status}`)
