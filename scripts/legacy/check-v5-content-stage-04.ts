import { spawnSync } from 'node:child_process'
for (const n of ['13','14','15','16']) {
  const r = spawnSync('npm', ['run', `check:v5-content:${n}`], { stdio: 'inherit', shell: process.platform === 'win32' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
console.log('V5 content stage 04 checks passed.')
