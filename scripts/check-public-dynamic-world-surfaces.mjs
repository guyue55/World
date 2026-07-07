// 用途：检查public dynamic world surfaces
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const boundaryRegistryFile = 'data/world-kernel/worldos-dynamic-surface-boundary-v1.json'
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
  'src/components/world/WorldPulseConstellation.tsx',
  'src/components/about/AboutDynamicHero.tsx',
  'src/components/manifesto/ManifestoDynamicHero.tsx',
]
const routeSurfaceContracts = [
  ['/', 'src/app/page.tsx', 'buildHomeDynamicWorldSurface'],
  ['/atlas', 'src/app/atlas/page.tsx', 'buildAtlasConstellationSurface'],
  ['/timeline', 'src/app/timeline/page.tsx', 'buildTimelineRiverSurface'],
  ['/ask', 'src/app/ask/page.tsx', 'buildLighthouseConsoleSurface'],
  ['/node/[slug]', 'src/app/node/[slug]/page.tsx', 'buildNodeOpeningSurface'],
  ['/status', 'src/app/status/page.tsx', 'buildDynamicWorldStatusSurface'],
  ['/archive', 'src/app/archive/page.tsx', 'buildArchiveDynamicSurface'],
  ['/paths/[id]', 'src/app/paths/[id]/page.tsx', 'buildPathJourneySurface'],
  ['/paths', 'src/app/paths/page.tsx', 'buildPathsDirectorySurface'],
  ['/about', 'src/app/about/page.tsx', 'buildAboutDynamicSurface'],
  ['/manifesto', 'src/app/manifesto/page.tsx', 'buildManifestoDynamicSurface'],
]
const gsapHookFile = 'src/components/world/useGsapEntrance.ts'
const motionGrammarFile = 'src/lib/motion-grammar.ts'
const publicWorldObjectsFile = 'src/lib/public-world-objects.ts'

const failures = []

if (!existsSync(resolve(root, boundaryRegistryFile))) {
  failures.push(`缺少动态世界 surface 边界注册表：${boundaryRegistryFile}`)
}

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

