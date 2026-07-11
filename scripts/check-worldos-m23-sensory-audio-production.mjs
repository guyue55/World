// 用途：验证 M23 感官音频资产生产化是否满足默认静音、授权、预算和降级边界。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const failures = []

function rel(file) {
  return path.join(ROOT, file)
}

function read(file) {
  return fs.readFileSync(rel(file), 'utf-8')
}

function readJson(file) {
  return JSON.parse(read(file))
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function listFiles(dir) {
  if (!fs.existsSync(rel(dir))) return []
  const result = []
  const stack = [rel(dir)]
  while (stack.length > 0) {
    const current = stack.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) stack.push(fullPath)
      if (entry.isFile()) result.push(path.relative(ROOT, fullPath))
    }
  }
  return result
}

const registryPath = 'data/domains/experience/sensory-audio-registry.json'
const registry = readJson(registryPath)
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const performanceBudget = readJson('data/engineering/performance-budget.json')
const staticAssetPolicy = readJson('data/domains/governance/static-asset-policy.json')
const control = read('src/components/world/RuntimeSoundscapeControl.tsx')
const engine = read('src/lib/runtime/soundscape-engine.ts')
const audioLib = read('src/lib/sensory-audio.ts')
const statusPanel = read('src/components/status/SceneRuntimeStatusPanel.tsx')

assert(registry.name === 'WorldOS 场景声景注册表', 'M23 声景注册表名称不正确')
assert(registry.version === '1.2.0', '场景声景注册表版本应为 1.2.0')
assert(registry.updatedAt === '2026-07-10', 'M23 声景注册表更新时间不正确')
assert(registry.source === 'docs/00-overview/worldos-m23-sensory-audio-production-spec-2026-07-10.md', 'M23 声景注册表 source 不正确')
assert(registry.productionReadiness?.stage === 'M23', '缺少 M23 productionReadiness')
assert(registry.productionReadiness?.unifiedWorldview === true, 'M23 必须声明统一世界观')
assert(registry.productionReadiness?.allSceneAssetsLicensed === true, 'M23 必须声明场景资产已授权')
assert(registry.productionReadiness?.allSceneAssetsBudgeted === true, 'M23 必须声明场景资产已预算')

assert(registry.scope?.defaultSoundEnabled === false, '声音必须默认静音')
assert(registry.runtime?.autoPlayAllowed === false, '不得允许自动播放')
assert(registry.runtime?.usesHtmlAudio === false, 'M23 仍不使用 HTMLAudio 文件播放')
assert(registry.runtime?.usesExternalAudioAsset === false, 'M23 不得下载外部音频资产')
assert(registry.runtime?.usesHowler === false, 'M23 不得引入 Howler')
assert(registry.runtime?.usesTone === false, 'M23 不得引入 Tone')
assert(registry.runtime?.maxVolume <= 0.7, '声景最大音量必须克制')
assert(String(registry.runtime?.sessionArmPolicy ?? '').includes('fresh user click'), '必须声明本会话用户点击 armed 策略')
assert(String(registry.runtime?.sceneSwitchPolicy ?? '').includes('releasing the previous group'), '必须声明场景切换释放旧声音策略')
assert(String(registry.runtime?.reducedSensoryPolicy ?? '').includes('never creates or resumes audio'), '必须声明 reduced-sensory 不创建音频策略')

const requiredScenes = registry.acceptance?.requiredScenes ?? []
const soundscapes = registry.sceneSoundscapes ?? []
assert(requiredScenes.length >= 9, 'M23 requiredScenes 数量不足')
assert(soundscapes.length >= requiredScenes.length, 'M23 sceneSoundscapes 数量不足')

const requiredFields = registry.acceptance?.requiredM23SoundscapeFields ?? []
let licensedSoundscapes = 0
let budgetedSoundscapes = 0
for (const sceneId of requiredScenes) {
  const soundscape = soundscapes.find((item) => item.sceneId === sceneId)
  assert(Boolean(soundscape), `缺少场景声景：${sceneId}`)
  if (!soundscape) continue
  for (const field of requiredFields) {
    assert(soundscape[field] !== undefined && soundscape[field] !== '', `${sceneId} 缺少 M23 字段：${field}`)
  }
  assert(soundscape.productionReady === true, `${sceneId} 声景必须 productionReady=true`)
  assert(soundscape.firstPaintDependency === false, `${sceneId} 声景不得进入首屏依赖`)
  assert(soundscape.loadPolicy === 'opt-in-generated', `${sceneId} 必须按 opt-in-generated 加载`)
  assert(soundscape.stopPolicy === 'scene-change-stop-previous', `${sceneId} 必须停止旧场景声音`)
  assert(soundscape.durationMs <= 240, `${sceneId} 声景时长过长`)
  assert(soundscape.maxGain <= 0.05, `${sceneId} 声景增益过高`)
  if (soundscape.source && soundscape.license) licensedSoundscapes += 1
  if (Number.isFinite(soundscape.bytes) && soundscape.bytes <= 0) budgetedSoundscapes += 1
}

