// 用途：检查公开世界是否由独立场景和共享事实原语组成。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const json = (file) => JSON.parse(read(file))
const failures = []
const stageFiles = [
  'src/components/product/WorldGatewayStage.tsx',
  'src/components/atlas/AtlasExplorationStage.tsx',
  'src/components/timeline/TimelineRiverStage.tsx',
  'src/components/archive/ArchiveHallStage.tsx',
  'src/components/paths/JourneyRouteStage.tsx',
  'src/components/node/NodePlaceRoom.tsx',
  'src/components/ask/LighthouseGuideStage.tsx',
]
const primitiveFiles = [
  'src/components/world/primitives/WorldViewport.tsx',
  'src/components/world/primitives/AccessibleSceneList.tsx',
  'src/components/world/primitives/WorldExitRail.tsx',
]

for (const file of [...stageFiles, ...primitiveFiles]) if (!fs.existsSync(path.join(root, file))) failures.push(`缺少公开世界文件：${file}`)
if (fs.existsSync(path.join(root, 'src/components/product/ProductRouteGuide.tsx'))) failures.push('公开主线不得恢复统一 ProductRouteGuide 模板')

for (const file of stageFiles.filter((file) => fs.existsSync(path.join(root, file)))) {
  const source = read(file)
  if (!source.includes('WorldViewport')) failures.push(`${file} 未使用统一可访问视口原语`)
  if (!source.includes('AccessibleSceneList')) failures.push(`${file} 缺少静态等价内容`)
  if (/Motion Layer|Evidence|场景证据|9\/10|8\.9/.test(source)) failures.push(`${file} 含公开工程验收文案`)
}

const areas = json('data/domains/experience/areas.json')
for (const area of areas.filter((item) => item.level === 1)) {
  if (!area.noAIFallback) failures.push(`一级区域 ${area.id} 缺少无 AI 公开路径`)
  if (!area.aiEnhancement) failures.push(`一级区域 ${area.id} 缺少 AI 增强边界`)
}

if (failures.length) {
  console.error('WorldOS public experience check failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`WorldOS public experience check passed: ${stageFiles.length} independent scenes`)
