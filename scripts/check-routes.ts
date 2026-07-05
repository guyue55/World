import fs from 'node:fs'
import path from 'node:path'
import { getAllPaths } from '../src/lib/paths'
import { getPublicNodes } from '../src/lib/nodes'

const requiredRoutes = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/paths/[id]/page.tsx',
  'src/app/node/[slug]/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/_legacy/about/page.tsx',
  'src/app/_legacy/manifesto/page.tsx',
  'src/app/status/page.tsx',
  'src/app/not-found.tsx',
  'src/app/error.tsx',
  'src/app/loading.tsx',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'src/app/manifest.ts',
]

function assertFile(filePath: string) {
  if (!fs.existsSync(path.join(process.cwd(), filePath))) {
    throw new Error(`Missing route file: ${filePath}`)
  }
}

function main() {
  requiredRoutes.forEach(assertFile)

  const publicNodes = getPublicNodes()
  if (publicNodes.length === 0) throw new Error('No public nodes found')

  const paths = getAllPaths()
  if (paths.length === 0) throw new Error('No public paths found')

  console.log(`Route check passed. ${requiredRoutes.length} route files, ${publicNodes.length} public nodes, ${paths.length} paths.`)
}

main()
