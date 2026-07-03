import fs from 'node:fs'
import path from 'node:path'

const ignoredDirs = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'coverage', 'reports', '.turbo', '.cache'])

const errors: string[] = []
let jsonFileCount = 0

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const rel = full.split(path.sep).join('/')

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue
      if (entry.name.endsWith('.json')) {
        errors.push(`unexpected .json directory: ${rel}`)
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

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log(`JSON file checks passed. jsonFiles=${jsonFileCount}; intentionalJsonRouteDirs=0`)
