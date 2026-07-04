import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { clearTimeout, setTimeout } from 'node:timers'
import { setTimeout as delay } from 'node:timers/promises'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const registry = readJson('data/world-kernel/worldos-local-runtime-smoke-v1.json')
const port = Number(process.env.WORLDOS_LOCAL_RUNTIME_SMOKE_PORT ?? registry.server?.defaultPort ?? 4317)
const host = registry.server?.host ?? '127.0.0.1'
const baseUrl = `http://${host}:${port}`
const requestTimeoutMs = Number(process.env.WORLDOS_LOCAL_RUNTIME_REQUEST_TIMEOUT_MS ?? registry.server?.requestTimeoutMs ?? 10000)
const startupTimeoutMs = Number(process.env.WORLDOS_LOCAL_RUNTIME_STARTUP_TIMEOUT_MS ?? registry.server?.startupTimeoutMs ?? 30000)
const nextBin = rel('node_modules/.bin/next')
const evidenceOutput = rel(registry.evidenceOutput ?? 'docs/90-archive/reports/worldos-local-runtime-smoke-report.json')
const logOutput = rel('reports/worldos-local-runtime-smoke-next-start.log')
const checks = []
const failures = []
let server
let logStream

function fail(message) {
  failures.push(message)
}

function hasArtifacts() {
  const required = registry.requiredBuildArtifacts ?? []
  const missing = required.filter((file) => !fs.existsSync(rel(file)))
  if (missing.length) fail(`缺少构建产物：${missing.join(', ')}`)
  return missing.length === 0
}

function locationMatches(actual, expectedPath) {
  if (!actual || !expectedPath) return false
  if (actual === expectedPath) return true
  try {
    return new URL(actual, baseUrl).pathname === expectedPath
  } catch {
    return false
  }
}

async function request(route, options = {}) {
  const controller = new globalThis.AbortController()
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs)
  const startedAt = Date.now()
  try {
    const response = await fetch(`${baseUrl}${route}`, {
      redirect: options.redirect ?? 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'WorldOSLocalRuntimeSmoke/1.0' },
    })
    const text = await response.text().catch(() => '')
    const durationMs = Date.now() - startedAt
    return {
      route,
      url: `${baseUrl}${route}`,
      status: response.status,
      contentType: response.headers.get('content-type') ?? '',
      location: response.headers.get('location') ?? '',
      bodyPreview: text.slice(0, 200),
      durationMs,
      ok: true,
    }
  } catch (error) {
    return {
      route,
      url: `${baseUrl}${route}`,
      status: 'network-error',
      error: error.name === 'AbortError' ? `request timeout after ${requestTimeoutMs}ms` : error.message,
      durationMs: Date.now() - startedAt,
      ok: false,
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function waitForReady() {
  const deadline = Date.now() + startupTimeoutMs
  const readinessPath = registry.server?.readinessPath ?? '/'
  while (Date.now() < deadline) {
    const result = await request(readinessPath)
    if (result.status === 200) return true
    await delay(500)
  }
  return false
}

function startServer() {
  if (!fs.existsSync(nextBin)) fail('缺少 node_modules/.bin/next，请先执行 npm ci')
  if (failures.length) return
  fs.mkdirSync(path.dirname(logOutput), { recursive: true })
  logStream = fs.openSync(logOutput, 'w')
  server = spawn(nextBin, ['start', '-H', host, '-p', String(port)], {
    cwd: root,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', PORT: String(port) },
    stdio: ['ignore', logStream, logStream],
  })
}

async function stopServer() {
  if (server && !server.killed) {
    try { server.kill('SIGTERM') } catch { /* ignore process shutdown race */ }
    await delay(500)
    if (!server.killed) {
      try { server.kill('SIGKILL') } catch { /* ignore process shutdown race */ }
    }
  }
  if (logStream) {
    try { fs.closeSync(logStream) } catch { /* ignore already-closed log stream */ }
  }
}

function record(kind, result, expected, passed, details = {}) {
  const item = { kind, ...result, expected, passed, ...details }
  checks.push(item)
  if (!passed) fail(`${kind} ${result.route} 失败：expected=${JSON.stringify(expected)} actual=${JSON.stringify({ status: result.status, contentType: result.contentType, location: result.location, error: result.error })}`)
}

async function runChecks() {
  for (const route of registry.publicHtmlRoutes ?? []) {
    const result = await request(route)
    const passed = result.status === 200 && String(result.contentType).includes('text/html') && result.bodyPreview.includes('<!DOCTYPE html>')
    record('public-html', result, { status: 200, contentType: 'text/html' }, passed)
  }

  for (const item of registry.staticAssetRoutes ?? []) {
    const result = await request(item.route)
    const type = String(result.contentType)
    const passed = result.status === 200 && (type.includes(item.contentTypeIncludes) || (item.contentTypeIncludes === 'xml' && (type.includes('xml') || result.bodyPreview.includes('<urlset'))))
    record('static-asset', result, { status: 200, contentTypeIncludes: item.contentTypeIncludes }, passed)
  }

  for (const item of registry.legacyRedirectRoutes ?? []) {
    const result = await request(item.route)
    const location = result.location
    const passed = result.status === item.status && locationMatches(location, item.location)
    record('legacy-redirect', result, { status: item.status, location: item.location }, passed)
  }

  for (const item of registry.guardedRoutes ?? []) {
    const result = await request(item.route)
    const location = result.location
    const passed = result.status === item.status && locationMatches(location, item.location)
    record('guarded-route', result, { status: item.status, location: item.location }, passed, { reason: item.reason })
  }

  for (const item of registry.negativeRoutes ?? []) {
    const result = await request(item.route)
    const passed = result.status === item.status
    record('negative-route', result, { status: item.status }, passed)
  }
}

async function main() {
  hasArtifacts()
  startServer()
  if (!failures.length) {
    const ready = await waitForReady()
    if (!ready) fail(`next start 在 ${startupTimeoutMs}ms 内没有就绪，日志：${path.relative(root, logOutput)}`)
    else await runChecks()
  }

  await stopServer()

  const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    baseUrl,
    registry: 'data/world-kernel/worldos-local-runtime-smoke-v1.json',
    logPath: path.relative(root, logOutput),
    releaseStates: registry.releaseStates,
    checks,
    failures,
    note: '本报告仅证明本地 Next production server 的 HTTP 行为，不等于真实外部 Preview / Production 证据。',
  }

  fs.mkdirSync(path.dirname(evidenceOutput), { recursive: true })
  fs.writeFileSync(evidenceOutput, `${JSON.stringify(report, null, 2)}\n`, 'utf-8')
  console.log(`WorldOS local runtime smoke report written: ${path.relative(root, evidenceOutput)}`)
  console.log(`WorldOS local runtime smoke log: ${path.relative(root, logOutput)}`)
  if (failures.length) {
    console.error('WorldOS local runtime smoke failed:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }
  console.log(`WorldOS local runtime smoke passed: ${checks.length} HTTP checks`)
}

main().catch(async (error) => {
  await stopServer()
  console.error(error)
  process.exit(1)
})
