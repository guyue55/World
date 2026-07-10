// 用途：运行worldos local lan rc
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { clearTimeout, setTimeout } from 'node:timers'
import { setTimeout as delay } from 'node:timers/promises'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const registry = readJson('data/world-kernel/worldos-local-lan-rc-v1.json')

const port = Number(process.env.WORLDOS_LOCAL_LAN_RC_PORT ?? registry.server?.defaultPort ?? 4320)
const bindHost = process.env.WORLDOS_LOCAL_LAN_BIND_HOST ?? registry.server?.bindHost ?? '0.0.0.0'
const lanIp = process.env.WORLDOS_LOCAL_LAN_IP ?? detectLanIp()
const baseUrl = `http://${lanIp}:${port}`
const requestTimeoutMs = Number(process.env.WORLDOS_LOCAL_LAN_REQUEST_TIMEOUT_MS ?? registry.server?.requestTimeoutMs ?? 10000)
const startupTimeoutMs = Number(process.env.WORLDOS_LOCAL_LAN_STARTUP_TIMEOUT_MS ?? registry.server?.startupTimeoutMs ?? 30000)
const chromeDebugPort = Number(process.env.WORLDOS_LOCAL_LAN_CHROME_PORT ?? registry.browser?.chromeDebugPort ?? 9334)
const chromeStartupTimeoutMs = Number(process.env.WORLDOS_LOCAL_LAN_CHROME_STARTUP_TIMEOUT_MS ?? registry.browser?.startupTimeoutMs ?? 15000)
const navigationTimeoutMs = Number(process.env.WORLDOS_LOCAL_LAN_NAVIGATION_TIMEOUT_MS ?? registry.browser?.navigationTimeoutMs ?? 20000)
const nextBin = rel('node_modules/.bin/next')
const evidenceOutput = rel(registry.evidenceOutput ?? 'docs/90-archive/reports/worldos-local-lan-rc-report.json')
const logOutput = rel(registry.logOutput ?? 'reports/worldos-local-lan-rc-next-start.log')
const chromeLogOutput = rel(registry.chromeLogOutput ?? 'reports/worldos-local-lan-rc-chrome.log')
const screenshotDir = rel(registry.browser?.screenshotDir ?? 'docs/90-archive/reports/worldos-local-lan-rc')

const checks = []
const browserChecks = []
const failures = []
let server
let chrome
let logStream
let chromeLogStream

function detectLanIp() {
  const candidates = []
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family === 'IPv4' && !entry.internal && entry.address) candidates.push(entry.address)
    }
  }
  return candidates[0] ?? ''
}

function fail(message) {
  failures.push(message)
}

function hasArtifacts() {
  const required = [
    '.next/BUILD_ID',
    '.next/build-manifest.json',
    '.next/server/app-paths-manifest.json',
    '.next/routes-manifest.json',
    '.next/required-server-files.json',
  ]
  const missing = required.filter((file) => !fs.existsSync(rel(file)))
  if (missing.length) fail(`缺少构建产物：${missing.join(', ')}`)
}

function validateRegistryPolicies() {
  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (registry.releaseStates?.[key] !== false) fail(`${key} 必须保持 false，本地局域网 RC 不能伪装真实生产上线`)
  }
  if (registry.policies?.frontendVisibilityIsNotPermission !== true) {
    fail('frontendVisibilityIsNotPermission 必须为 true，前端显隐不能作为权限事实源')
  }
  if (registry.policies?.lanRcDoesNotReplaceExternalSmoke !== true) {
    fail('lanRcDoesNotReplaceExternalSmoke 必须为 true，本地局域网 RC 不能替代外部 smoke')
  }
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ].filter(Boolean)

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? ''
}

function locationMatches(actual, expectedPath) {
  if (!actual || !expectedPath) return false
  if (actual === expectedPath) return true
  try {
    return new URL(actual, baseUrl).pathname === expectedPath
  } catch {
    return false
  }
}

