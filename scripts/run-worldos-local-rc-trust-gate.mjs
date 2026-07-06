import { spawn } from 'node:child_process'
import { setInterval, clearInterval } from 'node:timers'

const commands = [
  ['npm', ['run', 'check:release:rc']],
  ['npm', ['run', 'lint']],
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'build:kernel-release'], { WORLD_KERNEL_FORCE_REBUILD: '1' }],
  ['npm', ['run', 'build:verify-artifacts']],
  ['npm', ['run', 'smoke:runtime-local']],
  ['npm', ['run', 'smoke:lan-local']],
  ['npm', ['run', 'audit:report']],
  ['node', ['scripts/write-worldos-local-rc-summary.mjs']],
  ['node', ['scripts/check-worldos-local-rc-summary.mjs']],
]

function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const label = `${command} ${args.join(' ')}`
    console.log(`\n[WorldOS local RC trust gate] start: ${label}`)
    const child = spawn(command, args, {
      env: { ...process.env, ...env },
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })
    const heartbeat = setInterval(() => {
      console.log(`[WorldOS local RC trust gate] still running: ${label}`)
    }, 10000)

    child.on('exit', (code, signal) => {
      clearInterval(heartbeat)
      if (code === 0) {
        console.log(`[WorldOS local RC trust gate] passed: ${label}`)
        resolve()
        return
      }
      reject(new Error(`${label} failed with ${code ?? signal}`))
    })
  })
}

try {
  for (const [command, args, env] of commands) await run(command, args, env)
  console.log('\nWorldOS local RC trust gate passed')
} catch (error) {
  console.error('\nWorldOS local RC trust gate failed')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
