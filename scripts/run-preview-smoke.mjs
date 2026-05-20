import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import previewSmokeChecks from '../data/release/preview-smoke-checks.json' assert { type: 'json' }

const baseUrl = process.env[previewSmokeChecks.env.baseUrl]

if (!baseUrl) {
  console.error(`Missing env: ${previewSmokeChecks.env.baseUrl}`)
  process.exit(1)
}

const normalize = (base, path) => `${base.replace(/\/$/, '')}${path}`

const results = []

async function checkTextTarget(target, kind) {
  const url = normalize(baseUrl, target.path)
  const startedAt = new Date().toISOString()

  try {
    const response = await fetch(url)
    const text = await response.text()
    const statusOk = response.status >= 200 && response.status < 300
    const expectedOk = (target.expect || []).every((token) => text.includes(token))
    const privacyOk = !previewSmokeChecks.privacyForbiddenTokens.some((token) => text.includes(token))

    results.push({
      id: target.id,
      kind,
      path: target.path,
      url,
      status: statusOk && expectedOk && privacyOk ? 'passed' : 'failed',
      httpStatus: response.status,
      required: target.required,
      expectedOk,
      privacyOk,
      startedAt,
      finishedAt: new Date().toISOString(),
    })
  } catch (error) {
    results.push({
      id: target.id,
      kind,
      path: target.path,
      url,
      status: 'failed',
      required: target.required,
      error: error instanceof Error ? error.message : String(error),
      startedAt,
      finishedAt: new Date().toISOString(),
    })
  }
}

for (const route of previewSmokeChecks.routes) {
  await checkTextTarget(route, 'route')
}

for (const endpoint of previewSmokeChecks.endpoints) {
  await checkTextTarget(endpoint, 'endpoint')
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  results,
  finalDecision: results.some((item) => item.required && item.status === 'failed') ? 'failed' : 'passed',
}

const out = join(process.cwd(), 'reports', 'preview-smoke-report.json')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(report, null, 2) + '\n', 'utf-8')

console.log(`Preview smoke report written to ${out}`)
console.log(`finalDecision=${report.finalDecision}`)

if (report.finalDecision === 'failed') process.exit(1)
