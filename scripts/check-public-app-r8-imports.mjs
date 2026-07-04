#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

// Staged World Kernel boundary:
// expand this list only after each route is migrated by a small PR.
const criticalPublicEntries = [
  'src/app/page.tsx',
  'src/app/world/page.tsx',
  'src/app/world-map/page.tsx',
  'src/app/time-river/page.tsx',
  'src/app/lighthouse/page.tsx',
  'src/app/about/page.tsx',
  'src/app/status/page.tsx',
  'src/app/manifesto/page.tsx',
  `src/app/${'ask'}/page.tsx`,
  'src/app/paths/page.tsx',
]

const violations = []
for (const repoPath of criticalPublicEntries) {
  const fullPath = path.join(root, ...repoPath.split('/'))
  if (!fs.existsSync(fullPath)) {
    violations.push(`${repoPath} (missing)`)
    continue
  }

  const content = fs.readFileSync(fullPath, 'utf8')
  if (content.includes("@/components/r8-")) violations.push(repoPath)
}

if (violations.length > 0) {
  console.error('Critical public app routes must not import R8 runtime components directly:')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log('Critical public app R8 import boundary passed')
