// 用途：运行first stage acceptance
import { mkdirSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'

const commands = [
  { id: 'lint', command: 'npm', args: ['run', 'lint'] },
  { id: 'typecheck', command: 'npm', args: ['run', 'typecheck'] },
  { id: 'world-core', command: 'npm', args: ['run', 'check:world-core'] },
  { id: 'build', command: 'npm', args: ['run', 'build'] },
]

const results = []

for (const item of commands) {
  const startedAt = new Date().toISOString()
  const result = spawnSync(item.command, item.args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    shell: process.platform === 'win32',
  })

  results.push({
    id: item.id,
    command: [item.command, ...item.args].join(' '),
    status: result.status === 0 ? 'passed' : 'failed',
    exitCode: result.status,
    startedAt,
    finishedAt: new Date().toISOString(),
    stdout: result.stdout.slice(-4000),
    stderr: result.stderr.slice(-4000),
  })

  if (result.status !== 0) break
}

const report = {
  generatedAt: new Date().toISOString(),
  project: '古月浮屿 V1',
  commands: results,
  manualQa: { status: 'pending', note: 'Fill after browser QA using data/domains/experience/browser-qa-records.json.' },
  performance: { status: 'pending', note: 'Fill after Lighthouse or equivalent measurement.' },
  previewDeployment: { status: 'pending', url: '' },
  blockingDefects: [],
  deferredItems: [],
  finalDecision: 'not-yet-complete',
  note: 'Command checks alone are not enough to close phase one.',
}

const out = join(process.cwd(), 'reports', 'first-stage-acceptance-report.json')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(report, null, 2) + '\n', 'utf-8')

console.log(`First-stage acceptance report written to ${out}`)
if (results.some((item) => item.status === 'failed')) process.exit(1)
