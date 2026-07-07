import fs from 'node:fs'
import path from 'node:path'
import {
  getLayoutResponsiveContract,
  getVisualQaChecklist,
  validateVisualInteractionQa,
} from '../src/lib/visual-interaction-qa'

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
  const issues = validateVisualInteractionQa()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const contract = getLayoutResponsiveContract()
  const zones = new Set(contract.layoutZones.map((zone) => zone.id))
  ;['reading', 'content', 'dashboard', 'immersive', 'full-bleed-soft'].forEach((zone) => {
    if (!zones.has(zone)) errors.push(`missing layout zone: ${zone}`)
  })

  const routes = new Set(getVisualQaChecklist().routes.map((route) => route.route))
  ;['/', '/atlas', '/archive', '/node/[slug]', '/paths', '/ask', '/status', '/skeleton'].forEach((route) => {
    if (!routes.has(route)) errors.push(`missing visual QA route: ${route}`)
  })

  const pages = listPages(path.join(process.cwd(), 'src/app'))
  pages.forEach((file) => {
    const rel = path.relative(process.cwd(), file)
    const text = fs.readFileSync(file, 'utf-8')
    if (text.includes('max-w-3xl') && (rel.includes('status') || rel.includes('skeleton'))) {
      warnings.push(`dashboard route may be too narrow: ${rel}`)
    }
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Visual/interaction QA check passed. warnings=${warnings.length}`)
}

main()
