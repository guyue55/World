#!/usr/bin/env node
// 用途：按 data/seeds/phase14-tag-consolidation.json 的 mapping 合并节点标签
// 规则：
// 1) 找到每个 node.tags 中匹配 mapping key 的标签，替换为 mapping value
// 2) 若替换后与已有标签重复，则去重
// 3) 若 mapping value 为 null，则移除该标签（不追加）
// 4) 保持原有顺序，仅在末尾追加新增的替换标签
// 5) 幂等：再次运行不产生变化

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const nodesPath = path.join(root, 'data/domains/experience/nodes.json')
const seedPath = path.join(root, 'data/seeds/phase14-tag-consolidation.json')

const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf-8'))
const seed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'))
const mapping = seed.mapping || {}

let touched = 0
let removed = 0
let mapped = 0

for (const node of nodes) {
  if (!Array.isArray(node.tags) || node.tags.length === 0) continue
  const originalTags = [...node.tags]
  const nextTags = []
  const seen = new Set()

  for (const tag of originalTags) {
    if (!(tag in mapping)) {
      if (!seen.has(tag)) { nextTags.push(tag); seen.add(tag) }
      continue
    }
    const target = mapping[tag]
    if (target === null) {
      removed += 1
      continue
    }
    if (!seen.has(target)) { nextTags.push(target); seen.add(target) }
    mapped += 1
  }

  const before = JSON.stringify(originalTags)
  const after = JSON.stringify(nextTags)
  if (before !== after) {
    node.tags = nextTags
    touched += 1
    console.log(`[tags] ${node.slug}: ${before} -> ${after}`)
  }
}

fs.writeFileSync(nodesPath, JSON.stringify(nodes, null, 2) + '\n', 'utf-8')
console.log(`[tags] done: touched=${touched}, mapped=${mapped}, removed=${removed}`)
