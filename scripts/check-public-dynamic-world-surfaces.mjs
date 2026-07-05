import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const componentFiles = [
  'src/components/atlas/AtlasLiveConstellation.tsx',
  'src/components/timeline/TimelineRiverRuntime.tsx',
  'src/components/ask/PublicLighthouseConsole.tsx',
  'src/components/node/NodeOpeningRitual.tsx',
]
const pageFiles = [
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/node/[slug]/page.tsx',
]
const requiredPageTokens = [
  'buildAtlasConstellationSurface',
  'buildTimelineRiverSurface',
  'buildLighthouseConsoleSurface',
  'buildNodeOpeningSurface',
]

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

if (failures.length) {
  console.error('Public dynamic world surface check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Public dynamic world surface check passed')
