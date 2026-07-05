import fs from 'node:fs'
import path from 'node:path'
import { getLoadingStrategy, validatePerformanceContracts } from '../src/lib/performance-contracts'

function listFiles(root: string, exts: string[]): string[] {
  if (!fs.existsSync(root)) return []

  const out: string[] = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) out.push(...listFiles(full, exts))
    else if (exts.some((ext) => full.endsWith(ext))) out.push(full)
  }

  return out
}

function main() {
  const issues = validatePerformanceContracts()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const routeStrategies = new Set(getLoadingStrategy().strategies.map((item) => item.id))
  ;['home', 'atlas', 'archive', 'node-detail', 'paths', 'status', 'ask'].forEach((id) => {
    if (!routeStrategies.has(id)) errors.push(`missing loading strategy: ${id}`)
  })

  const files = listFiles(path.join(process.cwd(), 'src'), ['.tsx', '.ts'])
  files.forEach((file) => {
    const rel = path.relative(process.cwd(), file)
    const text = fs.readFileSync(file, 'utf-8')

    if (rel.startsWith('src/app') && text.includes('from \"framer-motion\"')) {
      warnings.push(`page imports framer-motion directly: ${rel}`)
    }

    if (rel.startsWith('src/app') && text.includes('getAllNodes(') && !rel.includes('archive')) {
      warnings.push(`page may load all nodes outside archive: ${rel}`)
    }

    if (rel.startsWith('src/components') && text.includes('window.') && !text.includes('useEffect')) {
      warnings.push(`component may access window outside effect: ${rel}`)
    }
  })

  const runtimeProvider = fs.readFileSync(path.join(process.cwd(), 'src/components/world/WorldRuntimeProvider.tsx'), 'utf-8')
  ;['compactMotion', '(max-width: 767px)', 'activeProjectionLines', 'activeRuntimeNodes'].forEach((token) => {
    if (!runtimeProvider.includes(token)) errors.push(`WorldRuntimeProvider missing mobile motion budget guard: ${token}`)
  })
  if (!runtimeProvider.includes('!runtime.reducedMotion && !runtime.compactMotion')) {
    errors.push('RuntimeAtmosphere must disable background animation when compactMotion is active')
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Performance contracts check passed. warnings=${warnings.length}`)
}

main()
