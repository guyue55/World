import fs from 'node:fs'
import path from 'node:path'
import {
  getPerformanceGuard,
  getRuntimeSplitContract,
  validatePerformanceImplementation,
} from '../src/lib/performance-implementation'

function main() {
  const issues = validatePerformanceImplementation()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  getPerformanceGuard().checks.forEach((check) => {
    const target = path.join(process.cwd(), check.target)
    if (!fs.existsSync(target)) errors.push(`missing performance guard target: ${check.target}`)
  })

  const split = getRuntimeSplitContract()
  const stackTarget = split.splitTargets.find((item) => item.id === 'foundation-panel-stack')
  if (!stackTarget || stackTarget.status !== 'implemented-boundary') {
    errors.push('foundation-panel-stack must be implemented-boundary')
  }

  const stackFile = path.join(process.cwd(), 'src/components/world/WorldFoundationStack.tsx')
  if (fs.existsSync(stackFile)) {
    const text = fs.readFileSync(stackFile, 'utf-8')
    if (!text.includes('PerformanceContractPanel')) {
      warnings.push('WorldFoundationStack does not include PerformanceContractPanel')
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Performance implementation check passed. warnings=${warnings.length}`)
}

main()
