// 用途：世界导出管线 — 将公开世界打包为独立可读的 zip 文件
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const root = process.cwd()
const date = new Date().toISOString().slice(0, 10)
const exportName = `worldos-export-${date}.zip`
const exportDir = path.join(root, 'exports')
const exportPath = path.join(exportDir, exportName)

// 确保导出目录存在
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true })

// 导出内容清单
const includeDirs = [
  'content/',
  'data/domains/experience/',
  'data/core/relations.json',
  'data/core/world-events.json',
  'data/core/world-manifest.json',
  'public/covers/',
]
const excludeDirs = ['scripts/_legacy/', 'node_modules/', '.next/', '.git/', 'exports/']

// 构建排除参数
const excludeArgs = excludeDirs.map((d) => `--exclude '${d.replace(/\/$/, '')}'`).join(' ')

// 构建包含参数
const includeArgs = includeDirs.join(' ')

// 生成 zip
const cmd = `zip -r "${exportPath}" ${includeArgs} ${excludeArgs} -x '*.DS_Store'`
console.log(`正在导出世界：${exportName}`)
execSync(cmd, { cwd: root, stdio: 'inherit' })

// 验证
const stats = fs.statSync(exportPath)
const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
console.log(`\n导出完成：${exportPath}`)
console.log(`文件大小：${sizeMB} MB`)

// 输出清单
console.log('\n包含内容：')
includeDirs.forEach((d) => console.log(`  + ${d}`))
console.log('\n排除内容：')
excludeDirs.forEach((d) => console.log(`  - ${d}`))
