import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { capturePng, delay, evaluate, launchRealityBrowser, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-reality-first/c5-journey-2026-07-10/final')
fs.mkdirSync(outputDir, { recursive: true })
const launch = await launchRealityBrowser('worldos-c5-evidence')
const observations = []

async function navigate(page, pathname, selector) {
  await page.send('Page.navigate', { url: `${baseUrl}${pathname}` })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector(${JSON.stringify(selector)})`, 20000)) throw new Error(`${pathname} 未就绪`)
  await delay(700)
}

async function observe(page, mode, scene) {
  const value = await evaluate(page.send, `(() => {
    const viewport=document.querySelector('[data-world-scene="${scene}"]')?.getBoundingClientRect();
    const reading=document.querySelector('.reading-container')?.getBoundingClientRect();
    return {viewport:viewport?{top:viewport.top,width:viewport.width,height:viewport.height}:null,horizontalOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,engineeringCopy:/Motion Layer|Fallback|Evidence|场景证据|Scene QA/.test(document.body.innerText),routeCount:document.querySelectorAll('[data-path-route]').length,waypointCount:document.querySelectorAll('[data-path-step]').length,nodeDoorCount:document.querySelectorAll('[data-world-scene="node"] [href*="via=relation"]').length,pathComplete:Boolean(document.querySelector('[data-testid="path-complete"]')),journeyControls:Boolean(document.querySelector('[data-testid="node-journey-controls"]')),readingWidth:reading?.width??null,soundMode:document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode')??null}
  })()`)
  observations.push({ mode, scene, ...value, errors: page.errors.filter(Boolean) })
}

async function captureMode({ mode, scene, pathname, width = 1440, height = 900, mobile = false, reducedMotion = false, init, setup, blockAsset = false }) {
  const page = await launch.createPage({ width, height, mobile, reducedMotion })
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.removeItem('guyue-world:path-progress')` })
  if (init) await page.send('Page.addScriptToEvaluateOnNewDocument', { source: init })
  if (blockAsset) await page.send('Network.setBlockedURLs', { urls: [`*/world/scenes/${scene}/*`, `*url=%2Fworld%2Fscenes%2F${scene}%2F*`] })
  const ready = scene === 'paths' ? '[data-world-scene="paths"]' : '[data-world-scene="node"]'
  await navigate(page, pathname, ready)
  if (setup) await setup(page)
  await delay(500)
  await capturePng(page.send, path.join(outputDir, `${mode}.png`))
  await observe(page, mode, scene)
  if (blockAsset) observations.at(-1).expectedNetworkFailure = true
}

