// 用途：检查公开体验
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

const files = [
  'src/components/product/ProductHome.tsx',
  'src/components/product/ProductRouteGuide.tsx',
  'src/components/product/ProductWorldCompass.tsx',
  'src/components/product/ProductWorldBoundaries.tsx',
  'src/components/world/AreaNodeCluster.tsx',
]

for (const file of files) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`缺少公开体验文件：${file}`)
}

if (!failures.length) {
  const productSurface = [
    'src/components/product/ProductHome.tsx',
    'src/components/product/ProductWorldCompass.tsx',
    'src/components/product/ProductWorldBoundaries.tsx',
  ].map(read).join('\n')
  for (const token of ['8 分钟路径', '反迷路罗盘', '世界密度', '公开层不是完整世界']) {
    if (!productSurface.includes(token)) failures.push(`首页缺少公开体验锚点：${token}`)
  }

  const routeGuide = read('src/components/product/ProductRouteGuide.tsx')
  for (const token of ['我在哪里', '这里是什么', '能去哪', '如何回去']) {
    if (!routeGuide.includes(token)) failures.push(`ProductRouteGuide 缺少反迷路问题：${token}`)
  }

  const areaCluster = read('src/components/world/AreaNodeCluster.tsx')
  for (const token of ['无 AI 时', 'AI 可增强']) {
    if (!areaCluster.includes(token)) failures.push(`AreaNodeCluster 缺少区域身份证字段：${token}`)
  }

  const areas = json('data/domains/experience/areas.json')
  for (const area of areas.filter((item) => item.level === 1)) {
    if (!area.noAIFallback) failures.push(`一级区域 ${area.id} 缺少 noAIFallback`)
    if (!area.aiEnhancement) failures.push(`一级区域 ${area.id} 缺少 aiEnhancement`)
  }
}

if (failures.length) {
  console.error('WorldOS public experience check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS public experience check passed')
