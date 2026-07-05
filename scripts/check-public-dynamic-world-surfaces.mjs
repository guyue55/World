import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const componentFiles = [
  'src/components/world/WorldLiveMapPanel.tsx',
  'src/components/atlas/AtlasLiveConstellation.tsx',
  'src/components/timeline/TimelineRiverRuntime.tsx',
  'src/components/ask/PublicLighthouseConsole.tsx',
  'src/components/node/NodeOpeningRitual.tsx',
  'src/components/status/DynamicWorldStatusBoard.tsx',
  'src/components/archive/ArchiveDynamicGuide.tsx',
  'src/components/paths/PathJourneyBoard.tsx',
]
const pageFiles = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/node/[slug]/page.tsx',
  'src/app/status/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/[id]/page.tsx',
]
const requiredPageTokens = [
  'buildHomeDynamicWorldSurface',
  'buildAtlasConstellationSurface',
  'buildTimelineRiverSurface',
  'buildLighthouseConsoleSurface',
  'buildNodeOpeningSurface',
  'buildDynamicWorldStatusSurface',
  'buildArchiveDynamicSurface',
  'buildPathJourneySurface',
]
const gsapHookFile = 'src/components/world/useGsapEntrance.ts'

const failures = []

for (const file of componentFiles) {
  const source = readFileSync(resolve(root, file), 'utf8')

  if (!source.includes("from '@/lib/public-world-surfaces'")) {
    failures.push(`${file} 必须消费 public-world-surfaces 展示模型`)
  }

  if (source.includes("from '@/lib/types'")) {
    failures.push(`${file} 不应直接导入业务原始类型，避免客户端承担权限判断`)
  }

  if (source.includes('@/components/r8-') || source.includes('@/components/_legacy')) {
    failures.push(`${file} 不应直接接入 R8 或 legacy 动态组件`)
  }
}

for (const token of requiredPageTokens) {
  const found = pageFiles.some((file) => readFileSync(resolve(root, file), 'utf8').includes(token))
  if (!found) failures.push(`公开页面缺少 ${token} 服务端展示模型构建`)
}

const gsapHook = readFileSync(resolve(root, gsapHookFile), 'utf8')
for (const token of ['gsap.matchMedia', 'autoAlpha', 'prefers-reduced-motion', 'overwrite']) {
  if (!gsapHook.includes(token)) failures.push(`${gsapHookFile} 缺少 GSAP 最佳实践关键点：${token}`)
}

const homeSource = readFileSync(resolve(root, 'src/components/product/ProductHome.tsx'), 'utf8')
if (!homeSource.includes('dynamicWorld.primaryHref')) failures.push('首页主 CTA 必须来自服务端动态世界 surface，避免硬编码首选入口')
if (!homeSource.includes('ProductDynamicWorldGuide')) failures.push('首页必须渲染动态世界总览导览区')

const statusSource = readFileSync(resolve(root, 'src/app/status/page.tsx'), 'utf8')
if (!statusSource.includes('DynamicWorldStatusBoard')) failures.push('/status 必须渲染动态世界状态面板')

const archiveSource = readFileSync(resolve(root, 'src/app/archive/page.tsx'), 'utf8')
if (!archiveSource.includes('ArchiveDynamicGuide')) failures.push('/archive 必须渲染动态档案导览区')

if (failures.length) {
  console.error('Public dynamic world surface check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Public dynamic world surface check passed')
