import fs from 'node:fs'
import path from 'node:path'
import {
  getFeatureModuleContract,
  getPageCompositionContract,
  validateFeatureArchitecture,
} from '../src/lib/feature-architecture'

function listPages(root: string): string[] {
  if (!fs.existsSync(root)) return []

  const out: string[] = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) out.push(...listPages(full))
    else if (entry.name === 'page.tsx') out.push(full)
  }

  return out
}

function main() {
  const issues = validateFeatureArchitecture()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const pageContract = getPageCompositionContract()
  const softLimits = pageContract.softLimits
  const pages = listPages(path.join(process.cwd(), 'src/app'))

  pages.forEach((page) => {
    const rel = path.relative(process.cwd(), page)
    const text = fs.readFileSync(page, 'utf-8')
    const lines = text.split('\n').length
    const imports = text.split('\n').filter((line) => line.startsWith('import ')).length

    if (lines > softLimits.maxPageFileLines) warnings.push(`large page file: ${rel} (${lines})`)
    if (imports > softLimits.maxPageImports) warnings.push(`too many imports in page: ${rel} (${imports})`)

    if (text.includes('visibility ===') || text.includes('visibility !==')) {
      warnings.push(`page may contain direct visibility decision: ${rel}`)
    }
  })

  const modules = getFeatureModuleContract().featureModules
  modules.forEach((module) => {
    const hasExistingPath = module.paths.some((item) => {
      const normalized = item.replace('*', '')
      return fs.existsSync(path.join(process.cwd(), normalized))
    })

    if (!hasExistingPath) warnings.push(`feature module has no concrete path yet: ${module.id}`)
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Feature architecture check passed. warnings=${warnings.length}`)
}

main()
