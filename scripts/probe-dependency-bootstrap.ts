// 用途：probe dependency bootstrap
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import dependencyBootstrapContract from '../data/engineering/dependency-bootstrap-contract.json'

function run(command: string) {
  const [bin, ...args] = command.split(' ')
  const result = spawnSync(bin, args, { encoding: 'utf-8', shell: process.platform === 'win32' })
  return {
    command,
    exitCode: result.status,
    stdout: result.stdout.trim().slice(0, 500),
    stderr: result.stderr.trim().slice(0, 500),
  }
}

function main() {
  const checks = dependencyBootstrapContract.requiredTools.map((tool) => ({
    id: tool.id,
    required: tool.required,
    ...run(tool.command),
  }))
  const result = {
    generatedAt: new Date().toISOString(),
    nodeModulesExists: fs.existsSync(path.join(process.cwd(), 'node_modules')),
    checks,
  }
  const outDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'dependency-bootstrap-probe.json'), `${JSON.stringify(result, null, 2)}\n`)
  console.log(JSON.stringify(result, null, 2))
}

main()
