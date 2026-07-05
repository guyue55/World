import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf-8'))
const failures = []

const nodes = readJson('data/domains/experience/nodes.json')
const areas = readJson('data/domains/experience/areas.json')
const paths = readJson('data/domains/experience/paths.json')
const relations = readJson('data/core/relations.json')
const events = readJson('data/core/world-events.json')

const publicNodes = nodes.filter((node) => node.visibility === 'public')
const nodesWithContent = publicNodes.filter((node) => Boolean(node.contentPath))
const representedAreas = new Set(publicNodes.map((node) => node.areaId))
const featuredNodes = publicNodes.filter((node) => node.featured?.home || node.featured?.representative || node.featured?.recommended)
const pathNodeSlugs = new Set(paths.filter((item) => item.visibility === 'public').flatMap((item) => item.nodeSlugs))
const nodeSlugs = new Set(publicNodes.map((node) => node.slug))
const nodeIds = new Set(nodes.map((node) => node.id))

const minimums = {
  publicNodes: 50,
  nodesWithContent: 50,
  publicPaths: 12,
  relations: 80,
  events: 20,
  representedAreas: 8,
  featuredNodes: 14,
}

if (publicNodes.length < minimums.publicNodes) failures.push(`公开节点不足：${publicNodes.length}/${minimums.publicNodes}`)
if (nodesWithContent.length < minimums.nodesWithContent) failures.push(`有正文的公开节点不足：${nodesWithContent.length}/${minimums.nodesWithContent}`)
if (paths.filter((item) => item.visibility === 'public').length < minimums.publicPaths) failures.push(`公开路径不足：${paths.length}/${minimums.publicPaths}`)
if (relations.length < minimums.relations) failures.push(`关系数量不足：${relations.length}/${minimums.relations}`)
if (events.length < minimums.events) failures.push(`世界事件不足：${events.length}/${minimums.events}`)
if (representedAreas.size < minimums.representedAreas) failures.push(`有公开节点的区域不足：${representedAreas.size}/${minimums.representedAreas}`)
if (featuredNodes.length < minimums.featuredNodes) failures.push(`精选/代表节点不足：${featuredNodes.length}/${minimums.featuredNodes}`)

for (const node of publicNodes) {
  if (!node.summary || node.summary.length < 18) failures.push(`${node.id} 缺少足够清晰的 summary`)
  if (!node.worldTitle) failures.push(`${node.id} 缺少 worldTitle`)
  if (node.contentPath && !fs.existsSync(path.join(root, node.contentPath))) failures.push(`${node.id} contentPath 不存在：${node.contentPath}`)
  if (node.contentPath && fs.existsSync(path.join(root, node.contentPath))) {
    const content = fs.readFileSync(path.join(root, node.contentPath), 'utf-8').trim()
    if (content.length < 30) failures.push(`${node.id} 正文过短，不足以作为真实公开内容`)
    if (!/[\u4e00-\u9fffA-Za-z0-9]/.test(content)) failures.push(`${node.id} 正文缺少可读文本`)
  }
}

for (const pathItem of paths.filter((item) => item.visibility === 'public')) {
  if (pathItem.nodeSlugs.length < 4) failures.push(`${pathItem.id} 路径节点少于 4 个`)
  for (const slug of pathItem.nodeSlugs) {
    if (!nodeSlugs.has(slug)) failures.push(`${pathItem.id} 引用了不存在或非公开节点 slug：${slug}`)
  }
}

for (const relation of relations) {
  if (!nodeIds.has(relation.from)) failures.push(`关系 ${relation.id ?? `${relation.from}->${relation.to}`} from 不存在：${relation.from}`)
  if (!nodeIds.has(relation.to)) failures.push(`关系 ${relation.id ?? `${relation.from}->${relation.to}`} to 不存在：${relation.to}`)
  if (!relation.note && relation.strength >= 0.8) failures.push(`强关系 ${relation.id ?? `${relation.from}->${relation.to}`} 应补充 note，说明为什么相连`)
}

for (const event of events) {
  for (const id of event.nodeIds ?? []) {
    if (!nodeIds.has(id)) failures.push(`事件 ${event.id} 引用了不存在节点：${id}`)
  }
}

const requiredPathIds = ['eight-minute-world', 'creator-maintenance', 'product-workshop', 'public-life-memory', 'code-architecture-cleanup', 'public-safety-accessibility', 'rc-governance-trace']
for (const id of requiredPathIds) {
  if (!paths.some((item) => item.id === id)) failures.push(`缺少 RC2 必备路径：${id}`)
}

const requiredSlugs = ['world-design-axioms', 'front-romantic-back-clear-archive-reliable', 'world-language-glossary', 'node-passport-standard', 'eight-minute-world-path', 'worldos-mainline-code-map', 'legacy-footprint-audit', 'mainline-import-boundary', 'script-taxonomy-gate', 'route-ownership-map', 'public-ai-context-contract', 'worldos-rc3-governance']
for (const slug of requiredSlugs) {
  if (!nodeSlugs.has(slug)) failures.push(`缺少 RC2 必备节点：${slug}`)
}

if (failures.length) {
  console.error('WorldOS content density check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS content density check passed: ${publicNodes.length} public nodes, ${nodesWithContent.length} content nodes, ${relations.length} relations, ${paths.length} paths`)