function sanitizeRoute(route) {
  return route === '/' ? 'home' : route.replace(/^\/+/, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function request(route, options = {}) {
  const controller = new globalThis.AbortController()
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs)
  const startedAt = Date.now()
  try {
    const response = await fetch(`${baseUrl}${route}`, {
      redirect: options.redirect ?? 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'WorldOSLocalLanRc/1.0' },
    })
    const text = await response.text().catch(() => '')
    return {
      route,
      url: `${baseUrl}${route}`,
      status: response.status,
      contentType: response.headers.get('content-type') ?? '',
      location: response.headers.get('location') ?? '',
      bodyPreview: text.slice(0, 240),
      durationMs: Date.now() - startedAt,
      ok: true,
    }
  } catch (error) {
    return {
      route,
      url: `${baseUrl}${route}`,
      status: 'network-error',
      error: error.name === 'AbortError' ? `request timeout after ${requestTimeoutMs}ms` : error.message,
      durationMs: Date.now() - startedAt,
      ok: false,
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function waitForReady() {
  const deadline = Date.now() + startupTimeoutMs
  const readinessPath = registry.server?.readinessPath ?? '/'
  while (Date.now() < deadline) {
    const result = await request(readinessPath)
    if (result.status === 200) return true
    await delay(500)
  }
  return false
}

function startServer() {
  if (!lanIp) fail('未检测到可用于局域网访问的非回环 IPv4，请设置 WORLDOS_LOCAL_LAN_IP')
  if (!fs.existsSync(nextBin)) fail('缺少 node_modules/.bin/next，请先执行 npm ci')
  if (failures.length) return

  fs.mkdirSync(path.dirname(logOutput), { recursive: true })
  logStream = fs.openSync(logOutput, 'w')
  server = spawn(nextBin, ['start', '-H', bindHost, '-p', String(port)], {
    cwd: root,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', PORT: String(port) },
    stdio: ['ignore', logStream, logStream],
  })
}

async function stopProcess(child) {
  if (child && !child.killed) {
    try { child.kill('SIGTERM') } catch { /* ignore process shutdown race */ }
    await delay(500)
    if (!child.killed) {
      try { child.kill('SIGKILL') } catch { /* ignore process shutdown race */ }
    }
  }
}

async function stopAll() {
  await stopProcess(server)
  await stopProcess(chrome)
  for (const stream of [logStream, chromeLogStream]) {
    if (stream) {
      try { fs.closeSync(stream) } catch { /* ignore already-closed stream */ }
    }
  }
}

function record(kind, result, expected, passed, details = {}) {
  const item = { kind, ...result, expected, passed, ...details }
  checks.push(item)
  if (!passed) {
    fail(`${kind} ${result.route} 失败：expected=${JSON.stringify(expected)} actual=${JSON.stringify({
      status: result.status,
      contentType: result.contentType,
      location: result.location,
      error: result.error,
    })}`)
  }
}

async function runHttpChecks() {
  for (const route of registry.publicHtmlRoutes ?? []) {
    const result = await request(route)
    const passed = result.status === 200
      && String(result.contentType).includes('text/html')
      && result.bodyPreview.includes('<!DOCTYPE html>')
    record('public-html', result, { status: 200, contentType: 'text/html' }, passed)
  }

  for (const item of registry.staticAssetRoutes ?? []) {
    const result = await request(item.route)
    const type = String(result.contentType)
    const passed = result.status === 200
      && (type.includes(item.contentTypeIncludes) || (item.contentTypeIncludes === 'xml' && (type.includes('xml') || result.bodyPreview.includes('<urlset'))))
    record('static-asset', result, { status: 200, contentTypeIncludes: item.contentTypeIncludes }, passed)
  }

  for (const item of registry.legacyRedirectRoutes ?? []) {
    const result = await request(item.route)
    const passed = result.status === item.status && locationMatches(result.location, item.location)
    record('legacy-redirect', result, { status: item.status, location: item.location }, passed)
  }

  for (const item of registry.guardedRoutes ?? []) {
    const result = await request(item.route)
    const passed = result.status === item.status && locationMatches(result.location, item.location)
    record('guarded-route', result, { status: item.status, location: item.location }, passed, { reason: item.reason })
  }

  for (const item of registry.negativeRoutes ?? []) {
    const result = await request(item.route)
    const passed = result.status === item.status
    record('negative-route', result, { status: item.status }, passed)
  }
}

async function waitForChrome() {
  const deadline = Date.now() + chromeStartupTimeoutMs
  while (Date.now() < deadline) {
    try {
      const version = await fetch(`http://127.0.0.1:${chromeDebugPort}/json/version`).then((response) => response.json())
      if (version.webSocketDebuggerUrl) return version.webSocketDebuggerUrl
    } catch {
      await delay(300)
    }
  }
  throw new Error(`Chrome DevTools 在 ${chromeStartupTimeoutMs}ms 内没有就绪`)
}

function startChrome() {
  const chromePath = findChrome()
  if (!chromePath) {
    fail('未找到系统 Chrome，请设置 CHROME_PATH')
    return
  }

  fs.mkdirSync(path.dirname(chromeLogOutput), { recursive: true })
  chromeLogStream = fs.openSync(chromeLogOutput, 'w')
  const profileDir = path.join(os.tmpdir(), `worldos-local-lan-rc-chrome-${Date.now()}`)
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
    stdio: ['ignore', chromeLogStream, chromeLogStream],
  })
}

async function createCdpSession() {
  const browserWs = await waitForChrome()
  const browser = await connectCdp(browserWs)
  const target = await browser.send('Target.createTarget', { url: 'about:blank' })
  const attach = await browser.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })
  return { browser, sessionId: attach.sessionId }
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

  async function waitEvent(method, timeoutMs = navigationTimeoutMs) {
    const startedAt = Date.now()
    let seen = 0
    while (Date.now() - startedAt < timeoutMs) {
      for (let index = seen; index < events.length; index += 1) {
        if (events[index].method === method) return events[index]
      }
      seen = events.length
      await delay(50)
    }
    throw new Error(`等待 ${method} 超时`)
  }

  return {
    events,
    send,
    waitEvent,
    close: () => ws.close(),
  }
}

