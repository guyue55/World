// 用途：检查架构契约
import fs from 'node:fs'
import path from 'node:path'
import { getCouplingGuard, validateArchitectureContracts } from '../src/lib/architecture-contracts'

function listFiles(root: string, exts: string[]): string[] {
  const out: string[] = []
  if (!fs.existsSync(root)) return out

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) {
      out.push(...listFiles(full, exts))
    } else if (exts.some((ext) => full.endsWith(ext))) {
      out.push(full)
    }
  }

  return out
}

function main() {
  const issues = validateArchitectureContracts()
  const warnings: string[] = []
  const errors: string[] = []

  issues.forEach((issue) => {
    if (issue.severity === 'error') errors.push(`${issue.id}: ${issue.message}`)
    else warnings.push(`${issue.id}: ${issue.message}`)
  })

  const guard = getCouplingGuard()
  const files = [
    ...listFiles(path.join(process.cwd(), 'src/app'), ['.ts', '.tsx']),
    ...listFiles(path.join(process.cwd(), 'src/components'), ['.ts', '.tsx']),
    ...listFiles(path.join(process.cwd(), 'src/lib'), ['.ts', '.tsx']),
    ...listFiles(path.join(process.cwd(), 'scripts'), ['.ts']),
  ]

  files.forEach((file) => {
    const rel = path.relative(process.cwd(), file)
    const lineCount = fs.readFileSync(file, 'utf-8').split('\n').length

    if (rel.startsWith('src/lib') && lineCount > guard.softLimits.maxLibFileLines) {
      warnings.push(`large lib file: ${rel} (${lineCount})`)
    }

    if (rel.startsWith('src/components') && lineCount > guard.softLimits.maxComponentFileLines) {
      warnings.push(`large component file: ${rel} (${lineCount})`)
    }

    if (rel.startsWith('src/app') && lineCount > guard.softLimits.maxPageFileLines) {
      warnings.push(`large page file: ${rel} (${lineCount})`)
    }

    if (rel.startsWith('scripts') && lineCount > guard.softLimits.maxScriptFileLines) {
      warnings.push(`large script file: ${rel} (${lineCount})`)
    }

    const content = fs.readFileSync(file, 'utf-8')

    if (rel.startsWith('src/lib') && (content.includes("from '@/components") || content.includes("from '../components") || content.includes("from '@/app"))) {
      errors.push(`src/lib must not import app/components: ${rel}`)
    }

    if (rel.startsWith('src/components') && content.includes("from '@/app")) {
      errors.push(`src/components must not import app: ${rel}`)
    }
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Architecture contract check passed. warnings=${warnings.length}`)
}

main()
