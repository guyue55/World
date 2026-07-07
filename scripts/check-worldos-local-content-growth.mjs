import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []

function rel(file) {
  return path.join(root, file)
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

function exists(file) {
  return fs.existsSync(rel(file))
}

const contract = readJson('data/world-kernel/worldos-local-content-growth-contract-v1.json')
const areas = readJson('data/domains/experience/areas.json')
const nodes = readJson('data/domains/experience/nodes.json')
const paths = readJson('data/domains/experience/paths.json')
const relations = readJson('data/core/relations.json')
const pkg = readJson('package.json')

assert(contract.name === 'WorldOS 本地内容增长契约 v1', '内容增长契约名称不正确')
assert(contract.scope?.localOnly === true, '内容增长必须保持 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false, '内容增长阶段不得考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, '内容增长阶段不得考虑 Production')

for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在内容增长阶段必须保持 false`)
}

for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少内容增长命令：${command}`)
}
assert(pkg.scripts?.['check:content']?.includes('check:local-content-growth'), 'check:content 必须纳入 check:local-content-growth')

const publicPaths = paths.filter((item) => item.visibility === 'public')
const pathSlugs = new Set(publicPaths.flatMap((item) => item.nodeSlugs))
const relationIds = new Set(relations.flatMap((relation) => [relation.from, relation.to]))
const minimums = contract.minimums ?? {}

assert(publicPaths.length >= minimums.publicPaths, `公开路径不足：${publicPaths.length}/${minimums.publicPaths}`)
assert(relations.length >= minimums.relations, `关系数量不足：${relations.length}/${minimums.relations}`)
assert((contract.coreReadableSlugs ?? []).length >= minimums.coreReadableNodes, `核心可读节点不足：${contract.coreReadableSlugs?.length ?? 0}/${minimums.coreReadableNodes}`)

const levelOneAreaIds = areas.filter((area) => area.level === 1).map((area) => area.id)
const areaRepresentativeEntries = Object.entries(contract.areaRepresentativeSlugs ?? {})
assert(areaRepresentativeEntries.length >= minimums.areaRepresentatives, `一级区域代表节点不足：${areaRepresentativeEntries.length}/${minimums.areaRepresentatives}`)
for (const areaId of levelOneAreaIds) {
  assert(Boolean(contract.areaRepresentativeSlugs?.[areaId]), `一级区域缺少代表节点：${areaId}`)
}

for (const slug of contract.coreReadableSlugs ?? []) {
  const node = nodes.find((item) => item.slug === slug)
  assert(Boolean(node), `核心节点不存在：${slug}`)
  if (!node) continue

  assert(node.visibility === 'public', `核心节点必须公开：${slug}`)
  assert(Boolean(node.summary && node.summary.length >= 18), `核心节点缺少清晰 summary：${slug}`)
  assert(Boolean(node.contentPath), `核心节点缺少 contentPath：${slug}`)
  assert(node.contentPath && exists(node.contentPath), `核心节点正文不存在：${slug}`)
  assert(pathSlugs.has(slug), `核心节点未进入公开路径：${slug}`)
  assert(relationIds.has(node.id), `核心节点没有关系星线：${slug}`)

  if (node.contentPath && exists(node.contentPath)) {
    const content = read(node.contentPath).trim()
    const secondLevelHeadings = (content.match(/^##\s+/gm) ?? []).length
    assert(content.length >= minimums.coreContentCharacters, `核心节点正文过短：${slug} ${content.length}/${minimums.coreContentCharacters}`)
    assert(secondLevelHeadings >= minimums.coreSecondLevelHeadings, `核心节点二级标题不足：${slug} ${secondLevelHeadings}/${minimums.coreSecondLevelHeadings}`)
    assert(/[\u4e00-\u9fff]/.test(content), `核心节点正文必须包含中文：${slug}`)
  }
}

for (const [areaId, slug] of areaRepresentativeEntries) {
  assert(levelOneAreaIds.includes(areaId), `代表节点区域不是一级区域：${areaId}`)
  const node = nodes.find((item) => item.slug === slug)
  assert(Boolean(node), `区域代表节点不存在：${areaId}/${slug}`)
  if (!node) continue

  assert(node.areaId === areaId, `区域代表节点 areaId 不匹配：${areaId}/${slug}`)
  assert(node.visibility === 'public', `区域代表节点必须公开：${areaId}/${slug}`)
  assert(Boolean(node.summary && node.summary.length >= 18), `区域代表节点缺少清晰 summary：${areaId}/${slug}`)
  assert(Boolean(node.contentPath), `区域代表节点缺少 contentPath：${areaId}/${slug}`)
  assert(node.contentPath && exists(node.contentPath), `区域代表节点正文不存在：${areaId}/${slug}`)
  assert(pathSlugs.has(slug), `区域代表节点未进入公开路径：${areaId}/${slug}`)
  assert(relationIds.has(node.id), `区域代表节点没有关系星线：${areaId}/${slug}`)

  if (node.contentPath && exists(node.contentPath)) {
    const content = read(node.contentPath).trim()
    const secondLevelHeadings = (content.match(/^##\s+/gm) ?? []).length
    assert(content.length >= minimums.areaRepresentativeCharacters, `区域代表正文过短：${areaId}/${slug} ${content.length}/${minimums.areaRepresentativeCharacters}`)
    assert(secondLevelHeadings >= minimums.areaRepresentativeSecondLevelHeadings, `区域代表二级标题不足：${areaId}/${slug} ${secondLevelHeadings}/${minimums.areaRepresentativeSecondLevelHeadings}`)
    assert(/[\u4e00-\u9fff]/.test(content), `区域代表正文必须包含中文：${areaId}/${slug}`)
  }
}

if (failures.length) {
  console.error('WorldOS local content growth check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS local content growth check passed: ${contract.coreReadableSlugs.length} core nodes, ${areaRepresentativeEntries.length} area representatives, ${publicPaths.length} paths, ${relations.length} relations`)
