import { spawnSync } from 'node:child_process'
for (const n of ['05','06','07','08']) {
  const r = spawnSync('npm', ['run', `check:v4-world:${n}`], { stdio: 'inherit', shell: process.platform === 'win32' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
console.log('V4 world stage 02 checks passed.')
