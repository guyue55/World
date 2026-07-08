#!/usr/bin/env node
// 用途：检查 Phase 19 内容生态收尾目标是否真实达成

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function exists(file) {
  return fs.existsSync(rel(file))
}

const contract = readJson('data/world-kernel/worldos-phase19-content-expansion-contract-v1.json')
const nodes = readJson('data/domains/experience/nodes.json')
const paths = readJson('data/domains/experience/paths.json')
const relations = readJson('data/core/relations.json')
const events = readJson('data/core/world-events.json')
const pkg = readJson('package.json')

const publicNodes = nodes.filter((node) => node.visibility === 'public')
const publicPaths = paths.filter((item) => item.visibility === 'public')
const publicNodeIds = new Set(publicNodes.map((node) => node.id))
const pathSlugs = new Set(publicPaths.flatMap((item) => item.nodeSlugs))
const relationNodeIds = new Set(relations.flatMap((relation) => [relation.from, relation.to]))
const targets = contract.targets ?? {}

assert(contract.scope?.localOnly === true, 'Phase 19 必须保持 localOnly=true')
assert(contract.scope?.externalPreviewConsidered === false, 'Phase 19 暂不考虑外部 Preview')
assert(contract.scope?.productionConsidered === false, 'Phase 19 暂不考虑 Production')
for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
  assert(value === false, `${key} 在 Phase 19 必须保持 false`)
}

for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package.json 缺少 Phase 19 命令：${command}`)
}
assert(pkg.scripts?.['check:content']?.includes('check:phase19-content'), 'check:content 必须纳入 check:phase19-content')
assert(exists(contract.requiredSeed), `缺少 Phase 19 seed：${contract.requiredSeed}`)

const contentBacked = publicNodes.filter((node) => node.contentPath && exists(node.contentPath))
const relationDensity = publicNodes.length ? relations.length / publicNodes.length : 0
const orphanNodes = publicNodes.filter((node) => !relationNodeIds.has(node.id))
const orphanRate = publicNodes.length ? orphanNodes.length / publicNodes.length : 1

assert(publicNodes.length >= targets.publicNodes, `公开节点不足：${publicNodes.length}/${targets.publicNodes}`)
assert(contentBacked.length >= targets.contentBackedPublicNodes, `有正文公开节点不足：${contentBacked.length}/${targets.contentBackedPublicNodes}`)
assert(relations.length >= targets.relations, `关系数量不足：${relations.length}/${targets.relations}`)
assert(events.length >= targets.events, `世界事件不足：${events.length}/${targets.events}`)
assert(publicPaths.length >= targets.publicPaths, `公开路径不足：${publicPaths.length}/${targets.publicPaths}`)
assert(relationDensity >= targets.relationDensity, `关系密度不足：${relationDensity.toFixed(2)}/${targets.relationDensity}`)
assert(orphanRate <= targets.maxOrphanRate, `孤岛率过高：${orphanRate.toFixed(3)}/${targets.maxOrphanRate}`)

for (const node of publicNodes) {
  assert(pathSlugs.has(node.slug), `公开节点未进入公开路径：${node.slug}`)
  assert(relationNodeIds.has(node.id), `公开节点没有关系星线：${node.slug}`)
  if (node.contentPath && exists(node.contentPath)) {
    const content = fs.readFileSync(rel(node.contentPath), 'utf-8').trim()
    assert(content.length >= targets.minPublicNodeContentCharacters, `公开节点正文过短：${node.slug} ${content.length}/${targets.minPublicNodeContentCharacters}`)
    assert(/[\u4e00-\u9fff]/.test(content), `公开节点正文必须包含中文：${node.slug}`)
  }
}

for (const event of events.filter((event) => event.visibility === 'public' || !event.visibility)) {
  for (const id of event.nodeIds ?? []) {
    assert(publicNodeIds.has(id), `公开事件引用不存在或非公开节点：${event.id}/${id}`)
  }
}

if (failures.length) {
  console.error('WorldOS Phase 19 content expansion check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS Phase 19 content expansion check passed: ${publicNodes.length} public nodes, ${relations.length} relations, ${events.length} events, ${publicPaths.length} paths`)
