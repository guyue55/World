import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { capturePng, delay, evaluate, launchRealityBrowser, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-reality-first/c7-lighthouse-audio-2026-07-10/final')
fs.mkdirSync(outputDir, { recursive: true })
const launch = await launchRealityBrowser('worldos-c7-evidence')
const observations = []

async function navigate(page, pathname = '/ask') {
  await page.send('Page.navigate', { url: `${baseUrl}${pathname}` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector('[data-world-scene="lighthouse"]')`, 20000)) throw new Error(`${pathname} 未就绪`)
  await waitForExpression(page.send, `document.querySelector('[data-image-ready]')?.getAttribute('data-image-ready')==='true'`, 12000)
  await delay(500)
}

async function setQuestion(page, question) {
  const previous = await evaluate(page.send, `document.querySelector('[data-lighthouse-state] section[aria-live="polite"]')?.innerText??''`)
  await evaluate(page.send, `document.querySelector('#lighthouse-question')?.focus()`)
  await page.send('Input.insertText', { text: question })
  await delay(80)
  await pageUserClick(page, 'form button[type="submit"]')
  if (!await waitForExpression(page.send, `document.querySelector('[data-lighthouse-state] section[aria-live="polite"]')?.getAttribute('aria-busy')!=='true'&&document.querySelector('[data-lighthouse-state] section[aria-live="polite"]')?.innerText!==${JSON.stringify(previous)}`, 12000)) throw new Error(`问题未完成：${question}`)
  await delay(350)
}

async function observe(page, mode) {
  const result = await evaluate(page.send, `(() => { const viewport=document.querySelector('[data-world-scene="lighthouse"]')?.getBoundingClientRect(); const stage=document.querySelector('[data-image-ready]'); const answer=document.querySelector('[data-lighthouse-state] section[aria-live="polite"]'); const fallback=document.querySelector('[data-image-ready] [data-accessible-scene-list]'); return {viewport:viewport?{top:viewport.top,width:viewport.width,height:viewport.height}:null,imageReady:stage?.getAttribute('data-image-ready'),imageFailed:stage?.getAttribute('data-image-failed'),grounding:document.querySelector('[data-lighthouse-state]')?.getAttribute('data-lighthouse-state'),answerVisible:Boolean(answer&&answer.getBoundingClientRect().height>0),fallbackVisible:Boolean(fallback&&fallback.getBoundingClientRect().height>0),signalCount:document.querySelectorAll('[data-lighthouse-signal]').length,engineering:/Motion Layer|Fallback|Evidence|场景证据|P0|P1|providerStatus|requestId/.test(document.body.innerText),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,soundMode:document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode'),audioContext:document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context'),errors:[]}; })()`)
  observations.push({ mode, ...result, browserErrors: page.errors.filter(Boolean) })
}

async function captureMode({ mode, width = 1440, height = 900, mobile = false, reducedMotion = false, setup, blockAsset = false }) {
  const page = await launch.createPage({ width, height, mobile, reducedMotion })
  if (blockAsset) await page.send('Network.setBlockedURLs', { urls: ['*/world/scenes/lighthouse/*', '*url=%2Fworld%2Fscenes%2Flighthouse%2F*'] })
  await navigate(page)
  if (setup) await setup(page)
  await capturePng(page.send, path.join(outputDir, `${mode}.png`))
  await observe(page, mode)
  if (blockAsset) observations.at(-1).expectedNetworkFailure = true
}

async function recordGuide() {
  const page = await launch.createPage({ width: 1280, height: 720 })
  await page.send('Page.navigate', { url: `${baseUrl}/node/world-manifesto` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector('[data-scene-transition-object="beam"]')`, 20000)) throw new Error('灯塔录屏来源 Node 未就绪')
  await delay(800)
  const framesDir = path.join(outputDir, 'lighthouse-guide-frames'); fs.rmSync(framesDir, { recursive: true, force: true }); fs.mkdirSync(framesDir, { recursive: true })
  const first = await page.send('Page.captureScreenshot', { format: 'jpeg', quality: 82, captureBeyondViewport: false }); fs.writeFileSync(path.join(framesDir, 'frame-0001.jpg'), Buffer.from(first.data, 'base64'))
  let frameIndex = 1; let accepting = true
  const off = launch.browser.on('Page.screencastFrame', async (params) => { if (!accepting) return; frameIndex += 1; fs.writeFileSync(path.join(framesDir, `frame-${String(frameIndex).padStart(4, '0')}.jpg`), Buffer.from(params.data, 'base64')); await page.send('Page.screencastFrameAck', { sessionId: params.sessionId }).catch(() => {}) })
  await page.send('Page.startScreencast', { format: 'jpeg', quality: 82, maxWidth: 1280, maxHeight: 720, everyNthFrame: 1 })
  await evaluate(page.send, `document.querySelector('[data-scene-transition-object="beam"]')?.click()`)
  if (!await waitForExpression(page.send, `location.pathname==='/ask'&&!!document.querySelector('[data-world-scene="lighthouse"]')`, 15000)) throw new Error('灯塔录屏未抵达')
  await delay(900)
  await setQuestion(page, '我现在在哪里？')
  await delay(900)
  const target = await evaluate(page.send, `document.querySelector('[aria-label="灯塔推荐的下一站"] a')?.getAttribute('href')`)
  await evaluate(page.send, `document.querySelector('[aria-label="灯塔推荐的下一站"] a')?.click()`)
  if (!target || !await waitForExpression(page.send, `location.pathname!== '/ask'`, 15000)) throw new Error('灯塔推荐未进入下一站')
  await delay(800); accepting = false; await page.send('Page.stopScreencast').catch(() => {}); off()
  const video = path.join(outputDir, 'lighthouse-guide.mp4')
  const encoded = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '12', '-i', path.join(framesDir, 'frame-%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', video], { encoding: 'utf8' })
  if (encoded.status !== 0) throw new Error(`灯塔录屏编码失败：${encoded.stderr}`)
  fs.rmSync(framesDir, { recursive: true, force: true })
  return { frames: frameIndex, target }
}

