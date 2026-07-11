// 用途：兼容旧入口，改用 Reality-First 新鲜浏览器事实验证四个探索场景。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const failures = []
const pointerPath = 'docs/90-archive/reports/worldos-reality-first/latest-evidence.json'
const required = [
  { scene: 'atlas', stage: 'src/components/atlas/AtlasExplorationStage.tsx' },
  { scene: 'timeline', stage: 'src/components/timeline/TimelineRiverStage.tsx' },
  { scene: 'archive', stage: 'src/components/archive/ArchiveHallStage.tsx' },
  { scene: 'paths', stage: 'src/components/paths/JourneyRouteStage.tsx' },
]

if (!fs.existsSync(path.join(root, pointerPath))) failures.push('缺少 Reality-First fresh evidence 指针')
else {
  const pointer = readJson(pointerPath)
  const manifest = readJson(pointer.manifest)
  for (const { scene, stage } of required) {
    if (!fs.existsSync(path.join(root, stage))) failures.push(`${scene} 独立场景文件缺失`)
    for (const mode of ['desktop', 'mobile']) {
      const item = manifest.browser?.observations?.find((entry) => entry.scene === scene && entry.mode === mode)
      if (!item) failures.push(`${scene} 缺少 ${mode} 浏览器证据`)
      else {
        if (!item.interactiveVisible) failures.push(`${scene} ${mode} 主交互不可见`)
        if (item.overflowX || item.fixedOverlayIssues?.length) failures.push(`${scene} ${mode} 存在溢出或遮挡`)
        if (!item.screenshot || !fs.existsSync(path.join(root, item.screenshot))) failures.push(`${scene} ${mode} 截图缺失`)
      }
    }
  }
}

if (failures.length) {
  console.error('WorldOS scene interaction check failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}
console.log('WorldOS scene interaction check passed: fresh Atlas/Timeline/Archive/Paths evidence')
