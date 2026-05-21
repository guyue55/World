import fs from 'node:fs'
import path from 'node:path'

const ignoredDirs = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'coverage', 'reports', '.turbo', '.cache'])
const intentionalJsonRouteDirs = new Set([
  'src/app/world-index.json',
  'src/app/world-manifest.json',
])

const errors: string[] = []
let jsonFileCount = 0
const jsonRouteDirs: string[] = []

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const rel = full.split(path.sep).join('/')

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue
      if (entry.name.endsWith('.json')) {
        if (intentionalJsonRouteDirs.has(rel)) {
          jsonRouteDirs.push(rel)
        } else {
          errors.push(`unexpected .json directory: ${rel}`)
        }
      }
      walk(full)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      jsonFileCount += 1
      try {
        JSON.parse(fs.readFileSync(full, 'utf8'))
      } catch (error) {
        errors.push(`invalid json ${rel}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  }
}

walk('.')

if (jsonRouteDirs.length !== intentionalJsonRouteDirs.size) {
  errors.push(`expected ${intentionalJsonRouteDirs.size} intentional .json route dirs, found ${jsonRouteDirs.length}`)
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log(`JSON file checks passed. jsonFiles=${jsonFileCount}; intentionalJsonRouteDirs=${jsonRouteDirs.length}`)
