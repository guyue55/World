import fs from 'node:fs'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

const delay = (ms) => new Promise((resolve) => globalThis.setTimeout(resolve, ms))

async function findDebugPort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      server.close(() => resolve(address.port))
    })
  })
}

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
      globalThis.clearTimeout(pair.timeoutId)
      if (data.error) pair.reject(new Error(JSON.stringify(data.error)))
      else pair.resolve(data.result ?? {})
      return
    }
    if (data.method) {
      for (const listener of listeners.get(data.method) ?? []) listener(data.params ?? {}, data.sessionId)
    }
  })
  const rejectPending = (reason) => {
    for (const [id, pair] of pending) {
      globalThis.clearTimeout(pair.timeoutId)
      pair.reject(new Error(`${reason} (CDP id=${id})`))
    }
    pending.clear()
  }
  ws.addEventListener('close', () => rejectPending('Chrome DevTools WebSocket 已关闭'))
  ws.addEventListener('error', () => rejectPending('Chrome DevTools WebSocket 异常'))
  return {
    send(method, params = {}, sessionId) {
      if (ws.readyState !== 1) return Promise.reject(new Error(`Chrome DevTools 尚未连接：${method}`))
      const id = nextId++
      ws.send(JSON.stringify({ id, method, params, sessionId }))
      return new Promise((resolve, reject) => {
        const timeoutId = globalThis.setTimeout(() => {
          if (!pending.delete(id)) return
          reject(new Error(`Chrome DevTools 命令超时：${method} (CDP id=${id})`))
        }, 20000)
        pending.set(id, { resolve, reject, timeoutId })
      })
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
  const debugPort = await findDebugPort()
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
  if (!wsUrl) {
    if (chrome.exitCode === null) chrome.kill('SIGTERM')
    fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 120 })
    throw new Error('Chrome DevTools 在 15 秒内未就绪')
  }
  const browser = await connectCdp(wsUrl)

  return {
    browser,
    async createPage({ width, height, mobile = false, reducedMotion = false }) {
      const target = await browser.send('Target.createTarget', { url: 'about:blank' })
      const attached = await browser.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })
      const send = (method, params = {}) => browser.send(method, params, attached.sessionId)
      const errors = []
      const removeListeners = []
      const listen = (method, format) => browser.on(method, (params, sessionId) => {
        if (sessionId === attached.sessionId) errors.push(format(params))
      })
      removeListeners.push(listen('Runtime.exceptionThrown', (params) => `exception: ${params.exceptionDetails?.text ?? 'unknown'}`))
      removeListeners.push(listen('Log.entryAdded', (params) => params.entry?.level === 'error' ? `console: ${params.entry.text} ${params.entry.url ?? ''}`.trim() : ''))
      removeListeners.push(listen('Network.loadingFailed', (params) => params.canceled || !params.errorText ? '' : `network: ${params.errorText} ${params.requestId ?? ''}`.trim()))
      await send('Page.enable')
      await send('Runtime.enable')
      await send('Log.enable')
      await send('Network.enable')
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
      await send('Emulation.setEmulatedMedia', {
        features: reducedMotion ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [],
      })
      return {
        send,
        sessionId: attached.sessionId,
        targetId: target.targetId,
        errors,
        async close() {
          removeListeners.forEach((remove) => remove())
          await browser.send('Target.closeTarget', { targetId: target.targetId }).catch(() => {})
        },
      }
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
  if (result.exceptionDetails) {
    const detail = result.exceptionDetails.exception?.description ?? result.exceptionDetails.text ?? 'Runtime.evaluate failed'
    throw new Error(detail)
  }
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

export async function captureJpeg(send, filePath, quality = 82) {
  const screenshot = await send('Page.captureScreenshot', { format: 'jpeg', quality, captureBeyondViewport: false })
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'))
}

export async function recordPageScreencast({ browser, page, outputPath, action, width = 1280, height = 720, quality = 82 }) {
  const frameDir = `${outputPath}.frames`
  fs.rmSync(frameDir, { recursive: true, force: true })
  fs.mkdirSync(frameDir, { recursive: true })
  const frames = []
  let accepting = true

  const writeFrame = (data) => {
    const filePath = path.join(frameDir, `frame-${String(frames.length + 1).padStart(4, '0')}.jpg`)
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'))
    frames.push({ filePath, capturedAt: Date.now() / 1000 })
  }

  const initial = await page.send('Page.captureScreenshot', { format: 'jpeg', quality, captureBeyondViewport: false })
  writeFrame(initial.data)
  const off = browser.on('Page.screencastFrame', async (params, sessionId) => {
    if (!accepting || sessionId !== page.sessionId) return
    writeFrame(params.data)
    await page.send('Page.screencastFrameAck', { sessionId: params.sessionId }).catch(() => {})
  })

  let actionError
  try {
    await page.send('Page.startScreencast', { format: 'jpeg', quality, maxWidth: width, maxHeight: height, everyNthFrame: 1 })
    await action()
  } catch (error) {
    actionError = error
  } finally {
    accepting = false
    await page.send('Page.stopScreencast').catch(() => {})
    off()
  }
  if (actionError) {
    fs.rmSync(frameDir, { recursive: true, force: true })
    throw actionError
  }

  const finalFrame = await page.send('Page.captureScreenshot', { format: 'jpeg', quality, captureBeyondViewport: false })
  writeFrame(finalFrame.data)
  const concatPath = path.join(frameDir, 'frames.ffconcat')
  const lines = ['ffconcat version 1.0']
  for (let index = 0; index < frames.length; index += 1) {
    const current = frames[index]
    const next = frames[index + 1]
    const duration = next ? Math.max(0.016, next.capturedAt - current.capturedAt) : 0.04
    lines.push(`file '${current.filePath.replaceAll("'", "'\\''")}'`, `duration ${duration.toFixed(6)}`)
  }
  lines.push(`file '${frames.at(-1).filePath.replaceAll("'", "'\\''")}'`)
  fs.writeFileSync(concatPath, `${lines.join('\n')}\n`)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  const encoded = spawnSync('ffmpeg', ['-nostdin', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', concatPath, '-fps_mode', 'vfr', '-c:v', 'libx264', '-bf', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outputPath], { encoding: 'utf8' })
  fs.rmSync(frameDir, { recursive: true, force: true })
  if (encoded.status !== 0) throw new Error(`录屏编码失败：${encoded.stderr}`)
  return { frames: frames.length, durationSeconds: Math.max(0, frames.at(-1).capturedAt - frames[0].capturedAt), outputPath }
}

export { delay }
