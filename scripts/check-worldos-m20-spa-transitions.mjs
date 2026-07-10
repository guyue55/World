// 用途：真实点击验证 M20 空间迁移连续性，并输出关键帧证据
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const port = Number(process.env.WORLDOS_M20_SPA_PORT ?? 4333)
const chromeDebugPort = Number(process.env.WORLDOS_M20_SPA_CHROME_PORT ?? 9443)
const baseUrl = `http://127.0.0.1:${port}`
const nextBin = rel('node_modules/.bin/next')
const reportPath = rel('docs/90-archive/reports/worldos-m20-spa-transition-report.json')
const frameDir = rel('docs/90-archive/reports/worldos-m20-spa-transitions')
const nextLog = rel('reports/worldos-m20-spa-next-start.log')
const chromeLog = rel('reports/worldos-m20-spa-chrome.log')
const failures = []
const transitions = []
let server
let chrome
let nextLogFd
let chromeLogFd

const expectedSteps = ['source', 'leaving', 'preview', 'arriving', 'settled']
const routes = [
  { id: 'home-to-atlas', start: '/', target: '/atlas', from: 'gateway', to: 'atlas', selector: 'a[href="/atlas"]', viewport: 'desktop' },
  { id: 'atlas-to-node', start: '/atlas', targetPrefix: '/node/', from: 'atlas', to: 'node', selector: 'a[href^="/node/"]', viewport: 'desktop' },
  { id: 'timeline-to-archive', start: '/timeline', target: '/archive', from: 'timeline', to: 'archive', selector: 'a[href="/archive"]', viewport: 'desktop' },
  { id: 'path-detail-to-node', start: '/paths/first-visit', target: '/node/world-manifesto', from: 'path-detail', to: 'node', selector: 'a[href="/node/world-manifesto"]', viewport: 'desktop' },
  { id: 'mobile-reduced-home-to-atlas', start: '/', target: '/atlas', from: 'gateway', to: 'atlas', selector: 'a[href="/atlas"]', viewport: 'mobile-reduced-motion' },
]
const routeFilter = process.env.WORLDOS_M20_SPA_ONLY
const selectedRoutes = routeFilter ? routes.filter((item) => item.id === routeFilter) : routes

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

function ensureArtifacts() {
  const required = [
    '.next/BUILD_ID',
    '.next/build-manifest.json',
    '.next/server/app-paths-manifest.json',
    '.next/routes-manifest.json',
    '.next/required-server-files.json',
  ]
  for (const file of required) {
    if (!fs.existsSync(rel(file))) fail(`缺少生产构建产物：${file}，请先运行 npm run build:production-ci`)
  }
  if (!fs.existsSync(nextBin)) fail('缺少 node_modules/.bin/next，请先安装依赖')
  if (!failures.length) ensureFreshBuildArtifact()
}

function newestMtimeMs(target) {
  if (!fs.existsSync(target)) return 0
  const stat = fs.statSync(target)
  if (stat.isFile()) return stat.mtimeMs
  if (!stat.isDirectory()) return 0
  let newest = stat.mtimeMs
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const next = path.join(target, entry.name)
    newest = Math.max(newest, newestMtimeMs(next))
  }
  return newest
}

function ensureFreshBuildArtifact() {
  const buildId = rel('.next/BUILD_ID')
  const buildMtime = fs.statSync(buildId).mtimeMs
  const sourceMtime = Math.max(
    newestMtimeMs(rel('src')),
    newestMtimeMs(rel('data')),
    newestMtimeMs(rel('public')),
    newestMtimeMs(rel('package.json')),
    newestMtimeMs(rel('next.config.ts')),
    newestMtimeMs(rel('tsconfig.json')),
  )
  if (sourceMtime > buildMtime + 1000) {
    fail('生产构建产物早于源码或数据变更，请先运行 npm run build:production-ci，避免旧 Atlas / 旧场景误导 M20 SPA 证据')
  }
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
  const profileDir = path.join(os.tmpdir(), `worldos-m20-spa-chrome-${Date.now()}`)
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
  const events = []
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
      return
    }
    if (data.method) events.push(data)
  })

  function send(method, params = {}, sessionId) {
    const id = nextId++
    ws.send(JSON.stringify({ id, method, params, sessionId }))
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
  }

  async function waitEvent(method, sessionId, timeoutMs = 20000) {
    const startedAt = Date.now()
    let seen = 0
    while (Date.now() - startedAt < timeoutMs) {
      for (let index = seen; index < events.length; index += 1) {
        const event = events[index]
        if (event.method === method && (!sessionId || event.sessionId === sessionId)) return event
      }
      seen = events.length
      await delay(50)
    }
    throw new Error(`等待 ${method} 超时`)
  }

  return { events, send, waitEvent, close: () => ws.close() }
}

