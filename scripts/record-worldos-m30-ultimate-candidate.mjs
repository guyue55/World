import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const port = Number(process.env.WORLDOS_M30_RECORD_PORT ?? 4334)
const chromeDebugPort = Number(process.env.WORLDOS_M30_RECORD_CHROME_PORT ?? 9444)
const baseUrl = `http://127.0.0.1:${port}`
const nextBin = rel('node_modules/.bin/next')
const recordDir = rel('docs/90-archive/reports/worldos-m30-recordings')
const reportPath = rel('docs/90-archive/reports/worldos-m30-recording-report.json')
const nextLog = rel('reports/worldos-m30-record-next-start.log')
const chromeLog = rel('reports/worldos-m30-record-chrome.log')
const failures = []
const recordings = []
let server
let chrome
let nextLogFd
let chromeLogFd

const flows = [
  { id: 'first-visit', label: '首访入口到星图', start: '/', selector: 'a[href="/atlas"]', expectedPath: '/atlas', viewport: 'desktop' },
  { id: 'scene-migration', label: '时间河迁移到档案馆', start: '/timeline', selector: 'a[href="/archive"]', expectedPath: '/archive', viewport: 'desktop' },
  { id: 'path-to-node', label: '路径抵达节点', start: '/paths/first-visit', selector: 'a[href="/node/world-manifesto"]', expectedPath: '/node/world-manifesto', viewport: 'desktop' },
  { id: 'node-reading', label: '节点阅读与出口', start: '/node/world-manifesto', selector: 'a[href="/paths"]', expectedPath: '/paths', viewport: 'desktop' },
  { id: 'lighthouse-guidance', label: '灯塔导览控制台', start: '/ask', selector: 'a[href="/paths"]', expectedPath: '/paths', viewport: 'mobile-reduced-motion' },
]

const viewports = {
  desktop: { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, reducedMotion: false },
  'mobile-reduced-motion': { width: 390, height: 844, deviceScaleFactor: 2, mobile: true, reducedMotion: true },
}

function fail(message) {
  failures.push(message)
}

function findChrome() {
  return [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ].filter(Boolean).find((candidate) => fs.existsSync(candidate)) ?? ''
}

function newestMtimeMs(target) {
  if (!fs.existsSync(target)) return 0
  const stat = fs.statSync(target)
  if (stat.isFile()) return stat.mtimeMs
  if (!stat.isDirectory()) return 0
  let newest = stat.mtimeMs
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    newest = Math.max(newest, newestMtimeMs(path.join(target, entry.name)))
  }
  return newest
}

function ensureArtifacts() {
  for (const file of ['.next/BUILD_ID', '.next/build-manifest.json', '.next/server/app-paths-manifest.json', '.next/routes-manifest.json']) {
    if (!fs.existsSync(rel(file))) fail(`缺少生产构建产物：${file}`)
  }
  if (!fs.existsSync(nextBin)) fail('缺少 node_modules/.bin/next')
  if (failures.length) return
  const buildMtime = fs.statSync(rel('.next/BUILD_ID')).mtimeMs
  const sourceMtime = Math.max(newestMtimeMs(rel('src')), newestMtimeMs(rel('data')), newestMtimeMs(rel('package.json')))
  if (sourceMtime > buildMtime + 1000) fail('生产构建产物早于源码或数据变更，请先运行 npm run build:production-ci')
}

function startServer() {
  fs.mkdirSync(path.dirname(nextLog), { recursive: true })
  nextLogFd = fs.openSync(nextLog, 'w')
  server = spawn(nextBin, ['start', '-H', '127.0.0.1', '-p', String(port)], {
    cwd: root,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', PORT: String(port) },
    stdio: ['ignore', nextLogFd, nextLogFd],
  })
}

async function waitForServer() {
  const deadline = Date.now() + 30000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: 'manual' })
      if (response.status === 200) return
    } catch {
      await delay(300)
    }
  }
  fail(`Next production server 未就绪：${path.relative(root, nextLog)}`)
}

