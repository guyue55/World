import { spawnSync } from 'node:child_process'
for (const stage of ['01','02','03','04']) {
  const r = spawnSync('npm', ['run', `check:v4-world:stage-${stage}`], { stdio: 'inherit', shell: process.platform === 'win32' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
console.log('V4 world checks passed.')