async function createSession(browser) {
  const target = await browser.send('Target.createTarget', { url: 'about:blank' })
  const attach = await browser.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })
  return attach.sessionId
}

async function waitForPath(send, expectedPath, timeoutMs = 12000) {
  const deadline = Date.now() + timeoutMs
  let currentPath = ''
  while (Date.now() < deadline) {
    const result = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: 'location.pathname',
    })
    currentPath = result.result?.value || ''
    if (currentPath === expectedPath) return
    await delay(80)
  }
  throw new Error(`等待路由 ${expectedPath} 超时，当前路由：${currentPath || 'unknown'}`)
}

async function waitForRoute(send, item, timeoutMs = 12000) {
  const deadline = Date.now() + timeoutMs
  let currentPath = ''
  while (Date.now() < deadline) {
    const result = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: 'location.pathname',
    })
    currentPath = result.result?.value || ''
    if (item.target && currentPath === item.target) return
    if (item.targetPrefix && currentPath.startsWith(item.targetPrefix)) return
    await delay(80)
  }
  const expected = item.target ?? `${item.targetPrefix}*`
  throw new Error(`等待路由 ${expected} 超时，当前路由：${currentPath || 'unknown'}`)
}

async function goBackTo(send, expectedPath) {
  await send('Runtime.evaluate', { expression: 'history.back()' })
  await waitForPath(send, expectedPath)
}