function startChrome() {
  const chromePath = findChrome()
  if (!chromePath) {
    fail('未找到系统 Chrome，请设置 CHROME_PATH')
    return
  }
  fs.mkdirSync(path.dirname(chromeLog), { recursive: true })
  chromeLogFd = fs.openSync(chromeLog, 'w')
  const profileDir = path.join(os.tmpdir(), `worldos-m30-record-chrome-${Date.now()}`)
  chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-component-update',
    '--no-first-run',
    `--user-data-dir=${profileDir}`,
    '--remote-debugging-address=127.0.0.1',
    `--remote-debugging-port=${chromeDebugPort}`,
    'about:blank',
  ], {
    cwd: root,
    stdio: ['ignore', chromeLogFd, chromeLogFd],
  })
}

async function waitForChrome() {
  const deadline = Date.now() + 15000
  while (Date.now() < deadline) {
    try {
      const version = await fetch(`http://127.0.0.1:${chromeDebugPort}/json/version`).then((response) => response.json())
      if (version.webSocketDebuggerUrl) return version.webSocketDebuggerUrl
    } catch {
      await delay(250)
    }
  }
  throw new Error(`Chrome DevTools 在 15000ms 内没有就绪：${path.relative(root, chromeLog)}`)
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl)
  const pending = new Map()
  let nextId = 1

  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', () => reject(new Error('Chrome DevTools WebSocket 连接失败')), { once: true })
  })

  ws.addEventListener('message', (message) => {
    const data = JSON.parse(message.data)
    if (data.id && pending.has(data.id)) {
      const pair = pending.get(data.id)
      pending.delete(data.id)
      if (data.error) pair.reject(new Error(JSON.stringify(data.error)))
      else pair.resolve(data.result ?? {})
    }
  })

  function send(method, params = {}, sessionId) {
    const id = nextId++
    ws.send(JSON.stringify({ id, method, params, sessionId }))
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
  }

  return { send, close: () => ws.close() }
}

async function createSession(browser) {
  const target = await browser.send('Target.createTarget', { url: 'about:blank' })
  const attach = await browser.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })
  return attach.sessionId
}

async function waitForLoad(send) {
  await delay(700)
  const result = await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      const deadline = Date.now() + 10000
      while (Date.now() < deadline) {
        if (document.body && document.body.innerText.length > 500 && document.querySelector('h1')) return true
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      return false
    })()`,
  })
  return result.result?.value === true
}

async function currentState(send) {
  const result = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => ({
      path: location.pathname,
      h1: document.querySelector('h1')?.innerText?.trim() || '',
      textLength: document.body?.innerText?.length || 0,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      reducedMotion: document.querySelector('[data-testid="scene-transition-shell"]')?.getAttribute('data-reduced-motion') || ''
    }))()`,
  })
  return result.result?.value ?? {}
}

async function capture(send, flowDir, index, label) {
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  const file = path.join(flowDir, `${String(index).padStart(3, '0')}-${label}.png`)
  fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'))
  return path.relative(root, file)
}

async function click(send, selector) {
  const result = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const element = document.querySelector(${JSON.stringify(selector)})
      if (!element) return { clicked: false, reason: 'missing selector' }
      element.scrollIntoView({ block: 'center', inline: 'center' })
      const rect = element.getBoundingClientRect()
      element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }))
      element.click()
      return { clicked: true, text: (element.innerText || element.textContent || '').trim(), href: element.getAttribute('href') }
    })()`,
  })
  return result.result?.value ?? { clicked: false, reason: 'no result' }
}

async function scroll(send, y) {
  await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })` })
  await delay(350)
}

