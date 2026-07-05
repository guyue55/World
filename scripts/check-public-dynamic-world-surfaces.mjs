import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const componentFiles = [
  'src/components/product/ProductHome.tsx',
  'src/components/world/WorldLiveMapPanel.tsx',
  'src/components/atlas/AtlasLiveConstellation.tsx',
  'src/components/timeline/TimelineRiverRuntime.tsx',
  'src/components/ask/PublicLighthouseConsole.tsx',
  'src/components/node/NodeOpeningRitual.tsx',
  'src/components/status/DynamicWorldStatusBoard.tsx',
  'src/components/archive/ArchiveDynamicGuide.tsx',
  'src/components/paths/PathJourneyBoard.tsx',
  'src/components/paths/PathsDynamicDirectory.tsx',
  'src/components/about/AboutDynamicHero.tsx',
  'src/components/manifesto/ManifestoDynamicHero.tsx',
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
  'src/app/paths/page.tsx',
  'src/app/about/page.tsx',
  'src/app/manifesto/page.tsx',
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
  'buildPathsDirectorySurface',
  'buildAboutDynamicSurface',
  'buildManifestoDynamicSurface',
]
const gsapHookFile = 'src/components/world/useGsapEntrance.ts'
const motionGrammarFile = 'src/lib/motion-grammar.ts'

const failures = []

for (const file of componentFiles) {
  const source = readFileSync(resolve(root, file), 'utf8')

  if (!source.includes("from '@/lib/public-world-surfaces'")) {
    failures.push(`${file} 必须消费 public-world-surfaces 展示模型`)
  }

  if (source.includes("from '@/lib/types'")) {
    if (file !== 'src/components/product/ProductHome.tsx') {
      failures.push(`${file} 不应直接导入业务原始类型，避免客户端承担权限判断`)
    }
  }

  if (source.includes('@/components/r8-') || source.includes('@/components/_legacy')) {
    failures.push(`${file} 不应直接接入 R8 或 legacy 动态组件`)
  }

  if (/data-gsap-reveal[^>\n]*className=["'`][^"'`]*\binvisible\b/.test(source)) {
    failures.push(`${file} 的 data-gsap-reveal 元素不能依赖 Tailwind invisible 作为 SSR 基础态`)
  }

  if (/className=["'`][^"'`]*\binvisible\b[^"'`]*data-gsap-reveal/.test(source)) {
    failures.push(`${file} 的 data-gsap-reveal 元素不能依赖 Tailwind invisible 作为 SSR 基础态`)
  }
}

for (const token of requiredPageTokens) {
  const found = pageFiles.some((file) => {
    const fullPath = resolve(root, file)
    if (!existsSync(fullPath)) return false
    return readFileSync(fullPath, 'utf8').includes(token)
  })
  if (!found) failures.push(`公开页面缺少 ${token} 服务端展示模型构建`)
}

const gsapHook = readFileSync(resolve(root, gsapHookFile), 'utf8')
for (const token of ['gsap.matchMedia', 'autoAlpha', 'prefers-reduced-motion', 'getMotionGrammarRule']) {
  if (!gsapHook.includes(token)) failures.push(`${gsapHookFile} 缺少 GSAP 最佳实践关键点：${token}`)
}
if (gsapHook.includes('switch (type)')) failures.push(`${gsapHookFile} 不应内联分叉动效参数，应消费 motion grammar`)

const motionGrammar = readFileSync(resolve(root, motionGrammarFile), 'utf8')
for (const token of ['arrival', 'emergence', 'connection', 'flow', 'focus', 'feedback']) {
  if (!motionGrammar.includes(`${token}:`)) failures.push(`${motionGrammarFile} 缺少动效语法：${token}`)
}
for (const token of ['label', 'intent', 'appliesTo', 'reducedMotion', 'overwrite']) {
  if (!motionGrammar.includes(token)) failures.push(`${motionGrammarFile} 缺少动效语法字段：${token}`)
}

const homeSource = readFileSync(resolve(root, 'src/components/product/ProductHome.tsx'), 'utf8')
if (!homeSource.includes('dynamicWorld.entryPoints')) failures.push('首页入口选择必须来自服务端动态世界 surface，避免在前端硬编码入口策略')
if (!homeSource.includes('ProductDynamicWorldGuide')) failures.push('首页必须渲染动态世界总览导览区')

const homeGuideSource = readFileSync(resolve(root, 'src/components/product/ProductDynamicWorldGuide.tsx'), 'utf8')
if (!homeGuideSource.includes('surface.primaryHref')) failures.push('首页动态总览主 CTA 必须来自服务端动态世界 surface，避免硬编码首选入口')

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
