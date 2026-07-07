// 用途：检查legacy boundary
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const failures = []
const routePolicy = read('src/lib/product-routes.ts')
const middleware = read('middleware.ts')
const robots = read('src/app/robots.ts')
const sitemap = read('src/app/sitemap.ts')

const topLevelPages = fs.readdirSync(rel('src/app'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => fs.existsSync(rel(`src/app/${entry.name}/page.tsx`)))
  .map((entry) => `/${entry.name}`)
  .sort()

const allowedPublic = ['/', '/about', '/forbidden', '/atlas', '/timeline', '/archive', '/paths', '/ask', '/manifesto', '/status']
const deepPublic = ['/node/', '/paths/']
const allowedLegacy = ['/world', '/world-map', '/time-river', '/lighthouse', '/r2-world', '/r3-content-life', '/r5-lighthouse', '/r8-public']
const allowedPrivate = ['/private-archive', '/private-ai', '/r4-creator', '/r6-service', '/r7-evolution', '/ai-workbench', '/ai-workbench-v2']
const internalPatternMatchers = [
  /^\/v\d+(?:-|\/|$)/,
  /^\/r\d+(?:-|\/|$)/,
  /^\/phase-/,
  /^\/evidence(?:-|\/|$)/,
  /^\/governance(?:\/|$)/,
  /^\/hardening(?:\/|$)/,
  /^\/observability(?:\/|$)/,
  /^\/operator(?:\/|$)/,
  /^\/production(?:-|\/|$)/,
  /^\/release(?:\/|$)/,
  /^\/service-adapters(?:\/|$)/,
]
const expectedInternal = topLevelPages.filter((route) => !allowedPublic.includes(route) && !allowedLegacy.includes(route) && !allowedPrivate.includes(route))

for (const route of expectedInternal) {
  const coveredByPattern = internalPatternMatchers.some((pattern) => pattern.test(route))
  if (!coveredByPattern && !routePolicy.includes(`'${route}'`)) {
    failures.push(`top-level app route 未在内部精确路由或内部模式中登记：${route}`)
  }
}

for (const route of allowedPublic.filter((route) => route !== '/')) {
  if (!routePolicy.includes(`'${route}'`)) failures.push(`公开路由未登记：${route}`)
  if (!sitemap.includes('PRODUCT_PUBLIC_ROUTES')) failures.push('sitemap 必须从 PRODUCT_PUBLIC_ROUTES 派生')
}

for (const prefix of deepPublic) {
  if (!routePolicy.includes(`'${prefix}'`)) failures.push(`深层公开前缀未登记：${prefix}`)
}

if (!routePolicy.includes('PRODUCT_INTERNAL_EXACT_ROUTES')) failures.push('product-routes 必须导出 PRODUCT_INTERNAL_EXACT_ROUTES')
if (!middleware.includes('getWorldKernelRouteDecision')) failures.push('middleware 必须使用 World Kernel route decision')
if (!robots.includes('PRODUCT_INTERNAL_EXACT_ROUTES')) failures.push('robots 必须阻止内部精确路由索引')
if (!sitemap.includes('PRODUCT_PUBLIC_ROUTES')) failures.push('sitemap 必须只从公开产品路由生成')

if (failures.length) {
  console.error('Legacy boundary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Legacy boundary check passed: ${topLevelPages.length} top-level pages classified`)
