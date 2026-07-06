import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'node:timers'

const root = process.cwd()
const nextDir = path.join(root, '.next')
const timeoutMs = Number(process.env.WORLD_KERNEL_NEXT_BUILD_TIMEOUT_MS ?? 180000)
const nextBin = path.join(root, 'node_modules', '.bin', 'next')
const logPath = path.join(root, 'reports', 'world-kernel-release-build.log')
const forceRebuild = process.env.WORLD_KERNEL_FORCE_REBUILD === '1'

const requiredArtifacts = [
  '.next/BUILD_ID',
  '.next/build-manifest.json',
  '.next/server/app-paths-manifest.json',
  '.next/routes-manifest.json',
  '.next/required-server-files.json',
]

function missingArtifacts() {
  return requiredArtifacts.filter((artifact) => !fs.existsSync(path.join(root, artifact)))
}

if (!forceRebuild && missingArtifacts().length === 0) {
  console.log('World Kernel release build artifacts already exist; skipping rebuild.')
  console.log(`World Kernel release build log: ${logPath}`)
  process.exit(0)
}

function killProcessTree(child) {
  try {
    child.kill('SIGKILL')
  } catch {
    // ignore
  }
}

function finish(child, status, code = 0) {
  clearTimeout(deadline)
  if (!child.killed) killProcessTree(child)
  const missing = missingArtifacts()
  if (missing.length === 0) {
    console.log(status)
    console.log(`World Kernel release build log: ${logPath}`)
    process.exit(0)
  }
  console.error(`World Kernel release build failed: ${status}`)
  console.error(`Missing build artifacts: ${missing.join(', ')}`)
  console.error(`World Kernel release build log: ${logPath}`)
  process.exit(code || 1)
}

if (forceRebuild) console.log('World Kernel release build force rebuild enabled.')
if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true })
fs.mkdirSync(path.dirname(logPath), { recursive: true })
const out = fs.openSync(logPath, 'w')

const child = spawn(nextBin, ['build', '--turbopack', '--experimental-build-mode', 'compile'], {
  cwd: root,
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  stdio: ['ignore', out, out],
})

let done = false
child.on('exit', (status, signal) => {
  if (done) return
  done = true
  fs.closeSync(out)
  const label = status === 0
    ? 'World Kernel release build exited cleanly and required artifacts are present.'
    : `World Kernel release build exited with ${status ?? signal}; verifying required artifacts.`
  finish(child, label, status ?? 1)
})

// Removed premature kill polling

const deadline = setTimeout(() => {
  if (done) return
  done = true
  fs.closeSync(out)
  finish(child, `World Kernel release build reached ${timeoutMs}ms timeout; verifying required artifacts.`, 1)
}, timeoutMs)
