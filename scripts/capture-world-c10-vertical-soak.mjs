import fs from 'node:fs'
import path from 'node:path'
import { performance } from 'node:perf_hooks'
import { delay, evaluate, launchRealityBrowser, waitForExpression } from './lib/reality-first-browser.mjs'

const baseUrl = process.env.WORLDOS_BASE_URL || 'http://127.0.0.1:3411'
const smoke = process.env.WORLDOS_SOAK_SMOKE === 'true'
const durationSeconds = smoke ? Number(process.env.WORLDOS_SOAK_SECONDS || 30) : 600
const hiddenSeconds = smoke ? Number(process.env.WORLDOS_HIDDEN_SECONDS || 5) : 120
const outputDir = path.resolve(process.env.WORLDOS_EVIDENCE_DIR || 'docs/90-archive/reports/worldos-living-world/checkpoint-c/c10-2026-07-12/evidence')
if (!smoke && (durationSeconds < 600 || hiddenSeconds < 120)) throw new Error('正式 C.10 soak 不得缩短 600 秒总时长或 120 秒后台时长')
fs.mkdirSync(outputDir, { recursive: true })

const launch = await launchRealityBrowser(`worldos-c10-soak-${smoke ? 'smoke' : 'full'}`)
const page = await launch.createPage({ width: 1280, height: 720 })
const samples = []
const actions = []
const startedWall = Date.now()
const startedMonotonic = performance.now()

