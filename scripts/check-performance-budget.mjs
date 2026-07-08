// 用途：构建产物大小监控 — 检查 .next 目录和首页产物是否在预算内
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const nextDir = path.join(root, '.next')
const failures = []

// 阈值（MB）
const BUDGETS = {
  totalBuild: 200, // .next 总大小
  htmlPerPage: 0.1, // 单页 HTML 100KB
  jsBundle: 0.3, // JS bundle 300KB（gzipped 估算）
}

function dirSize(dir) {
  let size = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      size += dirSize(fullPath)
    } else {
      size += fs.statSync(fullPath).size
    }
  }
  return size
}

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

// 检查 .next 总大小
if (!fs.existsSync(nextDir)) {
  failures.push('.next 目录不存在，请先运行 npm run build')
} else {
  const totalSize = dirSize(nextDir)
  const totalMB = totalSize / 1024 / 1024
  console.log(`构建产物总大小：${formatMB(totalSize)}`)
  if (totalMB > BUDGETS.totalBuild) {
    failures.push(`构建产物超预算：${formatMB(totalSize)} > ${BUDGETS.totalBuild} MB`)
  }

  // 检查首页 HTML
  const serverAppDir = path.join(nextDir, 'server', 'app')
  if (fs.existsSync(serverAppDir)) {
    const htmlFiles = []
    function findHtml(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          findHtml(fullPath)
        } else if (entry.name.endsWith('.html')) {
          htmlFiles.push(fullPath)
        }
      }
    }
    findHtml(serverAppDir)

    for (const htmlFile of htmlFiles) {
      const size = fs.statSync(htmlFile).size
      const sizeMB = size / 1024 / 1024
      if (sizeMB > BUDGETS.htmlPerPage) {
        failures.push(`HTML 超预算：${path.relative(root, htmlFile)} = ${formatMB(size)} > ${BUDGETS.htmlPerPage} MB`)
      }
    }
  }

  // 检查 JS bundles
  const staticDir = path.join(nextDir, 'static')
  if (fs.existsSync(staticDir)) {
    const chunksDir = path.join(staticDir, 'chunks')
    if (fs.existsSync(chunksDir)) {
      for (const entry of fs.readdirSync(chunksDir)) {
        if (entry.endsWith('.js')) {
          const filePath = path.join(chunksDir, entry)
          const size = fs.statSync(filePath).size
          const sizeMB = size / 1024 / 1024
          if (sizeMB > BUDGETS.jsBundle) {
            failures.push(`JS chunk 超预算：${entry} = ${formatMB(size)} > ${BUDGETS.jsBundle} MB`)
          }
        }
      }
    }
  }
}

if (failures.length) {
  console.error('\n性能预算检查失败：')
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}

console.log('\n性能预算检查通过')