async function runBrowserChecks() {
  startChrome()
  if (failures.length) return

  const { browser, sessionId } = await createCdpSession()
  const send = (method, params = {}) => browser.send(method, params, sessionId)

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Log.enable')
  await send('Network.enable')
  fs.mkdirSync(screenshotDir, { recursive: true })

  for (const viewport of registry.browser?.viewports ?? []) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
    })
    await send('Emulation.setEmulatedMedia', {
      features: viewport.reducedMotion ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [],
    })

    for (const route of registry.browserRoutes ?? []) {
      browser.events.length = 0
      await send('Page.navigate', { url: `${baseUrl}${route}` })
      await browser.waitEvent('Page.loadEventFired')
      await delay(1000)

      const requestUrls = new Map()
      for (const event of browser.events) {
        if (event.sessionId !== sessionId) continue
        if (event.method === 'Network.requestWillBeSent') requestUrls.set(event.params.requestId, event.params.request.url)
      }

      const dom = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const bodyStyle = getComputedStyle(document.body)
          const text = document.body?.innerText || ''
          const isVisible = (element) => {
            const style = getComputedStyle(element)
            const rect = element.getBoundingClientRect()
            return style.display !== 'none'
              && style.visibility !== 'hidden'
              && style.opacity !== '0'
              && rect.width > 4
              && rect.height > 4
              && rect.bottom > 0
              && rect.right > 0
              && rect.top < window.innerHeight
              && rect.left < window.innerWidth
          }
          const rectPayload = (rect) => ({
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          })
          const labelFor = (element) => {
            const name = element.getAttribute('aria-label')
              || element.getAttribute('data-testid')
              || element.id
              || element.tagName.toLowerCase()
            const text = (element.innerText || element.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 60)
            return text ? \`\${name}: \${text}\` : name
          }
          const testIdVisible = (id) => {
            const element = document.querySelector(\`[data-testid="\${id}"]\`)
            return Boolean(element && isVisible(element))
          }
          const testIdExists = (id) => Boolean(document.querySelector(\`[data-testid="\${id}"]\`))
          const textForTestId = (id) => {
            const element = document.querySelector(\`[data-testid="\${id}"]\`)
            return (element?.innerText || element?.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 160)
          }
          const m19Dock = document.querySelector('[data-m19-scene-interaction-dock]')
          const m19Panel = document.querySelector('[data-m19-scene-interaction]')
          const overlapRatio = (a, b) => {
            const left = Math.max(a.left, b.left)
            const right = Math.min(a.right, b.right)
            const top = Math.max(a.top, b.top)
            const bottom = Math.min(a.bottom, b.bottom)
            if (right <= left || bottom <= top) return 0
            const overlapArea = (right - left) * (bottom - top)
            const contentArea = Math.max(1, b.width * b.height)
            return overlapArea / contentArea
          }
          const overlayCandidates = Array.from(document.body.querySelectorAll('body *'))
            .filter((element) => {
              const style = getComputedStyle(element)
              const zIndex = Number.parseInt(style.zIndex || '0', 10)
              const isBackgroundLayer = element.getAttribute('aria-hidden') === 'true'
                || style.pointerEvents === 'none'
                || (!Number.isNaN(zIndex) && zIndex < 0)
              return ['fixed', 'sticky'].includes(style.position) && !isBackgroundLayer && isVisible(element)
            })
            .map((element) => ({ element, rect: element.getBoundingClientRect(), label: labelFor(element) }))

          const readableCandidates = Array.from(document.body.querySelectorAll('main h1, main h2, main h3, main p, main a, main button, main li, main label, footer p, footer a'))
            .filter((element) => isVisible(element) && (element.innerText || element.textContent || '').replace(/\\s+/g, '').length >= 2)
            .map((element) => ({ element, rect: element.getBoundingClientRect(), label: labelFor(element) }))

          const fixedOverlayIssues = []
          for (const overlay of overlayCandidates) {
            for (const content of readableCandidates) {
              if (overlay.element === content.element || overlay.element.contains(content.element) || content.element.contains(overlay.element)) continue
              const ratio = overlapRatio(overlay.rect, content.rect)
              if (ratio > 0.18) {
                fixedOverlayIssues.push({
                  overlay: overlay.label,
                  content: content.label,
                  overlapRatio: Number(ratio.toFixed(3)),
                  overlayRect: rectPayload(overlay.rect),
                  contentRect: rectPayload(content.rect),
                })
                if (fixedOverlayIssues.length >= 8) break
              }
            }
            if (fixedOverlayIssues.length >= 8) break
          }
          return {
            title: document.title,
            h1: document.querySelector('h1')?.innerText?.trim() || '',
            textLength: text.length,
            textSample: text.replace(/\\s+/g, ' ').slice(0, 320),
            hiddenBody: bodyStyle.display === 'none' || bodyStyle.visibility === 'hidden' || bodyStyle.opacity === '0',
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
            interactiveCount: document.querySelectorAll('a[href],button,input,select,textarea').length,
            primaryCtaVisible: testIdVisible('home-primary-cta'),
            mobileNavigationVisible: testIdVisible('mobile-primary-navigation'),
            coreStatusCardVisible: testIdVisible('dynamic-world-status-card'),
            sceneQa: {
              ambientEnvironmentPresent: testIdExists('ambient-environment-v2'),
              sceneTransitionShellPresent: testIdExists('scene-transition-shell'),
              sceneIdentityBandPresent: testIdExists('scene-identity-band'),
              sceneIdentityBandCompact: document.querySelector('[data-testid="scene-identity-band"]')?.getAttribute('data-compact-scene-band') === 'true',
              sceneWorldPortalPresent: testIdExists('scene-world-portal'),
              sceneWorldPortalVariant: document.querySelector('[data-testid="scene-world-portal"]')?.getAttribute('data-scene-world-portal') || '',
              sceneProductionFramePresent: testIdExists('scene-production-frame') || Boolean(document.querySelector('[data-scene-production]')),
              sceneProductionParts: Array.from(document.querySelectorAll('[data-scene-part]'))
                .map((element) => element.getAttribute('data-scene-part'))
                .filter(Boolean),
              sceneMigrationCuePresent: testIdExists('scene-migration-cue'),
              firstVisitRitualPresent: testIdExists('first-visit-ritual') || testIdExists('first-visit-ritual-collapsed'),
              journeyMemoryEntryPresent: testIdExists('journey-memory-entry'),
              journeyMemoryText: textForTestId('journey-memory-entry'),
              hasReturningVisitorCopy: textForTestId('journey-memory-entry').includes('上次停在'),
              m19SceneInteractionDockPresent: Boolean(m19Dock),
              m19SceneInteractionDockKind: m19Dock?.getAttribute('data-m19-scene-interaction-dock') || '',
              m19SceneInteractionPanelPresent: Boolean(m19Panel),
              m19SceneInteractionPanelKind: m19Panel?.getAttribute('data-m19-scene-interaction') || '',
            },
            fixedOverlayIssues
          }
        })()`,
      })

      const exceptions = browser.events
        .filter((event) => event.sessionId === sessionId && event.method === 'Runtime.exceptionThrown')
        .map((event) => event.params?.exceptionDetails?.exception?.description || event.params?.exceptionDetails?.text || 'Runtime.exceptionThrown')

      const logIssues = browser.events
        .filter((event) => event.sessionId === sessionId && event.method === 'Log.entryAdded')
        .map((event) => event.params.entry)
        .filter((entry) => ['error', 'warning'].includes(entry.level))
        .filter((entry) => !String(entry.url ?? '').endsWith('/favicon.ico'))
        .map((entry) => ({ level: entry.level, source: entry.source, text: entry.text, url: entry.url }))

      const failedNetwork = browser.events
        .filter((event) => event.sessionId === sessionId && event.method === 'Network.loadingFailed' && !event.params.canceled)
        .map((event) => ({ url: requestUrls.get(event.params.requestId), errorText: event.params.errorText, type: event.params.type }))

      const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
      const screenshotPath = path.join(screenshotDir, `${viewport.id}-${sanitizeRoute(route)}.png`)
      fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'))

      const metrics = dom.result.value
      const minText = registry.browserExpectations?.minBodyTextLength ?? 500
      const isHomeRoute = route === '/'
      const visibilityChecks = {
        primaryCta: !registry.browserExpectations?.mustHaveHomePrimaryCta || !isHomeRoute || metrics.primaryCtaVisible,
        mobileNavigation: !registry.browserExpectations?.mustHaveMobileNavigation || !viewport.mobile || metrics.mobileNavigationVisible,
        coreStatusCard: !registry.browserExpectations?.mustHaveHomeCoreStatusCard || !isHomeRoute || metrics.coreStatusCardVisible,
      }
      const passed = metrics.textLength >= minText
        && (!registry.browserExpectations?.mustHaveH1 || Boolean(metrics.h1))
        && (!registry.browserExpectations?.mustNotHideBody || !metrics.hiddenBody)
        && (!registry.browserExpectations?.mobileMustNotOverflowX || !viewport.mobile || !metrics.overflowX)
        && Object.values(visibilityChecks).every(Boolean)
        && metrics.fixedOverlayIssues.length === 0
        && exceptions.length === 0
        && logIssues.length === 0
        && failedNetwork.length === 0

      const item = {
        viewport: viewport.id,
        route,
        url: `${baseUrl}${route}`,
        metrics,
        visibilityChecks,
        exceptions,
        logIssues,
        failedNetwork,
        screenshotPath: path.relative(root, screenshotPath),
        passed,
      }
      browserChecks.push(item)
      if (!passed) {
        fail(`browser ${viewport.id} ${route} 失败：${JSON.stringify({
          textLength: metrics.textLength,
          h1: metrics.h1,
          hiddenBody: metrics.hiddenBody,
          overflowX: metrics.overflowX,
          visibilityChecks,
          fixedOverlayIssues: metrics.fixedOverlayIssues.length,
          exceptions: exceptions.length,
          logIssues: logIssues.length,
          failedNetwork: failedNetwork.length,
        })}`)
      }
    }
  }

  browser.close()
}

