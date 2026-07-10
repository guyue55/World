import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

const delay = (ms) => new Promise((resolve) => globalThis.setTimeout(resolve, ms))

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ].filter(Boolean)
  return candidates.find((candidate) => fs.existsSync(candidate))
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl)
  const pending = new Map()
  const listeners = new Map()
  let nextId = 1
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', () => reject(new Error('Chrome DevTools WebSocket 连接失败')), { once: true })
  })
  ws.addEventListener('message', (message) => {
    const data = JSON.parse(message.data)
    const pair = data.id ? pending.get(data.id) : null
    if (pair) {
      pending.delete(data.id)
      if (data.error) pair.reject(new Error(JSON.stringify(data.error)))
      else pair.resolve(data.result ?? {})
      return
    }
    if (data.method) {
      for (const listener of listeners.get(data.method) ?? []) listener(data.params ?? {}, data.sessionId)
    }
  })
  return {
    send(method, params = {}, sessionId) {
      const id = nextId++
      ws.send(JSON.stringify({ id, method, params, sessionId }))
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
    },
    on(method, listener) {
      const current = listeners.get(method) ?? new Set()
      current.add(listener)
      listeners.set(method, current)
      return () => current.delete(listener)
    },
    close() { ws.close() },
  }
}

export async function launchRealityBrowser(label = 'worldos-reality-first') {
  const chromePath = findChrome()
  if (!chromePath) throw new Error('未找到系统 Chrome，请设置 CHROME_PATH')
  const debugPort = 9400 + (process.pid % 200)
  const profileDir = path.join(os.tmpdir(), `${label}-${process.pid}-${Date.now()}`)
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-component-update',
    '--no-first-run',
    `--user-data-dir=${profileDir}`,
    '--remote-debugging-address=127.0.0.1',
    `--remote-debugging-port=${debugPort}`,
    'about:blank',
  ], { stdio: 'ignore' })

  const deadline = Date.now() + 15000
  let wsUrl
  while (Date.now() < deadline) {
    try {
      const version = await fetch(`http://127.0.0.1:${debugPort}/json/version`).then((response) => response.json())
      if (version.webSocketDebuggerUrl) {
        wsUrl = version.webSocketDebuggerUrl
        break
      }
    } catch {
      await delay(150)
    }
  }
  if (!wsUrl) throw new Error('Chrome DevTools 在 15 秒内未就绪')
  const browser = await connectCdp(wsUrl)

  return {
    browser,
    async createPage({ width, height, mobile = false, reducedMotion = false }) {
      const target = await browser.send('Target.createTarget', { url: 'about:blank' })
      const attached = await browser.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })
      const send = (method, params = {}) => browser.send(method, params, attached.sessionId)
      const errors = []
      const listen = (method, format) => browser.on(method, (params, sessionId) => {
        if (sessionId === attached.sessionId) errors.push(format(params))
      })
      listen('Runtime.exceptionThrown', (params) => `exception: ${params.exceptionDetails?.text ?? 'unknown'}`)
      listen('Log.entryAdded', (params) => params.entry?.level === 'error' ? `console: ${params.entry.text} ${params.entry.url ?? ''}`.trim() : '')
      listen('Network.loadingFailed', (params) => params.canceled ? '' : `network: ${params.errorText} ${params.requestId ?? ''}`.trim())
      await send('Page.enable')
      await send('Runtime.enable')
      await send('Log.enable')
      await send('Network.enable')
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
      await send('Emulation.setEmulatedMedia', {
        features: reducedMotion ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [],
      })
      return { send, targetId: target.targetId, errors }
    },
    async close() {
      browser.close()
      if (chrome.exitCode === null) {
        const exited = new Promise((resolve) => chrome.once('exit', resolve))
        chrome.kill('SIGTERM')
        await Promise.race([exited, delay(1500)])
      }
      fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 120 })
    },
  }
}

export async function evaluate(send, expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime.evaluate failed')
  return result.result?.value
}

export async function waitForExpression(send, expression, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (await evaluate(send, expression)) return true
    await delay(100)
  }
  return false
}

export async function capturePng(send, filePath) {
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'))
}

export { delay }
