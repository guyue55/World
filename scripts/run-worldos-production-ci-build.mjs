// 用途：运行可被 next start 验证的生产构建
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const nextDir = path.join(root, '.next')
const nextBin = path.join(root, 'node_modules', '.bin', 'next')

if (!fs.existsSync(nextBin)) {
  console.error('缺少 node_modules/.bin/next，请先执行 npm ci')
  process.exit(1)
}

if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true })

const child = spawn(nextBin, ['build'], {
  cwd: root,
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0))
})
