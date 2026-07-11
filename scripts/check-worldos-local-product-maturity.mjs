// 用途：验证本地/LAN 产品成熟度；不再依赖旧首页组件或公开工程说明。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const exists = (file) => fs.existsSync(path.join(root, file))
const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

const contract = readJson('data/world-kernel/worldos-local-product-maturity-contract-v1.json')
const pkg = readJson('package.json')
const commandSpine = readJson('data/world-kernel/worldos-maintenance-command-spine-v1.json')
const nodes = readJson('data/domains/experience/nodes.json')
const paths = readJson('data/domains/experience/paths.json')
const relations = readJson('data/core/relations.json')
const pointer = readJson('docs/90-archive/reports/worldos-reality-first/latest-evidence.json')
const evidence = readJson(pointer.manifest)
const minimums = contract.minimums ?? {}

assert(contract.scope?.localOnly === true, '本地成熟度必须 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false && contract.scope?.productionConsidered === false, '本地成熟度不得扩张到外部发布')
for (const [key, value] of Object.entries(contract.releaseStates ?? {})) assert(value === false, `${key} 必须保持 false`)
assert(pkg.scripts?.['check:mainline']?.includes('check:local-product-maturity'), 'check:mainline 未纳入本地成熟度')
assert((commandSpine.stableEntrypoints ?? []).includes('check:local-product-maturity'), '命令脊柱缺少本地成熟度入口')

const publicNodes = nodes.filter((node) => node.visibility === 'public')
const publicPaths = paths.filter((item) => item.visibility === 'public')
const publicSlugs = new Set(publicNodes.map((node) => node.slug))
assert(publicNodes.length >= minimums.publicNodes, `公开节点不足：${publicNodes.length}/${minimums.publicNodes}`)
assert(publicPaths.length >= minimums.publicPaths, `公开路径不足：${publicPaths.length}/${minimums.publicPaths}`)
assert(relations.length >= minimums.relations, `公开关系不足：${relations.length}/${minimums.relations}`)
const firstVisit = publicPaths.find((item) => item.id === 'first-visit')
assert((firstVisit?.nodeSlugs.length ?? 0) >= minimums.firstVisitPathNodes, 'first-visit 路径节点不足')
for (const slug of firstVisit?.nodeSlugs ?? []) assert(publicSlugs.has(slug), `first-visit 引用非公开节点：${slug}`)

const stageFiles = [
  'src/components/product/WorldGatewayStage.tsx', 'src/components/atlas/AtlasExplorationStage.tsx',
  'src/components/timeline/TimelineRiverStage.tsx', 'src/components/archive/ArchiveHallStage.tsx',
  'src/components/paths/JourneyRouteStage.tsx', 'src/components/node/NodePlaceRoom.tsx',
  'src/components/ask/LighthouseGuideStage.tsx',
]
stageFiles.forEach((file) => assert(exists(file), `独立场景缺失：${file}`))
assert(!exists('src/components/product/ProductRouteGuide.tsx'), '不得恢复统一 ProductRouteGuide')

assert(evidence.status === 'objective-evidence-captured' && evidence.failures?.length === 0, '最新 Reality evidence 未通过')
assert(evidence.freshness?.valid === true, '最新 Reality evidence 时间链无效')
assert(String(evidence.server?.lan ?? '').startsWith('http://') && !String(evidence.server?.lan ?? '').includes('localhost'), '缺少真实 LAN IP 访问证据')
assert((evidence.browser?.observations ?? []).length >= 42, '七场景六模式浏览器证据不足')
for (const flow of ['first-visit', 'scene-migration', 'atlas-exploration', 'timeline-revisit', 'archive-retrieval', 'path-journey', 'node-reading', 'lighthouse-guidance', 'return-visit-continuation']) assert(evidence.flows?.[flow]?.bytes > 0, `${flow} 连续流程缺失`)

if (failures.length) {
  console.error('WorldOS local product maturity check failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}
console.log(`WorldOS local product maturity check passed: ${publicNodes.length} public nodes, ${publicPaths.length} paths, 7 scenes, 9 flows`)
