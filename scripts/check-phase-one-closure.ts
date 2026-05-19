import fs from 'node:fs'
import path from 'node:path'
import {
  getPhaseOneCompletionMatrix,
  getPhaseOneExitCriteria,
  getPhaseOneRemainingWork,
  validatePhaseOneClosure,
} from '../src/lib/phase-one-closure'

function main() {
  const issues = validatePhaseOneClosure()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  getPhaseOneCompletionMatrix().completedDomains.forEach((domain) => {
    domain.evidence.forEach((item) => {
      if (!item.includes('*') && !fs.existsSync(path.join(process.cwd(), item))) {
        warnings.push(`completion evidence not found directly: ${item}`)
      }
    })
  })

  const p0 = getPhaseOneRemainingWork().items.filter((item) => item.priority === 'P0')
  if (p0.length === 0) errors.push('no P0 remaining work registered')

  const buildCriterion = getPhaseOneExitCriteria().mustPass.find((item) => item.id === 'real-build')
  if (!buildCriterion) errors.push('real build exit criterion missing')

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Phase one closure check passed. warnings=${warnings.length}`)
}

main()
