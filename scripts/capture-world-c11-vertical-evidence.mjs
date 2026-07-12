import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { performance } from 'node:perf_hooks'
import { capturePng, delay, evaluate, launchRealityBrowser, recordPageScreencast, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-living-world/checkpoint-c/c11-2026-07-12')
const recordingSeconds = Number(process.env.WORLDOS_RECORDING_SECONDS || 65)
const smoke = process.env.WORLDOS_RECORDING_SMOKE === 'true'
if (!smoke && (recordingSeconds < 60 || recordingSeconds > 120)) throw new Error('正式场景录屏必须为 60-120 秒')
const screenshotDir = path.join(outputDir, 'screenshots')
const recordingDir = path.join(outputDir, 'recordings')
fs.mkdirSync(screenshotDir, { recursive: true })
fs.mkdirSync(recordingDir, { recursive: true })

const scenes = [
  { id: 'gateway', pathname: '/', ready: '[data-gateway-ambient]', primary: '[data-gateway-spatial-base], [data-gateway-destination]' },
  { id: 'atlas', pathname: '/atlas', ready: '[data-atlas-ambient]', primary: '[data-atlas-area], [data-atlas-node]' },
  { id: 'node', pathname: '/node/world-manifesto', ready: '[data-node-ambient]', primary: '[data-node-spatial-room], [aria-label="相邻地点"] a' },
]
const modes = ['normal', 'background-hidden', 'text-hidden', 'mobile', 'reduced']
const launch = await launchRealityBrowser('worldos-c11-vertical')
const screenshots = []
const recordings = []

function sha256(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

async function navigate(page, scene) {
  await page.send('Page.navigate', { url: `${baseUrl}${scene.pathname}` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector(${JSON.stringify(scene.ready)})`, 20_000)) throw new Error(`${scene.id} 未就绪`)
  await delay(1_000)
}

async function prepareMode(page, mode) {
  if (mode === 'background-hidden') await evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style data-c11-background-hidden>picture,img{visibility:hidden!important}</style>')`)
  if (mode === 'text-hidden') await evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style data-c11-text-hidden>body *{color:transparent!important;text-shadow:none!important}</style>')`)
}

async function captureMode(scene, mode) {
  const mobile = mode === 'mobile'
  const reducedMotion = mode === 'reduced'
  const page = await launch.createPage({ width: mobile ? 390 : 1440, height: mobile ? 844 : 900, mobile, reducedMotion })
  if (mode === 'reduced') await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('guyue-world:soundscape-preference','muted')` })
  await navigate(page, scene)
  await prepareMode(page, mode)
  await delay(500)
  const file = path.join(screenshotDir, `${scene.id}-${mode}.png`)
  await capturePng(page.send, file)
  const observation = await evaluate(page.send, `(() => {
    const stage=document.querySelector('[data-world-scene=${JSON.stringify(scene.id)}]');
    const rect=stage?.getBoundingClientRect();
    const image=[...document.querySelectorAll('picture img,img')].find((item)=>stage?.contains(item));
    return {
      scene:${JSON.stringify(scene.id)},mode:${JSON.stringify(mode)},
      viewport:rect?{x:rect.x,y:rect.y,width:rect.width,height:rect.height}:null,
      primaryCount:document.querySelectorAll(${JSON.stringify(scene.primary)}).length,
      ambientState:document.querySelector(${JSON.stringify(scene.ready)})?.getAttribute(${JSON.stringify(`data-${scene.id}-ambient`)}),
      imageVisibility:image?getComputedStyle(image).visibility:null,
      backgroundHidden:Boolean(document.querySelector('style[data-c11-background-hidden]')),
      textHidden:Boolean(document.querySelector('style[data-c11-text-hidden]')),
      overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,
      engineering:/Motion Layer|Fallback|Evidence|场景证据|P0|P1/.test(document.body.innerText),
    };
  })()`)
  screenshots.push({ ...observation, path: path.relative(process.cwd(), file), sha256: sha256(file), bytes: fs.statSync(file).size, errors: page.errors.filter(Boolean) })
  await page.close()
}

async function prepareRecordingScene(page, scene) {
  if (scene.id !== 'atlas') return
  await page.send('Runtime.evaluate', { expression: `document.querySelector('[data-atlas-area]')?.click()`, userGesture: true })
  await waitForExpression(page.send, `!!document.querySelector('[data-atlas-node][data-visible="true"]')`, 5_000)
  await page.send('Runtime.evaluate', { expression: `document.querySelector('[data-atlas-node][data-visible="true"]')?.click()`, userGesture: true })
  await delay(500)
}

async function recordScene(scene, buildIdentity) {
  const page = await launch.createPage({ width: 1280, height: 720 })
  await navigate(page, scene)
  await prepareRecordingScene(page, scene)
  const file = path.join(recordingDir, `${scene.id}-continuous-${recordingSeconds}s.mp4`)
  const startedAt = new Date().toISOString()
  const monotonicStartedMs = performance.now()
  const recording = await recordPageScreencast({
    browser: launch.browser,
    page,
    outputPath: file,
    action: async () => { await delay(recordingSeconds * 1000) },
  })
  const monotonicFinishedMs = performance.now()
  const finishedAt = new Date().toISOString()
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', file], { encoding: 'utf8' })
  if (probe.status !== 0) throw new Error(`${scene.id} ffprobe 失败：${probe.stderr}`)
  const ffprobeDurationSeconds = Number(JSON.parse(probe.stdout).format?.duration ?? 0)
  const sidecar = {
    sceneId: scene.id,
    sourceCommit: buildIdentity.sourceCommit,
    buildId: buildIdentity.buildId,
    buildRootHash: buildIdentity.buildRootHash,
    startedAt,
    finishedAt,
    monotonicStartedMs,
    monotonicFinishedMs,
    wallClockSeconds: (Date.parse(finishedAt) - Date.parse(startedAt)) / 1000,
    captureDurationSeconds: recording.durationSeconds,
    ffprobeDurationSeconds,
    frameCount: recording.frames,
    sha256: sha256(file),
    bytes: fs.statSync(file).size,
    continuousWallClock: true,
    edited: false,
    repeatedAssembly: false,
    captureCommand: `Page.startScreencast + ${recordingSeconds}s uninterrupted wait + ffmpeg VFR concat`,
  }
  const sidecarPath = path.join(recordingDir, `${scene.id}-continuous-${recordingSeconds}s.json`)
  fs.writeFileSync(sidecarPath, `${JSON.stringify(sidecar, null, 2)}\n`)
  recordings.push({ ...sidecar, path: path.relative(process.cwd(), file), sidecarPath: path.relative(process.cwd(), sidecarPath), sidecarSha256: sha256(sidecarPath) })
  await page.close()
}

function createContactSheet() {
  const inputs = screenshots.map((item) => path.resolve(item.path))
  const args = ['-y', '-loglevel', 'error']
  inputs.forEach((input) => args.push('-i', input))
  const filters = inputs.map((_, index) => `[${index}:v]scale=384:240:force_original_aspect_ratio=decrease,pad=384:240:(ow-iw)/2:(oh-ih)/2:black[v${index}]`)
  const layout = inputs.map((_, index) => `${(index % 5) * 384}_${Math.floor(index / 5) * 240}`).join('|')
  filters.push(`${inputs.map((_, index) => `[v${index}]`).join('')}xstack=inputs=${inputs.length}:layout=${layout}[out]`)
  const file = path.join(outputDir, 'c11-three-scene-contact-sheet.png')
  args.push('-filter_complex', filters.join(';'), '-map', '[out]', '-frames:v', '1', file)
  const result = spawnSync('ffmpeg', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(`联系表生成失败：${result.stderr}`)
  return { path: path.relative(process.cwd(), file), sha256: sha256(file), bytes: fs.statSync(file).size }
}

try {
  const buildIdentity = await fetch(`${baseUrl}/api/status/build-identity`, { cache: 'no-store' }).then((response) => response.json())
  if (buildIdentity.sourceDirty) throw new Error('C.11 拒绝 sourceDirty build')
  for (const scene of scenes) for (const mode of modes) await captureMode(scene, mode)
  const contactSheet = createContactSheet()
  for (const scene of scenes) await recordScene(scene, buildIdentity)
  const audioReportPath = path.resolve('docs/90-archive/reports/worldos-living-world/checkpoint-c/c9-2026-07-12/audio/world-motif-prototype-technical-report.json')
  const failures = screenshots.flatMap((item) => {
    const issues = []
    if (!item.viewport || item.viewport.width <= 0 || item.viewport.height <= 0) issues.push(`${item.scene}/${item.mode}: 场景主体不可见`)
    if (item.primaryCount < 1) issues.push(`${item.scene}/${item.mode}: 无语义主体`)
    if (item.mode === 'background-hidden' && (item.imageVisibility !== 'hidden' || !item.backgroundHidden)) issues.push(`${item.scene}: 背景未真实隐藏`)
    if (item.mode === 'text-hidden' && !item.textHidden) issues.push(`${item.scene}: 文字未真实隐藏`)
    if ((item.mode === 'reduced' || item.mode === 'mobile') && item.ambientState !== 'paused') issues.push(`${item.scene}/${item.mode}: 降级模式下 adapter 未暂停`)
    if (item.mode !== 'reduced' && item.mode !== 'mobile' && item.ambientState !== 'running') issues.push(`${item.scene}/${item.mode}: adapter 未运行`)
    if (item.overflow) issues.push(`${item.scene}/${item.mode}: 横向溢出`)
    if (item.engineering) issues.push(`${item.scene}/${item.mode}: 公开工程文案`)
    if (item.errors.length) issues.push(`${item.scene}/${item.mode}: ${item.errors.join('; ')}`)
    return issues
  })
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    buildIdentity,
    recordingSeconds,
    screenshots,
    contactSheet,
    recordings,
    audioTechnicalRecord: { path: path.relative(process.cwd(), audioReportPath), sha256: sha256(audioReportPath), humanListeningStatus: 'HUMAN_AUDIO_PENDING' },
    failures,
  }
  const reportPath = path.join(outputDir, 'c11-capture-observations.json')
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C.11 capture completed: screenshots=${screenshots.length} recordings=${recordings.length} seconds=${recordingSeconds} human=HUMAN_AUDIO_PENDING`)
} finally {
  await launch.close()
}
