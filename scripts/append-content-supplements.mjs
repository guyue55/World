#!/usr/bin/env node
// 用途：把 phase13-rewrite-supplements.json 中的补充段落幂等追加到对应节点正文末尾
// 规则：
// 1) 每个 slug 对应 content/articles/<slug>.md
// 2) supplements 中的字段值本身以两个换行开头，作为分隔符
// 3) 通过检测正文中是否已包含补充段落的首行（去掉前导换行的首行）判断幂等
// 4) 追加前后自动 trim 尾部空白并追加一个换行，保持 POSIX 文件风格

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seedFile = path.join(root, 'data/seeds/phase13-rewrite-supplements.json')

if (!fs.existsSync(seedFile)) {
  console.error(`[append-supplements] 找不到种子文件：${seedFile}`)
  process.exit(1)
}

const supplements = JSON.parse(fs.readFileSync(seedFile, 'utf-8'))
let touched = 0
let skipped = 0
let missing = 0

for (const [slug, rawFragment] of Object.entries(supplements)) {
  const target = path.join(root, `content/articles/${slug}.md`)
  if (!fs.existsSync(target)) {
    console.warn(`[append-supplements] 缺失文件：${target}`)
    missing += 1
    continue
  }

  const fragment = rawFragment.replace(/^\n+/, '').replace(/\n+$/, '')
  const firstLine = fragment.split('\n')[0].trim()
  const originalRaw = fs.readFileSync(target, 'utf-8')
  const originalTrimmed = originalRaw.replace(/\s+$/, '')

  if (firstLine && originalTrimmed.includes(firstLine)) {
    skipped += 1
    continue
  }

  const next = `${originalTrimmed}\n\n${fragment}\n`
  fs.writeFileSync(target, next, 'utf-8')
  touched += 1
  console.log(`[append-supplements] 已追加：${slug}`)
}

console.log(`[append-supplements] 完成：更新 ${touched} 个，跳过 ${skipped} 个，缺失 ${missing} 个`)

