#!/usr/bin/env node
// 用途：M16 依赖与性能硬化门禁，防止世界体验变成重型依赖堆叠。
import fs from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const readJson = (file) => JSON.parse(read(file))
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== '_legacy') walk(abs, cb)
    else if (/\.(ts|tsx|js|mjs|json)$/.test(entry.name)) cb(abs)
  }
}

function dirSize(dir) {
  let size = 0
  if (!fs.existsSync(dir)) return 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    size += entry.isDirectory() ? dirSize(abs) : fs.statSync(abs).size
  }
  return size
}

function dirSizeExcept(dir, excludedNames) {
  let size = 0
  if (!fs.existsSync(dir)) return 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (excludedNames.has(entry.name)) continue
    const abs = path.join(dir, entry.name)
    size += entry.isDirectory() ? dirSizeExcept(abs, excludedNames) : fs.statSync(abs).size
  }
  return size
}

const policy = readJson('data/engineering/dependency-hardening-policy.json')
const pkg = readJson('package.json')
const runtimeDeps = Object.keys(pkg.dependencies ?? {}).sort()
const allowedRuntimeDeps = [...(policy.allowedRuntimeDependencies ?? [])].sort()

assert(JSON.stringify(runtimeDeps) === JSON.stringify(allowedRuntimeDeps), `运行时依赖与策略不一致：actual=${runtimeDeps.join(',')}`)
assert(runtimeDeps.length <= policy.runtimeBudgets.maxRuntimeDependencies, `运行时依赖数超预算：${runtimeDeps.length}/${policy.runtimeBudgets.maxRuntimeDependencies}`)

for (const dep of policy.heavyCandidatesRequireAdr ?? []) {
  assert(!pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep], `重型候选依赖必须先 ADR：${dep}`)
}

const runtimeAtmosphere = read('src/components/world/RuntimeAtmosphere.tsx')
assert(runtimeAtmosphere.includes('!runtime.reducedMotion && !runtime.compactMotion'), 'RuntimeAtmosphere 必须显式在 reduced/compact 下停止背景动画')

const sensoryAudio = readJson('data/domains/experience/sensory-audio-registry.json')
assert(sensoryAudio.scope?.defaultSoundEnabled === false, '声音必须默认静音')
assert(sensoryAudio.runtime?.usesExternalAudioAsset === false, 'M16 不允许默认外部音频资产')
assert(sensoryAudio.runtime?.autoPlayAllowed === false, 'M16 不允许自动播放音频')

const providerContract = readJson('data/world-kernel/worldos-ai-provider-boundary-contract-v1.json')
assert(providerContract.scope?.realTimeAIProviderEnabled === false, 'AI Provider 必须默认 disabled')
assert(providerContract.backendAdapter?.performsNetworkRequest === false, 'AI Provider 当前不得发起网络请求')

const scanRoots = ['src/app', 'src/components', 'src/lib', 'src/server']
for (const dir of scanRoots) {
  walk(rel(dir), (abs) => {
    const source = fs.readFileSync(abs, 'utf-8')
    const relative = path.relative(root, abs)
    for (const token of policy.forbiddenMainlineTokens ?? []) {
      assert(!source.includes(token), `${relative} 包含 M16 禁用 token：${token}`)
    }
  })
}

const nextDir = rel('.next')
if (fs.existsSync(nextDir)) {
  const buildMb = dirSize(nextDir) / 1024 / 1024
  const cacheMb = dirSize(rel('.next/cache')) / 1024 / 1024
  const runtimeArtifactMb = dirSizeExcept(nextDir, new Set(['cache'])) / 1024 / 1024
  assert(buildMb <= policy.runtimeBudgets.maxNextBuildMb, `.next 超预算：${buildMb.toFixed(2)}MB`)
  assert(cacheMb <= policy.runtimeBudgets.maxNextCacheMb, `.next/cache 超预算：${cacheMb.toFixed(2)}MB`)
  assert(runtimeArtifactMb <= policy.runtimeBudgets.maxNextRuntimeArtifactMb, `.next runtime artifact 超预算：${runtimeArtifactMb.toFixed(2)}MB`)
  const chunksDir = rel('.next/static/chunks')
  if (fs.existsSync(chunksDir)) {
    for (const entry of fs.readdirSync(chunksDir)) {
      if (!entry.endsWith('.js')) continue
      const abs = path.join(chunksDir, entry)
      const rawMb = fs.statSync(abs).size / 1024 / 1024
      const gzipMb = gzipSync(fs.readFileSync(abs)).length / 1024 / 1024
      assert(rawMb <= policy.runtimeBudgets.maxRawJsChunkMb, `${entry} raw 超预算：${rawMb.toFixed(2)}MB`)
      assert(gzipMb <= policy.runtimeBudgets.maxGzipJsChunkMb, `${entry} gzip 超预算：${gzipMb.toFixed(2)}MB`)
    }
  }
}

assert(pkg.scripts?.['check:mainline']?.includes('check:dependency-hardening'), 'check:mainline 必须纳入 check:dependency-hardening')

if (failures.length) {
  console.error('WorldOS dependency hardening check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS dependency hardening check passed: ${runtimeDeps.length} runtime deps, heavy candidates absent`)
