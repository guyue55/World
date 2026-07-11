// 用途：独立验证生命世界终局证据；不生成证据、不修改账本、不接受分数替代失败项。
import crypto from 'node:crypto'
import { execFileSync, spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const contractPath = path.join(root, 'data/domains/experience/living-world-acceptance.json')
const controlManifestPath = path.join(root, 'data/world-kernel/worldos-living-world-control-v1.json')
const planPath = path.join(root, 'docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md')
const ledgerPath = path.join(root, 'docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md')
const rootRealPath = fs.realpathSync(root)
const failures = []
const contractOnly = process.argv.includes('--contract-only')
const preflight = process.argv.includes('--preflight')
let resolvedEvidenceRoot = null

function readJson(absolutePath) {
  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  } catch (error) {
    failures.push(`cannot read JSON ${path.relative(root, absolutePath)}: ${error.message}`)
    return null
  }
}

function unique(values) {
  return new Set(values).size === values.length
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function ledgerField(content, name) {
  const raw = content.match(new RegExp(`^${name}:\\s*([^\\n]+)$`, 'm'))?.[1]?.trim()
  if (!raw) return null
  return raw.replace(/^['"]|['"]$/g, '')
}

function readJsonAtCommit(commit, relativePath) {
  try {
    return JSON.parse(execFileSync('git', ['show', `${commit}:${relativePath}`], { cwd: root, encoding: 'utf8' }))
  } catch (error) {
    failures.push(`cannot read ${relativePath} at ${commit}: ${error.message}`)
    return null
  }
}

function isWithin(basePath, candidatePath) {
  return candidatePath === basePath || candidatePath.startsWith(`${basePath}${path.sep}`)
}

function resolveRepositoryPath(relativePath) {
  if (!relativePath || relativePath === 'null' || relativePath === 'none') return null
  const absolutePath = path.resolve(root, relativePath)
  if (!absolutePath.startsWith(`${root}${path.sep}`)) {
    failures.push(`evidence escapes repository: ${relativePath}`)
    return null
  }
  if (!fs.existsSync(absolutePath)) return absolutePath
  const realPath = fs.realpathSync(absolutePath)
  if (!isWithin(rootRealPath, realPath)) {
    failures.push(`evidence symlink escapes repository: ${relativePath}`)
    return null
  }
  return realPath
}

function rejectSymlinks(absoluteRoot) {
  if (!absoluteRoot || !fs.existsSync(absoluteRoot)) return
  const pending = [absoluteRoot]
  while (pending.length) {
    const current = pending.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name)
      const stat = fs.lstatSync(absolutePath)
      if (stat.isSymbolicLink()) {
        failures.push(`symlink forbidden in evidence run: ${path.relative(root, absolutePath)}`)
      } else if (stat.isDirectory()) {
        pending.push(absolutePath)
      }
    }
  }
}

function resolveRunArtifact(relativePath) {
  if (!relativePath || !resolvedEvidenceRoot) return null
  const absolutePath = path.resolve(resolvedEvidenceRoot, relativePath)
  if (!isWithin(resolvedEvidenceRoot, absolutePath)) {
    failures.push(`artifact escapes evidence run: ${relativePath}`)
    return null
  }
  if (!fs.existsSync(absolutePath)) return absolutePath
  const stat = fs.lstatSync(absolutePath)
  if (stat.isSymbolicLink()) {
    failures.push(`artifact is a symbolic link: ${relativePath}`)
    return null
  }
  const realPath = fs.realpathSync(absolutePath)
  if (!isWithin(resolvedEvidenceRoot, realPath)) {
    failures.push(`artifact real path escapes evidence run: ${relativePath}`)
    return null
  }
  return realPath
}

function fileHash(absolutePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex')
}

function readIndexedJson(evidence, artifactId) {
  const descriptor = evidence?.artifacts?.[artifactId]
  assert(descriptor?.path && /^[a-f0-9]{64}$/.test(descriptor?.sha256 ?? ''), `invalid artifact descriptor: ${artifactId}`)
  if (!descriptor?.path) return null
  const absolutePath = resolveRunArtifact(descriptor.path)
  assert(absolutePath && fs.existsSync(absolutePath), `artifact missing: ${artifactId}`)
  if (!absolutePath || !fs.existsSync(absolutePath)) return null
  assert(fileHash(absolutePath) === descriptor.sha256, `artifact checksum mismatch: ${artifactId}`)
  return readJson(absolutePath)
}

function mediaAnalysis(absolutePath, sampleFps, roi = null) {
  try {
    const roiFilter = roi ? `crop=iw*${roi.width}:ih*${roi.height}:iw*${roi.x}:ih*${roi.y},` : ''
    const probe = JSON.parse(execFileSync('ffprobe', [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_packets',
      '-show_entries', 'format=duration:stream=codec_type,avg_frame_rate,nb_frames:packet=pts_time,duration_time',
      '-of', 'json',
      absolutePath,
    ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))
    const pts = (probe.packets ?? []).map((packet) => Number(packet.pts_time)).filter(Number.isFinite)
    let maxPacketGapSeconds = 0
    let nonMonotonicPacketCount = 0
    for (let index = 1; index < pts.length; index += 1) {
      const gap = pts[index] - pts[index - 1]
      if (gap <= 0) nonMonotonicPacketCount += 1
      maxPacketGapSeconds = Math.max(maxPacketGapSeconds, gap)
    }
    const frameMd5 = execFileSync('ffmpeg', [
      '-v', 'error',
      '-i', absolutePath,
      '-vf', `${roiFilter}fps=${sampleFps}`,
      '-f', 'framemd5',
      '-',
    ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    const frameHashes = frameMd5.split('\n')
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split(',').at(-1)?.trim())
      .filter(Boolean)
    const roiFrames = execFileSync('ffmpeg', [
      '-v', 'error',
      '-i', absolutePath,
      '-vf', `${roiFilter}fps=${sampleFps},scale=32:32,format=gray`,
      '-f', 'rawvideo',
      '-pix_fmt', 'gray',
      '-',
    ], { encoding: 'buffer', maxBuffer: 16 * 1024 * 1024 })
    const frameSize = 32 * 32
    const roiFrameCount = Math.floor(roiFrames.length / frameSize)
    const meanDifference = (leftIndex, rightIndex) => {
      let difference = 0
      for (let pixel = 0; pixel < frameSize; pixel += 1) difference += Math.abs(roiFrames[leftIndex * frameSize + pixel] - roiFrames[rightIndex * frameSize + pixel])
      return difference / frameSize
    }
    let dynamicTransitions = 0
    for (let index = 1; index < roiFrameCount; index += 1) if (meanDifference(index - 1, index) >= 0.35) dynamicTransitions += 1
    let maxShortPeriodRepeatRatio = 0
    for (let lag = 2; lag <= Math.min(30, Math.floor(roiFrameCount / 2)); lag += 1) {
      let repeated = 0
      let compared = 0
      for (let index = lag; index < roiFrameCount; index += 1) {
        compared += 1
        if (meanDifference(index - lag, index) <= 0.15) repeated += 1
      }
      if (compared) maxShortPeriodRepeatRatio = Math.max(maxShortPeriodRepeatRatio, repeated / compared)
    }
    return {
      durationSeconds: Number(probe.format?.duration ?? 0),
      packetCount: pts.length,
      maxPacketGapSeconds,
      nonMonotonicPacketCount,
      sampledFrameCount: frameHashes.length,
      uniqueFrameRatio: frameHashes.length ? new Set(frameHashes).size / frameHashes.length : 0,
      roiFrameCount,
      roiDynamicFrameRatio: roiFrameCount > 1 ? dynamicTransitions / (roiFrameCount - 1) : 0,
      roiMaxShortPeriodRepeatRatio: maxShortPeriodRepeatRatio,
    }
  } catch (error) {
    failures.push(`media analysis failed ${path.relative(root, absolutePath)}: ${error.message}`)
    return {
      durationSeconds: 0,
      packetCount: 0,
      maxPacketGapSeconds: Number.POSITIVE_INFINITY,
      nonMonotonicPacketCount: 1,
      sampledFrameCount: 0,
      uniqueFrameRatio: 0,
      roiFrameCount: 0,
      roiDynamicFrameRatio: 0,
      roiMaxShortPeriodRepeatRatio: 1,
    }
  }
}

function percentile(values, ratio) {
  if (!Array.isArray(values) || values.length === 0) return Number.POSITIVE_INFINITY
  const sorted = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b)
  if (!sorted.length) return Number.POSITIVE_INFINITY
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1)]
}

async function fetchBuildIdentity(url) {
  try {
    const response = await fetch(url, { signal: globalThis.AbortSignal.timeout(5000), cache: 'no-store' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    failures.push(`live build identity failed ${url}: ${error.message}`)
    return null
  }
}

function sceneIdForPath(pathname) {
  if (pathname === '/') return 'gateway'
  if (pathname === '/atlas') return 'atlas'
  if (pathname === '/timeline') return 'timeline'
  if (pathname === '/archive') return 'archive'
  if (pathname === '/ask') return 'lighthouse'
  if (pathname === '/paths' || pathname.startsWith('/paths/')) return 'paths'
  if (pathname.startsWith('/node/')) return 'node'
  return null
}

async function crawlPublicNavigationEdges(origin, seedRoutes) {
  const routes = new Set(seedRoutes)
  try {
    const sitemapResponse = await fetch(`${origin}/sitemap.xml`, { signal: globalThis.AbortSignal.timeout(10000), cache: 'no-store' })
    const sitemap = await sitemapResponse.text()
    for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) routes.add(new URL(match[1], origin).pathname)
  } catch (error) {
    failures.push(`cannot crawl sitemap at ${origin}: ${error.message}`)
  }
  const routeList = [...routes].filter((route) => sceneIdForPath(route)).sort()
  const edges = new Set()
  for (let offset = 0; offset < routeList.length; offset += 12) {
    const batch = routeList.slice(offset, offset + 12)
    const pages = await Promise.all(batch.map(async (route) => {
      try {
        const response = await fetch(`${origin}${route}`, { signal: globalThis.AbortSignal.timeout(10000), cache: 'no-store' })
        return { route, response, html: await response.text() }
      } catch (error) {
        failures.push(`cannot crawl public route ${route}: ${error.message}`)
        return null
      }
    }))
    for (const page of pages.filter(Boolean)) {
      assert(page.response.ok, `public crawl failed ${page.route}: HTTP ${page.response.status}`)
      for (const match of page.html.matchAll(/\shref=["']([^"']+)["']/g)) {
        try {
          const target = new URL(match[1], origin)
          if (target.origin !== origin) continue
          const sourceScene = sceneIdForPath(page.route)
          const targetScene = sceneIdForPath(target.pathname)
          if (!sourceScene || !targetScene || (page.route === target.pathname && !target.search)) continue
          edges.add(`${page.route}->${target.pathname}`)
        } catch {
          // 非法 href 会由浏览器流程报告；此处只构建可解析内部边。
        }
      }
    }
  }
  return edges
}

function classifyLocalUrl(value) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'http:') return 'invalid'
    const host = url.hostname
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') return 'loopback'
    if (/^10\./.test(host) || /^192\.168\./.test(host)) return 'lan'
    const private172 = host.match(/^172\.(\d+)\./)
    if (private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31) return 'lan'
    return 'invalid'
  } catch {
    return 'invalid'
  }
}

function inspectServerProcess(pid) {
  try {
    const startedAtText = execFileSync('ps', ['-p', String(pid), '-o', 'lstart='], { encoding: 'utf8' }).trim()
    const command = execFileSync('ps', ['-p', String(pid), '-o', 'command='], { encoding: 'utf8' }).trim()
    const executable = execFileSync('ps', ['-p', String(pid), '-o', 'comm='], { encoding: 'utf8' }).trim()
    const parentPid = Number(execFileSync('ps', ['-p', String(pid), '-o', 'ppid='], { encoding: 'utf8' }).trim())
    const parentCommand = Number.isInteger(parentPid) && parentPid > 0 ? execFileSync('ps', ['-p', String(parentPid), '-o', 'command='], { encoding: 'utf8' }).trim() : ''
    const cwdOutput = execFileSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' })
    const cwd = cwdOutput.split('\n').find((line) => line.startsWith('n'))?.slice(1)
    const listeners = execFileSync('lsof', ['-Pan', '-p', String(pid), '-iTCP', '-sTCP:LISTEN'], { encoding: 'utf8' })
    return { startedAt: Date.parse(startedAtText), command, executable, parentPid, parentCommand, cwd, listeners }
  } catch (error) {
    failures.push(`cannot inspect Next server PID ${pid}: ${error.message}`)
    return null
  }
}

function assertHashedFile(descriptor, label) {
  assert(descriptor?.path && /^[a-f0-9]{64}$/.test(descriptor?.sha256 ?? ''), `invalid file descriptor: ${label}`)
  if (!descriptor?.path) return null
  const absolutePath = resolveRunArtifact(descriptor.path)
  assert(absolutePath && fs.existsSync(absolutePath), `file missing: ${label}`)
  if (!absolutePath || !fs.existsSync(absolutePath)) return null
  assert(fileHash(absolutePath) === descriptor.sha256, `file checksum mismatch: ${label}`)
  return absolutePath
}

function readHashedJsonDescriptor(descriptor, label) {
  const absolutePath = assertHashedFile(descriptor, label)
  return absolutePath ? readJson(absolutePath) : null
}

