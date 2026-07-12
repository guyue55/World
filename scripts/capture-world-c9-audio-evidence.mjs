import fs from 'node:fs'
import path from 'node:path'
import { delay, evaluate, launchRealityBrowser, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-living-world/checkpoint-c/c9-2026-07-12/evidence')
fs.mkdirSync(outputDir, { recursive: true })
const launch = await launchRealityBrowser('worldos-c9-audio')
const page = await launch.createPage({ width: 1280, height: 720 })

async function click(selector) {
  await page.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(selector)})?.click()`, userGesture: true, awaitPromise: true, returnByValue: true })
}

async function snapshot(label) {
  return evaluate(page.send, `(() => {
    const control=document.querySelector('[data-testid="runtime-soundscape-control"]');
    const resources=performance.getEntriesByType('resource').map((entry)=>({name:entry.name,transferSize:entry.transferSize,initiatorType:entry.initiatorType}));
    return {
      label:${JSON.stringify(label)},
      path:location.pathname,
      control:control?{
        armed:control.getAttribute('data-audio-armed'),
        context:control.getAttribute('data-audio-context'),
        quiet:control.getAttribute('data-audio-quiet'),
        loops:Number(control.getAttribute('data-audio-loops')),
        cues:Number(control.getAttribute('data-audio-cues')),
        scene:control.getAttribute('data-soundscape-scene'),
        soundMode:control.getAttribute('data-sound-mode'),
        error:control.getAttribute('data-audio-error'),
      }:null,
      constructed:window.__worldosAudioContexts?.length??-1,
      contextStates:(window.__worldosAudioContexts??[]).map((context)=>context.state),
      events:window.__worldosAudioEvents??[],
      audioResources:resources.filter((entry)=>/\\.(mp3|wav|ogg|flac|aac|m4a)(\\?|$)/i.test(entry.name)),
      engineResources:resources.filter((entry)=>/soundscape-engine/i.test(entry.name)),
      errors:${JSON.stringify(page.errors)}.filter(Boolean),
    };
  })()`)
}

try {
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `(() => {
    window.__worldosAudioContexts=[];
    window.__worldosAudioEvents=[];
    const Native=window.AudioContext||window.webkitAudioContext;
    if(!Native)return;
    class TrackedAudioContext extends Native {
      constructor(...args){super(...args);window.__worldosAudioContexts.push(this);window.__worldosAudioEvents.push({type:'construct',at:performance.now(),state:this.state});}
      async resume(){window.__worldosAudioEvents.push({type:'resume-request',at:performance.now(),state:this.state});const result=await super.resume();window.__worldosAudioEvents.push({type:'resumed',at:performance.now(),state:this.state});return result;}
      async suspend(){window.__worldosAudioEvents.push({type:'suspend-request',at:performance.now(),state:this.state});const result=await super.suspend();window.__worldosAudioEvents.push({type:'suspended',at:performance.now(),state:this.state});return result;}
      async close(){window.__worldosAudioEvents.push({type:'close-request',at:performance.now(),state:this.state});const result=await super.close();window.__worldosAudioEvents.push({type:'closed',at:performance.now(),state:this.state});return result;}
    }
    window.AudioContext=TrackedAudioContext;
    window.webkitAudioContext=TrackedAudioContext;
  })()` })
  await page.send('Page.navigate', { url: baseUrl })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector('[data-testid="runtime-soundscape-control"]')`, 20_000)) throw new Error('Gateway 声景控件未就绪')
  const beforeGesture = await snapshot('before-gesture')

  await click('[data-testid="runtime-soundscape-control"] button')
  if (!await waitForExpression(page.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='running'&&document.querySelector('[data-audio-loops]')?.getAttribute('data-audio-loops')==='1'`, 8_000)) throw new Error('用户手势后声景未运行')
  const enabled = await snapshot('enabled')

  await click('[data-testid="runtime-soundscape-control"] button')
  if (!await waitForExpression(page.send, `document.querySelector('[data-sound-mode]')?.getAttribute('data-sound-mode')==='muted'&&document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='suspended'&&document.querySelector('[data-audio-loops]')?.getAttribute('data-audio-loops')==='0'`, 8_000)) throw new Error('mute 未 suspend 或未清理 source')
  const muted = await snapshot('muted')

  await click('[data-testid="runtime-soundscape-control"] button')
  if (!await waitForExpression(page.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='running'&&document.querySelector('[data-audio-loops]')?.getAttribute('data-audio-loops')==='1'`, 8_000)) throw new Error('再次启用未恢复声景')
  const reenabled = await snapshot('reenabled')

  await click('a[href="/atlas"]')
  if (!await waitForExpression(page.send, `location.pathname==='/atlas'&&document.querySelector('[data-soundscape-scene]')?.getAttribute('data-soundscape-scene')==='atlas'&&document.querySelector('[data-audio-loops]')?.getAttribute('data-audio-loops')==='1'`, 12_000)) throw new Error('SPA 换场未保持单一 ambience')
  await delay(1_000)
  const switched = await snapshot('atlas-switched')

  const coverPage = await launch.createPage({ width: 400, height: 300 })
  await launch.browser.send('Target.activateTarget', { targetId: coverPage.targetId })
  await delay(500)
  await launch.browser.send('Target.activateTarget', { targetId: page.targetId })
  await waitForExpression(page.send, `window.__worldosAudioContexts?.[0]?.state==='running'`, 5_000)
  await coverPage.close()
  const visibilityCycle = await snapshot('visibility-cycle')

  const failures = []
  if (beforeGesture.constructed !== 0 || beforeGesture.control?.context !== 'none' || beforeGesture.audioResources.length !== 0) failures.push('用户手势前创建上下文或下载音频')
  if (enabled.constructed !== 1 || enabled.control?.loops !== 1 || enabled.control?.context !== 'running') failures.push('首次启用未建立单上下文/单 ambience')
  if (muted.constructed !== 1 || muted.control?.context !== 'suspended' || muted.control?.loops !== 0 || muted.control?.cues !== 0) failures.push('mute 未复用上下文并清理 source')
  if (reenabled.constructed !== 1 || reenabled.control?.context !== 'running') failures.push('再次启用创建了额外上下文或未恢复')
  if (switched.constructed !== 1 || switched.control?.scene !== 'atlas' || switched.control?.loops !== 1) failures.push('SPA 换场未保持一个上下文和一个 ambience')
  const visibilityTypes = visibilityCycle.events.map((event) => event.type)
  if (!visibilityTypes.includes('suspended') || visibilityTypes.at(-1) !== 'resumed') failures.push('hidden/active 未实际 suspend/resume')
  if ([beforeGesture, enabled, muted, reenabled, switched, visibilityCycle].some((item) => item.audioResources.length > 0 || item.errors.length > 0)) failures.push('出现外部音频下载或浏览器错误')

  const report = { generatedAt: new Date().toISOString(), baseUrl, snapshots: { beforeGesture, enabled, muted, reenabled, switched, visibilityCycle }, failures }
  fs.writeFileSync(path.join(outputDir, 'c9-browser-audio-lifecycle.json'), `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C.9 browser audio lifecycle passed: contexts=${visibilityCycle.constructed} events=${visibilityCycle.events.length} audioResources=0`)
} finally {
  await launch.close()
}
