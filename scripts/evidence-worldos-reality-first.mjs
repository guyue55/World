import fs from 'node:fs'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { captureJpeg, delay, evaluate, launchRealityBrowser, recordPageScreencast, waitForExpression } from './lib/reality-first-browser.mjs'

const root = process.cwd()
const distDirName = '.next-world-evidence'
const distDir = path.join(root, distDirName)
const runId = `run-${new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_')}`
const reportDir = path.join(root, 'docs/90-archive/reports/worldos-reality-first', runId)
const screenshotsDir = path.join(reportDir, 'screenshots')
const flowsDir = path.join(reportDir, 'flows')
const recordingsDir = path.join(reportDir, 'recordings')
const auditsDir = path.join(reportDir, 'audits')
const logsDir = path.join(reportDir, 'logs')
const latestPointer = path.join(root, 'docs/90-archive/reports/worldos-reality-first/latest-evidence.json')
const acceptanceContractPath = path.join(root, 'data/domains/experience/living-world-acceptance.json')
const acceptanceContract = JSON.parse(fs.readFileSync(acceptanceContractPath, 'utf8'))
const expectedTargetStatus = 'LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING'
const contractOnly = process.argv.includes('--contract-only')
const acceptanceFailures = []

if (acceptanceContract.schemaVersion !== '1.2.0') acceptanceFailures.push('schemaVersion must be 1.2.0')
if (acceptanceContract.status !== 'FROZEN_PRE_GOAL') acceptanceFailures.push('contract status must remain FROZEN_PRE_GOAL')
if (acceptanceContract.scenes?.length !== 7) acceptanceFailures.push('scene count must be 7')
if (acceptanceContract.views?.length !== 9) acceptanceFailures.push('view count must be 9')
if (acceptanceContract.flows?.length !== 14) acceptanceFailures.push('flow count must be 14')
if (acceptanceContract.targets?.currentGoalFinal !== expectedTargetStatus
  || acceptanceContract.targets?.automaticWithoutHumanAudioSignoff !== expectedTargetStatus
  || acceptanceContract.targets?.promotionOutsideGoalRequired !== true) acceptanceFailures.push('candidate status ladder drift')
if (acceptanceFailures.length) throw new Error(`生命世界验收契约无效：${acceptanceFailures.join('; ')}`)

if (contractOnly) {
  console.log(`EVIDENCE_ACCEPTANCE_CONTRACT_PASS scenes=${acceptanceContract.scenes.length} views=${acceptanceContract.views.length} flows=${acceptanceContract.flows.length} target=${acceptanceContract.targets.currentGoalFinal}`)
  process.exit(0)
}

const routes = acceptanceContract.scenes.map((scene) => ({ id: scene.id, path: scene.route }))
const configSnapshots = new Map(['next-env.d.ts', 'tsconfig.json'].map((file) => [file, fs.readFileSync(path.join(root, file), 'utf8')]))
const sourceCommit = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim()
const sourceStatus = spawnSync('git', ['status', '--short', '--', 'src', 'data', 'content', 'scripts', 'public/world', 'package.json', 'next.config.ts'], { cwd: root, encoding: 'utf8' }).stdout.trim().split('\n').filter(Boolean)
const chromeBinary = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browserVersion = spawnSync(chromeBinary, ['--version'], { encoding: 'utf8' }).stdout.trim()
const failures = []
let server
let browserRuntime
let baseUrl

for (const directory of [reportDir, screenshotsDir, flowsDir, recordingsDir, auditsDir, logsDir]) fs.mkdirSync(directory, { recursive: true })

function latestMtime(relativeRoots) {
  let latest = 0
  const visit = (absolutePath) => {
    if (!fs.existsSync(absolutePath)) return
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(absolutePath)) visit(path.join(absolutePath, child))
    } else latest = Math.max(latest, stat.mtimeMs)
  }
  relativeRoots.forEach((relativePath) => visit(path.join(root, relativePath)))
  return latest
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    env: { ...process.env, ...options.env },
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`
  if (options.log) fs.writeFileSync(path.join(logsDir, options.log), output)
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} 失败：\n${output.slice(-5000)}`)
  return output
}

async function freePort() {
  return await new Promise((resolve, reject) => {
    const candidate = net.createServer()
    candidate.once('error', reject)
    candidate.listen(0, '127.0.0.1', () => {
      const address = candidate.address()
      candidate.close(() => resolve(address.port))
    })
  })
}

function detectLanIp() {
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family === 'IPv4' && !entry.internal && !entry.address.startsWith('169.254.')) return entry.address
    }
  }
  return null
}

function parseBuildMetrics(output) {
  const shared = output.match(/First Load JS shared by all\s+([\d.]+)\s*kB/i)
  const routeMetrics = {}
  for (const { id, path: pathname } of routes) {
    const routeLabel = id === 'gateway' ? '/' : id === 'paths' ? '/paths/[id]' : id === 'node' ? '/node/[slug]' : id === 'lighthouse' ? '/ask' : `/${id}`
    const line = output.split(/\r?\n/).find((candidate) => new RegExp(`^[┌├└] [○●ƒ] ${routeLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s`).test(candidate))
    const match = line?.match(/\s([\d.]+)\s*(B|kB)\s+([\d.]+)\s*kB\s*$/i)
    if (match) routeMetrics[pathname] = { routeKb: match[2].toLowerCase() === 'b' ? Number(match[1]) / 1024 : Number(match[1]), firstLoadKb: Number(match[3]) }
  }
  return { sharedKb: shared ? Number(shared[1]) : null, routes: routeMetrics }
}