const assets = registry.assetInventory ?? []
assert(assets.length > 0, 'M23 缺少资产清单')
const totalAssetBytes = assets.reduce((sum, asset) => sum + Number(asset.bytes ?? 0), 0)
for (const asset of assets) {
  assert(asset.source && asset.license, `资产缺少来源或授权：${asset.assetId}`)
  assert(asset.productionReady === true, `资产必须 productionReady：${asset.assetId}`)
  assert(asset.firstPaintDependency === false, `资产不得进入首屏依赖：${asset.assetId}`)
  assert(Number(asset.bytes) === 0, `运行时合成资产字节应为 0：${asset.assetId}`)
  assert(asset.compression, `资产缺少压缩/合成说明：${asset.assetId}`)
}

const forbiddenAudioFiles = listFiles('public').filter((file) => /\.(mp3|wav|ogg|flac|aac|m4a)$/i.test(file))
assert(forbiddenAudioFiles.length === 0, `public 不应出现外部音频文件：${forbiddenAudioFiles.join(', ')}`)

const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }
for (const forbiddenDependency of ['howler', 'tone']) {
  assert(!dependencies[forbiddenDependency], `M23 不应引入 ${forbiddenDependency}`)
}

for (const token of ['audioArmed', 'data-audio-armed', 'SoundscapeEngine', 'disable', 'aria-pressed']) {
  assert(control.includes(token), `RuntimeSoundscapeControl 缺少 M23 控制证据：${token}`)
}
for (const token of ['activeLoop', 'stopGroup(previous)', 'visibilitychange', 'dispose']) assert(engine.includes(token), `SoundscapeEngine 缺少生命周期能力：${token}`)
assert(!/<\s*audio[\s>]/i.test(control), 'RuntimeSoundscapeControl 不得使用 audio 元素')
assert(!/autoPlay\s*=\s*{?true}?/i.test(control), 'RuntimeSoundscapeControl 不得启用自动播放')
assert(!/localStorage.*(owner|permission|auth|role|token)/i.test(control), '声景控件不得用本地存储控制权限')

for (const token of ['sessionArmPolicy', 'sceneSwitchPolicy', 'reducedSensoryPolicy', 'licensedSoundscapeCount', 'totalAssetBytes']) {
  assert(audioLib.includes(token), `sensory-audio lib 缺少 M23 摘要字段：${token}`)
}
for (const token of ['Sensory Audio M23', 'licensedSoundscapeCount', 'totalAssetBytes', 'sessionArmPolicy']) {
  assert(statusPanel.includes(token), `/status 缺少 M23 声景状态证据：${token}`)
}

assert((performanceBudget.budgets ?? []).some((item) => item.id === 'audio-policy'), '性能预算缺少 audio-policy')
assert((staticAssetPolicy.assetKinds ?? []).some((item) => item.id === 'audio-generated'), '静态资产策略缺少 audio-generated')
assert(pkg.scripts?.['check:m23-sensory-audio-production'] === 'node scripts/check-worldos-m23-sensory-audio-production.mjs', 'package.json 缺少 check:m23-sensory-audio-production')
assert(pkg.scripts?.['check:mainline']?.includes('check:m23-sensory-audio-production'), 'check:mainline 必须纳入 check:m23-sensory-audio-production')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:m23-sensory-audio-production'), '脚本注册表缺少 M23 active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:m23-sensory-audio-production'), '脚本注册表缺少 M23 recommended command')
assert((scriptRegistry.releaseCandidateCommands ?? []).includes('npm run check:m23-sensory-audio-production'), '脚本注册表缺少 M23 RC command')

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length > 0 ? 'failed' : 'passed',
  stage: 'M23',
  registry: registryPath,
  requiredScenes: requiredScenes.length,
  soundscapes: soundscapes.length,
  licensedSoundscapes,
  budgetedSoundscapes,
  assetCount: assets.length,
  totalAssetBytes,
  defaultSoundEnabled: registry.scope?.defaultSoundEnabled,
  autoPlayAllowed: registry.runtime?.autoPlayAllowed,
  usesExternalAudioAsset: registry.runtime?.usesExternalAudioAsset,
  usesHowler: registry.runtime?.usesHowler,
  usesTone: registry.runtime?.usesTone,
  forbiddenAudioFiles,
  failures,
}

fs.mkdirSync(rel('docs/90-archive/reports'), { recursive: true })
fs.writeFileSync(rel('docs/90-archive/reports/worldos-m23-sensory-audio-production-report.json'), `${JSON.stringify(report, null, 2)}\n`)

if (failures.length) {
  console.error('WorldOS M23 sensory audio production check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS M23 sensory audio production check passed: ${licensedSoundscapes}/${requiredScenes.length} licensed soundscapes, ${totalAssetBytes} audio bytes`)
