// 用途：运行world kernel local smoke
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

const evidence = json('data/world-kernel/world-kernel-production-evidence-v1.json')
const routes = evidence.localEvidence?.localSmokeRoutes ?? []

const routeToFile = new Map([
  ['/', 'src/app/page.tsx'],
  ['/about', 'src/app/about/page.tsx'],
  ['/atlas', 'src/app/atlas/page.tsx'],
  ['/timeline', 'src/app/timeline/page.tsx'],
  ['/archive', 'src/app/archive/page.tsx'],
  ['/paths', 'src/app/paths/page.tsx'],
  ['/ask', 'src/app/ask/page.tsx'],
  ['/manifesto', 'src/app/manifesto/page.tsx'],
  ['/status', 'src/app/status/page.tsx'],
  ['/node/:slug', 'src/app/node/[slug]/page.tsx'],
  ['/paths/:id', 'src/app/paths/[id]/page.tsx'],
])

for (const route of routes) {
  const file = routeToFile.get(route)
  if (!file) failures.push(`local smoke 未定义路由文件映射：${route}`)
  else if (!fs.existsSync(rel(file))) failures.push(`local smoke 路由缺少页面文件：${route} -> ${file}`)
}

const productRoutes = read('src/lib/product-routes.ts')
const boundary = read('src/lib/world-kernel-boundary.ts')
const middleware = read('middleware.ts')
const sitemap = read('src/app/sitemap.ts')
const robots = read('src/app/robots.ts')

for (const token of [
  'PRODUCT_PUBLIC_ROUTES',
  'PRODUCT_LEGACY_REDIRECTS',
  'PRODUCT_PRIVATE_ROUTES',
  'PRODUCT_INTERNAL_EXACT_ROUTES',
]) {
  if (!productRoutes.includes(token)) failures.push(`product-routes 缺少：${token}`)
}

for (const token of ['getLegacyRedirect', 'isPrivateProductRoute', 'isInternalProductRoute', 'isProductPublicRoute']) {
  if (!productRoutes.includes(token)) failures.push(`product-routes 缺少决策函数：${token}`)
}

for (const token of ['legacy-redirect', 'private-guarded', 'internal-guarded', 'public', 'unknown']) {
  if (!boundary.includes(token)) failures.push(`world-kernel-boundary 缺少决策类别：${token}`)
}

if (!middleware.includes('NextResponse.redirect') || !middleware.includes('getWorldKernelRouteDecision')) {
  failures.push('middleware 必须在服务端执行 route decision 与 redirect')
}
if (!sitemap.includes('PRODUCT_PUBLIC_ROUTES')) failures.push('sitemap 必须由 PRODUCT_PUBLIC_ROUTES 生成')
if (!robots.includes('PRODUCT_PRIVATE_ROUTES') || !robots.includes('PRODUCT_INTERNAL_EXACT_ROUTES')) failures.push('robots 必须阻断私密与内部入口')

for (const file of ['public/world-index.json', 'public/world-manifest.json']) {
  if (!fs.existsSync(rel(file))) failures.push(`缺少公开 JSON：${file}`)
  else {
    try { json(file) } catch (error) { failures.push(`${file} 不是合法 JSON：${error.message}`) }
  }
}

const publicIndex = json('public/world-index.json')
if (!Array.isArray(publicIndex.nodes)) failures.push('public/world-index.json 必须包含 nodes 数组')
else {
  const leaking = publicIndex.nodes.filter((node) => ['private', 'family', 'partner', 'vault', 'sealed', 'silent'].includes(node.visibility))
  if (leaking.length > 0) failures.push(`公开索引泄漏非公开节点：${leaking.map((node) => node.id).join(', ')}`)
}

const appPathsManifest = '.next/server/app-paths-manifest.json'
if (fs.existsSync(rel(appPathsManifest))) {
  const appPaths = json(appPathsManifest)
  for (const route of ['/page', '/about/page', '/atlas/page', '/timeline/page', '/archive/page', '/paths/page', '/ask/page', '/manifesto/page', '/status/page']) {
    if (!Object.keys(appPaths).some((key) => key === route || key.startsWith(`${route}.`))) {
      failures.push(`.next app paths manifest 未包含：${route}`)
    }
  }
}

if (failures.length) {
  console.error('World Kernel local smoke failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`World Kernel local smoke passed: ${routes.length} public route entries checked`)