async function waitForServer(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.status >= 200 && response.status < 500) return response.status
    } catch { /* 独立生产服务器仍在启动。 */ }
    await delay(200)
  }
  throw new Error(`生产服务器未在 ${timeoutMs}ms 内就绪：${url}`)
}

const performanceProbe = `(() => {
  window.__worldosEvidenceMetrics = { lcp: 0, cls: 0, longTasks: [] };
  try { new PerformanceObserver((list) => { for (const entry of list.getEntries()) window.__worldosEvidenceMetrics.lcp = Math.max(window.__worldosEvidenceMetrics.lcp, entry.startTime); }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
  try { new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__worldosEvidenceMetrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true }); } catch {}
  try { new PerformanceObserver((list) => { for (const entry of list.getEntries()) window.__worldosEvidenceMetrics.longTasks.push(entry.duration); }).observe({ type: 'longtask', buffered: true }); } catch {}
})()`

const mainInteractive = {
  gateway: '[data-testid="gateway-enter"], [aria-label="入口方向"] a',
  atlas: '[data-atlas-area]',
  timeline: '[data-time-anchor]',
  archive: '[data-testid="archive-catalogue-desk"], [data-archive-record]',
  paths: '[data-testid="journey-route"], [data-scene-transition-object="waypoint"]',
  node: 'a[href="#reading"], [data-scene-transition-object="door"]',
  lighthouse: '#lighthouse-question, [data-lighthouse-signal]',
}

async function inspectPage(page, route, mode) {
  return await evaluate(page.send, `(() => {
    const scene = document.querySelector('[data-world-scene="${route.id}"]');
    const rect = scene?.getBoundingClientRect();
    const interactive = document.querySelector(${JSON.stringify(mainInteractive[route.id])});
    const interactiveRect = interactive?.getBoundingClientRect();
    const visible = (element) => { if (!element) return false; const r=element.getBoundingClientRect(); const s=getComputedStyle(element); return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)!==0; };
    const fixedOverlayIssues = [...document.querySelectorAll('body *')].filter((element) => {
      const style=getComputedStyle(element); if(style.position!=='fixed'||style.pointerEvents==='none') return false;
      const r=element.getBoundingClientRect(); const ratio=(r.width*r.height)/(innerWidth*innerHeight);
      return ratio>0.35 && !element.matches('[data-testid="scene-migration-layer"]') && visible(element);
    }).map((element) => element.getAttribute('data-testid')||element.getAttribute('aria-label')||element.tagName);
    const resources=performance.getEntriesByType('resource').map((entry)=>({name:entry.name,transferSize:entry.transferSize||0,encodedBodySize:entry.encodedBodySize||0,duration:entry.duration||0}));
    const bitmapBytes=resources.filter((entry)=>/\\.(?:avif|webp|png|jpe?g)(?:\\?|$)/i.test(entry.name)||entry.name.includes('/_next/image')).reduce((sum,entry)=>sum+(entry.transferSize||entry.encodedBodySize),0);
    const audioBytes=resources.filter((entry)=>/\\.(?:mp3|wav|ogg|m4a)(?:\\?|$)/i.test(entry.name)).reduce((sum,entry)=>sum+(entry.transferSize||entry.encodedBodySize),0);
    return {
      route:${JSON.stringify(route.path)}, scene:${JSON.stringify(route.id)}, mode:${JSON.stringify(mode)},
      sceneRect:rect?{top:Math.round(rect.top),left:Math.round(rect.left),width:Math.round(rect.width),height:Math.round(rect.height),ratio:Number(((rect.width*rect.height)/(innerWidth*innerHeight)).toFixed(3))}:null,
      interactiveVisible:visible(interactive), interactiveRect:interactiveRect?{width:Math.round(interactiveRect.width),height:Math.round(interactiveRect.height)}:null,
      headingVisible:visible(document.querySelector('h1')), links:document.querySelectorAll('a[href]').length, bodyTextLength:(document.body.innerText||'').trim().length,
      overflowX:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
      engineeringCopy:/Motion Layer|Fallback|Evidence|场景证据|候选验收|9\\/10|8\\.9|降级规则|验收报告/.test(document.body.innerText||''),
      privateCanary:/private-leak-fixture|不应写入的私密演练|这段正文只用于故意构造错误边界/.test(document.documentElement.innerHTML),
      fixedOverlayIssues, bitmapBytes, audioBytes,
      metrics:window.__worldosEvidenceMetrics??null,
      soundMode:document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode')??null,
      ariaLive:document.querySelectorAll('[aria-live]').length,
      storageAvailable:(()=>{try{localStorage.setItem('__worldos_probe','1');localStorage.removeItem('__worldos_probe');return true}catch{return false}})(),
    };
  })()`)
}

async function inspectKeyboardRoute(page, route) {
  const sequence = []
  let reachedSceneObject = false
  let firstFocus = null
  for (let index = 0; index < 60; index += 1) {
    await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await delay(12)
    const focused = await evaluate(page.send, `(() => {
      const element=document.activeElement;
      if(!element||element===document.body)return null;
      return {tag:element.tagName,href:element.getAttribute('href'),label:element.getAttribute('aria-label')||element.textContent?.trim().slice(0,60)||'',focusVisible:element.matches(':focus-visible'),sceneObject:element.matches(${JSON.stringify(mainInteractive[route.id])})};
    })()`)
    if (!focused) continue
    if (!firstFocus) firstFocus = focused
    sequence.push(focused)
    if (focused.sceneObject) { reachedSceneObject = true; break }
  }
  return {
    firstFocus,
    reachedSceneObject,
    visibleFocus: sequence.some((item) => item.focusVisible),
    focusCount: sequence.length,
    focusSequence: sequence.slice(0, 16),
  }
}

