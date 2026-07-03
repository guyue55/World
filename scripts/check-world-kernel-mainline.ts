import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors: string[] = []
const warnings: string[] = []

function read(file: string): string {
  return fs.readFileSync(path.join(root, file), 'utf8')
}

function exists(file: string): boolean {
  return fs.existsSync(path.join(root, file))
}

for (const file of [
  'src/lib/types.ts',
  'src/lib/visibility.ts',
  'src/components/world/WorldShell.tsx',
  'src/components/world/WorldRuntimeStack.tsx',
  'docs/03-engineering-architecture/world-kernel-mainline-audit.md',
  'data/world-kernel/mainline-boundary.json',
]) {
  if (!exists(file)) errors.push(`Missing required file: ${file}`)
}

if (exists('src/lib/types.ts')) {
  const types = read('src/lib/types.ts')
  for (const typeName of ['Visibility', 'LifeStage', 'Node', 'Area', 'Relation', 'Path', 'WorldEvent', 'WorldState']) {
    if (!types.includes(`export type ${typeName}`)) errors.push(`Missing core type export: ${typeName}`)
  }
}

if (exists('src/lib/visibility.ts')) {
  const visibility = read('src/lib/visibility.ts')
  if (!visibility.includes('mustExcludeFromPublicBuild')) errors.push('Missing public build exclusion helper')
}

if (exists('src/components/world/WorldShell.tsx')) {
  const shell = read('src/components/world/WorldShell.tsx')
  if (!shell.includes('WorldRuntimeStack')) errors.push('WorldShell must use WorldRuntimeStack')
  const directRuntimeImports = ['r8-deep-dynamic-world', 'r8-full-dynamic-world', 'r8-living-universe', 'r8-complete-universe', 'r8-sensory-universe', 'r8-interactive-universe', 'r8-scene-universe', 'r8-civilization-universe']
  for (const importPath of directRuntimeImports) {
    if (shell.includes(importPath)) errors.push(`WorldShell imports projection package directly: ${importPath}`)
  }
}

if (exists('package.json')) {
  const scripts = JSON.parse(read('package.json')).scripts ?? {}
  const worldCore = scripts['check:world-core'] ?? ''
  const chainedRuns = worldCore.split('npm run').length - 1
  if (chainedRuns > 80) warnings.push(`check:world-core chain is long: ${chainedRuns}`)
}

for (const warning of warnings) console.log(`[warning] ${warning}`)
for (const error of errors) console.error(`[error] ${error}`)

if (errors.length > 0) throw new Error(`World kernel mainline check failed: ${errors.length} error(s)`)
console.log('World kernel mainline check passed')