async function waitForHydration(send, selector) {
  const expression = `(async () => {
    const selector = ${JSON.stringify(selector)}
    const deadline = Date.now() + 10000
    while (Date.now() < deadline) {
      const anchor = document.querySelector(selector)
      const shell = document.querySelector('[data-testid="scene-transition-shell"]')
      if (anchor && shell && document.body.innerText.length > 500) return true
      await new Promise((resolve) => setTimeout(resolve, 80))
    }
    return false
  })()`
  const result = await send('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression })
  return result.result?.value === true
}

async function captureFrame(send, id, stage) {
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  const file = path.join(frameDir, `${id}-${stage}.png`)
  fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'))
  return path.relative(root, file)
}

async function readState(send) {
  const expression = `(() => {
    const shell = document.querySelector('[data-testid="scene-transition-shell"]')
    const cue = document.querySelector('[data-testid="scene-migration-cue"]')
    const steps = Array.from(document.querySelectorAll('[data-scene-migration-step]'))
      .map((element) => element.getAttribute('data-scene-migration-step'))
      .filter(Boolean)
    const text = document.body?.innerText || ''
    return {
      path: location.pathname,
      title: document.title,
      h1: document.querySelector('h1')?.innerText?.trim() || '',
      textLength: text.length,
      shellPresent: Boolean(shell),
      cuePresent: Boolean(cue),
      from: shell?.getAttribute('data-scene-from') || cue?.getAttribute('data-scene-migration-from') || '',
      to: shell?.getAttribute('data-scene-to') || cue?.getAttribute('data-scene-migration-to') || '',
      transitionState: shell?.getAttribute('data-transition-state') || cue?.getAttribute('data-scene-migration-state') || '',
      motionMode: shell?.getAttribute('data-motion-mode') || '',
      reducedMotion: shell?.getAttribute('data-reduced-motion') || '',
      sourceGhost: cue?.getAttribute('data-scene-source-ghost') || '',
      targetPreview: cue?.getAttribute('data-scene-target-preview') || '',
      stepCount: steps.length,
      steps,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      runtimeErrors: window.__WORLDOS_M20_RUNTIME_ERRORS__ || [],
    }
  })()`
  const result = await send('Runtime.evaluate', { returnByValue: true, expression })
  return result.result?.value ?? {}
}

async function clickAnchor(send, selector) {
  const expression = `(() => {
    const anchor = document.querySelector(${JSON.stringify(selector)})
    if (!anchor) return { clicked: false, reason: 'missing anchor' }
    anchor.scrollIntoView({ block: 'center', inline: 'center' })
    const rect = anchor.getBoundingClientRect()
    anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }))
    anchor.click()
    return { clicked: true, text: (anchor.innerText || anchor.textContent || '').trim(), href: anchor.getAttribute('href') }
  })()`
  const result = await send('Runtime.evaluate', { returnByValue: true, expression })
  return result.result?.value ?? { clicked: false, reason: 'no result' }
}

function validateTransition(item, transition) {
  if (transition.click.clicked !== true) fail(`${item.id} 未完成真实链接点击：${transition.click.reason || 'unknown'}`)
  if (item.target && transition.after.path !== item.target) fail(`${item.id} 路由未抵达目标：${transition.after.path || 'missing'} != ${item.target}`)
  if (item.targetPrefix && !transition.after.path?.startsWith(item.targetPrefix)) fail(`${item.id} 路由未抵达目标前缀：${transition.after.path || 'missing'} != ${item.targetPrefix}*`)
  if (transition.after.from !== item.from) fail(`${item.id} 来源场景错误：${transition.after.from || 'missing'} != ${item.from}`)
  if (transition.after.to !== item.to) fail(`${item.id} 目标场景错误：${transition.after.to || 'missing'} != ${item.to}`)
  if (!transition.after.cuePresent) fail(`${item.id} 缺少 scene-migration-cue`)
  if (!transition.after.sourceGhost) fail(`${item.id} 缺少来源残影文案`)
  if (!transition.after.targetPreview) fail(`${item.id} 缺少目标预告文案`)
  if ((transition.after.stepCount ?? 0) < expectedSteps.length) fail(`${item.id} 迁移步骤不足：${transition.after.stepCount ?? 0}`)
  for (const step of expectedSteps) {
    if (!(transition.after.steps ?? []).includes(step)) fail(`${item.id} 缺少迁移阶段：${step}`)
  }
  if (transition.after.textLength < 500) fail(`${item.id} 抵达后正文长度异常：${transition.after.textLength}`)
  if (transition.after.overflowX) fail(`${item.id} 抵达后出现横向溢出`)
  if ((transition.exceptions ?? []).length > 0) fail(`${item.id} 出现运行时异常：${transition.exceptions.join(' | ')}`)
  if (transition.framePaths.length < 4) fail(`${item.id} 关键帧证据不足：${transition.framePaths.length}`)
  if (transition.back.path !== item.start) fail(`${item.id} 回退未返回来源路径：${transition.back.path || 'missing'} != ${item.start}`)
  if (transition.back.from !== item.to) fail(`${item.id} 回退来源场景错误：${transition.back.from || 'missing'} != ${item.to}`)
  if (transition.back.to !== item.from) fail(`${item.id} 回退目标场景错误：${transition.back.to || 'missing'} != ${item.from}`)
  if (!transition.back.sourceGhost || !transition.back.targetPreview) fail(`${item.id} 回退缺少来源残影或目标预告`)
  if (item.viewport === 'mobile-reduced-motion' && transition.after.reducedMotion !== 'true') {
    fail(`${item.id} reduced-motion 证据异常：${transition.after.reducedMotion || 'missing'}`)
  }
}

async function runBrowserEvidence() {
  startChrome()
  if (failures.length) return
  const browser = await connectCdp(await waitForChrome())
  const sessionId = await createSession(browser)
  const send = (method, params = {}) => browser.send(method, params, sessionId)

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Log.enable')
  await send('Network.enable')
  fs.rmSync(frameDir, { recursive: true, force: true })
  fs.mkdirSync(frameDir, { recursive: true })

  for (const item of selectedRoutes) {
    console.log(`[WorldOS M20 SPA] start ${item.id}: ${item.start} -> ${item.target ?? `${item.targetPrefix}*`}`)
    const viewport = viewports[item.viewport]
    browser.events.length = 0
    await send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
    })
    await send('Emulation.setEmulatedMedia', {
      features: viewport.reducedMotion ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [],
    })
    await send('Page.navigate', { url: `${baseUrl}${item.start}` })
    await browser.waitEvent('Page.loadEventFired', sessionId)
    await send('Runtime.evaluate', {
      expression: `window.__WORLDOS_M20_RUNTIME_ERRORS__ = []; window.addEventListener('error', (event) => window.__WORLDOS_M20_RUNTIME_ERRORS__.push(event.message)); window.addEventListener('unhandledrejection', (event) => window.__WORLDOS_M20_RUNTIME_ERRORS__.push(String(event.reason)));`,
    })

    const hydrated = await waitForHydration(send, item.selector)
    const before = await readState(send)
    const framePaths = [await captureFrame(send, item.id, 'before')]
    const click = hydrated ? await clickAnchor(send, item.selector) : { clicked: false, reason: 'not hydrated or missing selector' }
    await delay(80)
    framePaths.push(await captureFrame(send, item.id, 'during-080ms'))
    try {
      await waitForRoute(send, item)
    } catch (error) {
      throw new Error(`${item.id} ${error instanceof Error ? error.message : String(error)}，click=${JSON.stringify(click)}`)
    }
    await delay(viewport.reducedMotion ? 180 : 520)
    framePaths.push(await captureFrame(send, item.id, 'arrived'))
    await delay(420)
    framePaths.push(await captureFrame(send, item.id, 'settled'))
    const after = await readState(send)
    await goBackTo(send, item.start)
    await delay(viewport.reducedMotion ? 180 : 520)
    framePaths.push(await captureFrame(send, item.id, 'back'))
    const back = await readState(send)
    const exceptions = browser.events
      .filter((event) => event.sessionId === sessionId && event.method === 'Runtime.exceptionThrown')
      .map((event) => event.params?.exceptionDetails?.exception?.description || event.params?.exceptionDetails?.text || 'Runtime.exceptionThrown')

    const transition = { ...item, hydrated, before, click, after, back, framePaths, exceptions }
    transitions.push(transition)
    validateTransition(item, transition)
  }

  browser.close()
}

