import { spawnSync } from 'node:child_process'
for (const n of ['09','10','11','12']) {
  const r = spawnSync('npm', ['run', `check:v5-content:${n}`], { stdio: 'inherit', shell: process.platform === 'win32' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
console.log('V5 content stage 03 checks passed.')