async function click(selector) {
  await page.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(selector)})?.click()`, userGesture: true, awaitPromise: true, returnByValue: true })
}

async function collect(label, collectGarbage = false) {
  if (collectGarbage) await page.send('HeapProfiler.collectGarbage').catch(() => {})
  const metrics = await page.send('Performance.getMetrics')
  const metricMap = Object.fromEntries((metrics.metrics ?? []).map((item) => [item.name, item.value]))
  const runtime = await evaluate(page.send, `(() => {
    const root=document.documentElement;
    const sound=document.querySelector('[data-testid="runtime-soundscape-control"]');
    const frame=window.__worldosSoakFrame;
    const journeyKeys=Object.keys(localStorage).filter((key)=>key.includes('journey')||key.includes('world:last')).sort();
    return {
      path:location.pathname,
      worldTimeEpoch:Number(root.dataset.worldTimeEpoch||0),
      worldDayProgress:Number(root.dataset.worldDayProgress||0),
      worldDateKey:root.dataset.worldDateKey||null,
      ambient:Array.from(document.querySelectorAll('[data-gateway-ambient],[data-atlas-ambient],[data-node-ambient]')).map((node)=>({scene:node.hasAttribute('data-gateway-ambient')?'gateway':node.hasAttribute('data-atlas-ambient')?'atlas':'node',state:node.getAttribute('data-gateway-ambient')||node.getAttribute('data-atlas-ambient')||node.getAttribute('data-node-ambient')})),
      sound:sound?{armed:sound.getAttribute('data-audio-armed'),context:sound.getAttribute('data-audio-context'),loops:Number(sound.getAttribute('data-audio-loops')),scene:sound.getAttribute('data-soundscape-scene'),error:sound.getAttribute('data-audio-error')}:null,
      audio:{constructed:window.__worldosSoakAudio?.contexts.length??-1,states:(window.__worldosSoakAudio?.contexts??[]).map((context)=>context.state),activeOscillators:window.__worldosSoakAudio?.active.size??-1,events:window.__worldosSoakAudio?.events.length??-1},
      frame:frame?{count:frame.count,maxMs:frame.maxMs,over34:frame.over34,over50:frame.over50,intervals:frame.intervals.slice(-4000)}:null,
      journeyKeys,
    };
  })()`)
  const sample = {
    label,
    wallElapsedSeconds: (Date.now() - startedWall) / 1000,
    monotonicElapsedSeconds: (performance.now() - startedMonotonic) / 1000,
    metrics: {
      JSHeapUsedSize: metricMap.JSHeapUsedSize ?? null,
      Nodes: metricMap.Nodes ?? null,
      Documents: metricMap.Documents ?? null,
      JSEventListeners: metricMap.JSEventListeners ?? null,
      Frames: metricMap.Frames ?? null,
      LayoutCount: metricMap.LayoutCount ?? null,
      RecalcStyleCount: metricMap.RecalcStyleCount ?? null,
    },
    runtime,
  }
  samples.push(sample)
  return sample
}

async function waitAndSample(seconds, label) {
  const deadline = Date.now() + seconds * 1000
  let index = 0
  while (Date.now() < deadline) {
    await delay(Math.min(5_000, Math.max(0, deadline - Date.now())))
    await collect(`${label}-${index}`)
    index += 1
  }
}

async function runJourneyFlow() {
  await click('a[href="/atlas"]')
  if (!await waitForExpression(page.send, `location.pathname==='/atlas'&&!!document.querySelector('[data-atlas-area]')`, 12_000)) throw new Error('soak 未抵达 Atlas')
  await click('[data-atlas-area]')
  if (!await waitForExpression(page.send, `!!document.querySelector('[data-atlas-node][data-visible="true"]')`, 5_000)) throw new Error('soak 未展开 Atlas 地点')
  await click('[data-atlas-node][data-visible="true"]')
  if (!await waitForExpression(page.send, `!!document.querySelector('[data-atlas-enter-node]')`, 5_000)) throw new Error('soak 未聚焦 Atlas 地点')
  await click('[data-atlas-enter-node]')
  if (!await waitForExpression(page.send, `location.pathname.startsWith('/node/')&&!!document.querySelector('.node-relation-rail, [aria-label="相邻地点"] a')`, 12_000)) throw new Error('soak 未抵达 Node')
  const firstNodePath = await evaluate(page.send, 'location.pathname')
  await click('[aria-label="相邻地点"] a')
  if (!await waitForExpression(page.send, `location.pathname.startsWith('/node/')&&location.pathname!==${JSON.stringify(firstNodePath)}`, 12_000)) throw new Error('soak 未穿过关系 Node')
  const relatedNodePath = await evaluate(page.send, 'location.pathname')
  await page.send('Runtime.evaluate', { expression: 'history.back()', awaitPromise: true, returnByValue: true })
  if (!await waitForExpression(page.send, `location.pathname===${JSON.stringify(firstNodePath)}`, 12_000)) throw new Error('soak 未返回来源 Node')
  actions.push({ type: 'relation-node-round-trip', firstNodePath, relatedNodePath, atSeconds: (Date.now() - startedWall) / 1000 })
}

try {
  await page.send('Performance.enable')
  await page.send('HeapProfiler.enable')
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `(() => {
    for(const key of Object.keys(localStorage)){if(key.includes('journey')||key.includes('world:last'))localStorage.removeItem(key);}
    window.__worldosSoakFrame={count:0,maxMs:0,over34:0,over50:0,intervals:[],last:0};
    const tick=(now)=>{const state=window.__worldosSoakFrame;if(state.last&&now-state.last<250){const delta=now-state.last;state.count++;state.maxMs=Math.max(state.maxMs,delta);if(delta>34)state.over34++;if(delta>50)state.over50++;state.intervals.push(delta);if(state.intervals.length>12000)state.intervals.splice(0,2000);}state.last=now;requestAnimationFrame(tick);};
    document.addEventListener('visibilitychange',()=>{window.__worldosSoakFrame.last=0;});requestAnimationFrame(tick);
    window.__worldosSoakAudio={contexts:[],active:new Set(),events:[]};
    const Native=window.AudioContext||window.webkitAudioContext;if(!Native)return;
    class TrackedAudioContext extends Native {
      constructor(...args){super(...args);window.__worldosSoakAudio.contexts.push(this);window.__worldosSoakAudio.events.push({type:'construct',at:performance.now()});}
      createOscillator(){const source=super.createOscillator();const id='osc-'+window.__worldosSoakAudio.events.length;const start=source.start.bind(source);const stop=source.stop.bind(source);source.start=(...args)=>{window.__worldosSoakAudio.active.add(id);window.__worldosSoakAudio.events.push({type:'source-start',id,at:performance.now()});return start(...args);};source.stop=(...args)=>{window.__worldosSoakAudio.events.push({type:'source-stop-request',id,at:performance.now()});return stop(...args);};source.addEventListener('ended',()=>{window.__worldosSoakAudio.active.delete(id);window.__worldosSoakAudio.events.push({type:'source-ended',id,at:performance.now()});},{once:true});return source;}
      async resume(){window.__worldosSoakAudio.events.push({type:'resume-request',at:performance.now()});const result=await super.resume();window.__worldosSoakAudio.events.push({type:'resumed',at:performance.now()});return result;}
      async suspend(){window.__worldosSoakAudio.events.push({type:'suspend-request',at:performance.now()});const result=await super.suspend();window.__worldosSoakAudio.events.push({type:'suspended',at:performance.now()});return result;}
      async close(){window.__worldosSoakAudio.events.push({type:'close-request',at:performance.now()});const result=await super.close();window.__worldosSoakAudio.events.push({type:'closed',at:performance.now()});return result;}
    }
    window.AudioContext=TrackedAudioContext;window.webkitAudioContext=TrackedAudioContext;
  })()` })
  await page.send('Page.navigate', { url: baseUrl })
  if (!await waitForExpression(page.send, `document.readyState==='complete'&&!!document.querySelector('[data-testid="runtime-soundscape-control"]')`, 20_000)) throw new Error('soak Gateway 未就绪')
  await delay(1_500)
  await click('[data-testid="runtime-soundscape-control"] button')
  if (!await waitForExpression(page.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='running'`, 8_000)) throw new Error('soak 声景未开启')
  const baseline = await collect('baseline', true)

  if (smoke) await waitAndSample(3, 'smoke-minute-window')
  else {
    const initialEpoch = baseline.runtime.worldTimeEpoch
    const deadline = Date.now() + 70_000
    while (Date.now() < deadline) {
      await delay(5_000)
      const sample = await collect('minute-window')
      if (sample.runtime.worldTimeEpoch !== initialEpoch) break
    }
  }
  const minuteTickObserved = samples.some((sample) => sample.runtime.worldTimeEpoch !== baseline.runtime.worldTimeEpoch)

  await runJourneyFlow()
  await delay(1_200)
  await collect('after-relation-round-trip', true)

  const coverPage = await launch.createPage({ width: 400, height: 300 })
  const hiddenStarted = Date.now()
  await launch.browser.send('Target.activateTarget', { targetId: coverPage.targetId })
  await delay(hiddenSeconds * 1000)
  const hiddenElapsedSeconds = (Date.now() - hiddenStarted) / 1000
  await launch.browser.send('Target.activateTarget', { targetId: page.targetId })
  const resumed = await waitForExpression(page.send, `window.__worldosSoakAudio?.contexts[0]?.state==='running'`, 8_000)
  await coverPage.close()
  const afterHidden = await collect('after-hidden-recovery', true)
  actions.push({ type: 'hidden-recovery', hiddenElapsedSeconds, resumed, atSeconds: (Date.now() - startedWall) / 1000 })

  await click('[data-testid="runtime-soundscape-control"] button')
  if (!await waitForExpression(page.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='suspended'`, 8_000)) throw new Error('soak 声景关闭未 suspend')
  await click('[data-testid="runtime-soundscape-control"] button')
  if (!await waitForExpression(page.send, `document.querySelector('[data-audio-context]')?.getAttribute('data-audio-context')==='running'`, 8_000)) throw new Error('soak 声景再次启用未恢复')
  actions.push({ type: 'audio-toggle', atSeconds: (Date.now() - startedWall) / 1000 })

  await click('a[href="/"]')
  if (!await waitForExpression(page.send, `location.pathname==='/'&&!!document.querySelector('[data-gateway-ambient]')`, 12_000)) throw new Error('soak 未返回 Gateway')
  await delay(1_200)
  const beforeClear = await collect('before-memory-clear')
  const clearClicked = await page.send('Runtime.evaluate', { expression: `(() => {const button=[...document.querySelectorAll('button')].find((item)=>item.textContent?.includes('清除'));button?.click();return Boolean(button);})()`, userGesture: true, awaitPromise: true, returnByValue: true })
  await delay(500)
  const afterClear = await collect('after-memory-clear')
  actions.push({ type: 'memory-clear', clicked: Boolean(clearClicked.result?.value), beforeKeys: beforeClear.runtime.journeyKeys, afterKeys: afterClear.runtime.journeyKeys, atSeconds: (Date.now() - startedWall) / 1000 })

  const remainingSeconds = Math.max(0, durationSeconds - (Date.now() - startedWall) / 1000)
  await waitAndSample(remainingSeconds, 'settled-tail')
  const final = await collect('final', true)
  const finishedWall = Date.now()
  const finishedMonotonic = performance.now()

  const frameIntervals = final.runtime.frame?.intervals ?? []
  const sortedFrames = [...frameIntervals].sort((a, b) => a - b)
  const frameP95 = sortedFrames.length ? sortedFrames[Math.min(sortedFrames.length - 1, Math.floor(sortedFrames.length * 0.95))] : null
  const coldToFinalGrowth = {
    heapBytes: (final.metrics.JSHeapUsedSize ?? 0) - (baseline.metrics.JSHeapUsedSize ?? 0),
    listeners: (final.metrics.JSEventListeners ?? 0) - (baseline.metrics.JSEventListeners ?? 0),
    nodes: (final.metrics.Nodes ?? 0) - (baseline.metrics.Nodes ?? 0),
  }
  const settledGrowth = {
    heapBytes: (final.metrics.JSHeapUsedSize ?? 0) - (afterClear.metrics.JSHeapUsedSize ?? 0),
    listeners: (final.metrics.JSEventListeners ?? 0) - (afterClear.metrics.JSEventListeners ?? 0),
    nodes: (final.metrics.Nodes ?? 0) - (afterClear.metrics.Nodes ?? 0),
  }
  const memoryClear = actions.find((action) => action.type === 'memory-clear')
  const failures = []
  const wallElapsedSeconds = (finishedWall - startedWall) / 1000
  const monotonicElapsedSeconds = (finishedMonotonic - startedMonotonic) / 1000
  if (!smoke && (wallElapsedSeconds < 600 || monotonicElapsedSeconds < 600)) failures.push('soak 未持续十分钟真实时间')
  if (!smoke && !minuteTickObserved) failures.push('未观测到自然 minute tick')
  if (hiddenElapsedSeconds < hiddenSeconds || !resumed || afterHidden.runtime.ambient.some((item) => item.state !== 'running')) failures.push('后台时长或恢复失败')
  if (final.runtime.audio.constructed !== 1 || final.runtime.audio.states[0] !== 'running') failures.push('AudioContext 数量或终态异常')
  if (settledGrowth.heapBytes > 2 * 1024 * 1024) failures.push(`稳定尾段 GC 后 heap 持续增长：${settledGrowth.heapBytes}`)
  if (settledGrowth.listeners > 2) failures.push(`稳定尾段 listener 持续增长：${settledGrowth.listeners}`)
  if (settledGrowth.nodes > 8) failures.push(`稳定尾段 DOM node 持续增长：${settledGrowth.nodes}`)
  if (!memoryClear?.clicked || memoryClear.afterKeys.some((key) => !key.includes('cleared'))) failures.push('memory clear 未清除旅程主记录')
  if (page.errors.filter(Boolean).length) failures.push(`浏览器错误：${page.errors.filter(Boolean).join('; ')}`)

  const report = {
    generatedAt: new Date().toISOString(),
    mode: smoke ? 'smoke' : 'full-600-second',
    baseUrl,
    startedAt: new Date(startedWall).toISOString(),
    finishedAt: new Date(finishedWall).toISOString(),
    wallElapsedSeconds,
    monotonicStartedMs: startedMonotonic,
    monotonicFinishedMs: finishedMonotonic,
    monotonicElapsedSeconds,
    continuousWallClock: true,
    edited: false,
    repeatedAssembly: false,
    minuteTickObserved,
    hiddenElapsedSeconds,
    frame: { count: final.runtime.frame?.count ?? 0, p95Ms: frameP95, maxMs: final.runtime.frame?.maxMs ?? null, over34: final.runtime.frame?.over34 ?? null, over50: final.runtime.frame?.over50 ?? null },
    resources: { baseline: baseline.metrics, settledBaseline: afterClear.metrics, final: final.metrics, coldToFinalGrowth, settledGrowth, audioContexts: final.runtime.audio.constructed, activeOscillators: final.runtime.audio.activeOscillators },
    actions,
    samples,
    audioEvents: await evaluate(page.send, 'window.__worldosSoakAudio?.events??[]'),
    browserErrors: page.errors.filter(Boolean),
    failures,
  }
  const outputPath = path.join(outputDir, smoke ? 'c10-vertical-soak-smoke.json' : 'c10-vertical-soak-600s.json')
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`)
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(`C.10 vertical soak passed: seconds=${wallElapsedSeconds.toFixed(1)} hidden=${hiddenElapsedSeconds.toFixed(1)} minuteTick=${minuteTickObserved} settledHeapGrowth=${settledGrowth.heapBytes} settledListeners=${settledGrowth.listeners} frameP95=${frameP95?.toFixed(2)}`)
} finally {
  await launch.close()
}
