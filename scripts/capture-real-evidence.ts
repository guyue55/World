// 用途：采集真实证据
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import realEvidenceCaptureContract from '../data/release/real-evidence-capture-contract.json'

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
    stdoutExcerpt: result.stdout.trim().slice(0, 1200),
    stderrExcerpt: result.stderr.trim().slice(0, 1200),
  }
}

function main() {
  const results = realEvidenceCaptureContract.commands.map((item) => ({
    id: item.id,
    required: item.required,
    ...run(item.command),
  }))

  const failedRequired = results.filter((item) => item.required && item.exitCode !== 0)
  const capture = {
    generatedAt: new Date().toISOString(),
    status: failedRequired.length === 0 ? 'passed' : 'failed',
    failedRequired: failedRequired.map((item) => item.id),
    results,
  }

  const outDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'real-evidence-capture.json'), `${JSON.stringify(capture, null, 2)}\n`)
  console.log(JSON.stringify(capture, null, 2))

  process.exit(failedRequired.length === 0 ? 0 : 1)
}

main()
