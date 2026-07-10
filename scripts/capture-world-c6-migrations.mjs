import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { capturePng, delay, evaluate, launchRealityBrowser, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-reality-first/c6-migration-2026-07-10/final')
fs.mkdirSync(outputDir, { recursive: true })
const launch = await launchRealityBrowser('worldos-c6-migration')
const results = []

async function navigate(page, pathname, selector = '[data-world-scene]') {
  await page.send('Page.navigate', { url: `${baseUrl}${pathname}` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector(${JSON.stringify(selector)})`, 20000)) throw new Error(`${pathname} 未就绪`)
  await delay(700)
}

async function waitFast(page, expression, timeout = 5000) {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    try { if (await evaluate(page.send, expression)) return true } catch { /* 原生视图切换替换 document 时继续轮询。 */ }
    await delay(15)
  }
  return false
}

async function safeCapture(page, filePath) {
  let lastError
  for (let attempt = 0; attempt < 12; attempt += 1) {
    try { await capturePng(page.send, filePath); return } catch (error) { lastError = error; await delay(40) }
  }
  throw lastError
}

async function recordMigration({ name, sourcePath, object, targetScene, setup, trigger, reducedMotion = false }) {
  console.log(`capture ${name}: source`)
  const page = await launch.createPage({ width: 1280, height: 720, reducedMotion })
  await navigate(page, sourcePath)
  if (setup) await setup(page)
  if (!await waitForExpression(page.send, `!!document.querySelector('[data-scene-transition-object="${object}"]')`)) throw new Error(`${name} 缺少 ${object} 来源对象`)
  await safeCapture(page, path.join(outputDir, `${name}-source.png`))
  const framesDir = path.join(outputDir, `${name}-frames`); fs.rmSync(framesDir, { recursive: true, force: true }); fs.mkdirSync(framesDir, { recursive: true })
  const initial = await page.send('Page.captureScreenshot', { format: 'jpeg', quality: 82, captureBeyondViewport: false }); fs.writeFileSync(path.join(framesDir, 'frame-0001.jpg'), Buffer.from(initial.data, 'base64'))
  let frameIndex = 1; let accepting = true
  const off = launch.browser.on('Page.screencastFrame', async (params) => { if (!accepting) return; frameIndex += 1; fs.writeFileSync(path.join(framesDir, `frame-${String(frameIndex).padStart(4, '0')}.jpg`), Buffer.from(params.data, 'base64')); await page.send('Page.screencastFrameAck', { sessionId: params.sessionId }).catch(() => {}) })
  await page.send('Page.startScreencast', { format: 'jpeg', quality: 82, maxWidth: 1280, maxHeight: 720, everyNthFrame: 1 })
  await trigger(page)
  const transit = reducedMotion ? true : await waitFast(page, `document.querySelector('[data-testid="scene-migration-layer"]')?.getAttribute('data-migration-state')==='inTransit'`, 3000)
  if (!reducedMotion && transit) await safeCapture(page, path.join(outputDir, `${name}-transit.png`))
  const arrived = await waitFast(page, `!!document.querySelector('[data-world-scene="${targetScene}"]')||document.querySelector('[data-testid="scene-transition-content"]')?.getAttribute('data-current-scene')==='${targetScene}'`, 15000)
  const arrivalState = reducedMotion ? true : await waitFast(page, `['arriving','settled'].includes(document.querySelector('[data-testid="scene-migration-layer"]')?.getAttribute('data-migration-state'))`, 3000)
  await safeCapture(page, path.join(outputDir, `${name}-arrival.png`))
  await delay(650); accepting = false; await page.send('Page.stopScreencast').catch(() => {}); off()
  const target = path.join(outputDir, `${name}.mp4`)
  const ffmpeg = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '18', '-i', path.join(framesDir, 'frame-%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target], { encoding: 'utf8' })
  if (ffmpeg.status !== 0) throw new Error(`${name} 编码失败：${ffmpeg.stderr}`)
  fs.rmSync(framesDir, { recursive: true, force: true })
  const final = await evaluate(page.send, `({path:location.pathname,state:document.querySelector('[data-testid="scene-migration-layer"]')?.getAttribute('data-migration-state'),active:document.querySelector('[data-testid="scene-migration-layer"]')?.getAttribute('data-active'),engineering:/正在迁移|迁移中|leaving|inTransit|arriving/.test(document.querySelector('[data-testid="scene-migration-layer"]')?.innerText??''),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`)
  results.push({ name, object, targetScene, transit, arrived, arrivalState, frames: frameIndex, final, errors: page.errors.filter(Boolean) })
  console.log(`capture ${name}: done frames=${frameIndex}`)
}

const click = (selector) => async (page) => evaluate(page.send, `document.querySelector(${JSON.stringify(selector)})?.click()`)

try {
  await recordMigration({ name: 'gateway-atlas', sourcePath: '/', object: 'island', targetScene: 'atlas', setup: async (page) => { await click('[data-testid="gateway-enter"]')(page); await delay(700) }, trigger: click('[data-scene-transition-object="island"]') })
  await recordMigration({ name: 'atlas-node', sourcePath: '/atlas', object: 'star', targetScene: 'node', setup: async (page) => { await click('[data-atlas-area]')(page); await delay(500); await click('[data-atlas-node][data-visible="true"]')(page); await waitForExpression(page.send, `!!document.querySelector('[data-atlas-enter-node]')`) }, trigger: click('[data-atlas-enter-node]') })
  await recordMigration({ name: 'timeline-node', sourcePath: '/timeline', object: 'ripple', targetScene: 'node', setup: async (page) => { await click('[data-time-event]')(page); await waitForExpression(page.send, `!!document.querySelector('[data-testid="timeline-event-inspector"] [data-scene-transition-object="ripple"]')`) }, trigger: click('[data-scene-transition-object="ripple"]') })
  await recordMigration({ name: 'archive-node', sourcePath: '/archive', object: 'document', targetScene: 'node', setup: async (page) => { await click('[data-archive-record]')(page); await waitForExpression(page.send, `!!document.querySelector('[data-archive-enter-node]')`) }, trigger: click('[data-archive-enter-node]') })
  await recordMigration({ name: 'path-node', sourcePath: '/paths/first-visit', object: 'waypoint', targetScene: 'node', trigger: click('[data-testid="path-waypoint-ledger"] [data-scene-transition-object="waypoint"]') })
  await recordMigration({ name: 'node-lighthouse', sourcePath: '/node/world-manifesto', object: 'beam', targetScene: 'lighthouse', trigger: click('[data-scene-transition-object="beam"]') })
  await recordMigration({ name: 'reduced-path-node', sourcePath: '/paths/first-visit', object: 'waypoint', targetScene: 'node', reducedMotion: true, trigger: click('[data-scene-transition-object="waypoint"]') })

  const edgePage = await launch.createPage({ width: 1280, height: 720 })
  await navigate(edgePage, '/paths/first-visit')
  await evaluate(edgePage.send, `document.querySelector('[data-scene-transition-object="waypoint"]')?.click()`)
  await delay(20); await evaluate(edgePage.send, `document.querySelector('[data-scene-transition-object="waypoint"]')?.click()`).catch(() => {})
  if (!await waitFast(edgePage, `location.pathname.startsWith('/node/')`, 15000)) throw new Error('快速双击后未抵达 Node')
  await delay(500); await evaluate(edgePage.send, `history.back()`).catch(() => {})
  const fastCancelBack = await waitFast(edgePage, `location.pathname==='/paths/first-visit'`, 15000)
  await page404(edgePage)
  const failures = results.flatMap((result) => {
    const issues = []
    if (!result.arrived || !result.arrivalState) issues.push(`${result.name}: 未抵达`)
    if (result.name !== 'reduced-path-node' && !result.transit) issues.push(`${result.name}: 未捕捉途中态`)
    if (result.final.engineering || result.final.overflow || result.errors.length) issues.push(`${result.name}: 公开文字/溢出/浏览器错误`)
    if (result.final.active !== 'false') issues.push(`${result.name}: 迁移层未释放`)
    return issues
  })
  if (!fastCancelBack) failures.push('快速导航后退未恢复路径')
  const report = { generatedAt: new Date().toISOString(), baseUrl, results, edgeChecks: { fastCancelBack, route404Settled: true }, failures }
  fs.writeFileSync(path.join(outputDir, 'browser-observations.json'), `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C6 migration evidence captured. flows=${results.length} failures=0`)
} finally { await launch.close() }

async function page404(page) {
  await page.send('Page.navigate', { url: `${baseUrl}/node/does-not-exist-c6` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'`, 15000)) throw new Error('404 路由未完成')
  await delay(500)
  const stuck = await evaluate(page.send, `document.querySelector('[data-testid="scene-migration-layer"]')?.getAttribute('data-active')==='true'`)
  if (stuck) throw new Error('404 后迁移层仍阻塞')
}
