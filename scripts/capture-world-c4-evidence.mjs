import fs from 'node:fs'
import path from 'node:path'
import { capturePng, delay, evaluate, launchRealityBrowser, recordPageScreencast, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-reality-first/c4-scenes-2026-07-10/final')
fs.mkdirSync(outputDir, { recursive: true })
const launch = await launchRealityBrowser('worldos-c4-evidence')
const observations = []

const inputExpression = (selector, value) => `(() => { const input=document.querySelector(${JSON.stringify(selector)}); const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; setter.call(input,${JSON.stringify(value)}); input.dispatchEvent(new Event('input',{bubbles:true})) })()`
const selectExpression = (selector, value) => `(() => { const select=document.querySelector(${JSON.stringify(selector)}); select.value=${JSON.stringify(value)}; select.dispatchEvent(new Event('change',{bubbles:true})) })()`

async function navigate(page, pathname, readySelector) {
  await page.send('Page.navigate', { url: `${baseUrl}${pathname}` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector(${JSON.stringify(readySelector)})`, 15000)) throw new Error(`${pathname} 未在时限内就绪`)
  await delay(800)
}

async function observe(page, mode, scene) {
  const value = await evaluate(page.send, `(() => {
    const viewport=document.querySelector('[data-world-scene="${scene}"]'); const rect=viewport?.getBoundingClientRect();
    const dialog=document.querySelector('[role="dialog"]')?.getBoundingClientRect(); const mobileNav=document.querySelector('[data-testid="mobile-primary-navigation"]'); const mobileRect=mobileNav&&getComputedStyle(mobileNav).display!=='none'?mobileNav.getBoundingClientRect():null;
    return { viewport:rect?{top:rect.top,width:rect.width,height:rect.height}:null, horizontalOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth, engineeringCopy:/Motion Layer|Fallback|Evidence|场景证据|M24 SVG PILOT/.test(document.body.innerText), inspectorOverlapsMobileNav:Boolean(dialog&&mobileRect&&dialog.bottom>mobileRect.top), anchorCount:document.querySelectorAll('[data-time-anchor]').length, activeAnchor:document.querySelector('[data-time-anchor][aria-pressed="true"]')?.getAttribute('data-time-anchor')??null, timelineInspector:Boolean(document.querySelector('[data-testid="timeline-event-inspector"]')), shelfCount:document.querySelectorAll('[data-archive-shelf]').length, litRecordCount:document.querySelectorAll('[data-archive-record]').length, archiveInspector:Boolean(document.querySelector('[data-testid="archive-record-inspector"]')), archiveEmpty:Boolean(document.querySelector('[data-testid="archive-empty"]')), fuseState:document.querySelector('[data-fuse-state]')?.getAttribute('data-fuse-state')??null, soundMode:document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode')??null } })()`)
  observations.push({ mode, scene, ...value, errors: page.errors.filter(Boolean) })
}

async function captureMode({ mode, scene, pathname, width, height, mobile = false, reducedMotion = false, beforeNavigate, setup, allowNetworkFailure = false }) {
  const page = await launch.createPage({ width, height, mobile, reducedMotion })
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `
    localStorage.removeItem('guyue-world:timeline-anchor');
    localStorage.removeItem('guyue-world:archive-context');
  ` })
  if (beforeNavigate) await beforeNavigate(page)
  await navigate(page, pathname, scene === 'timeline' ? '[data-time-anchor]' : '[data-testid="archive-catalogue-desk"]')
  if (setup) await setup(page)
  await delay(550)
  await capturePng(page.send, path.join(outputDir, `${mode}.png`))
  await observe(page, mode, scene)
  if (allowNetworkFailure) observations.at(-1).expectedNetworkFailure = true
}

async function recordFlow({ name, pathname, readySelector, actions }) {
  const page = await launch.createPage({ width: 1280, height: 720 })
  await navigate(page, pathname, readySelector)
  const recording = await recordPageScreencast({ browser: launch.browser, page, outputPath: path.join(outputDir, `${name}.mp4`), action: async () => { await actions(page); await delay(700) } })
  return recording.frames
}

try {
  await captureMode({ mode: 'timeline-arrival-desktop', scene: 'timeline', pathname: '/timeline', width: 1440, height: 900 })
  await captureMode({ mode: 'timeline-event-focused', scene: 'timeline', pathname: '/timeline', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, `document.querySelector('[data-time-event]')?.click()`); await waitForExpression(page.send, `!!document.querySelector('[data-testid="timeline-event-inspector"]')`) } })
  await captureMode({ mode: 'timeline-mobile', scene: 'timeline', pathname: '/timeline', width: 390, height: 844, mobile: true })
  await captureMode({ mode: 'timeline-reduced-motion', scene: 'timeline', pathname: '/timeline', width: 1440, height: 900, reducedMotion: true })
  await captureMode({ mode: 'timeline-text-hidden', scene: 'timeline', pathname: '/timeline', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style>body *{color:transparent!important;text-shadow:none!important}</style>')`) } })
  await captureMode({ mode: 'timeline-image-fallback', scene: 'timeline', pathname: '/timeline', width: 1440, height: 900, allowNetworkFailure: true, beforeNavigate: async (page) => { await page.send('Network.setBlockedURLs', { urls: ['*/world/scenes/timeline/*', '*url=%2Fworld%2Fscenes%2Ftimeline%2F*'] }) } })

  await captureMode({ mode: 'archive-arrival-desktop', scene: 'archive', pathname: '/archive', width: 1440, height: 900 })
  await captureMode({ mode: 'archive-search', scene: 'archive', pathname: '/archive', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, inputExpression('[aria-label="搜索公开卷宗"]', '灯塔')); await waitForExpression(page.send, `document.querySelector('[data-fuse-state]')?.getAttribute('data-fuse-state')==='ready'`) } })
  await captureMode({ mode: 'archive-filtered', scene: 'archive', pathname: '/archive', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, inputExpression('[aria-label="搜索公开卷宗"]', '灯塔')); await waitForExpression(page.send, `document.querySelector('[data-fuse-state]')?.getAttribute('data-fuse-state')==='ready'`); await evaluate(page.send, selectExpression('[aria-label="按馆藏分区筛选"]', 'tech')); await delay(300) } })
  await captureMode({ mode: 'archive-empty', scene: 'archive', pathname: '/archive', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, inputExpression('[aria-label="搜索公开卷宗"]', '不存在的银河钥匙XYZ')); await waitForExpression(page.send, `!!document.querySelector('[data-testid="archive-empty"]')`) } })
  await captureMode({ mode: 'archive-record-focused', scene: 'archive', pathname: '/archive', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, `document.querySelector('[data-archive-record]')?.click()`); await waitForExpression(page.send, `!!document.querySelector('[data-testid="archive-record-inspector"]')`) } })
  await captureMode({ mode: 'archive-mobile', scene: 'archive', pathname: '/archive', width: 390, height: 844, mobile: true })
  await captureMode({ mode: 'archive-reduced-motion', scene: 'archive', pathname: '/archive', width: 1440, height: 900, reducedMotion: true })
  await captureMode({ mode: 'archive-reduced-sensory', scene: 'archive', pathname: '/archive', width: 1440, height: 900, beforeNavigate: async (page) => { await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('guyue-world:soundscape-preference','muted')` }) } })
  await captureMode({ mode: 'archive-text-hidden', scene: 'archive', pathname: '/archive', width: 1440, height: 900, setup: async (page) => { await evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style>body *{color:transparent!important;text-shadow:none!important}</style>')`) } })
  await captureMode({ mode: 'archive-image-fallback', scene: 'archive', pathname: '/archive', width: 1440, height: 900, allowNetworkFailure: true, beforeNavigate: async (page) => { await page.send('Network.setBlockedURLs', { urls: ['*/world/scenes/archive/*', '*url=%2Fworld%2Fscenes%2Farchive%2F*'] }) } })

  const timelineFrames = await recordFlow({ name: 'timeline-review', pathname: '/timeline', readySelector: '[data-time-anchor]', actions: async (page) => {
    await evaluate(page.send, `document.querySelector('[data-time-anchor="time-2026-06-30"]')?.click()`)
    if (!await waitForExpression(page.send, `!!document.querySelector('[data-time-event]')`)) throw new Error('时间河录屏未找到当前河段事件')
    await delay(900)
    await evaluate(page.send, `document.querySelector('[data-time-event]')?.click()`)
    if (!await waitForExpression(page.send, `!!document.querySelector('[data-testid="timeline-event-inspector"]')`)) throw new Error('时间河录屏未打开事件详情')
    await delay(1200)
    await evaluate(page.send, `document.querySelector('[aria-label="关闭详情"]')?.click()`)
    await evaluate(page.send, `document.querySelector('[aria-label="回到最新河段"]')?.click()`)
    if (!await waitForExpression(page.send, `document.querySelector('[data-time-anchor="time-2026-07-08"]')?.getAttribute('aria-pressed')==='true'`)) throw new Error('时间河录屏未回到最新河段')
    await delay(900)
  } })
  const archiveFrames = await recordFlow({ name: 'archive-search', pathname: '/archive', readySelector: '[data-testid="archive-catalogue-desk"]', actions: async (page) => { await evaluate(page.send, inputExpression('[aria-label="搜索公开卷宗"]', '灯塔')); await waitForExpression(page.send, `document.querySelector('[data-fuse-state]')?.getAttribute('data-fuse-state')==='ready'`); await delay(900); await evaluate(page.send, `document.querySelector('[data-archive-record]')?.click()`); await delay(900); await evaluate(page.send, `document.querySelector('[aria-label="关闭详情"]')?.click()`); await evaluate(page.send, `document.querySelector('[aria-label="清除档案馆筛选"]')?.click()`); await delay(900) } })

  const timelinePage = await launch.createPage({ width: 1280, height: 720 })
  await navigate(timelinePage, '/timeline', '[data-time-anchor]')
  const initialAnchor = await evaluate(timelinePage.send, `document.querySelector('[data-time-anchor][aria-pressed="true"]')?.getAttribute('data-time-anchor')`)
  await evaluate(timelinePage.send, `document.querySelector('[data-time-anchor][aria-pressed="true"]')?.focus()`)
  await timelinePage.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 }); await timelinePage.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 }); await delay(500)
  const keyboardAnchor = await evaluate(timelinePage.send, `document.querySelector('[data-time-anchor][aria-pressed="true"]')?.getAttribute('data-time-anchor')`)
  await evaluate(timelinePage.send, `document.querySelector('[data-time-anchor="time-2026-06-30"]')?.click()`); await delay(250); await timelinePage.send('Page.reload')
  const anchorRestored = await waitForExpression(timelinePage.send, `document.querySelector('[data-time-anchor="time-2026-06-30"]')?.getAttribute('aria-pressed')==='true'`, 10000)
  await evaluate(timelinePage.send, `document.querySelector('[data-time-anchor="time-2026-07-08"]')?.click()`); await delay(300); await evaluate(timelinePage.send, `document.querySelector('[data-time-event]')?.click()`); const timelineInspectorOpened = await waitForExpression(timelinePage.send, `!!document.querySelector('[data-testid="timeline-event-inspector"]')`)

  const archivePage = await launch.createPage({ width: 1280, height: 720 })
  await navigate(archivePage, '/archive', '[data-testid="archive-catalogue-desk"]')
  const scriptsBeforeSearch = await evaluate(archivePage.send, `performance.getEntriesByType('resource').filter(x=>x.initiatorType==='script').length`)
  await evaluate(archivePage.send, inputExpression('[aria-label="搜索公开卷宗"]', 'Agent')); const fuseReady = await waitForExpression(archivePage.send, `document.querySelector('[data-fuse-state]')?.getAttribute('data-fuse-state')==='ready'`, 10000)
  const scriptsAfterSearch = await evaluate(archivePage.send, `performance.getEntriesByType('resource').filter(x=>x.initiatorType==='script').length`)
  await evaluate(archivePage.send, selectExpression('[aria-label="按馆藏分区筛选"]', 'tech')); await delay(350)
  const filteredCount = await evaluate(archivePage.send, `document.querySelectorAll('[data-archive-record]').length`)
  await evaluate(archivePage.send, `document.querySelector('[data-archive-record]')?.click()`); const archiveInspectorOpened = await waitForExpression(archivePage.send, `!!document.querySelector('[data-testid="archive-record-inspector"]')`)
  const expectedNodePath = await evaluate(archivePage.send, `new URL(document.querySelector('[data-archive-enter-node]').href).pathname`); await evaluate(archivePage.send, `document.querySelector('[data-archive-enter-node]')?.click()`); const reachedNode = await waitForExpression(archivePage.send, `location.pathname===${JSON.stringify(expectedNodePath)}`, 12000); await evaluate(archivePage.send, `history.back()`)
  const archiveReturned = await waitForExpression(archivePage.send, `location.pathname==='/archive'&&document.querySelector('[aria-label="搜索公开卷宗"]')?.value==='Agent'&&document.querySelector('[aria-label="按馆藏分区筛选"]')?.value==='tech'`, 12000)
  await evaluate(archivePage.send, inputExpression('[aria-label="搜索公开卷宗"]', '不存在的银河钥匙XYZ')); const emptyState = await waitForExpression(archivePage.send, `!!document.querySelector('[data-testid="archive-empty"]')`, 10000)

  const flowChecks = { timelineKeyboardChangedAnchor: initialAnchor !== keyboardAnchor, timelineAnchorRestored: anchorRestored, timelineInspectorOpened, fuseLoadedOnlyAfterInput: fuseReady && scriptsAfterSearch === scriptsBeforeSearch + 1, archiveFilterChangedCollection: filteredCount > 0 && filteredCount < 6, archiveInspectorOpened, archiveReachedNode: reachedNode, archiveContextRestored: archiveReturned, archiveEmptyState: emptyState }
  const failures = observations.flatMap((item) => {
    const issues = []
    if (!item.viewport || item.viewport.top !== 0) issues.push(`${item.mode}: viewport 未从首屏开始`)
    if (item.horizontalOverflow) issues.push(`${item.mode}: 横向溢出`)
    if (item.engineeringCopy) issues.push(`${item.mode}: 公开工程验收文案`)
    if (item.inspectorOverlapsMobileNav) issues.push(`${item.mode}: inspector 与移动导航重叠`)
    if (item.scene === 'timeline' && item.anchorCount !== 7) issues.push(`${item.mode}: 时间锚数量异常`)
    if (item.scene === 'archive' && item.shelfCount !== 8) issues.push(`${item.mode}: 书架数量异常`)
    if (item.errors.length && !item.expectedNetworkFailure) issues.push(`${item.mode}: ${item.errors.join('; ')}`)
    return issues
  })
  for (const [name, passed] of Object.entries(flowChecks)) if (!passed) failures.push(`flow: ${name} 未通过`)
  const report = { generatedAt: new Date().toISOString(), baseUrl, observations, flowChecks, recordings: { timelineFrames, archiveFrames }, failures }
  fs.writeFileSync(path.join(outputDir, 'browser-observations.json'), `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C4 evidence captured. modes=${observations.length} timelineFrames=${timelineFrames} archiveFrames=${archiveFrames} failures=0`)
} finally {
  await launch.close()
}