function validateCaptureSidecar({ descriptor, absolutePath, label, sourceCommit, buildId, serverPid, serverStartedAt, allowedOrigins, sceneId, viewId, flowId }) {
  const sidecar = readHashedJsonDescriptor(descriptor?.sidecar, `${label} sidecar`)
  if (!sidecar) return null
  for (const field of contract.evidenceArtifactProtocol.captureSidecarRequiredFields) {
    assert(sidecar[field] !== undefined && sidecar[field] !== null && sidecar[field] !== '', `${label} sidecar missing ${field}`)
  }
  assert(sidecar.sourceCommit === sourceCommit && sidecar.buildId === buildId, `${label} sidecar build identity mismatch`)
  assert(allowedOrigins.has(sidecar.origin), `${label} sidecar origin is unattested`)
  assert(sidecar.serverPid === serverPid && sidecar.serverStartedAt === serverStartedAt, `${label} sidecar server identity mismatch`)
  assert(sidecar.outputSha256 === descriptor.sha256, `${label} sidecar output hash mismatch`)
  assert(/^[a-f0-9]{32,}$/.test(sidecar.captureNonce ?? ''), `${label} sidecar nonce is invalid`)
  assert(Number.isFinite(Date.parse(sidecar.capturedAt)), `${label} sidecar capture time is invalid`)
  if (absolutePath && Number.isFinite(Date.parse(sidecar.capturedAt))) {
    assert(Math.abs(fs.statSync(absolutePath).mtimeMs - Date.parse(sidecar.capturedAt)) <= 2000, `${label} file mtime differs from sidecar capture time`)
  }
  if (sceneId) assert(sidecar.sceneId === sceneId, `${label} sidecar scene mismatch`)
  if (viewId) assert(sidecar.viewId === viewId && sidecar.mode === viewId, `${label} sidecar view/mode mismatch`)
  if (flowId) assert(sidecar.flowId === flowId, `${label} sidecar flow mismatch`)
  return sidecar
}

function analyzePcmAudio(absolutePath) {
  try {
    const durationSeconds = Number(execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=nw=1:nk=1',
      absolutePath,
    ], { encoding: 'utf8' }).trim())
    const truePeakProbe = spawnSync('ffmpeg', [
      '-nostats',
      '-i', absolutePath,
      '-filter_complex', 'ebur128=peak=true',
      '-f', 'null',
      '-',
    ], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
    const truePeakMatches = [...(truePeakProbe.stderr ?? '').matchAll(/Peak:\s+(-?\d+(?:\.\d+)?)\s+dBFS/g)]
    const truePeakDbfs = Number(truePeakMatches.at(-1)?.[1] ?? Number.POSITIVE_INFINITY)
    const pcm = execFileSync('ffmpeg', [
      '-v', 'error',
      '-i', absolutePath,
      '-f', 's16le',
      '-ac', '1',
      '-ar', '48000',
      '-',
    ], { encoding: 'buffer', maxBuffer: 128 * 1024 * 1024 })
    const sampleCount = Math.floor(pcm.length / 2)
    let peak = 0
    let clippedSamples = 0
    for (let index = 0; index < sampleCount; index += 1) {
      const value = Math.abs(pcm.readInt16LE(index * 2))
      peak = Math.max(peak, value)
      if (value >= 32760) clippedSamples += 1
    }
    const seamSamples = Math.min(4800, Math.floor(sampleCount / 2))
    let firstEnergy = 0
    let lastEnergy = 0
    for (let index = 0; index < seamSamples; index += 1) {
      const first = pcm.readInt16LE(index * 2) / 32768
      const last = pcm.readInt16LE((sampleCount - seamSamples + index) * 2) / 32768
      firstEnergy += first * first
      lastEnergy += last * last
    }
    const firstRms = Math.sqrt(firstEnergy / Math.max(1, seamSamples))
    const lastRms = Math.sqrt(lastEnergy / Math.max(1, seamSamples))
    const toDb = (value) => value > 0 ? 20 * Math.log10(value) : -120
    return {
      durationSeconds,
      sampleCount,
      samplePeakDbfs: toDb(peak / 32768),
      truePeakDbfs,
      seamRmsDeltaDb: Math.abs(toDb(firstRms) - toDb(lastRms)),
      clippedSampleRatio: sampleCount ? clippedSamples / sampleCount : 1,
    }
  } catch (error) {
    failures.push(`PCM audio analysis failed: ${error.message}`)
    return { durationSeconds: 0, sampleCount: 0, samplePeakDbfs: 0, truePeakDbfs: 0, seamRmsDeltaDb: Number.POSITIVE_INFINITY, clippedSampleRatio: 1 }
  }
}

function traceDurations(trace) {
  const events = trace?.traceEvents ?? []
  const taskDurations = events
    .filter((event) => ['RunTask', 'AnimationFrame', 'FireAnimationFrame'].includes(event.name) && Number.isFinite(Number(event.dur)))
    .map((event) => Number(event.dur) / 1000)
  return {
    frameLikeDurationsMs: taskDurations,
    longAnimationFrameMs: taskDurations.filter((duration) => duration > 50),
  }
}

function collectFiles(relativeRoots, excluded = new Set()) {
  const files = []
  const pending = relativeRoots.map((relativePath) => path.join(root, relativePath)).filter(fs.existsSync)
  while (pending.length) {
    const current = pending.pop()
    const stat = fs.lstatSync(current)
    if (stat.isSymbolicLink()) {
      failures.push(`symbolic link forbidden in product source inventory: ${path.relative(root, current)}`)
      continue
    }
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) pending.push(path.join(current, entry))
      continue
    }
    const relativePath = path.relative(root, current)
    if (!excluded.has(relativePath) && !relativePath.endsWith('/.DS_Store') && path.basename(relativePath) !== '.DS_Store') files.push(relativePath)
  }
  return files.sort()
}

function collectAbsoluteFiles(absoluteRoot) {
  const files = []
  const pending = [absoluteRoot]
  while (pending.length) {
    const current = pending.pop()
    const stat = fs.lstatSync(current)
    if (stat.isSymbolicLink()) {
      failures.push(`symbolic link forbidden in temporary restore: ${current}`)
    } else if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) pending.push(path.join(current, entry))
    } else {
      files.push(current)
    }
  }
  return files.sort()
}

function resolvePlaywrightPython(playwrightExecutable) {
  const shebang = fs.readFileSync(playwrightExecutable, 'utf8').split('\n')[0]
  if (!shebang.startsWith('#!')) return null
  const tokens = shebang.slice(2).trim().split(/\s+/)
  if (tokens[0] === '/usr/bin/env' && tokens[1]) {
    try {
      return execFileSync('which', [tokens[1]], { encoding: 'utf8' }).trim()
    } catch {
      return null
    }
  }
  return tokens.length === 1 && fs.existsSync(tokens[0]) ? tokens[0] : null
}

function runFrozenBrowserProbe(origin, routes) {
  try {
    const playwrightExecutable = execFileSync('which', ['playwright'], { encoding: 'utf8' }).trim()
    const pythonExecutable = resolvePlaywrightPython(playwrightExecutable)
    if (!pythonExecutable || !fs.existsSync(pythonExecutable)) throw new Error('Playwright Python runtime cannot be resolved')
    const pythonSource = String.raw`
import json, sys
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

origin = sys.argv[1]
routes = json.loads(sys.argv[2])
init_script = r"""
(() => {
  const state = window.__WORLDOS_FROZEN_PROBE__ = { frames: [], cls: 0, lcp: 0 };
  let previous = performance.now();
  const tick = (now) => {
    state.frames.push({ at: now, duration: now - previous });
    previous = now;
    if (state.frames.length < 1200) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) state.cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length) state.lcp = entries[entries.length - 1].startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (_) {}
  window.addEventListener('worldos:migration-phase', (event) => {
    const key = 'worldos:frozen-probe:migration';
    const events = JSON.parse(sessionStorage.getItem(key) || '[]');
    events.push({ ...event.detail, capturedAt: performance.timeOrigin + performance.now() });
    sessionStorage.setItem(key, JSON.stringify(events));
  });
})();
"""

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
    page = context.new_page()
    page.add_init_script(init_script)
    cdp = context.new_cdp_session(page)
    cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    page.goto(origin + "/", wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(7000)
    performance_probe = page.evaluate("""
      () => {
        const state = window.__WORLDOS_FROZEN_PROBE__;
        return {
          frames: state.frames.filter((frame) => frame.at >= 2000).map((frame) => frame.duration),
          cls: state.cls,
          lcp: state.lcp,
          timeOrigin: performance.timeOrigin,
          href: location.href
        };
      }
    """)
    edges = []
    migrations = []
    for route in routes:
        page.goto(origin + route, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(400)
        route_edges = page.evaluate("""
          () => Array.from(document.querySelectorAll('a[href], [data-scene-destination]')).map((element) => {
            const raw = element.getAttribute('data-scene-destination') || element.getAttribute('href');
            try {
              const url = new URL(raw, location.href);
              return { source: location.pathname, target: url.pathname, search: url.search, kind: element.hasAttribute('data-scene-destination') ? 'scene-destination' : 'anchor' };
            } catch (_) { return null; }
          }).filter(Boolean)
        """)
        edges.extend(route_edges)
        destination = page.locator('[data-scene-destination]').first
        if destination.count() > 0:
            page.evaluate("sessionStorage.setItem('worldos:frozen-probe:migration', '[]')")
            source_path = urlparse(page.url).path
            raw_target = destination.get_attribute('data-scene-destination') or destination.get_attribute('href')
            target_path = urlparse(origin + raw_target).path if raw_target.startswith('/') else urlparse(raw_target).path
            try:
                destination.click(timeout=5000)
                page.wait_for_timeout(1200)
            except Exception:
                pass
            migrations.append({
              "source": source_path,
              "target": target_path,
              "arrived": urlparse(page.url).path,
              "events": json.loads(page.evaluate("sessionStorage.getItem('worldos:frozen-probe:migration') || '[]'")),
              "activeElement": page.evaluate("document.activeElement?.getAttribute('data-arrival-object') || document.activeElement?.id || document.activeElement?.tagName || null")
            })
    result = {
      "browserVersion": browser.version,
      "origin": origin,
      "performance": performance_probe,
      "edges": edges,
      "migrations": migrations
    }
    browser.close()
    print(json.dumps(result, ensure_ascii=False))
`
    const probe = spawnSync(pythonExecutable, ['-c', pythonSource, origin, JSON.stringify(routes)], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      timeout: 180000,
    })
    if (probe.status !== 0) throw new Error(probe.stderr || `exit ${probe.status}`)
    return JSON.parse(probe.stdout)
  } catch (error) {
    failures.push(`frozen Playwright browser probe failed: ${error.message}`)
    return null
  }
}

function findFreeLoopbackPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : null
      server.close((error) => error ? reject(error) : resolve(port))
    })
  })
}

async function waitForJson(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  let lastError = null
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { signal: globalThis.AbortSignal.timeout(2000), cache: 'no-store' })
      if (response.ok) return await response.json()
      lastError = new Error(`HTTP ${response.status}`)
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => globalThis.setTimeout(resolve, 250))
  }
  throw lastError ?? new Error(`timeout waiting for ${url}`)
}

async function stopChildProcess(child, timeoutMs = 5000) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return
  await new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      globalThis.clearTimeout(forceTimer)
      globalThis.clearTimeout(abandonTimer)
      resolve()
    }
    child.once('exit', finish)
    const forceTimer = globalThis.setTimeout(() => {
      if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL')
    }, timeoutMs)
    const abandonTimer = globalThis.setTimeout(finish, timeoutMs + 2000)
    child.kill('SIGTERM')
  })
}

