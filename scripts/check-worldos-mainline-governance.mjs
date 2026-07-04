import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

function requireFile(file) {
  if (!fs.existsSync(rel(file))) failures.push(`缺少文件：${file}`)
}

const requiredFiles = [
  'data/world-kernel/worldos-1-rc3-governance-v1.json',
  'data/world-kernel/worldos-mainline-registry-v1.json',
  'data/world-kernel/worldos-script-taxonomy-v1.json',
  'docs/10-development-history/world-kernel/worldos-1-rc3-mainline-governance.md',
  'src/lib/worldos-mainline.ts',
  'scripts/check-worldos-mainline-governance.mjs',
  'scripts/check-worldos-script-taxonomy.mjs',
]

for (const file of requiredFiles) requireFile(file)

if (!failures.length) {
  const governance = json('data/world-kernel/worldos-1-rc3-governance-v1.json')
  const registry = json('data/world-kernel/worldos-mainline-registry-v1.json')
  const pkg = json('package.json')
  const nodes = json('data/domains/experience/nodes.json')
  const paths = json('data/domains/experience/paths.json')
  const relations = json('data/core/relations.json')
  const events = json('data/core/world-events.json')

  if (governance.status !== 'rc3-mainline-governance-completed-external-deploy-still-blocked') {
    failures.push('RC3 governance 状态不正确')
  }

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (governance.releaseStates?.[key] !== false) failures.push(`${key} 必须继续为 false`)
  }

  const targets = governance.qualityTargets ?? {}
  const publicNodes = nodes.filter((node) => node.visibility === 'public')
  const contentNodes = publicNodes.filter((node) => Boolean(node.contentPath))
  const publicPaths = paths.filter((item) => item.visibility === 'public')
  const representedAreas = new Set(publicNodes.map((node) => node.areaId))
  const featuredNodes = publicNodes.filter((node) => node.featured?.home || node.featured?.representative || node.featured?.recommended)

  const actuals = {
    publicNodes: publicNodes.length,
    contentBackedPublicNodes: contentNodes.length,
    publicPaths: publicPaths.length,
    relations: relations.length,
    worldEvents: events.length,
    representedAreas: representedAreas.size,
    featuredNodes: featuredNodes.length,
  }

  for (const [key, min] of Object.entries(targets)) {
    const actualKey = key.endsWith('Min') ? key.slice(0, -3) : key
    if ((actuals[actualKey] ?? 0) < min) failures.push(`${actualKey} 不足：${actuals[actualKey] ?? 0}/${min}`)
  }

  for (const file of registry.mainline?.appFiles ?? []) {
    requireFile(file)
    if (!fs.existsSync(rel(file))) continue
    const source = read(file)
    for (const token of registry.forbiddenPublicImports ?? []) {
      if (source.includes(token)) failures.push(`${file} 不得导入 ${token}`)
    }
  }

  const productRoutes = read('src/lib/product-routes.ts')
  for (const route of ['/r4-creator', '/r6-service', '/r7-evolution', '/private-archive']) {
    if (!productRoutes.includes(route)) failures.push(`product route policy 缺少受保护路由：${route}`)
  }
  if (!productRoutes.includes('PRODUCT_INTERNAL_ROUTE_PATTERNS')) failures.push('product route policy 必须保留 internal route patterns')

  for (const script of ['check:mainline', 'check:content', 'check:experience:public', 'check:worldos-mainline-governance', 'check:worldos-script-taxonomy', 'check:release:rc']) {
    if (!pkg.scripts?.[script]) failures.push(`package scripts 缺少 ${script}`)
  }
}

if (failures.length) {
  console.error('WorldOS mainline governance check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS mainline governance check passed')