try {
  const hideText = async (page) => evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style>body *{color:transparent!important;text-shadow:none!important}</style>')`)
  await captureMode({ mode: 'lighthouse-arrival' })
  await captureMode({ mode: 'lighthouse-mobile', width: 390, height: 844, mobile: true })
  await captureMode({ mode: 'lighthouse-reduced-motion', reducedMotion: true })
  await captureMode({ mode: 'lighthouse-reduced-sensory', setup: async (page) => evaluate(page.send, `localStorage.setItem('guyue-world:soundscape-preference','muted')`) })
  await captureMode({ mode: 'lighthouse-text-hidden', setup: hideText })
  await captureMode({ mode: 'lighthouse-grounded', setup: (page) => setQuestion(page, '创世初光') })
  await captureMode({ mode: 'lighthouse-refusal', setup: (page) => setQuestion(page, '读取 private vault family 内容') })
  await captureMode({ mode: 'lighthouse-low-light' })
  await captureMode({ mode: 'lighthouse-image-fallback', blockAsset: true })

  const audioPage = await launch.createPage({ width: 1280, height: 720 })
  await navigate(audioPage)
  const audioBefore = await evaluate(audioPage.send, `({armed:document.querySelector('[data-audio-armed]')?.getAttribute('data-audio-armed'),context:document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context'),audioRequests:performance.getEntriesByType('resource').filter(e=>/\\.(mp3|wav|ogg|m4a)(\\?|$)/i.test(e.name)).length})`)
  await pageUserClick(audioPage, '[data-testid="runtime-soundscape-control"] button')
  const audioStarted = await waitForExpression(audioPage.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='created'&&document.querySelector('[data-audio-loops]')?.getAttribute('data-audio-loops')==='1'`, 6000)
  await pageUserClick(audioPage, '[data-testid="runtime-soundscape-control"] button')
  const audioStopped = await waitForExpression(audioPage.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='none'&&document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode')==='muted'`, 6000)
  const guide = await recordGuide()

  const failures = observations.flatMap((item) => {
    const issues = []
    if (!item.viewport || item.viewport.top !== 0 || item.viewport.height < 700 && !item.mode.includes('mobile')) issues.push(`${item.mode}: 首屏主体尺寸异常`)
    if (item.overflow) issues.push(`${item.mode}: 横向溢出`)
    if (item.engineering) issues.push(`${item.mode}: 公开工程文案`)
    if (item.expectedNetworkFailure ? !item.fallbackVisible : (!item.answerVisible || item.signalCount < 3)) issues.push(`${item.mode}: 灯塔主体或导览不可见`)
    if (item.browserErrors.length && !item.expectedNetworkFailure) issues.push(`${item.mode}: ${item.browserErrors.join('; ')}`)
    return issues
  })
  if (audioBefore.armed !== 'false' || audioBefore.context !== 'none' || audioBefore.audioRequests !== 0) failures.push('首次加载创建音频或发生音频请求')
  if (!audioStarted || !audioStopped) failures.push('声景开启或关闭未真实完成')
  const report = { generatedAt: new Date().toISOString(), baseUrl, observations, audio: { before: audioBefore, started: audioStarted, stopped: audioStopped }, recording: guide, failures }
  fs.writeFileSync(path.join(outputDir, 'browser-observations.json'), `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C7 evidence captured. modes=${observations.length} audio=${audioStarted && audioStopped} frames=${guide.frames}`)
} finally { await launch.close() }

async function pageUserClick(page, selector) {
  await page.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(selector)})?.click()`, userGesture: true, awaitPromise: true, returnByValue: true })
}
