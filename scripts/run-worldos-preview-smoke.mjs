// 用途：运行worldos preview smoke
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rc = JSON.parse(fs.readFileSync(path.join(root, 'data/world-kernel/worldos-1-release-candidate-v1.json'), 'utf-8'))
const mode = process.env.WORLDOS_SMOKE_MODE ?? (process.env.PRODUCTION_URL ? 'production' : 'preview')
const baseUrl = (mode === 'production' ? process.env.PRODUCTION_URL : process.env.PREVIEW_URL)?.replace(/\/$/, '')

if (!baseUrl) {
  console.error(`缺少 ${mode === 'production' ? 'PRODUCTION_URL' : 'PREVIEW_URL'}，不能执行真实线上 smoke。`)
  console.error('示例：PREVIEW_URL=https://example.vercel.app npm run smoke:preview')
  process.exit(2)
}

const checks = []
async function checkRoute(item) {
  const url = `${baseUrl}${item.route}`
  const startedAt = Date.now()
  try {
    const response = await fetch(url, { redirect: 'manual' })
    const text = await response.text().catch(() => '')
    const contentType = response.headers.get('content-type') ?? ''
    const durationMs = Date.now() - startedAt
    let passed = false
    if (item.expected === '200') passed = response.status === 200
    else if (item.expected === '200-json') passed = response.status === 200 && contentType.includes('application/json')
    else if (item.expected === '200-text') passed = response.status === 200 && text.length > 0
    else if (item.expected === '200-xml') passed = response.status === 200 && (contentType.includes('xml') || text.includes('<urlset'))
    checks.push({ route: item.route, url, expected: item.expected, status: response.status, contentType, durationMs, passed })
  } catch (error) {
    checks.push({ route: item.route, url, expected: item.expected, status: 'network-error', error: error.message, passed: false })
  }
}

for (const item of rc.publicRouteSmokeMatrix) await checkRoute(item)

const report = {
  generatedAt: new Date().toISOString(),
  mode,
  baseUrl,
  status: checks.every((item) => item.passed) ? 'passed' : 'failed',
  checks,
}

const out = path.join(root, `docs/90-archive/reports/worldos-${mode}-smoke-report.json`)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf-8')
console.log(`WorldOS ${mode} smoke report written: ${path.relative(root, out)}`)
if (report.status !== 'passed') process.exit(1)
