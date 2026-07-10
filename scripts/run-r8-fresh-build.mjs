// 用途：运行r8 fresh build
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'node:timers'

const root = process.cwd()
const distDir = process.env.WORLDOS_DIST_DIR || '.next'
const nextDir = path.resolve(root, distDir)
const timeoutMs = Number(process.env.R8_NEXT_BUILD_TIMEOUT_MS ?? 120000)
const nextBin = path.join(root, 'node_modules', '.bin', 'next')
const logPath = path.join(root, 'reports', 'r8-fresh-build.log')

const requiredArtifacts = [
  'BUILD_ID',
  'build-manifest.json',
  'server/app-paths-manifest.json',
  'routes-manifest.json',
  'required-server-files.json',
]

function missingArtifacts() {
  return requiredArtifacts.filter((artifact) => !fs.existsSync(path.join(nextDir, artifact)))
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
    console.log(`R8 fresh build log: ${logPath}`)
    process.exit(0)
  }
  console.error(`R8 fresh Next build failed: ${status}`)
  console.error(`Missing build artifacts in ${distDir}: ${missing.join(', ')}`)
  console.error(`R8 fresh build log: ${logPath}`)
  process.exit(code || 1)
}

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
  const label = status === 0 ? 'R8 fresh Next build exited cleanly and required artifacts are present.' : `R8 fresh Next build exited with ${status ?? signal}; verifying required artifacts.`
  finish(child, label, status ?? 1)
})

// Removed premature kill polling

const deadline = setTimeout(() => {
  if (done) return
  done = true
  fs.closeSync(out)
  finish(child, `R8 fresh Next build reached ${timeoutMs}ms timeout; verifying required artifacts.`, 1)
}, timeoutMs)
