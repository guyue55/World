import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const reportPath = path.resolve(process.argv[2] || 'docs/90-archive/reports/worldos-living-world/checkpoint-c/c11-2026-07-12/c11-capture-observations.json')
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
const root = process.cwd()
const failures = []
const check = (condition, message) => { if (!condition) failures.push(message) }
const hash = (file) => createHash('sha256').update(fs.readFileSync(file)).digest('hex')

function analyzeMedia(file, roi) {
  const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_packets', '-show_entries', 'format=duration:packet=pts_time', '-of', 'json', file], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))
  const pts = (probe.packets ?? []).map((packet) => Number(packet.pts_time)).filter(Number.isFinite)
  let maxPacketGapSeconds = 0
  let nonMonotonicPacketCount = 0
  for (let index = 1; index < pts.length; index += 1) {
    const gap = pts[index] - pts[index - 1]
    if (gap <= 0) nonMonotonicPacketCount += 1
    maxPacketGapSeconds = Math.max(maxPacketGapSeconds, gap)
  }
  const crop = `crop=iw*${roi.width}:ih*${roi.height}:iw*${roi.x}:ih*${roi.y},`
  const frameMd5 = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vf', 'fps=1', '-f', 'framemd5', '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  const hashes = frameMd5.split('\n').filter((line) => line && !line.startsWith('#')).map((line) => line.split(',').at(-1)?.trim()).filter(Boolean)
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vf', `${crop}fps=1,scale=32:32,format=gray`, '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], { encoding: 'buffer', maxBuffer: 16 * 1024 * 1024 })
  const frameSize = 1024
  const frameCount = Math.floor(raw.length / frameSize)
  const meanDifference = (left, right) => { let value = 0; for (let pixel = 0; pixel < frameSize; pixel += 1) value += Math.abs(raw[left * frameSize + pixel] - raw[right * frameSize + pixel]); return value / frameSize }
  let dynamic = 0
  for (let index = 1; index < frameCount; index += 1) if (meanDifference(index - 1, index) >= 0.35) dynamic += 1
  return {
    durationSeconds: Number(probe.format?.duration ?? 0),
    packetCount: pts.length,
    maxPacketGapSeconds,
    nonMonotonicPacketCount,
    sampledFrameCount: hashes.length,
    uniqueFrameRatio: hashes.length ? new Set(hashes).size / hashes.length : 0,
    roiFrameCount: frameCount,
    roiDynamicFrameRatio: frameCount > 1 ? dynamic / (frameCount - 1) : 0,
  }
}

const rois = {
  gateway: { x: 0.1, y: 0.05, width: 0.8, height: 0.7 },
  atlas: { x: 0.08, y: 0.08, width: 0.84, height: 0.72 },
  node: { x: 0.55, y: 0.05, width: 0.4, height: 0.45 },
}
const media = []
check(report.buildIdentity?.sourceDirty === false, '录制 build 不是 clean source')
check(report.screenshots?.length === 15, '联系表原图不是 3x5')
check(report.recordings?.length === 3, '长录屏不是三段')
check(report.audioTechnicalRecord?.humanListeningStatus === 'HUMAN_AUDIO_PENDING', '音频人类签收边界漂移')
for (const screenshot of report.screenshots ?? []) {
  const file = path.resolve(root, screenshot.path)
  check(fs.existsSync(file) && hash(file) === screenshot.sha256, `截图 hash 失败：${screenshot.path}`)
}
for (const recording of report.recordings ?? []) {
  const file = path.resolve(root, recording.path)
  check(fs.existsSync(file) && hash(file) === recording.sha256, `录屏 hash 失败：${recording.sceneId}`)
  check(recording.sourceCommit === report.buildIdentity.sourceCommit && recording.buildId === report.buildIdentity.buildId, `录屏身份不匹配：${recording.sceneId}`)
  check(recording.continuousWallClock && !recording.edited && !recording.repeatedAssembly, `录屏连续性声明失败：${recording.sceneId}`)
  const analysis = analyzeMedia(file, rois[recording.sceneId])
  media.push({ sceneId: recording.sceneId, ...analysis })
  check(analysis.durationSeconds >= 60 && analysis.durationSeconds <= 120, `录屏时长越界：${recording.sceneId}`)
  check(analysis.packetCount > 0 && analysis.nonMonotonicPacketCount === 0 && analysis.maxPacketGapSeconds <= 1, `录屏 PTS 失败：${recording.sceneId}`)
  check(analysis.uniqueFrameRatio >= 0.25, `录屏重复帧过多：${recording.sceneId}`)
  check(analysis.roiDynamicFrameRatio >= 0.15, `冻结 ROI 动态不足：${recording.sceneId}`)
}

const output = { generatedAt: new Date().toISOString(), reportPath: path.relative(root, reportPath), buildId: report.buildIdentity?.buildId, sourceCommit: report.buildIdentity?.sourceCommit, media, failures }
const outputPath = path.join(path.dirname(reportPath), 'c11-independent-media-analysis.json')
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`)
if (failures.length) {
  console.error('C.11 vertical evidence verification failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}
console.log(`C.11 vertical evidence verified: ${media.map((item) => `${item.sceneId}=${item.durationSeconds.toFixed(1)}s/${item.uniqueFrameRatio.toFixed(2)}/${item.roiDynamicFrameRatio.toFixed(2)}`).join(' ')}`)