async function captureMode(route, mode, options = {}) {
  const mobile = mode === 'mobile' || mode === 'reduced-sensory'
  const targetBaseUrl = options.targetBaseUrl ?? baseUrl
  const screenshotPrefix = options.screenshotPrefix ?? route.id
  const page = await browserRuntime.createPage({ width: mobile ? 390 : mode === 'zoom-200' ? 720 : 1440, height: mobile ? 844 : mode === 'zoom-200' ? 450 : 900, mobile, reducedMotion: mode === 'reduced-motion' })
  try {
    if (mode === 'background-hidden') {
      await page.send('Network.setBlockedURLs', {
        urls: [
          `*/world/scenes/${route.id}/*`,
          `*url=%2Fworld%2Fscenes%2F${route.id}%2F*`,
        ],
      })
    }
    if (mode === 'js-off') await page.send('Emulation.setScriptExecutionDisabled', { value: true })
    else {
      await page.send('Page.addScriptToEvaluateOnNewDocument', { source: performanceProbe })
      if (mode === 'reduced-sensory') await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('guyue-world:soundscape-preference','muted');localStorage.setItem('guyue-world:motion-preference','reduced')` })
      if (mode === 'storage-off') await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `try{localStorage.clear();sessionStorage.clear()}catch{};for(const method of ['getItem','setItem','removeItem','clear'])Object.defineProperty(Storage.prototype,method,{configurable:true,value(){throw new DOMException('Storage disabled for Reality-First evidence','SecurityError')}})` })
    }
    await page.send('Page.navigate', { url: `${targetBaseUrl}${route.path}` })
    if (mode === 'js-off') await delay(1300)
    else {
      const ready = await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector('[data-world-scene="${route.id}"]')`, 25000)
      if (!ready) throw new Error(`${route.path} ${mode} 未就绪`)
      await waitForExpression(page.send, `document.querySelector('[data-image-ready]')?.getAttribute('data-image-ready')==='true'||!document.querySelector('[data-image-ready]')`, 12000)
      await delay(650)
      if (mode === 'text-hidden') await evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style data-reality-text-hidden>h1,h2,h3,p,span,strong,small,a,button,label,input,select,textarea{color:transparent!important;text-shadow:none!important} .arrival{visibility:hidden!important}</style>')`)
    }
    const observation = await inspectPage(page, route, mode)
    if (mode === 'keyboard') observation.keyboard = await inspectKeyboardRoute(page, route)
    observation.browserErrors = page.errors.filter(Boolean)
    const screenshot = path.join(screenshotsDir, `${screenshotPrefix}-${mode}.jpg`)
    await captureJpeg(page.send, screenshot)
    observation.screenshot = path.relative(root, screenshot)
    return observation
  } finally {
    await page.close()
  }
}

async function runLanJourney(lanBaseUrl) {
  const page = await browserRuntime.createPage({ width: 1280, height: 720 })
  try {
    await page.send('Page.navigate', { url: `${lanBaseUrl}/` })
    if (!await waitForExpression(page.send, `!!document.querySelector('[data-testid="gateway-enter"]')`, 20000)) throw new Error('LAN 首访入口未出现')
    await evaluate(page.send, `document.querySelector('[data-testid="gateway-enter"]')?.click()`)
    if (!await waitForExpression(page.send, `!!document.querySelector('[data-scene-transition-object="island"]')`, 5000)) throw new Error('LAN 入口方向未出现')
    await evaluate(page.send, `document.querySelector('[data-scene-transition-object="island"]')?.click()`)
    const reachedAtlas = await waitForExpression(page.send, `location.pathname==='/atlas'&&!!document.querySelector('[data-atlas-area]')`, 15000)
    if (!reachedAtlas) throw new Error('LAN 未抵达 Atlas')
    await evaluate(page.send, `document.querySelector('[data-atlas-area]')?.click()`)
    const focusedAtlas = await waitForExpression(page.send, `!!document.querySelector('[data-testid="atlas-area-inspector"]')`, 5000)
    await captureJpeg(page.send, path.join(screenshotsDir, 'lan-journey-atlas-focused.jpg'))
    return { reachedAtlas, focusedAtlas, errors: page.errors.filter(Boolean) }
  } finally {
    await page.close()
  }
}

