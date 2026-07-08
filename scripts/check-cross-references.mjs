// 用途：交叉引用验证 — 检查内部链接、关系和路径引用的完整性
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf-8'))
const failures = []

const nodesData = readJson('data/domains/experience/nodes.json')
const nodes = Array.isArray(nodesData) ? nodesData : nodesData.nodes ?? []
const publicSlugs = new Set(nodes.filter((n) => n.visibility === 'public').map((n) => n.slug))
const allNodeIds = new Set(nodes.map((n) => n.id))

// 1. 检查 relations.json 的 from/to 引用
const relations = readJson('data/core/relations.json')
const relArray = Array.isArray(relations) ? relations : relations.relations ?? []
for (const rel of relArray) {
  if (!allNodeIds.has(rel.from)) failures.push(`关系 ${rel.id} 的 from 引用不存在的节点：${rel.from}`)
  if (!allNodeIds.has(rel.to)) failures.push(`关系 ${rel.id} 的 to 引用不存在的节点：${rel.to}`)
}

// 2. 检查 paths.json 的 nodeSlugs 引用
const pathsData = readJson('data/domains/experience/paths.json')
const paths = Array.isArray(pathsData) ? pathsData : pathsData.paths ?? []
for (const p of paths) {
  if (p.visibility !== 'public') continue
  for (const slug of p.nodeSlugs ?? []) {
    if (!publicSlugs.has(slug)) {
      failures.push(`路径 ${p.id} 引用不存在或非公开的节点 slug：${slug}`)
    }
  }
}

// 3. 检查 world-events.json 的 nodeIds 引用
const eventsData = readJson('data/core/world-events.json')
const events = Array.isArray(eventsData) ? eventsData : eventsData.events ?? []
for (const ev of events) {
  for (const nodeId of ev.nodeIds ?? []) {
    if (!allNodeIds.has(nodeId)) {
      failures.push(`事件 ${ev.id} 引用不存在的节点：${nodeId}`)
    }
  }
}

if (failures.length) {
  console.error('交叉引用验证失败：')
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}

console.log(`交叉引用验证通过：${relArray.length} 关系 / ${paths.filter((p) => p.visibility === 'public').length} 公开路径 / ${events.length} 事件`)