async function runFrozenPermissionCanaryProbe({ sourceCommit, buildId, buildHash, routes, tokens }) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'worldos-frozen-canary-'))
  const fixturePath = path.join(tempRoot, 'private-canary-fixture.json')
  const logPath = path.join(tempRoot, 'next-start.log')
  const nextCli = path.join(root, 'node_modules/next/dist/bin/next')
  let child = null
  try {
    assert(fs.existsSync(nextCli), 'local Next CLI is missing for frozen canary probe')
    fs.writeFileSync(fixturePath, JSON.stringify({ visibility: 'private', tokens }))
    const port = await findFreeLoopbackPort()
    const output = fs.openSync(logPath, 'w')
    child = spawn(process.execPath, [nextCli, 'start', '-H', '127.0.0.1', '-p', String(port)], {
      cwd: root,
      env: {
        ...process.env,
        WORLDOS_PRIVATE_CANARY_FIXTURE: fixturePath,
        WORLDOS_SOURCE_COMMIT: sourceCommit,
        WORLDOS_BUILD_ROOT_HASH: buildHash,
      },
      stdio: ['ignore', output, output],
    })
    fs.closeSync(output)
    const origin = `http://127.0.0.1:${port}`
    const positive = await waitForJson(`${origin}/api/status/permission-canary`, 30000)
    const expectedHashes = tokens.map((token) => crypto.createHash('sha256').update(token).digest('hex')).sort()
    assert(positive?.fixtureLoaded === true && positive?.buildId === buildId && positive?.sourceCommit === sourceCommit, 'canary server did not load the attested build and private fixture')
    assert(JSON.stringify([...(positive?.privateCanaryHashes ?? [])].sort()) === JSON.stringify(expectedHashes), 'canary server positive control differs from frozen tokens')

    const scanRoutes = new Set(routes)
    const sitemap = await fetch(`${origin}/sitemap.xml`, { signal: globalThis.AbortSignal.timeout(10000), cache: 'no-store' }).then((response) => response.text())
    for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) scanRoutes.add(new URL(match[1], origin).pathname)
    const publicBodies = []
    for (const route of [...scanRoutes]) {
      const response = await fetch(`${origin}${route}`, { signal: globalThis.AbortSignal.timeout(10000), cache: 'no-store' })
      publicBodies.push({ label: `html:${route}`, body: await response.text() })
      const separator = route.includes('?') ? '&' : '?'
      const rscResponse = await fetch(`${origin}${route}${separator}_rsc=frozen-canary`, {
        headers: { RSC: '1' },
        signal: globalThis.AbortSignal.timeout(10000),
        cache: 'no-store',
      })
      publicBodies.push({ label: `rsc:${route}`, body: await rscResponse.text() })
    }
    const publicEndpoints = [
      '/api/lighthouse/search?q=world',
      '/api/status/build-identity',
    ]
    for (const endpoint of publicEndpoints) {
      const response = await fetch(`${origin}${endpoint}`, { signal: globalThis.AbortSignal.timeout(10000), cache: 'no-store' })
      publicBodies.push({ label: `api:${endpoint}`, body: await response.text() })
    }
    for (const surface of publicBodies) {
      for (const token of tokens) assert(!surface.body.includes(token), `private canary leaked from frozen server into ${surface.label}`)
    }
    return { origin, scannedSurfaces: publicBodies.length }
  } catch (error) {
    const serverLog = fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8').slice(-8000) : ''
    failures.push(`frozen permission canary probe failed: ${error.message}\n${serverLog}`)
    return null
  } finally {
    await stopChildProcess(child)
    fs.rmSync(tempRoot, { recursive: true, force: true })
  }
}

function validateContract(contract) {
  if (!contract) return
  assert(contract.schemaVersion === '1.1.0', 'acceptance schemaVersion must be 1.1.0')
  assert(contract.status === 'FROZEN_PRE_GOAL', 'acceptance contract is not frozen pre-Goal')

  const sceneIds = contract.scenes?.map((item) => item.id) ?? []
  const viewIds = contract.views?.map((item) => item.id) ?? []
  const flowIds = contract.flows?.map((item) => item.id) ?? []
  const matrixIds = contract.finalMatrix ?? []
  const lighthouseIds = contract.lighthouseEvalCases?.map((item) => item.id) ?? []

  assert(JSON.stringify(sceneIds) === JSON.stringify(['gateway', 'atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse']), 'acceptance scenes drift')
  assert(viewIds.length === 9 && unique(viewIds), 'acceptance views must contain 9 unique modes')
  assert(flowIds.length === 14 && unique(flowIds) && flowIds[0] === 'F1' && flowIds.at(-1) === 'F14', 'acceptance flows must be F1-F14')
  assert(contract.riskGates?.length === 4 && unique(contract.riskGates.map((item) => item.id)), 'acceptance risk gates drift')
  assert(matrixIds.length === 20 && unique(matrixIds), 'final Reality Matrix must contain 20 unique claims')
  assert(lighthouseIds.length === 10 && unique(lighthouseIds), 'Lighthouse eval set must contain 10 unique cases')
  assert(contract.recordingProtocol?.sceneRecordingMinSeconds === 60, 'scene recording minimum drift')
  assert(contract.recordingProtocol?.verticalSliceMinSeconds === 600, 'vertical slice soak minimum drift')
  assert(contract.recordingProtocol?.maxPacketGapSeconds === 1 && contract.recordingProtocol?.frameSampleFps === 1, 'recording continuity protocol drift')
  assert(contract.migrationProtocol?.uncoveredEdgesMax === 0, 'migration uncovered edge budget must be zero')
  assert(contract.performanceProtocol?.coldStartRuns >= 3 && contract.performanceProtocol?.measuredWarmRuns >= 5, 'performance sampling protocol is too weak')
  assert(contract.blindReviewProtocol?.reviewerCount === 2 && contract.blindReviewProtocol?.distinctContexts === true, 'blind review independence drift')
  assert(contract.reviewArtifactProtocol?.separateReadOnlyReportRequired === true && contract.reviewArtifactProtocol?.cryptographicPlatformIdentityClaimed === false, 'review trust boundary drift')
  assert(contract.audioProtocol?.humanSignoffRequiredForUnsuffixedCandidate === true, 'human audio boundary drift')
  assert(contract.audioProtocol?.humanReviewMinRecords === 2, 'human audio review count drift')
  assert(JSON.stringify(contract.audioProtocol?.humanReviewRequiredDeviceKinds) === JSON.stringify(['headphones', 'speakers']), 'human audio device protocol drift')
  assert(contract.audioProtocol?.humanReviewMinSecondsPerDevice === 600, 'human audio duration protocol drift')
  assert(JSON.stringify(contract.targets) === JSON.stringify({
    currentGoalFinal: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING',
    automaticWithoutHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING',
    fallbackWithHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK',
    providerWithHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER',
    promotionOutsideGoalRequired: true,
  }), 'candidate status ladder drift')
  assert(contract.evidenceArtifactProtocol?.rejectSymlinks === true, 'evidence symlink policy drift')
  assert(contract.evidenceArtifactProtocol?.liveLocalhostAndLanBuildIdentityRequired === true, 'live build identity policy drift')
  assert(contract.evidenceArtifactProtocol?.sceneViewSidecarRequired === true && contract.evidenceArtifactProtocol?.flowMediaSidecarRequired === true, 'media sidecar policy drift')
  assert(contract.evidenceArtifactProtocol?.captureSidecarRequiredFields?.length === 11 && unique(contract.evidenceArtifactProtocol.captureSidecarRequiredFields), 'capture sidecar field set drift')
  assert(contract.evidenceArtifactProtocol?.buildFingerprintExcludedPrefixes?.length === 3 && contract.evidenceArtifactProtocol?.buildFingerprintExcludedFiles?.length === 2, 'build fingerprint exclusion allowlist drift')
  assert(contract.evidenceArtifactProtocol?.requiredArtifacts?.length === 13 && unique(contract.evidenceArtifactProtocol.requiredArtifacts), 'required raw artifact set drift')
  assert(contract.evidenceArtifactProtocol?.fixedPrivateCanaryTokens?.length === 6 && unique(contract.evidenceArtifactProtocol.fixedPrivateCanaryTokens), 'fixed permission canary set drift')
  assert(contract.riskGates.every((gate) => gate.maxFailedExperimentsBeforeDesignReview === 3), 'risk gate attempt limit drift')
  assert(contract.vetoes?.length >= 18 && unique(contract.vetoes), 'acceptance vetoes are incomplete')
}

const contract = readJson(contractPath)
const controlManifest = readJson(controlManifestPath)
validateContract(contract)

if (contractOnly) {
  if (failures.length) {
    console.error(`ACCEPTANCE_CONTRACT_FAIL findings=${failures.length}`)
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exit(1)
  }
  console.log('ACCEPTANCE_CONTRACT_PASS productCompletion=not-evaluated')
  process.exit(0)
}

const plan = fs.readFileSync(planPath, 'utf8')
const tasks = [...plan.matchAll(/^- \[([ xX])\] \*\*([A-H]\.\d+)\*\*/gm)]
assert(tasks.length === 90, `plan task count must be 90, got ${tasks.length}`)
const firstUncheckedTask = tasks.find((match) => match[1].toLowerCase() !== 'x')?.[2] ?? 'none'
if (preflight) {
  assert(['H.15', 'H.16'].includes(firstUncheckedTask), `preflight requires all work before H.15 complete, got ${firstUncheckedTask}`)
} else {
  assert(firstUncheckedTask === 'none', `all A-H tasks must be checked, got ${firstUncheckedTask}`)
}

const ledger = fs.readFileSync(ledgerPath, 'utf8')
const productStatus = ledgerField(ledger, 'product_status')
if (!preflight) {
  assert(ledgerField(ledger, 'goal_status') === 'COMPLETE', 'ledger goal_status must be COMPLETE')
  assert(ledgerField(ledger, 'task_state') === 'complete', 'ledger task_state must be complete')
  assert(ledgerField(ledger, 'current_item') === 'none', 'ledger current_item must be none')
  assert(ledgerField(ledger, 'next_item') === 'none', 'ledger next_item must be none')
  assert(productStatus === contract.targets.currentGoalFinal, `current Goal must retain the human-audio-pending status: ${productStatus}`)
  assert(ledgerField(ledger, 'human_audio_signoff') === 'pending_external', 'current Goal cannot certify human audio signoff')
}

for (const gate of contract?.riskGates ?? []) {
  const row = ledger.split('\n').find((line) => line.includes(`| ${gate.id === 'content-projection' ? '内容投影门' : gate.id === 'living-vertical-slice' ? '生命样板门' : gate.id === 'sensory-prototype' ? '感官原型门' : '扩展门'} |`))
  assert(/\|\s*passed\s*\|/.test(row ?? ''), `risk gate not passed: ${gate.id}`)
}

resolvedEvidenceRoot = resolveRepositoryPath(ledgerField(ledger, 'final_evidence_run'))
assert(resolvedEvidenceRoot && fs.existsSync(resolvedEvidenceRoot) && fs.statSync(resolvedEvidenceRoot).isDirectory(), 'final evidence run does not exist')
if (resolvedEvidenceRoot && fs.existsSync(resolvedEvidenceRoot)) rejectSymlinks(resolvedEvidenceRoot)
const evidence = resolvedEvidenceRoot ? readJson(path.join(resolvedEvidenceRoot, 'manifest.json')) : null