async function runAccessibilityChecks() {
  const page = await browserRuntime.createPage({ width: 1440, height: 900 })
  try {
    await page.send('Page.navigate', { url: `${baseUrl}/atlas` })
    await waitForExpression(page.send, `document.querySelector('[data-enhanced]')?.getAttribute('data-enhanced')==='true'&&!!document.querySelector('[data-atlas-area]')`, 20000)
    await delay(250)
    const result = await evaluate(page.send, `(() => {
      const trigger=document.querySelector('[data-atlas-area]'); trigger.focus(); trigger.click();
      return new Promise((resolve)=>{
        const deadline=performance.now()+1000;
        const inspect=()=>{
          const close=document.querySelector('[aria-label="关闭详情"]');
          if(document.activeElement!==close&&performance.now()<deadline){requestAnimationFrame(inspect);return;}
          const focusedOnOpen=document.activeElement===close;
          close?.click();
          setTimeout(()=>resolve({focusedOnOpen,focusRestored:document.activeElement===trigger,triggerKeyboardReachable:trigger.tabIndex>=0,dialogClosed:!document.querySelector('[role="dialog"]')}),80);
        };
        requestAnimationFrame(inspect);
      });
    })()`)
    const zoomPage = await browserRuntime.createPage({ width: 720, height: 450 })
    try {
      await zoomPage.send('Page.navigate', { url: `${baseUrl}/node/world-manifesto` })
      await waitForExpression(zoomPage.send, `!!document.querySelector('[data-world-scene="node"]')`, 20000)
      await zoomPage.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 })
      await delay(500)
      result.zoom200 = await evaluate(zoomPage.send, `({overflowX:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,links:[...document.querySelectorAll('a[href]')].filter(a=>a.getBoundingClientRect().width>0).length,scale:visualViewport?.scale??null})`)
      await captureJpeg(zoomPage.send, path.join(screenshotsDir, 'node-zoom-200.jpg'))
    } finally { await zoomPage.close() }
    return result
  } finally { await page.close() }
}

