// 用途：构建产物大小监控 - 检查当前生产 dist 目录和页面产物是否在预算内
import fs from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const root = process.cwd()
const distDir = process.env.WORLDOS_DIST_DIR || '.next'
const nextDir = path.resolve(root, distDir)
const failures = []

// 阈值（MB）
const BUDGETS = {
  totalBuild: 200, // .next 总大小
  htmlPerPage: 0.5, // 单页 HTML 500KB（ADR-006 Phase 13 扩容后调整；atlas 页额外 0.6MB 上限）
  atlasHtml: 0.6, // atlas.html 图谱专用预算 600KB
  jsBundleGzipped: 2.0, // JS bundle gzipped 2MB（Next.js 运行时基线）
  jsBundleRaw: 10, // JS bundle 原始 10MB（防止异常膨胀）
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

// 检查生产构建总大小
if (!fs.existsSync(nextDir)) {
  failures.push(`${distDir} 目录不存在，请先运行 npm run build`)
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
      const isAtlas = htmlFile.endsWith('/atlas.html')
      const limit = isAtlas ? BUDGETS.atlasHtml : BUDGETS.htmlPerPage
      if (sizeMB > limit) {
        failures.push(`HTML 超预算：${path.relative(root, htmlFile)} = ${formatMB(size)} > ${limit} MB`)
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
          const rawSize = fs.statSync(filePath).size
          const rawMB = rawSize / 1024 / 1024
          const gzippedSize = gzipSync(fs.readFileSync(filePath)).length
          const gzippedMB = gzippedSize / 1024 / 1024
          if (gzippedMB > BUDGETS.jsBundleGzipped) {
            failures.push(`JS chunk gzipped 超预算：${entry} = ${formatMB(gzippedSize)} > ${BUDGETS.jsBundleGzipped} MB (gzipped)`)
          }
          if (rawMB > BUDGETS.jsBundleRaw) {
            failures.push(`JS chunk 原始大小超预算：${entry} = ${formatMB(rawSize)} > ${BUDGETS.jsBundleRaw} MB (raw)`)
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
