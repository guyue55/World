import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const registryPath = path.join(root, 'data/assets/world-scene-assets.json')
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
const expectedSceneIds = ['gateway', 'atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse']
const failures = []

function readWebpSize(filePath) {
  const buffer = fs.readFileSync(filePath)
  const vp8Offset = buffer.indexOf(Buffer.from('VP8 '))
  if (vp8Offset < 0) throw new Error(`只支持当前有损 VP8 WebP：${filePath}`)
  const frameOffset = vp8Offset + 8
  if (buffer.subarray(frameOffset + 3, frameOffset + 6).toString('hex') !== '9d012a') {
    throw new Error(`WebP key frame header 无效：${filePath}`)
  }
  return {
    width: buffer.readUInt16LE(frameOffset + 6) & 0x3fff,
    height: buffer.readUInt16LE(frameOffset + 8) & 0x3fff,
  }
}

const ids = registry.assets.map((asset) => asset.sceneId)
if (JSON.stringify(ids) !== JSON.stringify(expectedSceneIds)) failures.push('资产场景必须按冻结顺序完整覆盖七类空间')
if (registry.license?.status !== 'approved-for-project-use') failures.push('资产许可状态未批准')

for (const asset of registry.assets) {
  if (asset.licenseId !== registry.license.id) failures.push(`${asset.sceneId} licenseId 与 registry 不一致`)
  if (!asset.promptSummary) failures.push(`${asset.sceneId} 缺少提示摘要`)
  for (const mode of ['desktop', 'mobile']) {
    const entry = asset[mode]
    const relativePath = entry.src.replace(/^\//, 'public/')
    const filePath = path.join(root, relativePath)
    if (!fs.existsSync(filePath)) {
      failures.push(`${asset.sceneId}/${mode} 文件不存在：${relativePath}`)
      continue
    }
    const bytes = fs.statSync(filePath).size
    const dimensions = readWebpSize(filePath)
    const maxBytes = mode === 'desktop' ? registry.budgets.desktopMaxBytes : registry.budgets.mobileMaxBytes
    if (bytes !== entry.bytes) failures.push(`${asset.sceneId}/${mode} 字节登记漂移：${entry.bytes} vs ${bytes}`)
    if (bytes > maxBytes) failures.push(`${asset.sceneId}/${mode} 超预算：${bytes} > ${maxBytes}`)
    if (dimensions.width !== entry.width || dimensions.height !== entry.height) {
      failures.push(`${asset.sceneId}/${mode} 尺寸登记漂移：${entry.width}x${entry.height} vs ${dimensions.width}x${dimensions.height}`)
    }
    if (mode === 'desktop' && dimensions.width <= dimensions.height) failures.push(`${asset.sceneId}/desktop 必须为横构图`)
    if (mode === 'mobile' && dimensions.height <= dimensions.width) failures.push(`${asset.sceneId}/mobile 必须为竖构图`)
  }
}

const componentRequirements = {
  'src/components/world/primitives/WorldViewport.tsx': ['world-viewport', 'data-scene-static-fallback', 'aria-label'],
  'src/components/world/primitives/SceneObjectButton.tsx': ['min-h-11', 'min-w-11', 'aria-current', 'aria-pressed'],
  'src/components/world/primitives/SceneInspector.tsx': ['Escape', 'role="dialog"', 'aria-modal="true"', 'md:w-[min(32%,24rem)]'],
  'src/components/world/primitives/WorldExitRail.tsx': ['<nav', 'aria-label', 'data-world-exit-rail'],
  'src/components/world/primitives/AccessibleSceneList.tsx': ['data-accessible-scene-list', '<Link', 'min-h-11'],
}

for (const [relativePath, tokens] of Object.entries(componentRequirements)) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8')
  for (const token of tokens) {
    if (!source.includes(token)) failures.push(`${relativePath} 缺少静态边界：${token}`)
  }
}

for (const relativePath of ['src/app/globals.css', 'src/styles/world-scene-tokens.css']) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8')
  if (/letter-spacing:\s*-/.test(source)) failures.push(`${relativePath} 仍包含负 letter-spacing`)
}

if (failures.length > 0) {
  console.error('World scene foundation check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`World scene foundation check passed: ${registry.assets.length} scenes, ${registry.assets.length * 2} licensed assets, 5 primitives`)
