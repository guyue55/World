// 用途：世界备份自动化 — 将导出包复制到指定位置并清理旧备份
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const root = process.cwd()
const exportDir = path.join(root, 'exports')

// 解析 --dest 参数
const destArg = process.argv.find((a) => a.startsWith('--dest='))
const destBase = destArg ? destArg.replace('--dest=', '') : path.join(root, 'backups')

if (!fs.existsSync(destBase)) fs.mkdirSync(destBase, { recursive: true })

// 先执行导出
console.log('正在生成导出包...')
execSync('node scripts/export-world.mjs', { cwd: root, stdio: 'inherit' })

// 复制最新导出包到备份目录
const today = new Date().toISOString().slice(0, 10)
const exportFile = `worldos-export-${today}.zip`
const srcPath = path.join(exportDir, exportFile)
const destPath = path.join(destBase, exportFile)

if (!fs.existsSync(srcPath)) {
  console.error(`导出包不存在：${srcPath}`)
  process.exit(1)
}

fs.copyFileSync(srcPath, destPath)
console.log(`备份完成：${destPath}`)

// 清理超过 30 天的旧备份
const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
let cleaned = 0
for (const file of fs.readdirSync(destBase)) {
  if (!file.startsWith('worldos-export-') || !file.endsWith('.zip')) continue
  const filePath = path.join(destBase, file)
  const stat = fs.statSync(filePath)
  if (stat.mtimeMs < cutoff) {
    fs.unlinkSync(filePath)
    cleaned++
    console.log(`清理旧备份：${file}`)
  }
}
if (cleaned > 0) console.log(`已清理 ${cleaned} 个旧备份`)
console.log(`备份目录：${destBase}`)
