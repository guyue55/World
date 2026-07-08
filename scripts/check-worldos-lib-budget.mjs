#!/usr/bin/env node
// 用途：src/lib 数量预算门禁
// 阈值：库文件数 <= 130（当前 120，允许小幅增长；超过则要求 ADR 记录）
// 加入 check:daily 后续版本；本次先独立提供

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LIB_DIR = path.join(ROOT, 'src/lib')
const BUDGET = 130

const files = fs.readdirSync(LIB_DIR).filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'))
const count = files.length

if (count > BUDGET) {
  console.error(`WorldOS lib budget check failed: ${count} 个库文件超出预算 ${BUDGET}`)
  console.error('若需扩容，请提 ADR 并同步更新此脚本的 BUDGET 常量。')
  process.exit(1)
}
console.log(`WorldOS lib budget check passed: ${count}/${BUDGET} 库文件`)
