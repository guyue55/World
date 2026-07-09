// 用途：检查内容生命周期门禁
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const failures = []

const contract = readJson('data/world-kernel/worldos-content-life-contract-v1.json')
const nodes = readJson('data/domains/experience/nodes.json')
const areas = readJson('data/domains/experience/areas.json')
const paths = readJson('data/domains/experience/paths.json')
const relations = readJson('data/core/relations.json')
const events = readJson('data/core/world-events.json')
const packageJson = readJson('package.json')
const publicIndexSource = fs.readFileSync(rel('src/lib/public-index.ts'), 'utf-8')
const publicObjectsSource = fs.readFileSync(rel('src/lib/public-world-objects.ts'), 'utf-8')
const contentLifeSource = fs.existsSync(rel('src/lib/content-life.ts')) ? fs.readFileSync(rel('src/lib/content-life.ts'), 'utf-8') : ''
const lighthouseRuntimeSource = fs.existsSync(rel('src/server/ai/lighthouse-runtime.ts')) ? fs.readFileSync(rel('src/server/ai/lighthouse-runtime.ts'), 'utf-8') : ''

const gates = contract.qualityGates ?? {}
const publicNodes = nodes.filter((node) => node.visibility === 'public')
const publicPaths = paths.filter((item) => item.visibility === 'public')
const areaIds = new Set(areas.map((area) => area.id))
const publicNodeIds = new Set(publicNodes.map((node) => node.id))
const publicNodeSlugs = new Set(publicNodes.map((node) => node.slug))
const relationNodeIds = new Set(relations.flatMap((relation) => [relation.from, relation.to]))
const pathNodeSlugs = new Set(publicPaths.flatMap((item) => item.nodeSlugs))
const featuredLifeStages = new Set(contract.featuredLifeStages ?? [])

function isFeatured(node) {
  return Boolean(node.featured?.home || node.featured?.representative || node.featured?.recommended || node.featured?.pathCore || node.featured?.timelineKey)
}

function requireCount(label, actual, minimum) {
  if (actual < minimum) failures.push(`${label} 不足：${actual}/${minimum}`)
}

requireCount('公开节点', publicNodes.length, gates.minPublicNodes ?? 0)
requireCount('公开路径', publicPaths.length, gates.minPublicPaths ?? 0)
requireCount('关系数量', relations.length, gates.minRelations ?? 0)
requireCount('世界事件', events.length, gates.minEvents ?? 0)
requireCount('公开区域覆盖', new Set(publicNodes.map((node) => node.areaId)).size, gates.minRepresentedAreas ?? 0)

for (const node of publicNodes) {
  if (!node.title || !node.slug) failures.push(`${node.id} 缺少标题或 slug`)
  if (!node.summary || node.summary.length < (gates.minSummaryLength ?? 18)) failures.push(`${node.id} 缺少足够清晰的 summary`)
  if (gates.requireAiReadableSummaryForPublicNodes && !node.summary && !node.ai?.summary) failures.push(`${node.id} 缺少 AI 可读摘要来源`)
  if (!areaIds.has(node.areaId)) failures.push(`${node.id} 指向不存在区域：${node.areaId}`)
  if (!node.lifeStage) failures.push(`${node.id} 缺少生命周期`)
  if (gates.requireContentPathForPublicNodes && (!node.contentPath || !fs.existsSync(rel(node.contentPath)))) failures.push(`${node.id} 缺少可读取正文：${node.contentPath ?? '未设置'}`)
  if (gates.requireRelationForPublicNodes && !relationNodeIds.has(node.id)) failures.push(`${node.id} 没有任何公开关系星线`)
  if (gates.requirePathForPublicNodes && !pathNodeSlugs.has(node.slug)) failures.push(`${node.id} 没有进入任何公开推荐路径`)

  if (isFeatured(node)) {
    if (gates.requireFeaturedNodePath && !pathNodeSlugs.has(node.slug)) failures.push(`精选节点 ${node.id} 必须进入公开路径`)
    if (gates.requireFeaturedNodeContent && (!node.contentPath || !fs.existsSync(rel(node.contentPath)))) failures.push(`精选节点 ${node.id} 必须有正文`)
    if (!featuredLifeStages.has(node.lifeStage)) failures.push(`精选节点 ${node.id} 生命周期不适合精选：${node.lifeStage}`)
  }
}

