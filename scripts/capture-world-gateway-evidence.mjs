import fs from 'node:fs'
import path from 'node:path'
import {
  capturePng,
  delay,
  evaluate,
  launchRealityBrowser,
  waitForExpression,
} from './lib/reality-first-browser.mjs'

const root = process.cwd()
const baseUrl = process.env.WORLDOS_BASE_URL ?? 'http://127.0.0.1:3410'
const outputDir = path.join(root, 'docs/90-archive/reports/worldos-reality-first/c2-gateway-2026-07-10/after')
const origin = new URL(baseUrl).origin
const findings = []

async function openHome(page) {
  await page.send('Page.navigate', { url: `${baseUrl}/` })
  const ready = await waitForExpression(page.send, `document.querySelector('[data-enhanced="true"]') !== null`)
  if (!ready) throw new Error('Gateway 未在 10 秒内完成增强挂载')
  await delay(500)
}

async function clearLocalState(page) {
  await page.send('Storage.clearDataForOrigin', { origin, storageTypes: 'local_storage' })
}

async function inspect(page, mode) {
  const result = await evaluate(page.send, `(() => {
    const viewport = document.querySelector('[data-testid="world-viewport-gateway"]')
    const rect = viewport?.getBoundingClientRect()
    return {
      mode: ${JSON.stringify(mode)},
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      viewportRatio: rect ? Number(((rect.width * rect.height) / (innerWidth * innerHeight)).toFixed(3)) : 0,
      engineeringCopy: /Motion Layer|Fallback|Evidence|场景证据|9\\/10|8\\.9/.test(document.body.innerText),
      entered: document.querySelector('[data-entered="true"]') !== null,
      hasPrimaryAction: Boolean(document.querySelector('[data-testid="gateway-enter"]')),
      hasReturning: Boolean(document.querySelector('[data-testid="gateway-returning"]')),
      browserErrors: ${JSON.stringify(page.errors.filter(Boolean))},
    }
  })()`)
  if (result.overflowX) findings.push(`${mode}: horizontal overflow`)
  if (result.viewportRatio < 0.9) findings.push(`${mode}: scene subject ratio too small (${result.viewportRatio})`)
  if (result.engineeringCopy) findings.push(`${mode}: public engineering copy found`)
  if (result.browserErrors.length > 0) findings.push(`${mode}: ${result.browserErrors.join('; ')}`)
  return result
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true })
  const runtime = await launchRealityBrowser('worldos-c2-gateway')
  const observations = []
  try {
    const desktop = await runtime.createPage({ width: 1440, height: 900 })
    await clearLocalState(desktop)
    await openHome(desktop)
    observations.push(await inspect(desktop, 'desktop-first'))
    await capturePng(desktop.send, path.join(outputDir, 'home-desktop-first.png'))

    const mobile = await runtime.createPage({ width: 390, height: 844, mobile: true })
    await clearLocalState(mobile)
    await openHome(mobile)
    observations.push(await inspect(mobile, 'mobile-first'))
    await capturePng(mobile.send, path.join(outputDir, 'home-mobile-first.png'))

    const returning = await runtime.createPage({ width: 1440, height: 900 })
    await clearLocalState(returning)
    await returning.send('Page.navigate', { url: `${baseUrl}/` })
    await waitForExpression(returning.send, 'document.body !== null')
    await evaluate(returning.send, `(() => {
      const previous = { path: '/atlas', label: '群岛星图', sceneId: 'atlas', sceneTitle: '世界地图', visitedAt: '2026-07-10T04:00:00.000Z' }
      const path = { path: '/paths/first-visit', label: '第一次来到古月浮屿', sceneId: 'paths', sceneTitle: '世界路径', recentPathId: 'first-visit', visitedAt: '2026-07-10T04:01:00.000Z' }
      localStorage.setItem('guyue-world:visited-count', '3')
      localStorage.setItem('guyue-world:journey-memory-v1', JSON.stringify(previous))
      localStorage.setItem('guyue-world:journey-history-v1', JSON.stringify([previous, path]))
      location.reload()
      return true
    })()`)
    const returningReady = await waitForExpression(returning.send, `document.querySelector('[data-testid="gateway-returning"]') !== null`)
    if (!returningReady) findings.push('desktop-returning: returning dock missing')
    await delay(900)
    observations.push(await inspect(returning, 'desktop-returning'))
    await capturePng(returning.send, path.join(outputDir, 'home-desktop-returning.png'))

    const hidden = await runtime.createPage({ width: 1440, height: 900, reducedMotion: true })
    await clearLocalState(hidden)
    await openHome(hidden)
    await evaluate(hidden.send, `document.querySelector('[data-testid="gateway-enter"]')?.click()`)
    await delay(180)
    await evaluate(hidden.send, `(() => {
      const style = document.createElement('style')
      style.dataset.realityTextHidden = 'true'
      style.textContent = 'h1,h2,h3,p,span,strong,small,a,button{color:transparent!important;text-shadow:none!important} .arrival,.placeRail{visibility:hidden!important}'
      document.head.appendChild(style)
      return true
    })()`)
    observations.push(await inspect(hidden, 'text-hidden'))
    await capturePng(hidden.send, path.join(outputDir, 'home-text-hidden.png'))

    const imageFailure = await runtime.createPage({ width: 1440, height: 900 })
    await clearLocalState(imageFailure)
    await imageFailure.send('Network.setCacheDisabled', { cacheDisabled: true })
    await imageFailure.send('Network.clearBrowserCache')
    await imageFailure.send('Network.setBlockedURLs', { urls: ['*gateway*'] })
    await openHome(imageFailure)
    const fallbackVisible = await evaluate(imageFailure.send, `(() => {
      const wrapper = document.querySelector('[data-scene-static-fallback]')
      const fallback = wrapper?.firstElementChild
      return Boolean(fallback && getComputedStyle(fallback).display !== 'none' && fallback.querySelectorAll('a').length >= 3)
    })()`)
    observations.push({ mode: 'image-failure', fallbackVisible, expectedNetworkFailure: true })
    if (!fallbackVisible) findings.push('image-failure: static fallback is not visible')
    await evaluate(imageFailure.send, `document.querySelector('[data-scene-static-fallback]')?.scrollIntoView({ block: 'start' })`)
    await delay(150)
    await capturePng(imageFailure.send, path.join(outputDir, 'home-image-fallback.png'))

    const jsOff = await runtime.createPage({ width: 1440, height: 900 })
    await clearLocalState(jsOff)
    await jsOff.send('Emulation.setScriptExecutionDisabled', { value: true })
    await jsOff.send('Page.navigate', { url: `${baseUrl}/` })
    await delay(800)
    const documentTree = await jsOff.send('DOM.getDocument', { depth: -1, pierce: true })
    const staticHrefs = []
    const visit = (node) => {
      if (node.nodeName === 'A') {
        const attributes = Object.fromEntries(Array.from(
          { length: (node.attributes?.length ?? 0) / 2 },
          (_, index) => [node.attributes[index * 2], node.attributes[index * 2 + 1]],
        ))
        if (attributes.href) staticHrefs.push(attributes.href)
      }
      for (const child of node.children ?? []) visit(child)
    }
    visit(documentTree.root)
    const staticRoutes = ['/atlas', '/paths/first-visit', '/archive']
    const jsOffPass = staticRoutes.every((route) => staticHrefs.includes(route))
    observations.push({ mode: 'js-off', requiredRoutes: staticRoutes, pass: jsOffPass })
    if (!jsOffPass) findings.push(`js-off: missing static route (${staticHrefs.join(', ')})`)
    await capturePng(jsOff.send, path.join(outputDir, 'home-js-off.png'))

    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      observations,
      findings,
      status: findings.length === 0 ? 'browser-facts-captured' : 'defects-found',
    }
    fs.writeFileSync(path.join(outputDir, 'browser-observations.json'), `${JSON.stringify(report, null, 2)}\n`)
    if (findings.length > 0) throw new Error(findings.join('\n'))
    console.log(`Gateway evidence captured: ${observations.length} modes, no objective browser defects`)
  } finally {
    await runtime.close()
  }
}

await run()
