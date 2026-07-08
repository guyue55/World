#!/usr/bin/env node
// 用途：检测公开节点正文两两之间的 jaccard 相似度，识别复读机式内容
// 门禁：任意两个公开节点正文 jaccard > 0.65 视为高相似度，脚本以非零退出
// 阈值：0.65 略高于历史 Phase 9-10 复读机模板的下限（观测值约 0.7-0.9）
// 输出：docs/90-archive/reports/worldos-content-jaccard-report.json
// 幂等：报告每次覆盖

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const NODES = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/domains/experience/nodes.json'), 'utf-8'))
const REPORT_PATH = path.join(ROOT, 'docs/90-archive/reports/worldos-content-jaccard-report.json')

const THRESHOLD = Number(process.env.WORLDOS_JACCARD_THRESHOLD ?? 0.65)

function tokenize(text) {
  // 中文按字切分，英文按词切分；忽略 markdown 标记与空白
  const stripped = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`\-\[\](){}\|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const tokens = new Set()
  const parts = stripped.split(/([\u4e00-\u9fff])/)
  for (const part of parts) {
    if (!part) continue
    if (/^[\u4e00-\u9fff]$/.test(part)) {
      tokens.add(part)
    } else {
      for (const w of part.toLowerCase().split(/[^a-z0-9]+/)) {
        if (w && w.length >= 2) tokens.add(w)
      }
    }
  }
  return tokens
}

function jaccard(a, b) {
  let inter = 0
  for (const t of a) if (b.has(t)) inter += 1
  const union = a.size + b.size - inter
  return union === 0 ? 0 : inter / union
}

const publicNodes = NODES.filter((n) => n.visibility === 'public' && n.contentPath)
const tokensBySlug = new Map()

for (const node of publicNodes) {
  const abs = path.join(ROOT, node.contentPath)
  if (!fs.existsSync(abs)) continue
  const text = fs.readFileSync(abs, 'utf-8')
  tokensBySlug.set(node.slug, tokenize(text))
}

const slugs = [...tokensBySlug.keys()]
const highPairs = []
let maxSim = 0

for (let i = 0; i < slugs.length; i += 1) {
  for (let j = i + 1; j < slugs.length; j += 1) {
    const a = tokensBySlug.get(slugs[i])
    const b = tokensBySlug.get(slugs[j])
    const sim = jaccard(a, b)
    if (sim > maxSim) maxSim = sim
    if (sim > THRESHOLD) {
      highPairs.push({ a: slugs[i], b: slugs[j], jaccard: Number(sim.toFixed(4)) })
    }
  }
}

highPairs.sort((x, y) => y.jaccard - x.jaccard)

const report = {
  generatedAt: new Date().toISOString(),
  threshold: THRESHOLD,
  publicNodes: publicNodes.length,
  comparedPairs: (slugs.length * (slugs.length - 1)) / 2,
  maxSimilarity: Number(maxSim.toFixed(4)),
  highSimilarityPairs: highPairs,
}

fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true })
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf-8')

if (highPairs.length > 0) {
  console.error(`WorldOS content jaccard check failed: ${highPairs.length} pairs above threshold ${THRESHOLD}`)
  for (const p of highPairs.slice(0, 10)) {
    console.error(`- ${p.a} <-> ${p.b} jaccard=${p.jaccard}`)
  }
  process.exit(1)
}

console.log(`WorldOS content jaccard check passed: ${publicNodes.length} nodes, max similarity ${report.maxSimilarity} (threshold ${THRESHOLD})`)
