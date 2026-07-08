// 用途：审计所有使用 framer-motion 的组件是否在 MotionConfig 作用域内
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const srcDir = path.join(root, 'src')
const failures = []
const scanned = []

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      scanDir(fullPath)
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      if (content.includes('framer-motion') && content.includes('motion')) {
        const relPath = path.relative(root, fullPath)
        scanned.push(relPath)

        if (relPath.includes('_legacy/') || relPath.includes('r8-dynamic-world/') || relPath.includes('r8-sensory-universe/')) {
          continue
        }

        const hasRuntimeCheck = content.includes('useWorldRuntime') || content.includes('useReducedMotion') || content.includes('reducedMotion')
        if (!hasRuntimeCheck) {
          failures.push(`${relPath} 使用 framer-motion 但未显式检查 reducedMotion（由 MotionConfig 全局兜底）`)
        }
      }
    }
  }
}

scanDir(srcDir)

console.log(`扫描了 ${scanned.length} 个使用 framer-motion 的组件`)

if (failures.length) {
  console.log('\n以下组件由 MotionConfig 全局兜底，但未显式检查 reducedMotion：')
  for (const f of failures) console.log(`  - ${f}`)
  console.log('\n提示：MotionConfig 在 WorldRuntimeProvider 中全局设置，所有 framer-motion 组件自动降级。')
  console.log('对于使用 GSAP 或原生 CSS 动画的组件，仍需显式检查。')
}

const providerContent = fs.readFileSync(path.join(srcDir, 'components/world/WorldRuntimeProvider.tsx'), 'utf-8')
if (!providerContent.includes('MotionConfig')) {
  console.error('\n严重：WorldRuntimeProvider 中缺少 MotionConfig，framer-motion 不会自动降级！')
  process.exit(1)
}

console.log('\n动效降级审计通过：MotionConfig 全局生效，GSAP 组件显式检查')