for (const [route, file, token] of routeSurfaceContracts) {
  const fullPath = resolve(root, file)
  if (!existsSync(fullPath)) {
    failures.push(`正式公开路由 ${route} 缺少页面文件：${file}`)
    continue
  }

  const source = readFileSync(fullPath, 'utf8')
  if (!source.includes(token)) failures.push(`正式公开路由 ${route} 必须在 ${file} 构建 ${token}`)
  if (source.includes('@/components/r8-') || source.includes('@/components/_legacy')) {
    failures.push(`正式公开路由 ${route} 不得直接接入 R8 或 legacy 动态组件`)
  }
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

const publicWorldObjects = readFileSync(resolve(root, publicWorldObjectsFile), 'utf8')
for (const token of ['getPublicWorldObjectIndex', 'getPublicWorldObjectConsistencyIssues', 'nodeRefs', 'pathRefs', 'timelineRefs', 'getPublicNodes', 'getPublicWorldEvents']) {
  if (!publicWorldObjects.includes(token)) failures.push(`${publicWorldObjectsFile} 缺少公开世界对象索引字段：${token}`)
}

for (const file of ['src/app/page.tsx', 'src/app/atlas/page.tsx', 'src/app/timeline/page.tsx', 'src/app/archive/page.tsx', 'src/app/paths/page.tsx']) {
  const source = readFileSync(resolve(root, file), 'utf8')
  if (!source.includes('getPublicWorldObjectIndex')) failures.push(`${file} 必须从统一公开世界对象索引读取数据`)
}

if (existsSync(resolve(root, boundaryRegistryFile))) {
  const boundaryRegistry = JSON.parse(readFileSync(resolve(root, boundaryRegistryFile), 'utf8'))
  const surfaceSource = readFileSync(resolve(root, 'src/lib/public-world-surfaces.ts'), 'utf8')

  if (boundaryRegistry.name !== 'WorldOS 动态世界 surface 边界注册表 v1') failures.push('动态世界 surface 边界注册表名称不正确')
  if (boundaryRegistry.policies?.serverBuildsPublicSurfaces !== true) failures.push('动态 surface 必须声明由服务端构建')
  if (boundaryRegistry.policies?.frontendVisibilityIsNotPermission !== true) failures.push('动态 surface 必须声明前端显隐不是权限控制')
  if (boundaryRegistry.policies?.noClientRawPrivateData !== true) failures.push('动态 surface 必须声明客户端不接收原始私密数据')
  if (boundaryRegistry.policies?.legacyUniverseComponentsRemainReference !== true) failures.push('legacy universe 组件必须保持 reference')
  if (boundaryRegistry.policies?.r8ComponentsRemainReference !== true) failures.push('R8 universe 组件必须保持 reference')

  for (const surface of boundaryRegistry.surfaces ?? []) {
    if (!surface.id) failures.push('动态 surface 注册项缺少 id')
    if (!surface.route) failures.push(`${surface.id} 缺少 route`)
    if (!surface.pageFile || !existsSync(resolve(root, surface.pageFile))) failures.push(`${surface.id} pageFile 不存在：${surface.pageFile}`)
    if (!surface.builder || !surfaceSource.includes(`export function ${surface.builder}`)) failures.push(`${surface.id} builder 不存在：${surface.builder}`)
    if (surface.serverBuilt !== true) failures.push(`${surface.id} 必须由服务端构建 surface`)
    if (surface.frontendPermissionControl !== false) failures.push(`${surface.id} 不得声明前端权限控制`)
    if (!Array.isArray(surface.dataSources) || surface.dataSources.length === 0) failures.push(`${surface.id} 必须登记 dataSources`)

    if (surface.pageFile && existsSync(resolve(root, surface.pageFile)) && surface.builder) {
      const pageSource = readFileSync(resolve(root, surface.pageFile), 'utf8')
      if (!pageSource.includes(surface.builder)) failures.push(`${surface.id} 页面必须调用 ${surface.builder}`)
      if (pageSource.includes('@/components/r8-') || pageSource.includes('@/components/_legacy')) {
        failures.push(`${surface.id} 页面不得接入 R8 或 legacy 动态组件`)
      }
    }
  }

  const builderMatches = [...surfaceSource.matchAll(/export function (build\w+Surface)/g)]
  const filteredBuilders = builderMatches
    .map((match, index) => {
      const nextMatch = builderMatches[index + 1]
      const sourceSlice = surfaceSource.slice(match.index, nextMatch?.index ?? surfaceSource.length)
      return { name: match[1], source: sourceSlice }
    })
    .filter((builder) => builder.source.includes('isPublicVisible') || builder.source.includes('isPublicArea') || builder.source.includes('isEventPublic'))
    .map((builder) => builder.name)
  const filteredBuilderSet = new Set(filteredBuilders)

  for (const surface of boundaryRegistry.surfaces ?? []) {
    if (surface.requiresPublicFilter === true && !filteredBuilderSet.has(surface.builder)) {
      failures.push(`${surface.id} 要求公开过滤，但 ${surface.builder} 未检测到公开过滤 helper`)
    }
  }
}

const homeSource = readFileSync(resolve(root, 'src/components/product/ProductHome.tsx'), 'utf8')
if (!homeSource.includes('dynamicWorld.entryPoints')) failures.push('首页入口选择必须来自服务端动态世界 surface，避免在前端硬编码入口策略')
if (!homeSource.includes('ProductDynamicWorldGuide')) failures.push('首页必须渲染动态世界总览导览区')
if (!homeSource.includes('WorldPulseConstellation')) failures.push('首页首屏必须渲染动态世界运行态脉冲层')

const homeGuideSource = readFileSync(resolve(root, 'src/components/product/ProductDynamicWorldGuide.tsx'), 'utf8')
if (!homeGuideSource.includes('surface.primaryHref')) failures.push('首页动态总览主 CTA 必须来自服务端动态世界 surface，避免硬编码首选入口')

const pulseSource = readFileSync(resolve(root, 'src/components/world/WorldPulseConstellation.tsx'), 'utf8')
for (const token of ['HomeDynamicWorldSurface', 'useWorldRuntime', 'surface.routes', 'surface.entryPoints', 'surface.primaryHref', 'reducedMotion']) {
  if (!pulseSource.includes(token)) failures.push(`首页动态世界运行态脉冲层缺少 ${token}`)
}

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
