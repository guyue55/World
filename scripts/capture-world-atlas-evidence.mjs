import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { capturePng, delay, evaluate, launchRealityBrowser, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-reality-first/c3-atlas-2026-07-10/final')
fs.mkdirSync(outputDir, { recursive: true })

const launch = await launchRealityBrowser('worldos-atlas-evidence')
const observations = []

async function navigate(page, pathname = '/atlas') {
  await page.send('Page.navigate', { url: `${baseUrl}${pathname}` })
  const ready = await waitForExpression(page.send, `document.readyState === 'complete' && Boolean(document.querySelector('[data-testid="atlas-camera"]'))`, 15000)
  if (!ready) throw new Error(`Atlas 页面未在时限内就绪：${pathname}`)
  await delay(900)
}

async function observe(page, mode) {
  const result = await evaluate(page.send, `(() => {
    const viewport = document.querySelector('[data-world-scene="atlas"]')
    const rect = viewport?.getBoundingClientRect()
    const visibleAreas = [...document.querySelectorAll('[data-atlas-area]')].filter((item) => {
      const box = item.getBoundingClientRect()
      return box.right > 0 && box.left < innerWidth && box.bottom > 0 && box.top < innerHeight
    }).length
    const inspectorRect = document.querySelector('[role="dialog"]')?.getBoundingClientRect()
    const mobileNav = document.querySelector('[data-testid="mobile-primary-navigation"]')
    const mobileNavRect = mobileNav && getComputedStyle(mobileNav).display !== 'none' ? mobileNav.getBoundingClientRect() : null
    return {
      title: document.title,
      viewport: rect ? { top: rect.top, width: rect.width, height: rect.height } : null,
      visibleAreas,
      areaCount: document.querySelectorAll('[data-atlas-area]').length,
      representativeNodeCount: document.querySelectorAll('[data-atlas-node]').length,
      focusedArea: document.querySelector('[data-atlas-area][aria-pressed="true"]')?.getAttribute('data-atlas-area') ?? null,
      focusedNode: document.querySelector('[data-atlas-node][aria-pressed="true"]')?.getAttribute('data-atlas-node') ?? null,
      areaInspector: Boolean(document.querySelector('[data-testid="atlas-area-inspector"]')),
      nodeInspector: Boolean(document.querySelector('[data-testid="atlas-node-inspector"]')),
      imageFailed: document.querySelector('[data-enhanced][data-image-failed]')?.getAttribute('data-image-failed') === 'true',
      staticFallbackVisible: (() => { const item = document.querySelector('[data-accessible-scene-list]'); return Boolean(item && getComputedStyle(item).display !== 'none') })(),
      sensoryMode: document.querySelector('[data-sensory-mode]')?.getAttribute('data-sensory-mode') ?? null,
      soundMode: document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode') ?? null,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      engineeringCopy: /Motion Layer|Fallback|Evidence|场景证据|M24 SVG PILOT/.test(document.body.innerText),
      inspectorOverlapsMobileNav: Boolean(inspectorRect && mobileNavRect && inspectorRect.bottom > mobileNavRect.top),
    }
  })()`)
  observations.push({ mode, ...result, errors: page.errors.filter(Boolean) })
}

async function captureMode({ mode, width, height, mobile = false, reducedMotion = false, beforeNavigate, setup }) {
  const page = await launch.createPage({ width, height, mobile, reducedMotion })
  if (beforeNavigate) await beforeNavigate(page)
  await navigate(page)
  if (setup) await setup(page)
  await delay(500)
  await capturePng(page.send, path.join(outputDir, `${mode}.png`))
  await observe(page, mode)
  return page
}

try {
  await captureMode({ mode: 'atlas-arrival-desktop', width: 1440, height: 900 })
  await captureMode({
    mode: 'atlas-area-focused', width: 1440, height: 900,
    setup: async (page) => { await evaluate(page.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`); await waitForExpression(page.send, `Boolean(document.querySelector('[data-testid="atlas-area-inspector"]'))`) },
  })
  await captureMode({
    mode: 'atlas-node-focused', width: 1440, height: 900,
    setup: async (page) => {
      await evaluate(page.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`)
      await waitForExpression(page.send, `Boolean(document.querySelector('[data-testid="atlas-area-inspector"]'))`)
      await evaluate(page.send, `document.querySelector('[data-atlas-node="node-cli-agent"]')?.click()`)
      await waitForExpression(page.send, `Boolean(document.querySelector('[data-testid="atlas-node-inspector"]'))`)
    },
  })
  await captureMode({ mode: 'atlas-mobile', width: 390, height: 844, mobile: true })
  await captureMode({
    mode: 'atlas-mobile-focused', width: 390, height: 844, mobile: true,
    setup: async (page) => { await evaluate(page.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`); await waitForExpression(page.send, `Boolean(document.querySelector('[data-testid="atlas-area-inspector"]'))`) },
  })
  await captureMode({ mode: 'atlas-reduced-motion', width: 1440, height: 900, reducedMotion: true })
  await captureMode({
    mode: 'atlas-reduced-sensory', width: 1440, height: 900,
    beforeNavigate: async (page) => { await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('guyue-world:soundscape-preference','muted')` }) },
  })
  await captureMode({
    mode: 'atlas-image-fallback', width: 1440, height: 900,
    beforeNavigate: async (page) => { await page.send('Network.setBlockedURLs', { urls: ['*/world/scenes/atlas/*', '*url=%2Fworld%2Fscenes%2Fatlas%2F*'] }) },
  })
  await captureMode({
    mode: 'atlas-text-hidden', width: 1440, height: 900,
    setup: async (page) => { await evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style id="hide-world-copy">body *{color:transparent!important;text-shadow:none!important} svg{color:initial!important}</style>')`) },
  })

  const recordingPage = await launch.createPage({ width: 1280, height: 720 })
  await navigate(recordingPage)
  const framesDir = path.join(outputDir, 'recording-frames')
  fs.rmSync(framesDir, { recursive: true, force: true })
  fs.mkdirSync(framesDir, { recursive: true })
  let frameIndex = 0
  let acceptingFrames = true
  const off = launch.browser.on('Page.screencastFrame', async (params) => {
    if (!acceptingFrames) return
    frameIndex += 1
    fs.writeFileSync(path.join(framesDir, `frame-${String(frameIndex).padStart(4, '0')}.jpg`), Buffer.from(params.data, 'base64'))
    await recordingPage.send('Page.screencastFrameAck', { sessionId: params.sessionId })
  })
  await recordingPage.send('Page.startScreencast', { format: 'jpeg', quality: 82, maxWidth: 1280, maxHeight: 720, everyNthFrame: 1 })
  await delay(700)
  await evaluate(recordingPage.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`)
  await delay(1200)
  await evaluate(recordingPage.send, `document.querySelector('[data-atlas-node="node-cli-agent"]')?.click()`)
  await delay(1200)
  await evaluate(recordingPage.send, `document.querySelector('[aria-label="返回全图"]')?.click()`)
  await delay(1000)
  acceptingFrames = false
  await recordingPage.send('Page.stopScreencast')
  off()

  const recordingPath = path.join(outputDir, 'atlas-exploration.mp4')
  const ffmpeg = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '12', '-i', path.join(framesDir, 'frame-%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', recordingPath], { encoding: 'utf8' })
  if (ffmpeg.status !== 0) throw new Error(`Atlas 录屏编码失败：${ffmpeg.stderr}`)
  fs.rmSync(framesDir, { recursive: true, force: true })

  const journeyPage = await launch.createPage({ width: 1280, height: 720 })
  await navigate(journeyPage)
  await evaluate(journeyPage.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`)
  await waitForExpression(journeyPage.send, `Boolean(document.querySelector('[data-testid="atlas-area-inspector"]'))`)
  const transformBeforeKeyboard = await evaluate(journeyPage.send, `getComputedStyle(document.querySelector('[data-testid="atlas-camera"]')).transform`)
  await evaluate(journeyPage.send, `document.querySelector('[data-atlas-area="tech"]')?.focus()`)
  await journeyPage.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 })
  await journeyPage.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 })
  await delay(900)
  const transformAfterKeyboard = await evaluate(journeyPage.send, `getComputedStyle(document.querySelector('[data-testid="atlas-camera"]')).transform`)
  await evaluate(journeyPage.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`)
  await delay(800)
  await evaluate(journeyPage.send, `document.querySelector('[data-atlas-node="node-cli-agent"]')?.click()`)
  await waitForExpression(journeyPage.send, `Boolean(document.querySelector('[data-testid="atlas-node-inspector"]'))`)
  const expectedNodePath = await evaluate(journeyPage.send, `new URL(document.querySelector('[data-atlas-enter-node]').href).pathname`)
  await evaluate(journeyPage.send, `document.querySelector('[data-atlas-enter-node]')?.click()`)
  const reachedNode = await waitForExpression(journeyPage.send, `location.pathname === ${JSON.stringify(expectedNodePath)}`, 12000)
  await evaluate(journeyPage.send, `history.back()`)
  const returnedFromNode = await waitForExpression(journeyPage.send, `location.pathname === '/atlas' && Boolean(document.querySelector('[data-testid="atlas-camera"]'))`, 12000)
  await delay(700)
  await evaluate(journeyPage.send, `document.querySelector('[aria-label="返回全图"]')?.click()`)
  await delay(900)
  const resetTransform = await evaluate(journeyPage.send, `getComputedStyle(document.querySelector('[data-testid="atlas-camera"]')).transform`)
  await evaluate(journeyPage.send, `document.querySelector('[data-atlas-area="tech"]')?.click()`)
  await waitForExpression(journeyPage.send, `Boolean(document.querySelector('[data-testid="atlas-area-inspector"]'))`)
  await evaluate(journeyPage.send, `document.querySelector('[data-testid="atlas-area-inspector"] a[href^="/timeline"]')?.click()`)
  const reachedTimeline = await waitForExpression(journeyPage.send, `location.pathname === '/timeline' && new URLSearchParams(location.search).get('area') === 'tech'`, 12000)
  const journeyChecks = {
    keyboardPanChangedCamera: transformBeforeKeyboard !== transformAfterKeyboard,
    reachedNode,
    returnedFromNode,
    resetReturnedWholeMap: resetTransform === 'none' || resetTransform.startsWith('matrix(1, 0, 0, 1,'),
    reachedTimeline,
  }

  const failures = observations.flatMap((item) => {
    const issues = []
    if (!item.viewport || item.viewport.top !== 0) issues.push(`${item.mode}: viewport 未从首屏开始`)
    if (item.areaCount !== 8 || item.representativeNodeCount !== 24) issues.push(`${item.mode}: 场景对象数量异常`)
    if (item.horizontalOverflow) issues.push(`${item.mode}: 存在横向溢出`)
    if (item.engineeringCopy) issues.push(`${item.mode}: 存在公开工程验收文案`)
    if (item.inspectorOverlapsMobileNav) issues.push(`${item.mode}: inspector 与移动导航重叠`)
    if (item.mode === 'atlas-image-fallback' && (!item.imageFailed || !item.staticFallbackVisible)) issues.push(`${item.mode}: 图片失败后静态列表未接管`)
    if (item.errors.length && item.mode !== 'atlas-image-fallback') issues.push(`${item.mode}: ${item.errors.join('; ')}`)
    return issues
  })
  for (const [check, passed] of Object.entries(journeyChecks)) if (!passed) failures.push(`journey: ${check} 未通过`)
  fs.writeFileSync(path.join(outputDir, 'browser-observations.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, observations, journeyChecks, recordingFrames: frameIndex, failures }, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`Atlas evidence captured. modes=${observations.length} frames=${frameIndex} failures=0`)
} finally {
  await launch.close()
}
