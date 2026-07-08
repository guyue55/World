// 用途：内容新鲜度审计 — 扫描公开节点，识别沉睡节点并生成唤醒建议
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf-8'))

const nodesData = readJson('data/domains/experience/nodes.json')
const nodes = Array.isArray(nodesData) ? nodesData : nodesData.nodes ?? []
const publicNodes = nodes.filter((n) => n.visibility === 'public')

const now = Date.now()
const SLEEP_THRESHOLD_DAYS = 90
const SLEEP_THRESHOLD_MS = SLEEP_THRESHOLD_DAYS * 24 * 60 * 60 * 1000

const report = publicNodes.map((node) => {
  const updatedAt = node.updatedAt ?? node.createdAt ?? '2026-05-19'
  const ageDays = Math.floor((now - new Date(updatedAt).getTime()) / (24 * 60 * 60 * 1000))
  const isSleeping = ageDays > SLEEP_THRESHOLD_DAYS
  return {
    slug: node.slug,
    title: node.worldTitle ?? node.title,
    areaId: node.areaId,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt ?? null,
    ageDays,
    isSleeping,
    suggestion: isSleeping ? `「${node.worldTitle ?? node.title}」已 ${ageDays} 天未更新，建议在下次修复日回顾。` : null,
  }
})

const sleeping = report.filter((r) => r.isSleeping)
const fresh = report.filter((r) => !r.isSleeping)

console.log(`内容新鲜度审计完成：`)
console.log(`  总公开节点：${publicNodes.length}`)
console.log(`  活跃节点：${fresh.length}`)
console.log(`  沉睡节点（>${SLEEP_THRESHOLD_DAYS}天）：${sleeping.length}`)
if (sleeping.length > 0) {
  console.log(`\n沉睡节点清单：`)
  for (const s of sleeping.slice(0, 10)) {
    console.log(`  ${s.slug} (${s.ageDays}天) — ${s.suggestion}`)
  }
}

const reportDir = path.join(root, 'docs/90-archive/reports')
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true })
const reportPath = path.join(reportDir, `content-freshness-${new Date().toISOString().slice(0, 10)}.json`)
fs.writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), total: publicNodes.length, fresh: fresh.length, sleeping: sleeping.length, sleepingNodes: sleeping }, null, 2))
console.log(`\n审计报告已保存：${path.relative(root, reportPath)}`)
