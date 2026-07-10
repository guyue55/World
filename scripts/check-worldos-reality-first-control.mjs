// 用途：锁定 Reality-First 总控文本，只允许执行计划更新复选框状态。
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const manifestPath = path.join(root, 'data/world-kernel/worldos-reality-first-frozen-control-v1.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const failures = []

function normalize(content, mode) {
  if (mode === 'checkbox-status-only') {
    return content.replace(/- \[[ xX]\]/g, '- [ ]')
  }
  return content
}

for (const entry of manifest.files) {
  const absolutePath = path.join(root, entry.path)
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing frozen control file: ${entry.path}`)
    continue
  }

  const content = normalize(fs.readFileSync(absolutePath, 'utf8'), entry.mode)
  const actual = crypto.createHash(manifest.algorithm).update(content).digest('hex')
  if (actual !== entry.sha256) {
    failures.push(`frozen control changed: ${entry.path} (${entry.mode})`)
  }
}

if (failures.length > 0) {
  console.error(`Reality-First control check failed with ${failures.length} finding(s).`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Reality-First control check passed. files=${manifest.files.length}`)
