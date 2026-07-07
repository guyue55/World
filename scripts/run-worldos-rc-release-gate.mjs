// 用途：运行 RC 发布门禁
import { spawn } from 'node:child_process'
import { clearInterval, setInterval } from 'node:timers'

const commands = [
  ['npm', ['run', 'check:world-kernel-consolidation']],
  ['npm', ['run', 'check:world-kernel-production']],
  ['npm', ['run', 'smoke:kernel-local']],
  ['npm', ['run', 'check:product-release']],
  ['npm', ['run', 'lint']],
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'check']],
  ['npm', ['run', 'check:routes']],
  ['npm', ['run', 'build:kernel-release']],
  ['npm', ['run', 'build:verify-artifacts']],
  ['npm', ['run', 'smoke:runtime-local']],
  ['npm', ['run', 'audit:report']],
  ['npm', ['run', 'check:worldos-rc']],
  ['npm', ['run', 'check:mainline']],
  ['npm', ['run', 'evidence:worldos-external-template']],
]

function run(command, args) {
  return new Promise((resolve, reject) => {
    const label = `${command} ${args.join(' ')}`
    console.log(`\n[WorldOS RC gate] start: ${label}`)
    const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' })
    const heartbeat = setInterval(() => {
      console.log(`[WorldOS RC gate] still running: ${label}`)
    }, 3000)

    child.on('exit', (code, signal) => {
      clearInterval(heartbeat)
      if (code === 0) {
        console.log(`[WorldOS RC gate] passed: ${label}`)
        resolve()
      } else {
        reject(new Error(`${label} failed with ${code ?? signal}`))
      }
    })
  })
}

try {
  for (const [command, args] of commands) {
    await run(command, args)
  }
  console.log('\nWorldOS RC release gate passed')
} catch (error) {
  console.error('\nWorldOS RC release gate failed')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