async function recordReturnVisit() {
  const page = await browserRuntime.createPage({ width: 1280, height: 720 })
  try {
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('guyue-world:visited-count','3');localStorage.setItem('guyue-world:journey-memory-v1',JSON.stringify({path:'/atlas',label:'群岛星图',sceneId:'atlas',sceneTitle:'世界地图',visitedAt:new Date().toISOString()}))` })
    await page.send('Page.navigate', { url: `${baseUrl}/` })
    if (!await waitForExpression(page.send, `!!document.querySelector('[data-testid="gateway-returning"]')`, 20000)) throw new Error('回访入口未出现')
    const returningScreenshot = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    fs.writeFileSync(path.join(screenshotsDir, 'home-desktop-returning.png'), Buffer.from(returningScreenshot.data, 'base64'))
    const output = path.join(flowsDir, 'return-visit-continuation.mp4')
    let continued = false
    let cleared = false
    const recording = await recordPageScreencast({ browser: browserRuntime.browser, page, outputPath: output, action: async () => {
      await evaluate(page.send, `document.querySelector('[data-testid="gateway-returning"] a')?.click()`)
      continued = await waitForExpression(page.send, `location.pathname==='/atlas'`, 15000)
      if (!continued) throw new Error('回访未继续到上次位置')
      await delay(900)
      await evaluate(page.send, `history.back()`)
      if (!await waitForExpression(page.send, `location.pathname==='/'&&!!document.querySelector('[data-testid="gateway-returning"]')`, 15000)) throw new Error('回访未返回入口')
      await delay(500)
      await evaluate(page.send, `document.querySelector('[data-testid="gateway-returning"] button')?.click()`)
      cleared = await waitForExpression(page.send, `!!document.querySelector('[data-testid="gateway-enter"]')&&!document.querySelector('[data-testid="gateway-returning"]')`, 5000)
      if (!cleared) throw new Error('回访记忆清除后未恢复首访入口')
      await delay(900)
    } })
    return { frames: recording.frames, durationSeconds: recording.durationSeconds, path: path.relative(root, output), continued, cleared }
  } finally {
    await page.close()
  }
}

try {
  const sourceMtime = latestMtime(['src', 'data', 'content', 'scripts', 'public/world', 'package.json', 'next.config.ts'])
  const buildStartedAt = Date.now()
  const buildOutput = run('npm', ['run', 'build:production-ci'], { env: { WORLDOS_DIST_DIR: distDirName }, log: 'build.log' })
  for (const [file, content] of configSnapshots) fs.writeFileSync(path.join(root, file), content)
  const buildMetrics = parseBuildMetrics(buildOutput)
  const buildArtifactMtime = fs.statSync(path.join(distDir, 'BUILD_ID')).mtimeMs
  const port = await freePort()
  const lanIp = detectLanIp()
  if (!lanIp) throw new Error('未检测到 LAN IPv4，无法完成局域网证据')
  const serverStartedAt = Date.now()
  const logFd = fs.openSync(path.join(logsDir, 'server.log'), 'w')
  server = spawn(path.join(root, 'node_modules/.bin/next'), ['start', '-H', '0.0.0.0', '-p', String(port)], { cwd: root, env: { ...process.env, WORLDOS_DIST_DIR: distDirName, NEXT_TELEMETRY_DISABLED: '1' }, stdio: ['ignore', logFd, logFd] })
  baseUrl = `http://127.0.0.1:${port}`
  await waitForServer(`${baseUrl}/`)
  const lanStatus = await waitForServer(`http://${lanIp}:${port}/`)
  const firstBrowserCheckAt = Date.now()

  browserRuntime = await launchRealityBrowser('worldos-reality-evidence')
  const observations = []
  for (const route of routes) {
    for (const mode of ['desktop', 'mobile', 'text-hidden', 'background-hidden', 'reduced-motion', 'reduced-sensory', 'keyboard', 'storage-off', 'js-off']) {
      console.log(`[Reality evidence] ${route.id} ${mode}`)
      const observation = await captureMode(route, mode)
      observations.push(observation)
      if (!observation.sceneRect || observation.sceneRect.ratio < 0.7) failures.push(`${route.path} ${mode}: 场景主体不足首屏 70%`)
      if (observation.overflowX) failures.push(`${route.path} ${mode}: 横向溢出`)
      if (observation.engineeringCopy) failures.push(`${route.path} ${mode}: 公开工程文案`)
      if (observation.privateCanary) failures.push(`${route.path} ${mode}: 私密演练内容进入公开载荷`)
      if (observation.fixedOverlayIssues.length) failures.push(`${route.path} ${mode}: 大面积固定层 ${observation.fixedOverlayIssues.join(',')}`)
      if (mode === 'js-off' ? observation.links < 2 || observation.bodyTextLength < 80 : !observation.interactiveVisible) failures.push(`${route.path} ${mode}: 主交互或静态等价路径不可见`)
      if (mode === 'keyboard' && (!observation.keyboard?.firstFocus || observation.keyboard.firstFocus.href !== '#main-content' || !observation.keyboard.reachedSceneObject || !observation.keyboard.visibleFocus)) failures.push(`${route.path} keyboard: skip link、可见焦点或场景对象不可达`)
      if (mode === 'storage-off' && observation.storageAvailable) failures.push(`${route.path} storage-off: 存储未被禁用`)
      if (observation.browserErrors.length) failures.push(`${route.path} ${mode}: ${observation.browserErrors.join('; ')}`)
      const bitmapBudget = mode === 'mobile' || mode === 'reduced-sensory' ? 350 * 1024 : 700 * 1024
      if (observation.bitmapBytes > bitmapBudget) failures.push(`${route.path} ${mode}: 首屏 bitmap ${observation.bitmapBytes} > ${bitmapBudget}`)
      if (observation.audioBytes > 0 || observation.soundMode === 'playing') failures.push(`${route.path} ${mode}: 默认加载或播放声音`)
      if (mode === 'background-hidden' && observation.bitmapBytes > 64 * 1024) failures.push(`${route.path} ${mode}: 场景位图阻断后仍加载 ${observation.bitmapBytes} bytes bitmap`)
      if (mode === 'desktop' && observation.metrics) {
        const tbt = observation.metrics.longTasks.reduce((sum, duration) => sum + Math.max(0, duration - 50), 0)
        if (observation.metrics.lcp > 2500) failures.push(`${route.path}: LCP ${Math.round(observation.metrics.lcp)}ms > 2500ms`)
        if (observation.metrics.cls > 0.1) failures.push(`${route.path}: CLS ${observation.metrics.cls.toFixed(3)} > 0.1`)
        if (observation.metrics.longTasks.some((duration) => duration > 200)) failures.push(`${route.path}: 存在超过 200ms 的 long task`)
        if (tbt > 300) failures.push(`${route.path}: lab TBT ${Math.round(tbt)}ms > 300ms`)
      }
    }
  }
  const lanBaseUrl = `http://${lanIp}:${port}`
  const lanObservations = []
  for (const route of routes) {
    for (const mode of ['desktop', 'mobile']) {
      console.log(`[Reality evidence] LAN ${route.id} ${mode}`)
      const observation = await captureMode(route, mode, { targetBaseUrl: lanBaseUrl, screenshotPrefix: `lan-${route.id}` })
      lanObservations.push(observation)
      if (!observation.sceneRect || observation.sceneRect.ratio < 0.7 || !observation.interactiveVisible) failures.push(`LAN ${route.path} ${mode}: 场景主体或主交互不可见`)
      if (observation.overflowX || observation.engineeringCopy || observation.privateCanary || observation.fixedOverlayIssues.length) failures.push(`LAN ${route.path} ${mode}: 溢出、工程文案、私密载荷或固定层异常`)
      if (observation.browserErrors.length) failures.push(`LAN ${route.path} ${mode}: ${observation.browserErrors.join('; ')}`)
    }
  }
  const lanJourney = await runLanJourney(lanBaseUrl)
  if (!lanJourney.reachedAtlas || !lanJourney.focusedAtlas || lanJourney.errors.length) failures.push(`LAN 连续导航失败：${lanJourney.errors.join('; ')}`)
  const accessibility = await runAccessibilityChecks()
  if (!accessibility.focusedOnOpen || !accessibility.focusRestored || !accessibility.triggerKeyboardReachable || !accessibility.dialogClosed) failures.push('详情抽屉焦点进入/返回闭环失败')
  if (accessibility.zoom200.overflowX || accessibility.zoom200.links < 2) failures.push('200% 缩放等价检查出现溢出或可见链接丢失')
  const returnVisit = await recordReturnVisit()
  await browserRuntime.close()
  browserRuntime = null

  const flowCommands = [
    ['atlas', 'scripts/capture-world-atlas-evidence.mjs'],
    ['timeline-archive', 'scripts/capture-world-c4-evidence.mjs'],
    ['path-node', 'scripts/capture-world-c5-evidence.mjs'],
    ['migrations', 'scripts/capture-world-c6-migrations.mjs'],
    ['lighthouse', 'scripts/capture-world-c7-evidence.mjs'],
  ]
  for (const [name, script] of flowCommands) run('node', [script], { env: { WORLDOS_BASE_URL: baseUrl, WORLDOS_EVIDENCE_DIR: path.join(flowsDir, name) }, log: `flow-${name}.log` })

  const screenshotAliases = {
    'home-desktop-arrival.png': 'screenshots/gateway-desktop.jpg',
    'home-mobile-arrival.png': 'screenshots/gateway-mobile.jpg',
    'home-desktop-text-hidden.png': 'screenshots/gateway-text-hidden.jpg',
    'atlas-desktop-arrival.png': 'flows/atlas/atlas-arrival-desktop.png',
    'atlas-desktop-focused.png': 'flows/atlas/atlas-node-focused.png',
    'atlas-desktop-text-hidden.png': 'flows/atlas/atlas-text-hidden.png',
    'atlas-mobile-arrival.png': 'flows/atlas/atlas-mobile.png',
    'timeline-desktop-arrival.png': 'flows/timeline-archive/timeline-arrival-desktop.png',
    'timeline-desktop-focused.png': 'flows/timeline-archive/timeline-event-focused.png',
    'timeline-desktop-text-hidden.png': 'flows/timeline-archive/timeline-text-hidden.png',
    'timeline-mobile-arrival.png': 'flows/timeline-archive/timeline-mobile.png',
    'archive-desktop-arrival.png': 'flows/timeline-archive/archive-arrival-desktop.png',
    'archive-desktop-search.png': 'flows/timeline-archive/archive-search.png',
    'archive-desktop-text-hidden.png': 'flows/timeline-archive/archive-text-hidden.png',
    'archive-mobile-arrival.png': 'flows/timeline-archive/archive-mobile.png',
    'paths-desktop-overview.png': 'flows/path-node/paths-overview-desktop.png',
    'paths-desktop-progress.png': 'flows/path-node/path-progress.png',
    'paths-desktop-completed.png': 'flows/path-node/path-complete.png',
    'paths-desktop-text-hidden.png': 'flows/path-node/paths-overview-text-hidden.png',
    'paths-mobile-progress.png': 'flows/path-node/path-mobile.png',
    'node-desktop-arrival.png': 'flows/path-node/node-arrival.png',
    'node-desktop-reading.png': 'flows/path-node/node-reading.png',
    'node-desktop-relations.png': 'flows/path-node/node-relations.png',
    'node-desktop-text-hidden.png': 'flows/path-node/node-text-hidden.png',
    'node-mobile-reading.png': 'flows/path-node/node-mobile.png',
    'lighthouse-desktop-arrival.png': 'flows/lighthouse/lighthouse-arrival.png',
    'lighthouse-desktop-answer.png': 'flows/lighthouse/lighthouse-grounded.png',
    'lighthouse-desktop-fallback.png': 'flows/lighthouse/lighthouse-low-light.png',
    'lighthouse-image-fallback.png': 'flows/lighthouse/lighthouse-image-fallback.png',
    'lighthouse-desktop-text-hidden.png': 'flows/lighthouse/lighthouse-text-hidden.png',
    'lighthouse-mobile-arrival.png': 'flows/lighthouse/lighthouse-mobile.png',
    'home-desktop-reduced-motion.png': 'screenshots/gateway-reduced-motion.jpg',
    'atlas-desktop-reduced-motion.png': 'screenshots/atlas-reduced-motion.jpg',
    'timeline-desktop-reduced-motion.png': 'screenshots/timeline-reduced-motion.jpg',
    'archive-desktop-reduced-motion.png': 'screenshots/archive-reduced-motion.jpg',
    'paths-desktop-reduced-motion.png': 'screenshots/paths-reduced-motion.jpg',
    'node-desktop-reduced-motion.png': 'screenshots/node-reduced-motion.jpg',
    'lighthouse-desktop-reduced-motion.png': 'screenshots/lighthouse-reduced-motion.jpg',
  }
  for (const [targetName, relativeSource] of Object.entries(screenshotAliases)) {
    const source = path.join(reportDir, relativeSource)
    const target = path.join(screenshotsDir, targetName)
    if (!fs.existsSync(source)) {
      failures.push(`关键截图缺失：${relativeSource}`)
      continue
    }
    if (path.extname(source).toLowerCase() === '.png') fs.copyFileSync(source, target)
    else {
      const converted = spawnSync('ffmpeg', ['-nostdin', '-y', '-loglevel', 'error', '-i', source, '-frames:v', '1', target], { encoding: 'utf8' })
      if (converted.status !== 0) failures.push(`关键截图转换失败：${targetName}`)
    }
  }

  const requiredFlowSources = {
    'first-visit': 'migrations/gateway-atlas.mp4',
    'scene-migration': 'migrations/atlas-node.mp4',
    'atlas-exploration': 'atlas/atlas-exploration.mp4',
    'timeline-revisit': 'timeline-archive/timeline-review.mp4',
    'archive-retrieval': 'timeline-archive/archive-search.mp4',
    'path-journey': 'path-node/path-journey.mp4',
    'node-reading': 'path-node/node-explore.mp4',
    'lighthouse-guidance': 'lighthouse/lighthouse-guide.mp4',
    'return-visit-continuation': 'return-visit-continuation.mp4',
  }
  const recordingNames = {
    'first-visit': 'first-visit.webm',
    'scene-migration': 'scene-migration.webm',
    'atlas-exploration': 'atlas-explore.webm',
    'timeline-revisit': 'timeline-review.webm',
    'archive-retrieval': 'archive-search.webm',
    'path-journey': 'path-journey.webm',
    'node-reading': 'node-explore.webm',
    'lighthouse-guidance': 'lighthouse-guide.webm',
    'return-visit-continuation': 'returning-visit.webm',
  }
  for (const [id, relativeSource] of Object.entries(requiredFlowSources)) {
    const source = path.join(flowsDir, relativeSource)
    const target = path.join(recordingsDir, recordingNames[id])
    if (!fs.existsSync(source)) {
      failures.push(`${id}: 连续录屏源文件缺失`)
      continue
    }
    const encoded = spawnSync('ffmpeg', ['-nostdin', '-y', '-loglevel', 'error', '-i', source, '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-an', target], { encoding: 'utf8' })
    if (encoded.status !== 0) failures.push(`${id}: WebM 编码失败：${encoded.stderr}`)
  }
  const retainedFlowFiles = new Set([
    ...flowCommands.map(([name]) => path.normalize(`${name}/browser-observations.json`)),
  ])
  const pruneFlowEvidence = (directory, relativeDirectory = '') => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const relativePath = path.normalize(path.join(relativeDirectory, entry.name))
      const absolutePath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        pruneFlowEvidence(absolutePath, relativePath)
        if (fs.readdirSync(absolutePath).length === 0) fs.rmdirSync(absolutePath)
      } else if (!retainedFlowFiles.has(relativePath)) fs.rmSync(absolutePath, { force: true })
    }
  }
  pruneFlowEvidence(flowsDir)
  const flows = Object.fromEntries(Object.entries(recordingNames).map(([id, fileName]) => {
    const absolutePath = path.join(recordingsDir, fileName)
    if (!fs.existsSync(absolutePath)) failures.push(`${id}: 连续录屏缺失`)
    const probe = fs.existsSync(absolutePath)
      ? spawnSync('ffprobe', ['-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames:format=duration', '-of', 'json', absolutePath], { encoding: 'utf8' })
      : null
    const metadata = probe?.status === 0 ? JSON.parse(probe.stdout) : {}
    return [id, {
      path: path.relative(root, absolutePath),
      bytes: fs.existsSync(absolutePath) ? fs.statSync(absolutePath).size : 0,
      durationSeconds: Number(metadata.format?.duration ?? 0),
      frames: Number(metadata.streams?.[0]?.nb_read_frames ?? 0),
    }]
  }))
  flows['return-visit-continuation'].continued = returnVisit.continued
  flows['return-visit-continuation'].cleared = returnVisit.cleared
  const minimumFlowDurations = { 'first-visit': 1.4, 'path-journey': 8, 'return-visit-continuation': 2.2 }
  for (const [id, minimum] of Object.entries(minimumFlowDurations)) {
    if ((flows[id]?.durationSeconds ?? 0) < minimum) failures.push(`${id}: 录屏时长不足以覆盖固定流程，${flows[id]?.durationSeconds ?? 0}s < ${minimum}s`)
  }
  const pathFlowReport = JSON.parse(fs.readFileSync(path.join(flowsDir, 'path-node/browser-observations.json'), 'utf8'))
  if (pathFlowReport.flowChecks?.fullJourneyComplete !== true) failures.push('path-journey: 未证明完整旅程抵达')
  if (!returnVisit.continued || !returnVisit.cleared) failures.push('return-visit-continuation: 继续或清除流程不完整')

  const staticBundles = fs.existsSync(path.join(distDir, 'static'))
    ? fs.readdirSync(path.join(distDir, 'static'), { recursive: true }).filter((file) => typeof file === 'string' && file.endsWith('.js'))
    : []
  const forbiddenBundleTokens = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'private-leak-fixture', '不应写入的私密演练']
  const bundleLeaks = []
  for (const relativeFile of staticBundles) {
    const content = fs.readFileSync(path.join(distDir, 'static', relativeFile), 'utf8')
    for (const token of forbiddenBundleTokens) if (content.includes(token)) bundleLeaks.push({ file: relativeFile, token })
  }
  if (bundleLeaks.length) failures.push(`客户端 bundle 泄漏：${bundleLeaks.map((item) => item.token).join(',')}`)
  if (buildMetrics.sharedKb === null || buildMetrics.sharedKb > 130) failures.push(`shared First Load JS 超预算或不可解析：${buildMetrics.sharedKb}`)
  if (Object.keys(buildMetrics.routes).length !== routes.length) failures.push(`核心 route 构建体积仅解析 ${Object.keys(buildMetrics.routes).length}/${routes.length}`)
  for (const [pathname, metric] of Object.entries(buildMetrics.routes)) if (metric.firstLoadKb - buildMetrics.sharedKb > 80) failures.push(`${pathname} route JS 增量超预算`)
  const permissionCheck = run('npm', ['run', 'check:permission-boundary'], { log: 'permission-boundary.log' })
  const aiBoundaryCheck = run('npm', ['run', 'check:ai-provider-boundary'], { log: 'ai-provider-boundary.log' })
  const authoringCheck = run('npx', ['tsx', 'scripts/check-world-c8-authoring.ts'], { log: 'authoring-transaction.log' })
  const authoringEvidenceLine = authoringCheck.split(/\r?\n/).find((line) => line.startsWith('AUTHORING_EVIDENCE_JSON='))
  const authoringEvidence = authoringEvidenceLine ? JSON.parse(authoringEvidenceLine.slice('AUTHORING_EVIDENCE_JSON='.length)) : null
  const sceneAssets = JSON.parse(fs.readFileSync(path.join(root, 'data/assets/world-scene-assets.json'), 'utf8'))
  const sensoryAssets = JSON.parse(fs.readFileSync(path.join(root, 'data/domains/experience/sensory-audio-registry.json'), 'utf8'))
  const desktopPerformance = observations
    .filter((item) => item.mode === 'desktop')
    .map((item) => ({ scene: item.scene, route: item.route, bitmapBytes: item.bitmapBytes, audioBytes: item.audioBytes, metrics: item.metrics }))
  const auditArtifacts = {
    'browser-matrix.json': { runId, observations, lanObservations, lanJourney, accessibility, flows },
    'permission-boundary.json': { runId, bundleLeaks, permissionCheck: permissionCheck.trim(), aiBoundaryCheck: aiBoundaryCheck.trim(), passed: bundleLeaks.length === 0 },
    'performance-budget.json': { runId, build: buildMetrics, desktop: desktopPerformance, budgets: { sharedKb: 130, routeIncrementKb: 80, lcpMs: 2500, cls: 0.1, tbtMs: 300 } },
    'asset-license.json': {
      runId,
      sceneLicense: sceneAssets.license,
      sceneAssets: sceneAssets.assets.map((item) => ({ sceneId: item.sceneId, source: item.source, licenseId: item.licenseId, desktopBytes: item.desktop.bytes, mobileBytes: item.mobile.bytes })),
      audioProductionReadiness: sensoryAssets.productionReadiness,
      proceduralSoundscapes: sensoryAssets.sceneSoundscapes.map((item) => ({
        sceneId: item.sceneId,
        patch: item.proceduralPatch,
        cueDurationMs: item.durationMs,
        source: item.source,
        license: item.license,
      })),
      audioAssets: sensoryAssets.assetInventory,
    },
    'authoring-transaction.json': {
      runId,
      command: 'npx tsx scripts/check-world-c8-authoring.ts',
      evidence: authoringEvidence,
      output: authoringCheck.trim(),
      passed: /realWorkspaceUntouched=true/.test(authoringCheck)
        && authoringEvidence?.negativeCases?.length >= 6
        && authoringEvidence?.backup?.checksumsVerified === true
        && Object.values(authoringEvidence?.actualSceneImpact ?? {}).every(Boolean),
    },
  }
  for (const [fileName, value] of Object.entries(auditArtifacts)) fs.writeFileSync(path.join(auditsDir, fileName), `${JSON.stringify(value, null, 2)}\n`)
  const artifactTimes = {
    screenshots: fs.readdirSync(screenshotsDir).map((fileName) => ({ path: path.relative(root, path.join(screenshotsDir, fileName)), mtimeMs: fs.statSync(path.join(screenshotsDir, fileName)).mtimeMs })),
    recordings: fs.readdirSync(recordingsDir).map((fileName) => ({ path: path.relative(root, path.join(recordingsDir, fileName)), mtimeMs: fs.statSync(path.join(recordingsDir, fileName)).mtimeMs })),
  }
  const evidenceFinishedAt = Date.now()
  const freshness = { sourceMtime, buildStartedAt, buildArtifactMtime, serverStartedAt, firstBrowserCheckAt, evidenceFinishedAt, valid: sourceMtime < buildStartedAt && buildStartedAt <= buildArtifactMtime && buildArtifactMtime < serverStartedAt && serverStartedAt < firstBrowserCheckAt && firstBrowserCheckAt <= evidenceFinishedAt }
  if (!freshness.valid) failures.push('source -> build -> server -> evidence 时间链无效')

  const manifest = {
    schemaVersion: 1,
    runId,
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'defects-found' : 'objective-evidence-captured',
    acceptanceContract: {
      path: path.relative(root, acceptanceContractPath),
      schemaVersion: acceptanceContract.schemaVersion,
      status: acceptanceContract.status,
      scenes: acceptanceContract.scenes.length,
      views: acceptanceContract.views.length,
      flows: acceptanceContract.flows.length,
      target: acceptanceContract.targets.currentGoalFinal,
    },
    aiMode: process.env.OPENAI_API_KEY ? 'provider-present-unreviewed' : 'low-light',
    source: { commit: sourceCommit, worktreeChangesAtStart: sourceStatus },
    server: { localhost: baseUrl, lan: `http://${lanIp}:${port}`, lanStatus },
    freshness,
    build: buildMetrics,
    browser: { version: browserVersion, viewports: [{ id: 'desktop', width: 1440, height: 900 }, { id: 'mobile', width: 390, height: 844 }, { id: 'zoom-200', width: 720, height: 450 }], observations, lanObservations, lanJourney, accessibility },
    flows,
    artifactTimes,
    privacy: { bundleLeaks },
    commands: [
      'npm run build:production-ci',
      'next start -H 0.0.0.0',
      `${observations.length} route/mode browser captures + 200% zoom`,
      '14 LAN route/mode browser captures + LAN Gateway -> Atlas journey',
      ...flowCommands.map(([, script]) => `node ${script}`),
      'npm run check:permission-boundary',
      'npm run check:ai-provider-boundary',
      'npx tsx scripts/check-world-c8-authoring.ts',
    ],
    audits: Object.keys(auditArtifacts).map((fileName) => path.relative(root, path.join(auditsDir, fileName))),
    failures,
    note: '本 manifest 只记录客观事实；视觉是否达到世界体验仍需逐图、逐录屏和独立 Reality Audit。',
  }
  fs.writeFileSync(path.join(reportDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  fs.writeFileSync(latestPointer, `${JSON.stringify({ runId, manifest: path.relative(root, path.join(reportDir, 'manifest.json')), generatedAt: manifest.generatedAt }, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`Reality-First objective evidence captured: ${runId}, screenshots=${observations.length + 1}, flows=${Object.keys(flows).length}`)
} finally {
  if (browserRuntime) await browserRuntime.close().catch(() => {})
  if (server?.exitCode === null) {
    server.kill('SIGTERM')
    await Promise.race([new Promise((resolve) => server.once('exit', resolve)), delay(2500)])
  }
  for (const [file, content] of configSnapshots) fs.writeFileSync(path.join(root, file), content)
  fs.rmSync(distDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 })
}
