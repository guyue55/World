import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import releaseDryRunContract from '../data/release-dry-run-contract.json'

function run(command: string) {
  const result = spawnSync(command, {
    encoding: 'utf-8',
    shell: true,
    timeout: 120000,
  })

  return {
    command,
    exitCode: result.status,
    status: result.status === 0 ? 'passed' : 'failed',
    stdoutExcerpt: result.stdout.trim().slice(0, 800),
    stderrExcerpt: result.stderr.trim().slice(0, 800),
  }
}

function main() {
  const results = releaseDryRunContract.dryRunSteps.map((step) => ({
    id: step.id,
    required: step.required,
    ...run(step.command),
  }))

  const failedRequired = results.filter((item) => item.required && item.exitCode !== 0)
  const summary = {
    generatedAt: new Date().toISOString(),
    status: failedRequired.length === 0 ? 'passed' : 'blocked',
    failedRequired: failedRequired.map((item) => item.id),
    productionTouched: false,
    results,
  }

  const outDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'release-dry-run-summary.json'), `${JSON.stringify(summary, null, 2)}\n`)
  console.log(JSON.stringify(summary, null, 2))
  process.exit(summary.status === 'passed' ? 0 : 1)
}

main()
