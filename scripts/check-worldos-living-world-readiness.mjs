// 用途：在生命世界 Goal 启动前验证本机工具链；不生成产品证据，不修改仓库文件。
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const repairBrowser = process.argv.includes('--repair-browser')
const failures = []

function commandPath(command) {
  try {
    return execFileSync('which', [command], { encoding: 'utf8' }).trim()
  } catch {
    failures.push(`缺少命令：${command}`)
    return null
  }
}

function resolvePlaywrightPython(playwrightPath) {
  if (!playwrightPath || !fs.existsSync(playwrightPath)) return null
  const shebang = fs.readFileSync(playwrightPath, 'utf8').split('\n')[0]
  if (!shebang.startsWith('#!')) return null
  const tokens = shebang.slice(2).trim().split(/\s+/)
  if (tokens[0] === '/usr/bin/env' && tokens[1]) return commandPath(tokens[1])
  return tokens.length === 1 && fs.existsSync(tokens[0]) ? tokens[0] : null
}

function launchChromium(pythonPath) {
  if (!pythonPath) return { ok: false, error: '无法解析 Playwright Python runtime' }
  const probe = spawnSync(pythonPath, ['-c', [
    'from playwright.sync_api import sync_playwright',
    'p = sync_playwright().start()',
    'b = p.chromium.launch(headless=True)',
    'print(b.version)',
    'b.close()',
    'p.stop()',
  ].join('; ')], { cwd: root, encoding: 'utf8', timeout: 30000 })
  return probe.status === 0
    ? { ok: true, version: probe.stdout.trim() }
    : { ok: false, error: (probe.stderr || probe.stdout || `exit ${probe.status}`).trim() }
}

for (const command of ['git', 'node', 'npm', 'ffmpeg', 'ffprobe', 'lsof']) commandPath(command)

const nodeMajor = Number(process.versions.node.split('.')[0])
if (!Number.isInteger(nodeMajor) || nodeMajor < 20) failures.push(`Node.js 需要 20 或更高版本，当前为 ${process.versions.node}`)

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const packageLock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'))
const selectedNames = ['next', 'react', 'react-dom', 'gsap', 'zod', 'fuse.js']
const selectedVersions = Object.fromEntries(selectedNames.map((name) => [name, packageLock.packages?.[`node_modules/${name}`]?.version]))
for (const [name, version] of Object.entries(selectedVersions)) {
  if (!packageJson.dependencies?.[name] || !version) failures.push(`package.json 或 lockfile 缺少 ${name}`)
}
for (const [name, expectedPrefix] of Object.entries({ next: '15.5.', react: '19.2.', 'react-dom': '19.2.', gsap: '3.15.', zod: '3.25.', 'fuse.js': '7.' })) {
  if (!String(selectedVersions[name] ?? '').startsWith(expectedPrefix)) failures.push(`${name} 偏离冻结维护线：${selectedVersions[name] ?? 'missing'}`)
}
for (const forbidden of ['three', '@react-three/fiber', 'pixi.js', 'd3', 'sigma', 'xstate', 'howler', 'tone']) {
  if (packageJson.dependencies?.[forbidden]) failures.push(`未经 ADR 引入运行时依赖：${forbidden}`)
}

const playwrightPath = commandPath('playwright')
const pythonPath = resolvePlaywrightPython(playwrightPath)
let browserProbe = launchChromium(pythonPath)
if (!browserProbe.ok && repairBrowser && playwrightPath) {
  const install = spawnSync(playwrightPath, ['install', '--only-shell', 'chromium'], {
    cwd: root,
    encoding: 'utf8',
    timeout: 10 * 60 * 1000,
  })
  if (install.status !== 0) failures.push(`Playwright Chromium 安装失败：${(install.stderr || install.stdout).trim()}`)
  browserProbe = launchChromium(pythonPath)
}
if (!browserProbe.ok) failures.push(`Playwright Chromium 不可启动：${browserProbe.error}`)

const privateLanAddresses = Object.values(os.networkInterfaces()).flat().filter((entry) => {
  if (!entry || entry.family !== 'IPv4' || entry.internal) return false
  return /^10\./.test(entry.address) || /^192\.168\./.test(entry.address) || /^172\.(1[6-9]|2\d|3[01])\./.test(entry.address)
}).map((entry) => entry.address)
if (privateLanAddresses.length === 0) failures.push('未发现可用于 LAN 验收的私有 IPv4 地址')

if (failures.length) {
  console.error(`LIVING_WORLD_READINESS_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log([
  'LIVING_WORLD_READINESS_PASS',
  `node=${process.versions.node}`,
  `playwrightChromium=${browserProbe.version}`,
  `lan=${privateLanAddresses.join(',')}`,
  `stack=${Object.entries(selectedVersions).map(([name, version]) => `${name}@${version}`).join(',')}`,
].join(' '))