async function main() {
  validateRegistryPolicies()
  hasArtifacts()
  startServer()
  if (!failures.length) {
    const ready = await waitForReady()
    if (!ready) fail(`next start 在 ${startupTimeoutMs}ms 内没有通过局域网 IP 就绪，日志：${path.relative(root, logOutput)}`)
    else {
      await runHttpChecks()
      await runBrowserChecks()
    }
  }

  await stopAll()

  const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    lanIp,
    baseUrl,
    bindHost,
    port,
    registry: 'data/world-kernel/worldos-local-lan-rc-v1.json',
    logPath: path.relative(root, logOutput),
    chromeLogPath: path.relative(root, chromeLogOutput),
    releaseStates: registry.releaseStates,
    checks,
    browserChecks,
    failures,
    note: '本报告证明本地局域网 IP 可访问当前 production server；不等于真实外部 Preview / Production 上线证据。',
  }

  fs.mkdirSync(path.dirname(evidenceOutput), { recursive: true })
  fs.writeFileSync(evidenceOutput, `${JSON.stringify(report, null, 2)}\n`, 'utf-8')
  console.log(`WorldOS local LAN RC report written: ${path.relative(root, evidenceOutput)}`)
  console.log(`WorldOS local LAN RC base URL: ${baseUrl}`)
  if (failures.length) {
    console.error('WorldOS local LAN RC failed:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }
  console.log(`WorldOS local LAN RC passed: ${checks.length} HTTP checks, ${browserChecks.length} browser checks`)
}

main().catch(async (error) => {
  await stopAll()
  console.error(error)
  process.exit(1)
})