if (evidence) {
  const sourceCommit = ledgerField(ledger, 'final_source_commit')
  const buildHash = ledgerField(ledger, 'final_build_hash')
  assert(evidence.status === 'living-world-candidate-evidence', 'unexpected final evidence status')
  assert(evidence.sourceCommit === sourceCommit, 'evidence source commit differs from ledger')
  assert(evidence.buildHash === buildHash, 'evidence build hash differs from ledger')
  assert(Object.keys(evidence.artifacts ?? {}).sort().join('|') === [...contract.evidenceArtifactProtocol.requiredArtifacts].sort().join('|'), 'raw artifact index differs from frozen set')
  const freshnessTimes = [
    evidence.freshness?.latestSourceModifiedAt,
    evidence.freshness?.buildStartedAt,
    evidence.freshness?.buildArtifactModifiedAt,
    evidence.freshness?.serverStartedAt,
    evidence.freshness?.firstEvidenceAt,
    evidence.freshness?.auditGeneratedAt,
  ].map((value) => Date.parse(value))
  assert(freshnessTimes.every(Number.isFinite), 'freshness timestamp chain is incomplete')
  assert(freshnessTimes.every((value, index) => index === 0 || value >= freshnessTimes[index - 1]), 'freshness timestamps are out of order')

  try {
    execFileSync('git', ['cat-file', '-e', `${sourceCommit}^{commit}`], { cwd: root, stdio: 'ignore' })
    const postSourceChanges = execFileSync('git', ['diff', '--name-only', `${sourceCommit}..HEAD`], { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean)
    const evidenceRelativeRoot = path.relative(root, resolvedEvidenceRoot)
    const allowedPostSourcePaths = new Set([
      'docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md',
      'docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md',
      'data/world-kernel/worldos-living-world-execution-state.json',
    ])
    for (const changedPath of postSourceChanges) {
      assert(allowedPostSourcePaths.has(changedPath) || changedPath.startsWith(`${evidenceRelativeRoot}/`), `product source changed after final build: ${changedPath}`)
    }
  } catch {
    failures.push(`final source commit does not exist: ${sourceCommit}`)
  }
  if (!preflight && contract.evidenceArtifactProtocol.requireCleanWorktreeForFinal) {
    const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim()
    assert(dirty === '', 'final verification requires a clean worktree')
  }

  const sourceSnapshot = readIndexedJson(evidence, 'source-snapshot')
  const buildFingerprint = readIndexedJson(evidence, 'build-fingerprint')
  assert(sourceSnapshot?.sourceCommit === sourceCommit, 'source snapshot commit mismatch')
  const sourceInventoryPaths = collectFiles(
    ['src', 'content', 'data', 'public', 'scripts', 'package.json', 'package-lock.json', 'next.config.ts', 'next.config.mjs', 'tsconfig.json'],
    new Set(['data/world-kernel/worldos-living-world-execution-state.json']),
  )
  const sourceInventory = sourceInventoryPaths.map((relativePath) => ({ path: relativePath, sha256: fileHash(path.join(root, relativePath)) }))
  const declaredSourceInventory = (sourceSnapshot?.files ?? []).map((file) => ({ path: file.path, sha256: file.sha256 })).sort((left, right) => left.path.localeCompare(right.path))
  assert(JSON.stringify(declaredSourceInventory) === JSON.stringify(sourceInventory), 'source snapshot does not cover the exact product source tree')
  for (const file of sourceInventory) {
    assert(fs.statSync(path.join(root, file.path)).mtimeMs <= Date.parse(evidence.freshness.buildStartedAt), `source file is newer than build: ${file.path}`)
  }
  const latestActualSourceMtime = sourceInventory.reduce((latest, file) => Math.max(latest, fs.statSync(path.join(root, file.path)).mtimeMs), 0)
  assert(Math.abs(latestActualSourceMtime - Date.parse(evidence.freshness.latestSourceModifiedAt)) <= 1000, 'latest source mtime differs from freshness record')
  assert(sourceInventory.length > 0, 'source snapshot is empty')
  const computedSourceRootHash = crypto.createHash('sha256').update(JSON.stringify(
    sourceInventory,
  )).digest('hex')
  assert(sourceSnapshot?.rootSha256 === computedSourceRootHash, 'source snapshot root hash mismatch')

  const currentBuildIdPath = path.join(root, '.next/BUILD_ID')
  assert(fs.existsSync(currentBuildIdPath), 'current .next/BUILD_ID is missing')
  const currentBuildId = fs.existsSync(currentBuildIdPath) ? fs.readFileSync(currentBuildIdPath, 'utf8').trim() : null
  assert(currentBuildId === evidence.buildId, 'current Next build ID differs from evidence')
  const requiredBuildFiles = collectFiles(['.next']).filter((relativePath) =>
    !contract.evidenceArtifactProtocol.buildFingerprintExcludedFiles.includes(relativePath)
      && !contract.evidenceArtifactProtocol.buildFingerprintExcludedPrefixes.some((prefix) => relativePath.startsWith(prefix)))
  const actualBuildFiles = requiredBuildFiles.map((relativePath) => ({ path: relativePath, sha256: fileHash(path.join(root, relativePath)) })).sort((left, right) => left.path.localeCompare(right.path))
  assert(actualBuildFiles.every((file) => file.sha256), 'one or more required build fingerprint files are missing')
  const latestBuildArtifactMtime = requiredBuildFiles.filter((relativePath) => fs.existsSync(path.join(root, relativePath))).reduce((latest, relativePath) => Math.max(latest, fs.statSync(path.join(root, relativePath)).mtimeMs), 0)
  assert(latestBuildArtifactMtime >= Date.parse(evidence.freshness.buildStartedAt) && latestBuildArtifactMtime <= Date.parse(evidence.freshness.serverStartedAt), 'actual build artifact mtime is outside build/server window')
  assert(Math.abs(latestBuildArtifactMtime - Date.parse(evidence.freshness.buildArtifactModifiedAt)) <= 1000, 'build artifact mtime differs from freshness record')
  const declaredBuildFiles = (buildFingerprint?.files ?? []).map((file) => ({ path: file.path, sha256: file.sha256 })).sort((left, right) => left.path.localeCompare(right.path))
  assert(JSON.stringify(declaredBuildFiles) === JSON.stringify(actualBuildFiles), 'build fingerprint does not match the exact required build files')
  const computedBuildRootHash = crypto.createHash('sha256').update(JSON.stringify(
    actualBuildFiles,
  )).digest('hex')
  assert(buildFingerprint?.buildId === evidence.buildId && buildFingerprint?.rootSha256 === computedBuildRootHash && computedBuildRootHash === buildHash, 'build fingerprint identity mismatch')
  const serverPid = Number(evidence.server?.pid)
  const serverPort = Number(evidence.server?.port)
  const lanAddress = evidence.server?.lanAddress
  assert(Number.isInteger(serverPid) && serverPid > 0 && Number.isInteger(serverPort) && serverPort > 0, 'server PID/port attestation is invalid')
  const processInfo = inspectServerProcess(serverPid)
  if (processInfo) {
    assert(/next(?:-server|\s+start)/i.test(processInfo.command), 'attested PID is not a Next production server')
    assert(/(?:^|\/)node(?:$|\s)/i.test(processInfo.executable) || /node/i.test(processInfo.parentCommand), 'attested server executable/parent chain is not Node')
    assert(/next/i.test(`${processInfo.command} ${processInfo.parentCommand}`), 'attested server parent chain does not contain Next')
    assert(processInfo.cwd === rootRealPath, 'attested Next server cwd differs from repository')
    assert(processInfo.listeners.includes(`:${serverPort}`), 'attested Next server is not listening on the declared port')
    assert(Math.abs(processInfo.startedAt - Date.parse(evidence.freshness.serverStartedAt)) <= 2000, 'server start time differs from process start')
  }
  const localLanAddresses = Object.values(os.networkInterfaces()).flat().filter((entry) => entry?.family === 'IPv4' && !entry.internal).map((entry) => entry.address)
  assert(localLanAddresses.includes(lanAddress), 'declared LAN address is not a current local interface')
  const buildIdentityUrls = [
    `http://127.0.0.1:${serverPort}/api/status/build-identity`,
    `http://${lanAddress}:${serverPort}/api/status/build-identity`,
  ]
  const allowedOrigins = new Set(buildIdentityUrls.map((url) => new URL(url).origin))
  const localUrlKinds = buildIdentityUrls.map(classifyLocalUrl)
  assert(localUrlKinds.includes('loopback') && localUrlKinds.includes('lan') && !localUrlKinds.includes('invalid'), 'localhost and private LAN build identity URLs are required')
  for (const url of buildIdentityUrls) {
    const identity = await fetchBuildIdentity(url)
    assert(identity?.buildId === evidence.buildId && identity?.sourceCommit === sourceCommit && identity?.buildRootHash === buildHash, `live server build identity mismatch: ${url}`)
  }
  const liveChunkPath = requiredBuildFiles.find((relativePath) => relativePath.startsWith('.next/static/chunks/') && relativePath.endsWith('.js'))
  assert(Boolean(liveChunkPath), 'build fingerprint contains no live client chunk')
  if (liveChunkPath) {
    const chunkUrl = `${[...allowedOrigins][0]}${liveChunkPath.slice('.next'.length)}`
    try {
      const liveChunk = Buffer.from(await fetch(chunkUrl, { signal: globalThis.AbortSignal.timeout(10000), cache: 'no-store' }).then((response) => response.arrayBuffer()))
      assert(crypto.createHash('sha256').update(liveChunk).digest('hex') === fileHash(path.join(root, liveChunkPath)), 'live client chunk differs from build Merkle')
    } catch (error) {
      failures.push(`cannot compare live client chunk: ${error.message}`)
    }
  }

  const sceneEvidence = evidence.sceneEvidence ?? []
  const captureNonces = new Set()
  for (const scene of contract.scenes) {
    const item = sceneEvidence.find((candidate) => candidate.sceneId === scene.id)
    assert(item, `missing scene evidence: ${scene.id}`)
    if (!item) continue

    const recording = item.recording
    const recordingPath = assertHashedFile(recording, `${scene.id} recording`)
    assert(recordingPath && fs.existsSync(recordingPath), `missing scene recording: ${scene.id}`)
    if (recordingPath && fs.existsSync(recordingPath)) {
      assert(JSON.stringify(recording.roi) === JSON.stringify(scene.motionRoi), `${scene.id} recording ROI differs from frozen scene subject`)
      const analysis = mediaAnalysis(recordingPath, contract.recordingProtocol.frameSampleFps, scene.motionRoi)
      assert(analysis.durationSeconds >= contract.recordingProtocol.sceneRecordingMinSeconds, `${scene.id} recording is shorter than 60 seconds`)
      assert(analysis.durationSeconds <= contract.recordingProtocol.sceneRecordingMaxSeconds + 1, `${scene.id} recording is longer than 120 seconds`)
      assert(Math.abs(analysis.durationSeconds - Number(recording.ffprobeDurationSeconds)) <= 0.5, `${scene.id} recording duration metadata mismatch`)
      assert(analysis.packetCount > 0 && analysis.nonMonotonicPacketCount === 0, `${scene.id} recording packet timeline is invalid`)
      assert(analysis.maxPacketGapSeconds <= contract.recordingProtocol.maxPacketGapSeconds, `${scene.id} recording has a packet gap`)
      assert(analysis.uniqueFrameRatio >= contract.recordingProtocol.sceneMinUniqueFrameRatio, `${scene.id} recording has too many repeated or frozen sampled frames`)
      assert(analysis.roiDynamicFrameRatio >= contract.recordingProtocol.roiMinDynamicFrameRatio, `${scene.id} subject ROI lacks sustained visible change`)
      assert(analysis.roiMaxShortPeriodRepeatRatio <= contract.recordingProtocol.roiMaxShortPeriodRepeatRatio, `${scene.id} subject ROI is dominated by a short repeat period`)
      const wallClockSeconds = (Date.parse(recording.finishedAt) - Date.parse(recording.startedAt)) / 1000
      const monotonicSeconds = (recording.monotonicFinishedMs - recording.monotonicStartedMs) / 1000
      assert(wallClockSeconds >= analysis.durationSeconds - 1, `${scene.id} recording wall-clock interval is too short`)
      assert(monotonicSeconds >= analysis.durationSeconds - 1, `${scene.id} recording monotonic interval is too short`)
      assert(recording.continuousWallClock === true && recording.edited === false && recording.repeatedAssembly === false, `${scene.id} recording is not declared continuous and unedited`)
      assert(recording.sourceCommit === sourceCommit && recording.buildId === evidence.buildId, `${scene.id} recording build identity mismatch`)
      assert(allowedOrigins.has(recording.origin), `${scene.id} recording used an unattested origin`)
      assert(recording.captureCommand && recording.frameDifferenceSummary, `${scene.id} recording metadata incomplete`)
      const sidecar = readHashedJsonDescriptor(recording.sidecar, `${scene.id} recording sidecar`)
      assert(sidecar?.sourceCommit === sourceCommit && sidecar?.buildId === evidence.buildId && sidecar?.origin === recording.origin, `${scene.id} recording sidecar identity mismatch`)
      assert(sidecar?.outputSha256 === recording.sha256 && sidecar?.captureCommand === recording.captureCommand, `${scene.id} recording sidecar does not bind output and command`)
      assert(sidecar?.monotonicStartedMs === recording.monotonicStartedMs && sidecar?.monotonicFinishedMs === recording.monotonicFinishedMs, `${scene.id} recording sidecar monotonic time mismatch`)
      assert(sidecar?.serverPid === serverPid && sidecar?.serverStartedAt === evidence.freshness.serverStartedAt && /^[a-f0-9]{32,}$/.test(sidecar?.captureNonce ?? ''), `${scene.id} recording sidecar lacks server-bound nonce`)
    }

    const capturedViews = new Map((item.views ?? []).map((view) => [view.id, view]))
    for (const view of contract.views) {
      const capturedView = capturedViews.get(view.id)
      assert(capturedView, `${scene.id} missing view ${view.id}`)
      if (capturedView) {
        const viewPath = assertHashedFile(capturedView, `${scene.id} ${view.id}`)
        const sidecar = validateCaptureSidecar({
          descriptor: capturedView,
          absolutePath: viewPath,
          label: `${scene.id} ${view.id}`,
          sourceCommit,
          buildId: evidence.buildId,
          serverPid,
          serverStartedAt: evidence.freshness.serverStartedAt,
          allowedOrigins,
          sceneId: scene.id,
          viewId: view.id,
        })
        if (sidecar) {
          assert(!captureNonces.has(sidecar.captureNonce), `${scene.id} ${view.id} reused a capture nonce`)
          captureNonces.add(sidecar.captureNonce)
          if (view.viewport) assert(sidecar.viewport === view.viewport, `${scene.id} ${view.id} viewport differs from contract`)
        }
      }
    }
  }

  const soakPath = assertHashedFile(evidence.verticalSliceSoak, 'vertical slice soak')
  assert(soakPath && fs.existsSync(soakPath), 'missing vertical slice soak recording')
  if (soakPath && fs.existsSync(soakPath)) {
    const soakAnalysis = mediaAnalysis(soakPath, contract.recordingProtocol.frameSampleFps)
    assert(soakAnalysis.durationSeconds >= contract.recordingProtocol.verticalSliceMinSeconds, 'vertical slice soak is shorter than 10 minutes')
    assert(soakAnalysis.packetCount > 0 && soakAnalysis.nonMonotonicPacketCount === 0, 'vertical slice packet timeline is invalid')
    assert(soakAnalysis.maxPacketGapSeconds <= contract.recordingProtocol.maxPacketGapSeconds, 'vertical slice has a packet gap')
    assert(soakAnalysis.uniqueFrameRatio >= contract.recordingProtocol.soakMinUniqueFrameRatio, 'vertical slice has too many repeated or frozen sampled frames')
    const soakWallClockSeconds = (Date.parse(evidence.verticalSliceSoak.finishedAt) - Date.parse(evidence.verticalSliceSoak.startedAt)) / 1000
    const soakMonotonicSeconds = (evidence.verticalSliceSoak.monotonicFinishedMs - evidence.verticalSliceSoak.monotonicStartedMs) / 1000
    assert(soakWallClockSeconds >= contract.recordingProtocol.verticalSliceMinSeconds, 'vertical slice wall-clock interval is too short')
    assert(soakMonotonicSeconds >= contract.recordingProtocol.verticalSliceMinSeconds, 'vertical slice monotonic interval is too short')
    assert(evidence.verticalSliceSoak.continuousWallClock === true && evidence.verticalSliceSoak.edited === false && evidence.verticalSliceSoak.repeatedAssembly === false, 'vertical slice soak is not continuous and unedited')
    const soakSidecar = readHashedJsonDescriptor(evidence.verticalSliceSoak.sidecar, 'vertical slice recording sidecar')
    assert(soakSidecar?.sourceCommit === sourceCommit && soakSidecar?.buildId === evidence.buildId && soakSidecar?.outputSha256 === evidence.verticalSliceSoak.sha256, 'vertical slice sidecar identity mismatch')
  }
  assert(evidence.verticalSliceSoak?.resourceStable === true, 'vertical slice resources are not stable')
  assert(evidence.verticalSliceSoak?.hiddenResumePassed === true, 'hidden/resume soak failed')

  const flowTraces = readIndexedJson(evidence, 'flow-traces')
  const flowMap = new Map((flowTraces?.flows ?? []).map((item) => [item.id, item]))
  assert(flowTraces?.sourceCommit === sourceCommit && flowTraces?.buildId === evidence.buildId, 'flow trace build identity mismatch')
  for (const flow of contract.flows) {
    const item = flowMap.get(flow.id)
    assert(item, `flow trace missing: ${flow.id}`)
    if (!item) continue
    assert(Number.isFinite(Date.parse(item.startedAt)) && Date.parse(item.finishedAt) >= Date.parse(item.startedAt), `flow timing invalid: ${flow.id}`)
    assert(allowedOrigins.has(item.origin), `flow used an unattested origin: ${flow.id}`)
    const tracePath = assertHashedFile(item.trace, `${flow.id} trace`)
    const traceSummary = readHashedJsonDescriptor(item.traceSummary, `${flow.id} trace summary`)
    assert(tracePath && traceSummary?.flowId === flow.id && traceSummary?.sourceCommit === sourceCommit && traceSummary?.buildId === evidence.buildId && traceSummary?.origin === item.origin, `flow trace summary identity mismatch: ${flow.id}`)
    assert(Array.isArray(traceSummary?.observedSteps) && traceSummary.observedSteps.length >= flow.steps.length, `flow steps incomplete: ${flow.id}`)
    assert((traceSummary?.consoleErrors ?? []).length === 0 && (traceSummary?.pageErrors ?? []).length === 0 && (traceSummary?.unexpectedFailedRequests ?? []).length === 0, `flow runtime errors: ${flow.id}`)
    assert(traceSummary?.traceSha256 === item.trace.sha256, `flow trace summary does not bind trace: ${flow.id}`)
    const flowRecordingPath = assertHashedFile(item.recording, `${flow.id} recording`)
    const flowRecordingSidecar = validateCaptureSidecar({
      descriptor: item.recording,
      absolutePath: flowRecordingPath,
      label: `${flow.id} recording`,
      sourceCommit,
      buildId: evidence.buildId,
      serverPid,
      serverStartedAt: evidence.freshness.serverStartedAt,
      allowedOrigins,
      flowId: flow.id,
    })
    if (flowRecordingSidecar) {
      assert(flowRecordingSidecar.mode === 'flow', `flow recording mode mismatch: ${flow.id}`)
      assert(!captureNonces.has(flowRecordingSidecar.captureNonce), `flow recording reused a capture nonce: ${flow.id}`)
      captureNonces.add(flowRecordingSidecar.captureNonce)
    }
    if (flowRecordingPath) {
      const flowMedia = mediaAnalysis(flowRecordingPath, contract.recordingProtocol.frameSampleFps)
      assert(flowMedia.durationSeconds >= contract.recordingProtocol.flowRecordingMinSeconds, `flow recording is too short: ${flow.id}`)
      assert(flowMedia.packetCount > 0 && flowMedia.nonMonotonicPacketCount === 0 && flowMedia.maxPacketGapSeconds <= contract.recordingProtocol.maxPacketGapSeconds, `flow recording timeline is invalid: ${flow.id}`)
      assert(flowMedia.uniqueFrameRatio >= contract.recordingProtocol.flowMinUniqueFrameRatio, `flow recording lacks visible interaction change: ${flow.id}`)
    }
  }

  const timeCausality = readIndexedJson(evidence, 'time-causality')
  const timePairs = timeCausality?.pairs ?? []
  assert(timeCausality?.sourceCommit === sourceCommit && timeCausality?.buildId === evidence.buildId, 'time causality build identity mismatch')
  for (const pair of timePairs) {
    assert(contract.scenes.some((scene) => scene.id === pair.sceneId), `unknown time pair scene: ${pair.sceneId}`)
    assert(contract.timeCausalityProtocol.dayPeriods.includes(pair.dayPeriod) && contract.timeCausalityProtocol.seasons.includes(pair.season), `invalid time pair state: ${pair.sceneId}`)
    const beforeState = readHashedJsonDescriptor(pair.beforeState, `${pair.sceneId} state-before`)
    const afterState = readHashedJsonDescriptor(pair.afterState, `${pair.sceneId} state-after`)
    if (beforeState && afterState) {
      assert(beforeState.captureGroupId === afterState.captureGroupId && beforeState.captureId !== afterState.captureId, `time pair capture identity invalid: ${pair.sceneId}`)
      assert(beforeState.captureId === pair.before.captureId && afterState.captureId === pair.after.captureId, `time pair screenshot/state capture ID mismatch: ${pair.sceneId}`)
      assert(beforeState.screenshotSha256 === pair.before.sha256 && afterState.screenshotSha256 === pair.after.sha256, `time pair screenshot/state hash mismatch: ${pair.sceneId}`)
      assert(beforeState.buildId === evidence.buildId && afterState.buildId === evidence.buildId && beforeState.sourceCommit === sourceCommit && afterState.sourceCommit === sourceCommit, `time pair build identity mismatch: ${pair.sceneId}`)
      assert(allowedOrigins.has(beforeState.origin) && allowedOrigins.has(afterState.origin) && beforeState.origin === afterState.origin, `time pair origin mismatch: ${pair.sceneId}`)
      assert(Number.isFinite(Date.parse(beforeState.capturedAt)) && Number.isFinite(Date.parse(afterState.capturedAt)) && beforeState.captureCommand && afterState.captureCommand && beforeState.devtoolsSessionId && afterState.devtoolsSessionId, `time pair capture sidecar incomplete: ${pair.sceneId}`)
      assert(beforeState.serverPid === serverPid && afterState.serverPid === serverPid && beforeState.serverStartedAt === evidence.freshness.serverStartedAt && afterState.serverStartedAt === evidence.freshness.serverStartedAt, `time pair is not bound to the attested server: ${pair.sceneId}`)
      assert(/^[a-f0-9]{32,}$/.test(beforeState.captureNonce ?? '') && /^[a-f0-9]{32,}$/.test(afterState.captureNonce ?? '') && beforeState.captureNonce !== afterState.captureNonce, `time pair capture nonce invalid: ${pair.sceneId}`)
      assert(beforeState.sceneId === pair.sceneId && afterState.sceneId === pair.sceneId, `time state scene mismatch: ${pair.sceneId}`)
      for (const fixedField of ['contentHash', 'viewport', 'worldDateKey', 'quality']) {
        assert(JSON.stringify(beforeState[fixedField]) === JSON.stringify(afterState[fixedField]), `time pair changed fixed field ${fixedField}: ${pair.sceneId}`)
      }
      assert(JSON.stringify(beforeState.semanticGeometry) === JSON.stringify(afterState.semanticGeometry), `time pair changed semantic geometry: ${pair.sceneId}`)
      assert(beforeState.rootComputedStyle?.filter === afterState.rootComputedStyle?.filter, `time pair relies on a changed root filter: ${pair.sceneId}`)
      assert(JSON.stringify(beforeState.sceneRecipe) !== JSON.stringify(afterState.sceneRecipe), `time pair has no scene-specific recipe change: ${pair.sceneId}`)
      assert(afterState.time?.dayPeriod === pair.dayPeriod && afterState.time?.season === pair.season, `time state does not match requested pair: ${pair.sceneId}`)
      assert(beforeState.time?.dayPeriod !== afterState.time?.dayPeriod || beforeState.time?.season !== afterState.time?.season, `time pair did not change time or season: ${pair.sceneId}`)
    }
    const before = assertHashedFile(pair.before, `${pair.sceneId} time-before`)
    const after = assertHashedFile(pair.after, `${pair.sceneId} time-after`)
    if (before && after) {
      assert(fileHash(before) !== fileHash(after), `time pair images are identical: ${pair.sceneId}`)
      assert(Math.abs(fs.statSync(before).mtimeMs - Date.parse(beforeState?.capturedAt)) <= 2000 && Math.abs(fs.statSync(after).mtimeMs - Date.parse(afterState?.capturedAt)) <= 2000, `time pair file mtime differs from capture sidecar: ${pair.sceneId}`)
    }
  }
  for (const scene of contract.scenes) {
    const combinations = new Set(timePairs.filter((pair) => pair.sceneId === scene.id).map((pair) => `${pair.dayPeriod}:${pair.season}`))
    const requiredCombinations = ['gateway', 'node'].includes(scene.id) ? 16 : 4
    assert(combinations.size >= requiredCombinations, `time/season coverage incomplete: ${scene.id}`)
  }

  const migration = readIndexedJson(evidence, 'migration-edges')
  const allowedBypass = new Set(contract.migrationProtocol.allowedBypassKinds)
  const coveredFamilies = new Set()
  let uncoveredEdges = 0
  for (const edge of migration?.edges ?? []) {
    if (edge.routeFamily) coveredFamilies.add(edge.routeFamily)
    if (edge.bypassKind) {
      if (!allowedBypass.has(edge.bypassKind) || edge.trace) uncoveredEdges += 1
      continue
    }
    if (JSON.stringify(edge.phases) !== JSON.stringify(contract.migrationProtocol.requiredPhases)) uncoveredEdges += 1
    const trace = readHashedJsonDescriptor(edge.trace, `migration ${edge.source}->${edge.target}`)
    const observedPhases = trace?.events?.filter((event) => event.edgeId === edge.id).map((event) => event.phase) ?? []
    if (JSON.stringify(observedPhases) !== JSON.stringify(contract.migrationProtocol.requiredPhases)) uncoveredEdges += 1
    if (trace?.source !== edge.source || trace?.target !== edge.target || !allowedOrigins.has(trace?.origin)) uncoveredEdges += 1
  }
  assert((migration?.edges ?? []).length > 0, 'migration edge inventory is empty')
  for (const family of contract.migrationProtocol.routeFamilies) assert(coveredFamilies.has(family), `migration route family missing: ${family}`)
  assert(uncoveredEdges === contract.migrationProtocol.uncoveredEdgesMax, `cross-scene migration has ${uncoveredEdges} uncovered edges`)
  const crawledEdges = await crawlPublicNavigationEdges([...allowedOrigins][0], contract.scenes.map((scene) => scene.route))
  const inventoriedEdges = new Set((migration?.edges ?? []).filter((edge) => sceneIdForPath(edge.source) && sceneIdForPath(edge.target)).map((edge) => `${edge.source}->${edge.target}`))
  assert(JSON.stringify([...inventoriedEdges].sort()) === JSON.stringify([...crawledEdges].sort()), 'migration inventory differs from live public navigation crawl')
  assert(migration?.rapidNavigation?.count >= contract.migrationProtocol.rapidNavigationCount, 'rapid migration coverage incomplete')
  assert((migration?.rapidNavigation?.leakedResources ?? ['unknown']).length === 0, 'rapid migration leaked resources')
  assertHashedFile(migration?.rapidNavigation?.trace, 'rapid migration trace')

  const frozenBrowserProbe = runFrozenBrowserProbe([...allowedOrigins][0], contract.scenes.map((scene) => scene.route))
  if (frozenBrowserProbe) {
    assert(String(evidence.browser?.version ?? '').includes(frozenBrowserProbe.browserVersion) || frozenBrowserProbe.browserVersion.includes(String(evidence.browser?.version ?? '')), 'frozen browser version differs from evidence')
    const directFrames = frozenBrowserProbe.performance?.frames ?? []
    assert(directFrames.length >= contract.performanceProtocol.ambientFrameSampleMin, 'frozen browser probe captured too few animation frames')
    assert(percentile(directFrames, 0.95) <= contract.performanceProtocol.budgets.ambientFrameP95MsMax, 'frozen CPU-4x browser probe exceeds ambient p95 budget')
    assert(frozenBrowserProbe.performance?.lcp > 0 && frozenBrowserProbe.performance.lcp <= contract.performanceProtocol.budgets.lcpMsMax, 'frozen browser probe exceeds LCP budget')
    assert(frozenBrowserProbe.performance?.cls <= contract.performanceProtocol.budgets.clsMax, 'frozen browser probe exceeds CLS budget')
    const hydratedDestinationEdges = new Set((frozenBrowserProbe.edges ?? []).filter((edge) => edge.kind === 'scene-destination' && sceneIdForPath(edge.source) && sceneIdForPath(edge.target)).map((edge) => `${edge.source}->${edge.target}`))
    for (const edge of hydratedDestinationEdges) assert(inventoriedEdges.has(edge), `hydrated scene destination missing from migration inventory: ${edge}`)
    assert(hydratedDestinationEdges.size >= contract.scenes.length, 'frozen browser probe found too few hydrated scene destinations')
    assert((frozenBrowserProbe.migrations ?? []).length >= 5, 'frozen browser probe completed too few live migrations')
    for (const migrationProbe of frozenBrowserProbe.migrations ?? []) {
      const phases = migrationProbe.events.map((event) => event.phase)
      assert(JSON.stringify(phases) === JSON.stringify(contract.migrationProtocol.requiredPhases), `live migration phases invalid: ${migrationProbe.source}->${migrationProbe.target}`)
      assert(migrationProbe.arrived === migrationProbe.target && migrationProbe.activeElement && migrationProbe.activeElement !== 'BODY', `live migration did not settle with focus: ${migrationProbe.source}->${migrationProbe.target}`)
    }
  }

  const audio = readIndexedJson(evidence, 'audio-analysis')
  const audioBudgets = contract.audioProtocol.technicalBudgets
  const audioEvents = [...(audio?.runtimeEvents ?? [])].sort((left, right) => Number(left.atMs) - Number(right.atMs))
  const firstGestureAt = audioEvents.find((event) => event.type === 'gesture')?.atMs ?? Number.POSITIVE_INFINITY
  const bytesBeforeGesture = audioEvents.filter((event) => event.type === 'audio-fetch' && event.atMs < firstGestureAt).reduce((sum, event) => sum + Number(event.bytes ?? 0), 0)
  let activeContexts = 0
  let activeAmbiences = 0
  let activeCues = 0
  let maxContexts = 0
  let maxAmbiences = 0
  let maxCues = 0
  for (const event of audioEvents) {
    if (event.type === 'context-created') activeContexts += 1
    if (event.type === 'context-closed') activeContexts = Math.max(0, activeContexts - 1)
    if (event.type === 'ambience-start') activeAmbiences += 1
    if (event.type === 'ambience-stop') activeAmbiences = Math.max(0, activeAmbiences - 1)
    if (event.type === 'cue-start') activeCues += 1
    if (event.type === 'cue-stop') activeCues = Math.max(0, activeCues - 1)
    maxContexts = Math.max(maxContexts, activeContexts)
    maxAmbiences = Math.max(maxAmbiences, activeAmbiences)
    maxCues = Math.max(maxCues, activeCues)
  }
  assert(bytesBeforeGesture <= audioBudgets.audioBytesBeforeGestureMax, 'audio downloaded before user gesture')
  assert(maxContexts <= audioBudgets.audioContextMax, 'too many AudioContexts')
  assert(maxAmbiences <= audioBudgets.ambienceMax, 'too many concurrent ambiences')
  assert(maxCues <= audioBudgets.cueMax, 'too many concurrent cues')
  assert(activeAmbiences + activeCues <= audioBudgets.sourcesAfterDisposeMax, 'audio sources remain after dispose')
  for (const reason of ['hidden', 'mute', 'quiet', 'dispose']) {
    const snapshots = audioEvents.filter((event) => event.type === 'resource-snapshot' && event.reason === reason)
    assert(snapshots.some((snapshot) => snapshot.activeAmbiences === 0 && snapshot.activeCues === 0 && snapshot.contextState !== 'running'), `audio lifecycle snapshot missing: ${reason}`)
  }
  const offlineRenderPath = assertHashedFile(audio?.offlineRender, 'audio offline render')
  const audioGraph = readHashedJsonDescriptor(audio?.runtimeGraph, 'audio runtime graph')
  const offlineRenderSidecar = readHashedJsonDescriptor(audio?.offlineRenderSidecar, 'audio offline render sidecar')
  assert(offlineRenderSidecar?.outputSha256 === audio?.offlineRender?.sha256 && offlineRenderSidecar?.runtimeGraphSha256 === audio?.runtimeGraph?.sha256, 'audio offline render is not bound to the runtime graph')
  assert(offlineRenderSidecar?.sourceCommit === sourceCommit && offlineRenderSidecar?.buildId === evidence.buildId && offlineRenderSidecar?.serverPid === serverPid && /^[a-f0-9]{32,}$/.test(offlineRenderSidecar?.captureNonce ?? ''), 'audio offline render sidecar lacks source/server nonce')
  assert(audioGraph?.recipes?.length === contract.scenes.length && audioGraph?.singleAudioContext === true, 'audio runtime graph coverage is incomplete')
  if (offlineRenderPath) {
    const pcm = analyzePcmAudio(offlineRenderPath)
    assert(pcm.durationSeconds >= audioBudgets.offlineRenderSecondsMin, 'audio offline render is shorter than ten minutes')
    assert(pcm.truePeakDbfs <= audioBudgets.truePeakDbtpMax && pcm.samplePeakDbfs <= audioBudgets.truePeakDbtpMax, 'audio true/sample peak exceeds budget')
    assert(pcm.seamRmsDeltaDb <= audioBudgets.loopSeamDeltaDbMax, 'audio loop seam exceeds budget')
    assert(pcm.clippedSampleRatio === 0, 'audio offline render contains clipped samples')
  }
  assertHashedFile(audio?.waveform, 'audio waveform')
  assertHashedFile(audio?.spectrogram, 'audio spectrogram')

  const humanReviews = audio?.humanReviews ?? []
  const passedHumanReviews = humanReviews.filter((review) => review.verdict === 'pass')
  const passedDeviceKinds = new Set(passedHumanReviews.map((review) => review.deviceKind))
  const humanAudioPassed = passedHumanReviews.length >= contract.audioProtocol.humanReviewMinRecords
    && contract.audioProtocol.humanReviewRequiredDeviceKinds.every((deviceKind) => passedDeviceKinds.has(deviceKind))
  if (passedHumanReviews.length > 0) {
    assert(humanAudioPassed, 'partial human audio signoff cannot be treated as complete')
    for (const review of passedHumanReviews) {
      for (const field of contract.audioProtocol.humanReviewRequiredFields) {
        assert(review[field] !== undefined && review[field] !== null, `human audio review missing ${field}`)
      }
      const durationSeconds = (Date.parse(review.finishedAt) - Date.parse(review.startedAt)) / 1000
      assert(durationSeconds >= contract.audioProtocol.humanReviewMinSecondsPerDevice, `human audio review is shorter than 10 minutes: ${review.deviceKind}`)
    }
  }

  const lighthouse = readIndexedJson(evidence, 'lighthouse-eval')
  const publicProjection = readHashedJsonDescriptor(lighthouse?.publicProjection, 'Lighthouse public projection')
  const publicSourceIds = new Set((publicProjection?.nodes ?? []).map((node) => node.id))
  const reachableHrefs = new Set((migration?.edges ?? []).flatMap((edge) => [edge.source, edge.target]))
  const lighthouseMap = new Map((lighthouse?.cases ?? []).map((item) => [item.id, item]))
  for (const evalCase of contract.lighthouseEvalCases) {
    const item = lighthouseMap.get(evalCase.id)
    assert(item, `Lighthouse eval missing: ${evalCase.id}`)
    if (!item) continue
    const storedEnvelope = readHashedJsonDescriptor(item.response, `Lighthouse response ${evalCase.id}`)
    let liveEnvelope = null
    let liveStatus = 0
    try {
      const liveResponse = await fetch(`${[...allowedOrigins][0]}/api/status/lighthouse-eval`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: evalCase.id,
          contextRoute: evalCase.contextRoute,
          question: evalCase.question,
          fault: evalCase.fault ?? null,
        }),
        signal: globalThis.AbortSignal.timeout(15000),
        cache: 'no-store',
      })
      liveStatus = liveResponse.status
      liveEnvelope = await liveResponse.json()
    } catch (error) {
      failures.push(`live Lighthouse replay failed ${evalCase.id}: ${error.message}`)
    }
    assert(liveEnvelope?.buildId === evidence.buildId && liveEnvelope?.sourceCommit === sourceCommit && liveEnvelope?.caseId === evalCase.id, `live Lighthouse envelope identity mismatch: ${evalCase.id}`)
    assert(liveStatus === item.httpStatus && canonicalJson(liveEnvelope) === canonicalJson(storedEnvelope), `stored Lighthouse response differs from live replay: ${evalCase.id}`)
    const response = storedEnvelope?.payload
    if (!response) continue
    const serializedResponse = JSON.stringify(response)
    for (const canary of contract.evidenceArtifactProtocol.fixedPrivateCanaryTokens) assert(!serializedResponse.includes(canary), `Lighthouse leaked private canary: ${evalCase.id}`)
    assert((response.sourceIds ?? []).every((sourceId) => publicSourceIds.has(sourceId)), `Lighthouse used non-public source: ${evalCase.id}`)
    for (const requiredSourceId of evalCase.requiredSourceIds ?? []) assert(response.sourceIds?.includes(requiredSourceId), `Lighthouse missing required source ${requiredSourceId}`)
    assert((response.nextSteps ?? []).every((step) => reachableHrefs.has(step.href) && typeof step.reason === 'string' && step.reason.length > 0), `Lighthouse next step invalid: ${evalCase.id}`)
    if (!['unknown-world', 'private-refusal'].includes(evalCase.id)) assert((response.nextSteps ?? []).length > 0, `Lighthouse response has no reachable next step: ${evalCase.id}`)
    if (['provider-timeout', 'provider-schema-error'].includes(evalCase.fault)) assert(response.mode === 'low-light', `Lighthouse did not fall back honestly: ${evalCase.id}`)
    if (evalCase.id === 'private-refusal') assert(Boolean(response.refusalReason) && (response.sourceIds ?? []).length === 0, 'Lighthouse private request was not refused')
    if (evalCase.id === 'unknown-world') assert(Boolean(response.refusalReason) || response.confidence === 'low', 'Lighthouse fabricated an unknown destination')
    assert(item.httpStatus >= 200 && item.httpStatus < 500 && Number.isFinite(Number(item.elapsedMs)), `Lighthouse transport evidence invalid: ${evalCase.id}`)
  }

  const permission = readIndexedJson(evidence, 'permission-scan')
  const requiredSurfaceKinds = ['html', 'rsc', 'json', 'search', 'ai-context', 'canvas', 'screenshot', 'public-export']
  const permissionSurfaces = new Map((permission?.surfaces ?? []).map((surface) => [surface.kind, surface]))
  for (const kind of requiredSurfaceKinds) {
    const surface = permissionSurfaces.get(kind)
    const surfacePath = assertHashedFile(surface, `permission ${kind}`)
    if (surfacePath) {
      const content = fs.readFileSync(surfacePath)
      for (const canary of contract.evidenceArtifactProtocol.fixedPrivateCanaryTokens) assert(!content.includes(Buffer.from(canary)), `private canary leaked into ${kind}`)
    }
  }
  assert(JSON.stringify(permission?.canaryTokens) === JSON.stringify(contract.evidenceArtifactProtocol.fixedPrivateCanaryTokens), 'permission scan canary set drift')
  const frozenCanaryProbe = await runFrozenPermissionCanaryProbe({
    sourceCommit,
    buildId: evidence.buildId,
    buildHash,
    routes: contract.scenes.map((scene) => scene.route),
    tokens: contract.evidenceArtifactProtocol.fixedPrivateCanaryTokens,
  })
  assert((frozenCanaryProbe?.scannedSurfaces ?? 0) >= contract.scenes.length + 2, 'frozen permission canary probe scanned too few live surfaces')

  const exportRestore = readIndexedJson(evidence, 'public-export-restore')
  assert(exportRestore?.scope === 'public', 'export scope is not public')
  const exportRoot = exportRestore?.exportRoot ? resolveRunArtifact(exportRestore.exportRoot) : null
  const checksumPath = exportRestore?.checksumsPath ? resolveRunArtifact(exportRestore.checksumsPath) : null
  assert(exportRoot && fs.existsSync(exportRoot) && checksumPath && fs.existsSync(checksumPath), 'public export package is missing')
  if (exportRoot && checksumPath && fs.existsSync(checksumPath)) {
    const listedExportPaths = []
    for (const line of fs.readFileSync(checksumPath, 'utf8').split('\n').filter(Boolean)) {
      const match = line.match(/^([a-f0-9]{64})\s+\*?(.+)$/)
      assert(match, `invalid export checksum line: ${line}`)
      if (!match) continue
      listedExportPaths.push(match[2])
      const exportedFile = path.resolve(exportRoot, match[2])
      assert(isWithin(exportRoot, exportedFile) && fs.existsSync(exportedFile) && fileHash(exportedFile) === match[1], `export checksum mismatch: ${match[2]}`)
    }
    const exportRelativeRoot = path.relative(root, exportRoot)
    const checksumRelativePath = path.relative(exportRoot, checksumPath)
    const actualExportPaths = collectFiles([exportRelativeRoot]).map((relativePath) => path.relative(exportRoot, path.join(root, relativePath))).filter((relativePath) => relativePath !== checksumRelativePath).sort()
    assert(JSON.stringify([...listedExportPaths].sort()) === JSON.stringify(actualExportPaths), 'export checksum list does not cover the exact export package')
  }
  assert(exportRestore?.restore?.exitCode === 0 && exportRestore?.restore?.temporaryWorkspace === true && exportRestore?.restore?.realWorkspaceUnchanged === true, 'temporary public restore failed')
  assertHashedFile(exportRestore?.restore?.commandLog, 'public restore command log')
  if (exportRoot && fs.existsSync(exportRoot)) {
    const restoreTempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'worldos-final-restore-'))
    const sourceHashBeforeRestore = crypto.createHash('sha256').update(JSON.stringify(sourceInventory)).digest('hex')
    try {
      execFileSync(process.execPath, [
        'scripts/world-export.mjs',
        'verify-restore',
        '--input', exportRoot,
        '--output', restoreTempRoot,
      ], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
      const restoredRelativeFiles = [
        'manifest.json',
        'facts/nodes.json',
        'facts/areas.json',
        'facts/relations.json',
        'facts/paths.json',
        'facts/events.json',
        'facts/visibility.json',
      ]
      for (const relativePath of restoredRelativeFiles) {
        const originalPath = path.join(exportRoot, relativePath)
        const restoredPath = path.join(restoreTempRoot, relativePath)
        assert(fs.existsSync(originalPath) && fs.existsSync(restoredPath) && fileHash(originalPath) === fileHash(restoredPath), `restored public fact differs from export: ${relativePath}`)
      }
      const restoredManifest = readJson(path.join(restoreTempRoot, 'manifest.json'))
      const restoredNodes = readJson(path.join(restoreTempRoot, 'facts/nodes.json')) ?? []
      const restoredRelations = readJson(path.join(restoreTempRoot, 'facts/relations.json')) ?? []
      const restoredPaths = readJson(path.join(restoreTempRoot, 'facts/paths.json')) ?? []
      const restoredEvents = readJson(path.join(restoreTempRoot, 'facts/events.json')) ?? []
      const restoredNodeIds = new Set(restoredNodes.map((node) => node.id))
      assert(restoredManifest?.scope === 'public' && restoredManifest?.counts?.nodes === restoredNodes.length, 'restored manifest scope/count mismatch')
      assert(restoredNodes.length > 0 && restoredNodes.every((node) => node.id && node.slug && node.title && !['private', 'owner', 'vault', 'sealed', 'silent'].includes(node.visibility)), 'restored public nodes are invalid')
      assert(restoredRelations.every((relation) => restoredNodeIds.has(relation.sourceId ?? relation.from) && restoredNodeIds.has(relation.targetId ?? relation.to)), 'restored relation references are invalid')
      assert(restoredPaths.every((worldPath) => (worldPath.nodeIds ?? worldPath.nodes ?? []).every((nodeId) => restoredNodeIds.has(typeof nodeId === 'string' ? nodeId : nodeId.id))), 'restored path references are invalid')
      assert(restoredEvents.every((event) => !event.nodeId || restoredNodeIds.has(event.nodeId)), 'restored event references are invalid')
      for (const restoredPath of collectAbsoluteFiles(restoreTempRoot)) {
        const body = fs.readFileSync(restoredPath)
        for (const canary of contract.evidenceArtifactProtocol.fixedPrivateCanaryTokens) assert(!body.includes(Buffer.from(canary)), `private canary leaked into restored package: ${path.relative(restoreTempRoot, restoredPath)}`)
      }
    } catch (error) {
      failures.push(`independent public restore command failed: ${error.stderr || error.message}`)
    } finally {
      fs.rmSync(restoreTempRoot, { recursive: true, force: true })
    }
    const sourceInventoryAfterRestore = collectFiles(
      ['src', 'content', 'data', 'public', 'scripts', 'package.json', 'package-lock.json', 'next.config.ts', 'next.config.mjs', 'tsconfig.json'],
      new Set(['data/world-kernel/worldos-living-world-execution-state.json']),
    ).map((relativePath) => ({ path: relativePath, sha256: fileHash(path.join(root, relativePath)) }))
    const sourceHashAfterRestore = crypto.createHash('sha256').update(JSON.stringify(sourceInventoryAfterRestore)).digest('hex')
    assert(sourceHashAfterRestore === sourceHashBeforeRestore, 'public restore changed the real workspace')
  }

  const performance = readIndexedJson(evidence, 'performance-samples')
  const expectedContexts = contract.performanceProtocol.viewports.flatMap((viewport) => contract.performanceProtocol.modes.map((mode) => `${viewport}:${mode}`))
  const performanceContexts = new Map((performance?.contexts ?? []).map((context) => [`${context.viewport}:${context.mode}`, context]))
  for (const contextId of expectedContexts) {
    const context = performanceContexts.get(contextId)
    assert(context, `performance context missing: ${contextId}`)
    if (!context) continue
    assert(allowedOrigins.has(context.origin), `performance context used an unattested origin: ${contextId}`)
    const trace = readHashedJsonDescriptor(context.trace, `performance trace ${contextId}`)
    const metricsLog = readHashedJsonDescriptor(context.metricsLog, `PerformanceObserver log ${contextId}`)
    const captureSidecar = readHashedJsonDescriptor(context.captureSidecar, `performance capture sidecar ${contextId}`)
    const derivedTrace = traceDurations(trace)
    const traceEvents = trace?.traceEvents ?? []
    const processNames = new Set(traceEvents.filter((event) => event.name === 'process_name').map((event) => event.args?.name).filter(Boolean))
    const nativeTracePids = new Set(traceEvents.map((event) => event.pid).filter((pid) => Number.isInteger(pid)))
    const traceTimestamps = traceEvents.map((event) => Number(event.ts)).filter(Number.isFinite)
    assert(processNames.has('Browser') || processNames.has('Renderer') || processNames.has('Chrome'), `trace lacks native Chrome process metadata: ${contextId}`)
    assert(traceEvents.some((event) => event.name === 'TracingStartedInBrowser'), `trace lacks TracingStartedInBrowser: ${contextId}`)
    assert(nativeTracePids.has(captureSidecar?.browserProcessId) || nativeTracePids.has(captureSidecar?.rendererProcessId), `trace PID differs from capture sidecar: ${contextId}`)
    assert(captureSidecar?.traceSha256 === context.trace.sha256 && captureSidecar?.metricsLogSha256 === context.metricsLog.sha256, `performance sidecar does not bind trace and metrics: ${contextId}`)
    assert(captureSidecar?.sourceCommit === sourceCommit && captureSidecar?.buildId === evidence.buildId && captureSidecar?.origin === context.origin, `performance sidecar build identity mismatch: ${contextId}`)
    assert(captureSidecar?.devtoolsSessionId && captureSidecar?.captureCommand && captureSidecar?.browserVersion === evidence.browser?.version, `performance sidecar is incomplete: ${contextId}`)
    assert(captureSidecar?.serverPid === serverPid && captureSidecar?.serverStartedAt === evidence.freshness.serverStartedAt && /^[a-f0-9]{32,}$/.test(captureSidecar?.captureNonce ?? ''), `performance sidecar lacks server-bound capture nonce: ${contextId}`)
    if (traceTimestamps.length > 1) {
      const traceRange = traceTimestamps.reduce((range, timestamp) => ({ minimum: Math.min(range.minimum, timestamp), maximum: Math.max(range.maximum, timestamp) }), { minimum: Number.POSITIVE_INFINITY, maximum: Number.NEGATIVE_INFINITY })
      assert((traceRange.maximum - traceRange.minimum) / 1_000_000 >= 60, `performance trace is shorter than 60 seconds: ${contextId}`)
    }
    assert(trace?.sourceCommit === sourceCommit && trace?.buildId === evidence.buildId, `performance trace build identity mismatch: ${contextId}`)
    assert(trace?.metadata?.viewport === context.viewport && trace?.metadata?.mode === context.mode && trace?.metadata?.origin === context.origin, `performance trace metadata mismatch: ${contextId}`)
    if (context.mode === 'cpu-4x') assert(trace?.metadata?.cpuThrottlingRate === 4, `CPU slowdown trace is not 4x: ${contextId}`)
    if (context.mode === 'lan') assert(classifyLocalUrl(context.origin) === 'lan', `LAN trace did not use LAN origin: ${contextId}`)
    assert(metricsLog?.origin === context.origin && metricsLog?.viewport === context.viewport && metricsLog?.mode === context.mode, `PerformanceObserver log metadata mismatch: ${contextId}`)
    assert(metricsLog?.captureId === captureSidecar?.captureId && metricsLog?.devtoolsSessionId === captureSidecar?.devtoolsSessionId, `PerformanceObserver log is not bound to the trace session: ${contextId}`)
    const coldLoads = metricsLog?.coldLoads ?? []
    const warmLoads = metricsLog?.warmLoads ?? []
    assert(coldLoads.length >= contract.performanceProtocol.coldStartRuns, `cold sample count too low: ${contextId}`)
    assert(metricsLog?.warmupRuns === contract.performanceProtocol.warmupRuns, `warmup sample count drift: ${contextId}`)
    assert(warmLoads.length >= contract.performanceProtocol.measuredWarmRuns, `warm sample count too low: ${contextId}`)
    for (const sample of [...coldLoads, ...warmLoads]) {
      assert(Number.isFinite(Date.parse(sample.capturedAt)) && [sample.inpMs, sample.lcpMs, sample.cls].every((value) => Number.isFinite(Number(value)) && Number(value) >= 0), `invalid performance sample: ${contextId}`)
    }
    assert(derivedTrace.frameLikeDurationsMs.length >= contract.performanceProtocol.ambientFrameSampleMin, `trace frame/task sample count too low: ${contextId}`)
    assert(percentile(derivedTrace.frameLikeDurationsMs, 0.95) <= contract.performanceProtocol.budgets.ambientFrameP95MsMax, `trace-derived ambient p95 exceeds budget: ${contextId}`)
    assert(derivedTrace.longAnimationFrameMs.reduce((maximum, value) => Math.max(maximum, value), 0) <= contract.performanceProtocol.budgets.interactionLongAnimationFrameMsMax, `trace-derived LoAF exceeds budget: ${contextId}`)
    assert(percentile(warmLoads.map((sample) => sample.inpMs), 0.95) <= contract.performanceProtocol.budgets.inpMsMax, `INP exceeds budget: ${contextId}`)
    assert(percentile(warmLoads.map((sample) => sample.lcpMs), 0.95) <= contract.performanceProtocol.budgets.lcpMsMax, `LCP exceeds budget: ${contextId}`)
    assert(percentile(warmLoads.map((sample) => sample.cls), 0.95) <= contract.performanceProtocol.budgets.clsMax, `CLS exceeds budget: ${contextId}`)
  }
  assert(Number.isFinite(Number(performance?.bundles?.sharedFirstLoadJsKb)) && performance.bundles.sharedFirstLoadJsKb >= 0 && performance.bundles.sharedFirstLoadJsKb <= contract.performanceProtocol.budgets.sharedFirstLoadJsKbMax, 'shared JS coverage or budget failed')
  const expectedSceneIds = contract.scenes.map((scene) => scene.id).sort().join('|')
  const routeIncrements = performance?.bundles?.routeIncrements ?? []
  const desktopBitmaps = performance?.assets?.desktopFirstBitmaps ?? []
  const mobileBitmaps = performance?.assets?.mobileFirstBitmaps ?? []
  assert(routeIncrements.map((item) => item.sceneId).sort().join('|') === expectedSceneIds && routeIncrements.every((item) => Number.isFinite(Number(item.kb)) && item.kb <= contract.performanceProtocol.budgets.routeJsGzipIncrementKbMax), 'route JS increment coverage or budget failed')
  assert(desktopBitmaps.map((item) => item.sceneId).sort().join('|') === expectedSceneIds && desktopBitmaps.every((item) => Number.isFinite(Number(item.kb)) && item.kb <= contract.performanceProtocol.budgets.desktopFirstBitmapKbMax), 'desktop bitmap coverage or budget failed')
  assert(mobileBitmaps.map((item) => item.sceneId).sort().join('|') === expectedSceneIds && mobileBitmaps.every((item) => Number.isFinite(Number(item.kb)) && item.kb <= contract.performanceProtocol.budgets.mobileFirstBitmapKbMax), 'mobile bitmap coverage or budget failed')
  assert(performance?.resources?.hiddenAmbientTicks === 0 && performance?.resources?.tenMinuteGrowthDetected === false && performance?.resources?.rapidNavigationGrowthDetected === false, 'runtime resource growth detected')

  const complexity = readIndexedJson(evidence, 'complexity-metrics')
  assert(complexity?.dailyEntrypoints <= contract.complexityProtocol.dailyEntrypointsMax, 'daily entrypoint budget exceeded')
  assert(complexity?.stageNamedScriptDelta <= contract.complexityProtocol.stageNamedScriptDeltaMax, 'stage script budget exceeded')
  assert(complexity?.runtimeDependencyDelta <= contract.complexityProtocol.runtimeDependencyDeltaDefault, 'runtime dependency delta exceeds default')
  assert(complexity?.experienceManifestOwners <= contract.complexityProtocol.experienceManifestOwnerMax, 'multiple experience manifest owners detected')
  assert(complexity?.globalSchedulers <= contract.complexityProtocol.globalSchedulerMax, 'multiple global schedulers detected')
  assert(complexity?.audioContexts <= contract.complexityProtocol.audioContextMax, 'multiple AudioContexts detected')
  assert((complexity?.duplicateImplementationFindings ?? []).length === 0, 'duplicate runtime implementations remain')
  for (const metric of contract.complexityProtocol.requiredMetrics) assert(complexity?.metrics?.[metric] !== undefined, `complexity metric missing: ${metric}`)
  const baselinePackage = readJsonAtCommit(controlManifest?.controlBaselineCommit, 'package.json')
  const sourcePackage = readJsonAtCommit(sourceCommit, 'package.json')
  if (baselinePackage && sourcePackage) {
    const baselineRuntimeDependencies = new Set(Object.keys(baselinePackage.dependencies ?? {}))
    const sourceRuntimeDependencies = new Set(Object.keys(sourcePackage.dependencies ?? {}))
    const actualRuntimeDependencyDelta = [...sourceRuntimeDependencies].filter((name) => !baselineRuntimeDependencies.has(name)).length
      - [...baselineRuntimeDependencies].filter((name) => !sourceRuntimeDependencies.has(name)).length
    assert(complexity?.runtimeDependencyDelta === actualRuntimeDependencyDelta, 'runtime dependency delta differs from Git')
    const stagePattern = /(?:phase|milestone|rc|m\d+|c\d+)/i
    const baselineStageScripts = Object.keys(baselinePackage.scripts ?? {}).filter((name) => stagePattern.test(name)).length
    const sourceStageScripts = Object.keys(sourcePackage.scripts ?? {}).filter((name) => stagePattern.test(name)).length
    assert(complexity?.stageNamedScriptDelta === sourceStageScripts - baselineStageScripts, 'stage script delta differs from Git')
    assert((complexity?.dailyEntrypoints ?? []).length <= contract.complexityProtocol.dailyEntrypointsMax, 'daily entrypoint list exceeds budget')
    for (const scriptName of complexity?.dailyEntrypoints ?? []) assert(Boolean(sourcePackage.scripts?.[scriptName]), `daily entrypoint is not a package script: ${scriptName}`)
  }
  try {
    const numstat = execFileSync('git', ['diff', '--numstat', `${controlManifest.controlBaselineCommit}..${sourceCommit}`], { cwd: root, encoding: 'utf8' })
      .split('\n').filter(Boolean).map((line) => line.split('\t'))
    const nameStatus = execFileSync('git', ['diff', '--name-status', `${controlManifest.controlBaselineCommit}..${sourceCommit}`], { cwd: root, encoding: 'utf8' })
      .split('\n').filter(Boolean).map((line) => line.split('\t')[0])
    const actualLinesAdded = numstat.reduce((sum, [added]) => sum + (Number(added) || 0), 0)
    const actualLinesDeleted = numstat.reduce((sum, [, deleted]) => sum + (Number(deleted) || 0), 0)
    assert(complexity?.metrics?.linesAdded === actualLinesAdded, 'complexity linesAdded differs from Git')
    assert(complexity?.metrics?.linesDeleted === actualLinesDeleted, 'complexity linesDeleted differs from Git')
    assert(complexity?.metrics?.filesAdded === nameStatus.filter((status) => status === 'A').length, 'complexity filesAdded differs from Git')
    assert(complexity?.metrics?.filesDeleted === nameStatus.filter((status) => status === 'D').length, 'complexity filesDeleted differs from Git')
  } catch (error) {
    failures.push(`cannot compute complexity Git metrics: ${error.message}`)
  }

  const assetAudit = readIndexedJson(evidence, 'asset-audit')
  assert((assetAudit?.entries ?? []).length > 0, 'asset audit is empty')
  for (const asset of assetAudit?.entries ?? []) {
    assert(asset.id && asset.source && asset.author && asset.license && asset.sha256 && asset.repositoryPath && asset.loadPolicy && asset.fallback, `asset governance incomplete: ${asset.id ?? 'unknown'}`)
    assert(!['unknown', 'unverified', ''].includes(String(asset.license).toLowerCase()), `asset license unresolved: ${asset.id}`)
    const governedAsset = resolveRepositoryPath(asset.repositoryPath)
    assert(governedAsset && fs.existsSync(governedAsset) && fileHash(governedAsset) === asset.sha256, `asset registry hash mismatch: ${asset.id}`)
  }
  assert((assetAudit?.unresolved ?? ['unknown']).length === 0, 'asset audit has unresolved entries')

  const blindPack = readIndexedJson(evidence, 'blind-review-pack')
  const reviewDescriptors = evidence.independentReviews ?? []
  assert(reviewDescriptors.length === contract.blindReviewProtocol.reviewerCount, 'exactly two independent review descriptors are required')
  const finalReviews = []
  for (const descriptor of reviewDescriptors) {
    assert(/^[a-z0-9-]{16,}$/i.test(descriptor.taskId ?? '') && /^[a-z0-9-]{16,}$/i.test(descriptor.threadId ?? ''), 'review task/thread identity is malformed')
    assert(descriptor.taskId !== evidence.implementationTaskId && descriptor.threadId !== evidence.implementationThreadId, `review is not independent from implementation: ${descriptor.taskId}`)
    const reportPath = assertHashedFile(descriptor.report, `review report ${descriptor.taskId}`)
    const review = reportPath ? readJson(reportPath) : null
    if (!review) continue
    assert(review.taskId === descriptor.taskId && review.threadId === descriptor.threadId && review.producerTaskId === descriptor.taskId, `review report identity mismatch: ${descriptor.taskId}`)
    assert(review.readOnly === true && review.workspaceDiffBeforeHash === review.workspaceDiffAfterHash, `review task was not read-only: ${descriptor.taskId}`)
    assert(review.sourceCommit === sourceCommit && review.buildHash === buildHash, `review build identity mismatch: ${descriptor.taskId}`)
    assert(review.evidenceRun === path.relative(root, resolvedEvidenceRoot), `review evidence run mismatch: ${descriptor.taskId}`)
    assert(review.startedAt === descriptor.startedAt && Number.isFinite(Date.parse(review.submittedAt)) && Date.parse(review.submittedAt) >= Date.parse(review.startedAt), `review timestamps invalid: ${descriptor.taskId}`)
    assert(review.mediaFirst === true, `review did not inspect media first: ${descriptor.taskId}`)
    finalReviews.push(review)
  }
  assert(finalReviews.length === 2, 'two readable independent review reports are required')
  assert(unique(finalReviews.map((review) => review.taskId)) && unique(finalReviews.map((review) => review.threadId)), 'independent reviewer contexts must differ')
  assert(finalReviews[0]?.taskId === ledgerField(ledger, 'independent_review_1_id'), 'first review task differs from ledger')
  assert(finalReviews[1]?.taskId === ledgerField(ledger, 'independent_review_2_id'), 'second review task differs from ledger')
  assert(finalReviews[0]?.startedAt === ledgerField(ledger, 'independent_review_1_started_at'), 'first review start differs from ledger')
  assert(finalReviews[1]?.startedAt === ledgerField(ledger, 'independent_review_2_started_at'), 'second review start differs from ledger')

  const blindOrders = []
  for (const review of finalReviews) {
    const packDescriptor = blindPack?.reviewerPacks?.find((pack) => pack.id === review.blindPackId)
    assert(packDescriptor, `blind pack missing for ${review.taskId}`)
    if (!packDescriptor) continue
    const reviewerPackPath = assertHashedFile(packDescriptor.pack, `blind reviewer pack ${review.taskId}`)
    const mappingPath = assertHashedFile(packDescriptor.mapping, `blind mapping ${review.taskId}`)
    const reviewerPack = reviewerPackPath ? readJson(reviewerPackPath) : null
    const mapping = mappingPath ? readJson(mappingPath) : null
    assert(review.blindPackSha256 === packDescriptor.pack.sha256, `review blind pack hash mismatch: ${review.taskId}`)
    assert(JSON.stringify(reviewerPack?.hidden) === JSON.stringify(contract.blindReviewProtocol.hide), `blind pack hidden set drift: ${review.taskId}`)
    const opaqueOrder = reviewerPack?.entries?.map((entry) => entry.opaqueId) ?? []
    assert(opaqueOrder.length === contract.scenes.length && unique(opaqueOrder), `blind pack scene count drift: ${review.taskId}`)
    for (const entry of reviewerPack?.entries ?? []) {
      assertHashedFile(entry.primary, `blind primary ${entry.opaqueId}`)
      assertHashedFile(entry.backgroundHidden, `blind background-hidden ${entry.opaqueId}`)
    }
    const sceneByOpaqueId = new Map((mapping?.entries ?? []).map((entry) => [entry.opaqueId, entry.sceneId]))
    assert(sceneByOpaqueId.size === contract.scenes.length && contract.scenes.every((scene) => [...sceneByOpaqueId.values()].includes(scene.id)), `blind mapping coverage drift: ${review.taskId}`)
    const mappedOrder = opaqueOrder.map((opaqueId) => sceneByOpaqueId.get(opaqueId))
    blindOrders.push(mappedOrder.join('|'))
    assert(JSON.stringify(mappedOrder) !== JSON.stringify(contract.scenes.map((scene) => scene.id)), `blind pack retained canonical scene order: ${review.taskId}`)
    assert(Date.parse(mapping?.revealedAt) > Date.parse(review.submittedAt), `blind mapping was revealed before review submission: ${review.taskId}`)
    if (mappingPath) assert(fs.statSync(mappingPath).mtimeMs >= Date.parse(review.submittedAt), `blind mapping file predates review submission: ${review.taskId}`)

    const rows = new Map((review.matrix ?? []).map((row) => [row.claim, row.verdict]))
    for (const claim of contract.finalMatrix) assert(rows.get(claim) === 'pass', `${review.taskId} missing pass for ${claim}`)
    assert(review.blindAnswers?.length === contract.scenes.length, `${review.taskId} blind scene answers incomplete`)
    const answeredSceneIds = []
    for (const answer of review.blindAnswers ?? []) {
      const sceneId = sceneByOpaqueId.get(answer.opaqueId)
      answeredSceneIds.push(sceneId)
      for (const field of contract.blindReviewProtocol.requiredAnswers) {
        assert(answer[field] !== undefined && answer[field] !== null && answer[field] !== '', `${review.taskId} blind answer missing ${field} for ${answer.opaqueId}`)
      }
    }
    assert(unique(answeredSceneIds) && contract.scenes.every((scene) => answeredSceneIds.includes(scene.id)), `${review.taskId} blind answer coverage drift`)
    assert((review.findings ?? []).every((finding) => !['P0', 'P1'].includes(finding.severity) || finding.status === 'fixed'), `${review.taskId} has open P0/P1 findings`)
    for (const veto of contract.vetoes) assert(review.vetoes?.[veto] === false, `${review.taskId} did not clear veto ${veto}`)
  }
  assert(unique(blindOrders), 'independent reviewers received the same blind scene order')
  if ((finalReviews[0]?.findings ?? []).length > 0) {
    assert(Boolean(finalReviews[0]?.repairCommit), 'first-review findings require a repair commit')
    const repairCommittedAt = Date.parse(finalReviews[0]?.repairCommittedAt)
    const secondReviewStartedAt = Date.parse(finalReviews[1]?.startedAt)
    assert(Number.isFinite(repairCommittedAt) && Number.isFinite(secondReviewStartedAt) && secondReviewStartedAt > repairCommittedAt, 'second review must follow first-review repair commit')
  }

  const captureArtifactIds = contract.evidenceArtifactProtocol.requiredArtifacts.filter((artifactId) => !['source-snapshot', 'build-fingerprint'].includes(artifactId))
  const captureArtifactPaths = captureArtifactIds.map((artifactId) => resolveRunArtifact(evidence.artifacts?.[artifactId]?.path)).filter((artifactPath) => artifactPath && fs.existsSync(artifactPath))
  const directMediaPaths = [
    ...(evidence.sceneEvidence ?? []).flatMap((scene) => [scene.recording, ...(scene.views ?? [])]),
    evidence.verticalSliceSoak,
  ].map((descriptor) => descriptor?.path ? resolveRunArtifact(descriptor.path) : null).filter((artifactPath) => artifactPath && fs.existsSync(artifactPath))
  const firstActualEvidenceMtime = [...captureArtifactPaths, ...directMediaPaths].reduce((earliest, artifactPath) => Math.min(earliest, fs.statSync(artifactPath).mtimeMs), Number.POSITIVE_INFINITY)
  assert(firstActualEvidenceMtime >= Date.parse(evidence.freshness.serverStartedAt), 'browser evidence predates the attested server process')
  assert(Math.abs(firstActualEvidenceMtime - Date.parse(evidence.freshness.firstEvidenceAt)) <= 1000, 'first evidence time differs from artifact mtime')
  const evidenceRelativeRoot = path.relative(root, resolvedEvidenceRoot)
  const allEvidenceFiles = collectFiles([evidenceRelativeRoot]).filter((relativePath) => relativePath !== `${evidenceRelativeRoot}/manifest.json`)
  const latestEvidenceMtime = allEvidenceFiles.reduce((latest, relativePath) => Math.max(latest, fs.statSync(path.join(root, relativePath)).mtimeMs), 0)
  assert(Date.parse(evidence.freshness.auditGeneratedAt) >= latestEvidenceMtime, 'final audit time predates an evidence artifact')
  const evidenceManifestMtime = fs.statSync(path.join(resolvedEvidenceRoot, 'manifest.json')).mtimeMs
  assert(evidenceManifestMtime >= latestEvidenceMtime && Math.abs(evidenceManifestMtime - Date.parse(evidence.freshness.auditGeneratedAt)) <= 2000, 'evidence manifest mtime does not close the audit chain')
  assert(Date.parse(evidence.freshness.auditGeneratedAt) <= Date.now() + 1000, 'audit time is in the future')
}

if (failures.length) {
  console.error(`PRODUCT_EVIDENCE_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`PRODUCT_EVIDENCE_PASS status=${preflight ? 'PREFLIGHT' : productStatus} score=not-used`)
