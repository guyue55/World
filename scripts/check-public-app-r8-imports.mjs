#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const appRoot = path.join(root, 'src', 'app')
const violations = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
      continue
    }

    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) continue

    const content = fs.readFileSync(fullPath, 'utf8')
    if (content.includes("@/components/r8-")) {
      violations.push(path.relative(root, fullPath).split(path.sep).join('/'))
    }
  }
}

if (!fs.existsSync(appRoot)) {
  console.error('Missing src/app directory')
  process.exit(1)
}

walk(appRoot)

if (violations.length > 0) {
  console.error('App runtime boundary failed:')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log('App runtime boundary passed')
