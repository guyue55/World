import { spawnSync } from 'node:child_process'

const commands = [
  ['node', ['scripts/check-world-kernel-audit.mjs']],
  ['node', ['scripts/check-world-kernel-core.mjs']],
  ['node', ['scripts/check-world-kernel-runtime.mjs']],
  ['node', ['scripts/check-legacy-boundary.mjs']],
]

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log('World Kernel consolidation check passed')
