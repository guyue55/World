
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'

const result = spawnSync('npm', ['audit', '--json'], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
})

let audit
try {
  audit = JSON.parse(result.stdout || '{}')
} catch (error) {
  audit = {
    error: `Unable to parse npm audit JSON: ${error instanceof Error ? error.message : String(error)}`,
    raw: result.stdout,
  }
}

const vulnerabilities = audit.metadata?.vulnerabilities ?? {}
const report = {
  generatedAt: new Date().toISOString(),
  command: 'npm audit --json',
  exitCode: result.status,
  vulnerabilities,
  summary: {
    total: vulnerabilities.total ?? 0,
    info: vulnerabilities.info ?? 0,
    low: vulnerabilities.low ?? 0,
    moderate: vulnerabilities.moderate ?? 0,
    high: vulnerabilities.high ?? 0,
    critical: vulnerabilities.critical ?? 0,
  },
  policy: [
    'Do not run npm audit fix --force automatically.',
    'Moderate vulnerabilities do not block local-engineering-ready status.',
    'High or critical vulnerabilities must be triaged before production release.',
  ],
  productionLive: false,
  rawAudit: audit,
}

fs.mkdirSync('docs/90-archive/reports', { recursive: true })
const target = 'docs/90-archive/reports/npm-audit-report.json'
try {
  if (fs.existsSync(target)) fs.unlinkSync(target)
} catch {
  // If an old report is not removable in the current environment, surface the write error below.
}
fs.writeFileSync(target, `${JSON.stringify(report, null, 2)}\n`)
console.log(`npm audit report written: total=${report.summary.total}, moderate=${report.summary.moderate}, high=${report.summary.high}, critical=${report.summary.critical}`)
