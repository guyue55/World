import fs from 'node:fs'
import path from 'node:path'
import {
  getPerformanceRegressionGuard,
  getRoutePerformanceProfiles,
  validatePerformanceRegression,
} from '../src/lib/performance-regression'

function main() {
  const issues = validatePerformanceRegression()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const profiles = new Set(getRoutePerformanceProfiles().profiles.map((profile) => profile.route))
  ;['/', '/atlas', '/archive', '/node/[slug]', '/paths', '/ask', '/status', '/skeleton'].forEach((route) => {
    if (!profiles.has(route)) errors.push(`missing route performance profile: ${route}`)
  })

  const stackFile = path.join(process.cwd(), 'src/components/_legacy/WorldFoundationStack.tsx')
  if (!fs.existsSync(stackFile)) {
    errors.push('missing WorldFoundationStack boundary')
  }

  const guard = getPerformanceRegressionGuard()
  if (!guard.futureCiSlots.includes('bundle-analyzer')) {
    warnings.push('bundle-analyzer future CI slot is not registered')
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Performance regression check passed. warnings=${warnings.length}`)
}

main()