async function compileVideo(flowDir, id) {
  const out = path.join(recordDir, `${id}.webm`)
  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-framerate', '1',
      '-pattern_type', 'glob',
      '-i', path.join(flowDir, '*.png'),
      '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
      '-c:v', 'libvpx-vp9',
      '-pix_fmt', 'yuv420p',
      out,
    ], { cwd: root, stdio: 'ignore' })
    ffmpeg.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg failed for ${id}: ${code}`))))
    ffmpeg.on('error', reject)
  })
  return { path: path.relative(root, out), bytes: fs.statSync(out).size }
}

async function runFlow(browser, flow) {
  const sessionId = await createSession(browser)
  const send = (method, params = {}) => browser.send(method, params, sessionId)
  const viewport = viewports[flow.viewport]
  const flowDir = path.join(recordDir, flow.id)
  fs.rmSync(flowDir, { recursive: true, force: true })
  fs.mkdirSync(flowDir, { recursive: true })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: viewport.mobile,
  })
  await send('Emulation.setEmulatedMedia', {
    features: viewport.reducedMotion ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [],
  })
  await send('Page.navigate', { url: `${baseUrl}${flow.start}` })
  const loaded = await waitForLoad(send)
  const framePaths = []
  framePaths.push(await capture(send, flowDir, 1, 'arrival'))
  await scroll(send, 360)
  framePaths.push(await capture(send, flowDir, 2, 'scan'))
  await scroll(send, 0)
  const before = await currentState(send)
  const clickResult = await click(send, flow.selector)
  await delay(viewport.reducedMotion ? 260 : 720)
  framePaths.push(await capture(send, flowDir, 3, 'after-action'))
  await scroll(send, 520)
  framePaths.push(await capture(send, flowDir, 4, 'after-scroll'))
  const after = await currentState(send)
  framePaths.push(await capture(send, flowDir, 5, 'settled'))
  const video = await compileVideo(flowDir, flow.id)

  if (!loaded) fail(`${flow.id} 页面未在时限内完成可读加载`)
  if (!clickResult.clicked) fail(`${flow.id} 点击失败：${clickResult.reason}`)
  if (flow.expectedPath && after.path !== flow.expectedPath) fail(`${flow.id} 未抵达预期路径：${after.path} != ${flow.expectedPath}`)
  if (after.overflowX) fail(`${flow.id} 抵达后存在横向溢出`)
  if (video.bytes <= 1000) fail(`${flow.id} 录屏文件过小：${video.bytes}`)

  recordings.push({
    id: flow.id,
    label: flow.label,
    viewport: flow.viewport,
    start: flow.start,
    expectedPath: flow.expectedPath,
    before,
    after,
    click: clickResult,
    frames: framePaths,
    video,
  })
}

async function stopProcess(child) {
  if (!child || child.killed) return
  try { child.kill('SIGTERM') } catch { /* ignore shutdown race */ }
  await delay(500)
  if (!child.killed) {
    try { child.kill('SIGKILL') } catch { /* ignore shutdown race */ }
  }
}

async function stopAll() {
  await stopProcess(server)
  await stopProcess(chrome)
  for (const fd of [nextLogFd, chromeLogFd]) {
    if (fd) {
      try { fs.closeSync(fd) } catch { /* ignore already closed */ }
    }
  }
}

async function main() {
  ensureArtifacts()
  if (!failures.length) {
    startServer()
    await waitForServer()
  }
  if (!failures.length) {
    startChrome()
    const browser = await connectCdp(await waitForChrome())
    fs.rmSync(recordDir, { recursive: true, force: true })
    fs.mkdirSync(recordDir, { recursive: true })
    for (const flow of flows) {
      console.log(`[WorldOS M30 record] ${flow.id}: ${flow.start}`)
      await runFlow(browser, flow)
    }
    browser.close()
  }
  await stopAll()

  const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    baseUrl,
    recordDir: path.relative(root, recordDir),
    nextLogPath: path.relative(root, nextLog),
    chromeLogPath: path.relative(root, chromeLog),
    requiredFlows: flows.map((flow) => flow.id),
    recordings,
    failures,
  }
  fs.mkdirSync(path.dirname(reportPath), { recursive: true })
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`WorldOS M30 recording report written: ${path.relative(root, reportPath)}`)

  if (failures.length) {
    console.error('WorldOS M30 recording failed:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }
  console.log(`WorldOS M30 recordings passed: ${recordings.length} videos`)
}

main().catch(async (error) => {
  await stopAll()
  console.error(error)
  process.exit(1)
})