async function stopProcess(child) {
  if (!child || child.killed) return
  try { child.kill('SIGTERM') } catch { /* ignore process shutdown race */ }
  await delay(500)
  if (!child.killed) {
    try { child.kill('SIGKILL') } catch { /* ignore process shutdown race */ }
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
  if (!failures.length) await runBrowserEvidence()
  await stopAll()

  const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    baseUrl,
    port,
    chromeDebugPort,
    purpose: 'M20 真实 SPA 点击迁移证据：来源残影、目标预告、抵达状态、关键帧截图、reduced-motion 降级。',
    nextLogPath: path.relative(root, nextLog),
    chromeLogPath: path.relative(root, chromeLog),
    frameDir: path.relative(root, frameDir),
    expectedSteps,
    transitions,
    failures,
  }
  fs.mkdirSync(path.dirname(reportPath), { recursive: true })
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`WorldOS M20 SPA transition report written: ${path.relative(root, reportPath)}`)

  if (failures.length) {
    console.error('WorldOS M20 SPA transition check failed:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }
  console.log(`WorldOS M20 SPA transition check passed: ${transitions.length} transitions, ${transitions.reduce((sum, item) => sum + item.framePaths.length, 0)} frames`)
}

main().catch(async (error) => {
  await stopAll()
  console.error(error)
  process.exit(1)
})
