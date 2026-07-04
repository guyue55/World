#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

// Staged World Kernel boundary:
// Keep the public entry page hard-gated first. Other public routes still have
// known legacy R8 presentation imports and must be migrated by later small PRs.
const criticalPublicEntries = [
  'src/app/page.tsx',
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
  console.error('Critical public app entry routes must not import R8 runtime components directly:')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log('Critical public app entry R8 import boundary passed')