for (const pathItem of publicPaths) {
  if (!pathItem.description || pathItem.description.length < 18) failures.push(`路径 ${pathItem.id} 缺少清晰说明`)
  if (!pathItem.estimatedMinutes || pathItem.estimatedMinutes < 5) failures.push(`路径 ${pathItem.id} 缺少合理阅读时间`)
  for (const slug of pathItem.nodeSlugs) {
    if (!publicNodeSlugs.has(slug)) failures.push(`路径 ${pathItem.id} 引用了不存在或非公开节点：${slug}`)
  }
}

for (const relation of relations) {
  if (!publicNodeIds.has(relation.from) || !publicNodeIds.has(relation.to)) continue
  if (gates.requireReviewedStrongRelations && relation.strength >= 0.8 && relation.reviewed !== true) {
    failures.push(`强关系 ${relation.id ?? `${relation.from}->${relation.to}`} 必须人工 reviewed`)
  }
  if (gates.requireReasonForStrongRelations && relation.strength >= 0.8 && !relation.note) {
    failures.push(`强关系 ${relation.id ?? `${relation.from}->${relation.to}`} 必须说明为什么相关`)
  }
}

for (const event of events.filter((event) => event.visibility === 'public' || !event.visibility)) {
  for (const id of event.nodeIds ?? []) {
    if (!publicNodeIds.has(id)) failures.push(`公开时间线事件 ${event.id} 引用了不存在或非公开节点：${id}`)
  }
  for (const id of event.areaIds ?? []) {
    if (!areaIds.has(id)) failures.push(`公开时间线事件 ${event.id} 引用了不存在区域：${id}`)
  }
}

for (const target of contract.publicAbsorptionTargets ?? []) {
  const targetTokens = {
    node: 'NodeRelationRail',
    lighthouse: 'runLowLightLighthouse',
    'public-index': 'contentLifeFacts',
  }
  const token = targetTokens[target] ?? target
  // 门面拆分后，需要同时扫描 public-world-surfaces 主文件与 public-surfaces/ 子模块
  const surfaceDir = 'src/lib/public-surfaces'
  const surfaceDirPart = fs.existsSync(rel(surfaceDir))
    ? fs
        .readdirSync(rel(surfaceDir))
        .filter((entry) => entry.endsWith('.ts'))
        .map((entry) => fs.readFileSync(rel(`${surfaceDir}/${entry}`), 'utf-8'))
    : []
  const sources = [
    'src/lib/public-world-objects.ts',
    'src/lib/public-world-surfaces.ts',
    'src/app/node/[slug]/page.tsx',
    'src/app/paths/[id]/page.tsx',
  ]
    .map((file) => (fs.existsSync(rel(file)) ? fs.readFileSync(rel(file), 'utf-8') : ''))
    .concat(surfaceDirPart)
    .concat([publicIndexSource, publicObjectsSource, contentLifeSource, lighthouseRuntimeSource])
    .join('\n')
  if (!sources.includes(token)) failures.push(`公开吸收目标缺少代码证据：${target}`)
}

if (gates.requireContentLifeFactForPublicNodes) {
  for (const token of [
    'buildContentLifeFacts',
    'getNodeAiReadableSummary',
    'relationReasons',
    'pathIds',
    'timelineEventIds',
    'recommendedPathIds',
  ]) {
    if (!contentLifeSource.includes(token)) failures.push(`内容生命事实模块缺少：${token}`)
  }

  for (const token of ['contentLifeFacts', 'buildContentLifeFacts', 'aiReadableSummary']) {
    if (!publicIndexSource.includes(token) && !publicObjectsSource.includes(token)) {
      failures.push(`公开索引缺少内容生命事实证据：${token}`)
    }
  }
}

if (!packageJson.scripts?.['check:content']?.includes('check:content-life')) failures.push('check:content 必须纳入 check:content-life')

for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
  if (contract.releaseStates?.[key] !== false) failures.push(`${key} 在内容生命阶段必须保持 false`)
}

if (failures.length) {
  console.error('WorldOS content life check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS content life check passed: ${publicNodes.length} public nodes, ${publicPaths.length} paths, ${relations.length} relations`)
