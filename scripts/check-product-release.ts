import fs from 'node:fs'
import path from 'node:path'
import {
  PRODUCT_INTERNAL_EXACT_ROUTES,
  PRODUCT_LEGACY_REDIRECTS,
  PRODUCT_PRIVATE_ROUTES,
  PRODUCT_PUBLIC_ROUTES,
} from '../src/lib/product-routes'
import { WORLD_KERNEL_ROUTE_POLICY } from '../src/lib/world-kernel-boundary'

const root = process.cwd()
const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf-8')
const json = <T>(file: string): T => JSON.parse(read(file)) as T

const productFiles = [
  'src/app/page.tsx',
  'src/components/world/WorldShell.tsx',
  'src/app/about/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/status/page.tsx',
  'src/app/forbidden/page.tsx',
  'src/app/node/[slug]/page.tsx',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'middleware.ts',
  'src/lib/world-kernel-boundary.ts',
  'src/components/product/ProductJourneyDock.tsx',
]

const forbiddenTokens = [
  '@/components/r8-',
  'DynamicUniverse',
  'CivilizationUniverse',
  'SensoryUniverse',
  'InteractiveUniverse',
  'LivingUniverseSection',
  'CompleteUniverseSection',
  'TodayWorldPanel',
  'NodeLifeConstellation',
  'WORLD STATUS',
  'FOG AREA',
  'PRIVATE GATE',
  '@/components/r8-full-dynamic-world',
  '@/components/r8-living-universe',
  '@/components/r8-sensory-universe',
  '@/components/r8-interactive-universe',
  '@/components/r8-scene-universe',
  '@/components/r8-civilization-universe',
]

const allowedNavHrefs = new Set(['/', '/atlas', '/timeline', '/archive', '/ask', '/manifesto'])
const disallowedSitemapRouteTokens = [
  ...PRODUCT_INTERNAL_EXACT_ROUTES,
  '/skeleton',
  '/r2-world',
  '/r3-content-life',
  '/r5-lighthouse',
  '/r8-public',
]
const requiredKernelConsolidationFiles = [
  'data/world-kernel/world-kernel-consolidation-v1.json',
  'data/world-kernel/script-consolidation-map.json',
  'src/lib/world-kernel-registry.ts',
  'src/lib/world-kernel-runtime.ts',
  'src/lib/world-kernel-legacy.ts',
  'scripts/check-world-kernel-core.mjs',
  'scripts/check-world-kernel-runtime.mjs',
  'scripts/check-legacy-boundary.mjs',
]

const failures: string[] = []

for (const file of requiredKernelConsolidationFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing kernel consolidation file: ${file}`)
}

for (const file of productFiles) {
  const content = read(file)
  for (const token of forbiddenTokens) {
    if (content.includes(token)) failures.push(`${file} still contains forbidden product token: ${token}`)
  }
}

const nav = json<{ items: Array<{ href: string, desktop: boolean, mobile: boolean }> }>('data/domains/experience/navigation-state-contract.json')
for (const item of nav.items) {
  if (!allowedNavHrefs.has(item.href)) failures.push(`navigation exposes non-product route: ${item.href}`)
}

const nodes = json<Array<{ id: string, visibility: string }>>('data/domains/experience/nodes.json')
const forbiddenPublicVisibilities = new Set(['private', 'family', 'partner', 'vault', 'sealed', 'silent'])
const publicUnsafe = nodes.filter((node) => forbiddenPublicVisibilities.has(node.visibility))
if (publicUnsafe.some((node) => node.visibility === 'public')) failures.push('impossible visibility state detected')

const rootPage = read('src/app/page.tsx')
if (!rootPage.includes('ProductHome')) failures.push('home page must use ProductHome')

const shell = read('src/components/world/WorldShell.tsx')
if (!shell.includes('ProductBackdrop')) failures.push('world shell must use lightweight ProductBackdrop')
if (!shell.includes('skip-link')) failures.push('world shell must expose a skip link')
if (!shell.includes('main-content')) failures.push('world shell must expose a main content target')
if (!shell.includes('ProductJourneyDock')) failures.push('world shell must expose local journey continuity')

const sitemap = read('src/app/sitemap.ts')
for (const token of disallowedSitemapRouteTokens) {
  if (sitemap.includes(token)) failures.push(`sitemap exposes non-product route: ${token}`)
}
for (const route of PRODUCT_PUBLIC_ROUTES.filter((route) => route !== '/status')) {
  if (!sitemap.includes(`'${route}'`) && !sitemap.includes('PRODUCT_PUBLIC_ROUTES')) {
    failures.push(`sitemap does not include product route source: ${route}`)
  }
}

const robots = read('src/app/robots.ts')
for (const route of PRODUCT_PRIVATE_ROUTES) {
  if (!robots.includes('PRODUCT_PRIVATE_ROUTES') && !robots.includes(route)) {
    failures.push(`robots does not block private route: ${route}`)
  }
}

const middleware = read('middleware.ts')
for (const [legacy, target] of Object.entries(PRODUCT_LEGACY_REDIRECTS)) {
  if (!middleware.includes('getWorldKernelRouteDecision')) {
    failures.push(`middleware does not use World Kernel route decision for ${legacy} -> ${target}`)
  }
}
const boundary = read('src/lib/world-kernel-boundary.ts')
if (!boundary.includes('private-guarded')) failures.push('World Kernel boundary must classify private routes')
if (!boundary.includes('internal-guarded')) failures.push('World Kernel boundary must classify internal routes')
if (!JSON.stringify(WORLD_KERNEL_ROUTE_POLICY.publicRoutes).includes('/paths')) failures.push('World Kernel route policy must include /paths')

const pathsPage = read('src/app/paths/page.tsx')
if (pathsPage.includes('@/components/r8-')) failures.push('paths page must not expose r8 dynamic universe components')
if (!pathsPage.includes('ProductRouteGuide')) failures.push('paths page must explain current location and exit routes')

if (failures.length) {
  console.error('Product release check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Product release check passed: ${productFiles.length} files, ${PRODUCT_PUBLIC_ROUTES.length} public routes`)