async function recordFlow(name, pathname, actions) {
  const page = await launch.createPage({ width: 1280, height: 720 })
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.removeItem('guyue-world:path-progress')` })
  await navigate(page, pathname, '[data-world-scene]')
  const framesDir = path.join(outputDir, `${name}-frames`)
  fs.rmSync(framesDir, { recursive: true, force: true }); fs.mkdirSync(framesDir, { recursive: true })
  const initialFrame = await page.send('Page.captureScreenshot', { format: 'jpeg', quality: 82, captureBeyondViewport: false })
  fs.writeFileSync(path.join(framesDir, 'frame-0001.jpg'), Buffer.from(initialFrame.data, 'base64'))
  let frameIndex = 1; let accepting = true
  const off = launch.browser.on('Page.screencastFrame', async (params) => { if (!accepting) return; frameIndex += 1; fs.writeFileSync(path.join(framesDir, `frame-${String(frameIndex).padStart(4, '0')}.jpg`), Buffer.from(params.data, 'base64')); await page.send('Page.screencastFrameAck', { sessionId: params.sessionId }) })
  await page.send('Page.startScreencast', { format: 'jpeg', quality: 82, maxWidth: 1280, maxHeight: 720, everyNthFrame: 1 })
  await actions(page); await delay(700); accepting = false; await page.send('Page.stopScreencast'); off()
  const target = path.join(outputDir, `${name}.mp4`)
  const ffmpeg = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '12', '-i', path.join(framesDir, 'frame-%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target], { encoding: 'utf8' })
  if (ffmpeg.status !== 0) throw new Error(`${name} 编码失败：${ffmpeg.stderr}`)
  fs.rmSync(framesDir, { recursive: true, force: true })
  return frameIndex
}

try {
  const progressState = `localStorage.setItem('guyue-world:path-progress',JSON.stringify({'first-visit':{currentIndex:2,completed:false,updatedAt:new Date().toISOString()}}))`
  const completeState = `localStorage.setItem('guyue-world:path-progress',JSON.stringify({'first-visit':{currentIndex:7,completed:true,updatedAt:new Date().toISOString()}}))`
  const hideText = async (page) => evaluate(page.send, `document.head.insertAdjacentHTML('beforeend','<style>body *{color:transparent!important;text-shadow:none!important}</style>')`)
  const scrollTo = (selector) => async (page) => { await evaluate(page.send, `document.querySelector(${JSON.stringify(selector)})?.scrollIntoView()`); await delay(400) }

  await captureMode({ mode: 'paths-overview-desktop', scene: 'paths', pathname: '/paths' })
  await captureMode({ mode: 'paths-overview-mobile', scene: 'paths', pathname: '/paths', width: 390, height: 844, mobile: true })
  await captureMode({ mode: 'paths-overview-text-hidden', scene: 'paths', pathname: '/paths', setup: hideText })
  await captureMode({ mode: 'paths-overview-image-fallback', scene: 'paths', pathname: '/paths', blockAsset: true })
  await captureMode({ mode: 'path-start', scene: 'paths', pathname: '/paths/first-visit' })
  await captureMode({ mode: 'path-progress', scene: 'paths', pathname: '/paths/first-visit', init: progressState })
  await captureMode({ mode: 'path-complete', scene: 'paths', pathname: '/paths/first-visit', init: completeState })
  await captureMode({ mode: 'path-mobile', scene: 'paths', pathname: '/paths/first-visit', width: 390, height: 844, mobile: true })
  await captureMode({ mode: 'path-reduced-motion', scene: 'paths', pathname: '/paths/first-visit', reducedMotion: true })

  await captureMode({ mode: 'node-arrival', scene: 'node', pathname: '/node/world-manifesto' })
  await captureMode({ mode: 'node-path-context', scene: 'node', pathname: '/node/world-manifesto?fromPath=first-visit&step=0' })
  await captureMode({ mode: 'node-reading', scene: 'node', pathname: '/node/world-manifesto', setup: scrollTo('#reading') })
  await captureMode({ mode: 'node-relations', scene: 'node', pathname: '/node/world-manifesto', setup: scrollTo('.node-relation-rail') })
  await captureMode({ mode: 'node-mobile', scene: 'node', pathname: '/node/world-manifesto', width: 390, height: 844, mobile: true })
  await captureMode({ mode: 'node-reduced-motion', scene: 'node', pathname: '/node/world-manifesto', reducedMotion: true })
  await captureMode({ mode: 'node-reduced-sensory', scene: 'node', pathname: '/node/world-manifesto', init: `localStorage.setItem('guyue-world:soundscape-preference','muted')` })
  await captureMode({ mode: 'node-text-hidden', scene: 'node', pathname: '/node/world-manifesto', setup: hideText })
  await captureMode({ mode: 'node-image-fallback', scene: 'node', pathname: '/node/world-manifesto', blockAsset: true })

  const pathFrames = await recordFlow('path-journey', '/paths/first-visit', async (page) => {
    if (!await waitForExpression(page.send, `!!document.querySelector('[data-image-ready="true"]')`)) throw new Error('路径录屏起点位图未就绪')
    await delay(1000)
    await evaluate(page.send, `document.querySelector('[data-testid="path-waypoint-ledger"] a')?.click()`)
    for (let step = 0; step < 7; step += 1) {
      if (!await waitForExpression(page.send, `!!document.querySelector('[data-testid="node-journey-controls"] button')`)) throw new Error(`路径录屏第 ${step + 1} 站未抵达`)
      if (!await waitForExpression(page.send, `document.querySelector('[data-world-scene="node"]')?.parentElement?.getAttribute('data-image-ready')==='true'`)) throw new Error(`路径录屏第 ${step + 1} 站位图未就绪`)
      await delay(650)
      await evaluate(page.send, `document.querySelector('[data-testid="node-journey-controls"] button')?.click()`)
      if (step < 6 && !await waitForExpression(page.send, `new URLSearchParams(location.search).get('step')==='${step + 1}'`)) throw new Error(`路径录屏第 ${step + 2} 站未继续`)
    }
    if (!await waitForExpression(page.send, `location.pathname==='/paths/first-visit'&&!!document.querySelector('[data-testid="path-complete"]')`)) throw new Error('路径录屏未出现完整抵达仪式')
    await delay(1600)
  })
  const nodeFrames = await recordFlow('node-explore', '/node/world-manifesto', async (page) => {
    await evaluate(page.send, `document.querySelector('[href="#reading"]')?.click()`); await delay(1000)
    await evaluate(page.send, `document.querySelector('.node-relation-rail')?.scrollIntoView()`); await delay(1000)
    const target = await evaluate(page.send, `document.querySelector('.node-relation-rail a')?.getAttribute('href')`)
    await evaluate(page.send, `document.querySelector('.node-relation-rail a')?.click()`)
    if (!target || !await waitForExpression(page.send, `location.pathname!== '/node/world-manifesto'`)) throw new Error('Node 录屏未穿过关系门')
    await delay(1000); await evaluate(page.send, `history.back()`); if (!await waitForExpression(page.send, `location.pathname==='/node/world-manifesto'`)) throw new Error('Node 录屏未返回来源地点')
  })

  const flowPage = await launch.createPage({ width: 1280, height: 720 })
  await flowPage.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.removeItem('guyue-world:path-progress')` })
  await navigate(flowPage, '/paths/first-visit', '[data-testid="path-waypoint-ledger"] a')
  await evaluate(flowPage.send, `document.querySelector('[data-testid="path-waypoint-ledger"] a')?.click()`)
  const journeyNodes = []
  for (let step = 0; step < 7; step += 1) {
    if (!await waitForExpression(flowPage.send, `!!document.querySelector('[data-testid="node-journey-controls"] button')`)) throw new Error(`完整旅程第 ${step + 1} 站未抵达`)
    await delay(500); journeyNodes.push(await evaluate(flowPage.send, `location.pathname`)); await evaluate(flowPage.send, `document.querySelector('[data-testid="node-journey-controls"] button')?.click()`)
    if (step < 6 && !await waitForExpression(flowPage.send, `new URLSearchParams(location.search).get('step')==='${step + 1}'`)) throw new Error(`完整旅程第 ${step + 2} 站未继续`)
  }
  const fullJourneyComplete = await waitForExpression(flowPage.send, `location.pathname==='/paths/first-visit'&&!!document.querySelector('[data-testid="path-complete"]')`)
  await evaluate(flowPage.send, `document.querySelector('[title="重置本路线"]')?.click()`); await delay(300)
  const resetPassed = await evaluate(flowPage.send, `!document.querySelector('[data-testid="path-complete"]')&&document.body.innerText.includes('当前位置 1 / 7')`)

  const worldIndex = JSON.parse(fs.readFileSync(path.resolve('public/world-index.json'), 'utf8'))
  const publicNodes = worldIndex.nodes.filter((node) => node.visibility === 'public')
  const sampleSlugs = Array.from({ length: 12 }, (_, index) => publicNodes[Math.floor(index * publicNodes.length / 12)]?.slug).filter(Boolean)
  const sampleNodeChecks = []
  for (const slug of sampleSlugs) {
    const page = await launch.createPage({ width: 1024, height: 720 })
    await navigate(page, `/node/${slug}`, '[data-world-scene="node"]')
    sampleNodeChecks.push(await evaluate(page.send, `(() => ({slug:${JSON.stringify(slug)},title:Boolean(document.querySelector('h1')),doors:document.querySelectorAll('[data-world-scene="node"] [href*="via=relation"]').length,exits:document.querySelectorAll('[data-world-scene="node"] nav a').length,reading:Boolean(document.querySelector('#reading')),engineering:/Motion Layer|Fallback|Evidence|场景证据/.test(document.body.innerText),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth}))()`))
  }

  const flowChecks = { pathOverviewSelectsRoute: observations.find((item) => item.mode === 'paths-overview-desktop')?.routeCount === 6, fullJourneyComplete, resetPassed, journeyHasSevenUniqueNodes: new Set(journeyNodes).size === 7, nodePathContextVisible: observations.find((item) => item.mode === 'node-path-context')?.journeyControls === true, readingWidthWithin72ch: (observations.find((item) => item.mode === 'node-reading')?.readingWidth ?? 9999) <= 760, twelveNodesPass: sampleNodeChecks.length === 12 && sampleNodeChecks.every((item) => item.title && item.doors >= 2 && item.exits >= 4 && item.reading && !item.engineering && !item.overflow) }
  const failures = observations.flatMap((item) => {
    const issues = []
    if (!item.viewport || (item.mode !== 'node-reading' && item.mode !== 'node-relations' && item.viewport.top !== 0)) issues.push(`${item.mode}: viewport 异常`)
    if (item.horizontalOverflow) issues.push(`${item.mode}: 横向溢出`)
    if (item.engineeringCopy) issues.push(`${item.mode}: 公开工程文案`)
    if (item.errors.length && !item.expectedNetworkFailure) issues.push(`${item.mode}: ${item.errors.join('; ')}`)
    return issues
  })
  for (const [name, passed] of Object.entries(flowChecks)) if (!passed) failures.push(`flow: ${name} 未通过`)
  const report = { generatedAt: new Date().toISOString(), baseUrl, observations, flowChecks, sampleNodeChecks, recordings: { pathFrames, nodeFrames }, failures }
  fs.writeFileSync(path.join(outputDir, 'browser-observations.json'), `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C5 evidence captured. modes=${observations.length} pathFrames=${pathFrames} nodeFrames=${nodeFrames} sampleNodes=${sampleNodeChecks.length}`)
} finally {
  await launch.close()
}
