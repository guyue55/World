import fs from 'node:fs'
import path from 'node:path'
import { getNodeExplorationGroups } from '@/lib/node-reading'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildNodePlaceModel } from '@/lib/scenes/build-node-model'
import { buildPathDetailModel, buildPathsOverviewModel } from '@/lib/scenes/build-path-model'

const root = process.cwd()
const index = getPublicWorldObjectIndex()
const overview = buildPathsOverviewModel(index)
const repeated = buildPathsOverviewModel(index)
const issues: string[] = []

if (JSON.stringify(overview) !== JSON.stringify(repeated)) issues.push('路径模型重复生成不稳定')
if (overview.allPaths.length !== index.paths.length) issues.push(`路径模型未吸收所有公开路径：${overview.allPaths.length}/${index.paths.length}`)
if (overview.featured.length !== Math.min(6, index.paths.length)) issues.push('星路岔口代表路线数量异常')
for (const pathView of overview.allPaths) {
  const source = index.paths.find((item) => item.id === pathView.id)
  if (!source || pathView.steps.length !== source.nodeSlugs.length) issues.push(`${pathView.id} 站点未完整吸收`)
  if (pathView.steps.some((step, stepIndex) => step.index !== stepIndex || !step.href.includes(`fromPath=${pathView.id}`))) issues.push(`${pathView.id} 站点上下文异常`)
  const detail = buildPathDetailModel(index, pathView.id)
  if (!detail || detail.steps.length !== pathView.steps.length) issues.push(`${pathView.id} 详情模型异常`)
}

const sampleNodes = Array.from({ length: 12 }, (_, sampleIndex) => index.nodes[Math.floor(sampleIndex * index.nodes.length / 12)]).filter(Boolean)
for (const node of sampleNodes) {
  const model = buildNodePlaceModel({ index, node, readingMinutes: 5, groups: getNodeExplorationGroups(node), pathContext: null })
  if (model.relationDoors.length < 2) issues.push(`${node.slug} 缺少至少两个关系门`)
  if (model.pathExits.length < 1) issues.push(`${node.slug} 缺少路径出口`)
  if (model.relationDoors.some((door) => !door.reason || !door.href.includes(`fromNode=${node.slug}`))) issues.push(`${node.slug} 关系来源上下文异常`)
}

const routeFiles = [
  'src/app/paths/page.tsx', 'src/app/paths/[id]/page.tsx', 'src/app/node/[slug]/page.tsx',
  'src/components/paths/JourneyRouteStage.tsx', 'src/components/node/NodePlaceRoom.tsx',
]
const visibleEngineeringCopy = /['"`](?:Motion Layer|Fallback|Evidence|场景证据)['"`]/
const retiredSkeleton = /SceneProductionFrame|SceneWorldPortal|SceneDeepInteractionPanel|ProductRouteGuide/
for (const file of routeFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  if (visibleEngineeringCopy.test(source) || retiredSkeleton.test(source)) issues.push(`${file} 仍包含公开工程验收或旧共享骨架`)
}

if (!fs.readFileSync(path.join(root, 'src/components/paths/JourneyRouteStage.tsx'), 'utf8').includes("readPathProgress")) issues.push('路径详情未接入本地进度')
if (!fs.readFileSync(path.join(root, 'src/components/node/NodeJourneyControls.tsx'), 'utf8').includes('completePathStep')) issues.push('Node 未接入路径完成动作')

if (issues.length) {
  console.error(issues.join('\n'))
  process.exit(1)
}
console.log(`C5 journey check passed. paths=${overview.allPaths.length} steps=${overview.allPaths.reduce((sum, item) => sum + item.steps.length, 0)} sampleNodes=${sampleNodes.length}`)
