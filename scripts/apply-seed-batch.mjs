#!/usr/bin/env node
// 通用节点/关系/事件种子应用脚本
// 用法: node scripts/apply-seed-batch.mjs <seed.json>
// seed.json 结构:
//   { nodes: [{slug,title,worldTitle,type,areaId,summary,tags,lifeStage,cover,contentDir,createdAt,body,featured?,layer?,source?,relations?}], events?: [...] }
// 幂等: slug 已存在则跳过节点/关系;事件按 id 幂等

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const NODES_PATH = resolve(ROOT, 'data/domains/experience/nodes.json')
const RELATIONS_PATH = resolve(ROOT, 'data/core/relations.json')
const EVENTS_PATH = resolve(ROOT, 'data/core/world-events.json')
const CONTENT_ROOT = resolve(ROOT, 'content')

const seedPath = process.argv[2]
if (!seedPath) {
  console.error('用法: node scripts/apply-seed-batch.mjs <seed.json>')
  process.exit(1)
}
const seed = JSON.parse(readFileSync(resolve(ROOT, seedPath), 'utf8'))
const nodes = JSON.parse(readFileSync(NODES_PATH, 'utf8'))
const relations = JSON.parse(readFileSync(RELATIONS_PATH, 'utf8'))
const events = JSON.parse(readFileSync(EVENTS_PATH, 'utf8'))

const slugToId = new Map(nodes.map((n) => [n.slug, n.id]))
const existingRelKeys = new Set(relations.map((r) => `${r.from}|${r.to}|${r.type}`))
const existingEventIds = new Set(events.map((e) => e.id))

let maxRelNum = 0
for (const r of relations) {
  const m = /^rel-(\d+)$/.exec(r.id || '')
  if (m) maxRelNum = Math.max(maxRelNum, parseInt(m[1], 10))
}

let addedNodes = 0
let addedRelations = 0
let addedEvents = 0
let writtenFiles = 0
let skippedNodes = 0

for (const n of seed.nodes || []) {
  if (slugToId.has(n.slug)) {
    console.log(`跳过已存在节点: ${n.slug}`)
    skippedNodes += 1
    continue
  }
  const nodeId = `node-${n.slug}`
  slugToId.set(n.slug, nodeId)
  const contentPath = `content/${n.contentDir}/${n.slug}.md`
  const nodeRec = {
    id: nodeId,
    slug: n.slug,
    title: n.title,
    worldTitle: n.worldTitle,
    type: n.type,
    areaId: n.areaId,
    summary: n.summary,
    contentPath,
    tags: n.tags,
    visibility: n.visibility || 'public',
    lifeStage: n.lifeStage,
    source: n.source || 'manual',
    layer: n.layer || 'interpretation',
    featured: n.featured || { home: false, representative: false, pathCore: false },
    createdAt: n.createdAt,
    cover: n.cover,
    reviewed: true,
  }
  nodes.push(nodeRec)
  addedNodes += 1

  const fullContentPath = resolve(ROOT, contentPath)
  const fullDir = dirname(fullContentPath)
  if (!existsSync(fullDir)) mkdirSync(fullDir, { recursive: true })
  if (!existsSync(fullContentPath) && n.body) {
    writeFileSync(fullContentPath, `# ${n.title}\n\n${n.body}\n`)
    writtenFiles += 1
  }
}

for (const n of seed.nodes || []) {
  const fromId = slugToId.get(n.slug)
  if (!fromId) continue
  for (const r of n.relations || []) {
    const toId = slugToId.get(r.to)
    if (!toId) {
      console.warn(`关系目标不存在(跳过): ${n.slug} -> ${r.to}`)
      continue
    }
    const key = `${fromId}|${toId}|${r.type}`
    if (existingRelKeys.has(key)) continue
    maxRelNum += 1
    const id = `rel-${String(maxRelNum).padStart(4, '0')}`
    relations.push({
      id,
      from: fromId,
      to: toId,
      type: r.type,
      strength: r.strength,
      source: 'manual',
      reviewed: true,
      note: r.note || `${n.title} 与 ${r.to} 的${r.type}关联。`,
    })
    existingRelKeys.add(key)
    addedRelations += 1
  }
}

for (const e of seed.events || []) {
  if (existingEventIds.has(e.id)) continue
  events.push(e)
  existingEventIds.add(e.id)
  addedEvents += 1
}

writeFileSync(NODES_PATH, JSON.stringify(nodes, null, 2) + '\n')
writeFileSync(RELATIONS_PATH, JSON.stringify(relations, null, 2) + '\n')
writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2) + '\n')

console.log('---应用完成---')
console.log('新增节点:', addedNodes)
console.log('跳过节点:', skippedNodes)
console.log('新增关系:', addedRelations)
console.log('新增事件:', addedEvents)
console.log('写入 markdown:', writtenFiles)
console.log('提示：请运行 `npm run build:world-index` 以重建公开索引，或使用 --rebuild 参数。')

// --rebuild 参数：自动触发 world-index 重建
if (process.argv.includes('--rebuild')) {
  const { spawnSync } = await import('node:child_process')
  console.log('触发 build:world-index ...')
  const r = spawnSync('npm', ['run', 'build:world-index'], { cwd: ROOT, stdio: 'inherit' })
  if (r.status !== 0) {
    console.error('build:world-index 失败')
    process.exit(r.status || 1)
  }
}
