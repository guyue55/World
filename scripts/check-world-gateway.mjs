import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const json = (file) => JSON.parse(read(file))
const failures = []

const curation = json('data/domains/content/world-public-curation.json')
const nodes = json('data/domains/experience/nodes.json')
const paths = json('data/domains/experience/paths.json')
const navigation = json('data/domains/experience/navigation-state-contract.json')
const publicNodeIds = new Set(nodes.filter((node) => !['private', 'family', 'partner', 'vault', 'sealed', 'silent'].includes(node.visibility)).map((node) => node.id))
const publicPathIds = new Set(paths.filter((entry) => entry.visibility === 'public').map((entry) => entry.id))
const representatives = Object.values(curation.representativeNodeIdsByArea).flat()

if (representatives.length < 24) failures.push(`代表节点不足：${representatives.length}`)
if (new Set(representatives).size !== representatives.length) failures.push('代表节点存在重复')
if (Object.keys(curation.representativeNodeIdsByArea).length < 8) failures.push('策展未覆盖八个一级区域')

for (const [areaId, ids] of Object.entries(curation.representativeNodeIdsByArea)) {
  if (ids.length < 3) failures.push(`${areaId} 代表节点不足三个`)
  for (const id of ids) {
    const node = nodes.find((entry) => entry.id === id)
    if (!publicNodeIds.has(id)) failures.push(`${areaId} 引用不存在或非公开节点：${id}`)
    if (node?.areaId !== areaId) failures.push(`${id} 不属于 ${areaId}`)
    if (!curation.rationaleById[id]) failures.push(`${id} 缺少策展理由`)
  }
}

for (const id of curation.gatewayNodeIds) {
  if (!publicNodeIds.has(id)) failures.push(`Gateway 引用不存在或非公开节点：${id}`)
  if (curation.archiveOnlyNodeIds.includes(id)) failures.push(`Gateway 节点不能同时 Archive-only：${id}`)
}
for (const id of curation.archiveOnlyNodeIds) {
  if (!publicNodeIds.has(id)) failures.push(`Archive-only 引用不存在或非公开节点：${id}`)
}
for (const id of curation.onboardingPathIds) {
  if (!publicPathIds.has(id)) failures.push(`新手路径不存在或非公开：${id}`)
}

const gatewaySource = read('src/components/product/WorldGatewayStage.tsx')
const homeSource = read('src/components/product/ProductHome.tsx')
const shellSource = read('src/components/world/WorldShell.tsx')
const providerSource = read('src/components/world/WorldRuntimeProvider.tsx')
const layoutSource = read('src/app/layout.tsx')

for (const token of ['gsap.matchMedia()', 'media.revert()', 'gateway-enter', 'data-image-failed', 'AccessibleSceneList', 'gateway-returning']) {
  if (!gatewaySource.includes(token)) failures.push(`Gateway 缺少实现边界：${token}`)
}
for (const token of ['SceneWorldPortal', 'WorldPulseConstellation', 'ProductWorldCompass', 'Evidence', '场景证据']) {
  if (gatewaySource.includes(token) || homeSource.includes(token)) failures.push(`Gateway 仍含旧 portal/工程文案：${token}`)
}
for (const token of ['ProductBackdrop', 'ProductJourneyDock', 'SceneIdentityBand', 'CompassNav', 'MobileNav']) {
  if (shellSource.includes(token)) failures.push(`WorldShell 仍使用旧全局壳：${token}`)
}
if (!shellSource.includes('WorldChrome')) failures.push('WorldShell 未接入 WorldChrome')
if (providerSource.includes('localStorage')) failures.push('WorldRuntimeProvider 仍直接处理 localStorage')
if (!providerSource.includes("@/lib/runtime/journey-storage")) failures.push('WorldRuntimeProvider 未接入 journey-storage')
if (!navigation.items.some((item) => item.href === '/paths' && item.mobile && item.desktop)) failures.push('空间罗盘缺少 Paths')
if (!layoutSource.includes('<noscript><StaticGatewayNoScript')) failures.push('根布局缺少同事实源的静态 Gateway')

if (failures.length > 0) {
  console.error('World Gateway check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`World Gateway check passed: ${representatives.length} representative nodes, ${curation.gatewayNodeIds.length} gateway places, ${curation.onboardingPathIds.length} onboarding paths`)
