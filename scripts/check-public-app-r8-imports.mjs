#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const appRoot = path.join(root, 'src', 'app')
const allowedLegacyPrefixes = [
  'src/app/r',
  'src/app/v',
  'src/app/phase-',
]

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full)
  }
  return files
}

function toRepoPath(fullPath) {
  return path.relative(root, fullPath).split(path.sep).join('/')
}

function isAllowedLegacyRoute(repoPath) {
  return allowedLegacyPrefixes.some((prefix) => repoPath.startsWith(prefix))
}

const violations = []
for (const file of walk(appRoot)) {
  const repoPath = toRepoPath(file)
  if (isAllowedLegacyRoute(repoPath)) continue
  const content = fs.readFileSync(file, 'utf8')
  if (content.includes("@/components/r8-")) violations.push(repoPath)
}

if (violations.length > 0) {
  console.error('Public app routes must not import R8 runtime components directly:')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log('Public app R8 import boundary passed')
