import { evaluateAIBoundary } from '../src/lib/ai-boundary'
import { assertPermissionConsistency } from '../src/lib/permissions'

function main() {
  assertPermissionConsistency()

  const issues = evaluateAIBoundary()
  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }

  console.log(`AI boundary check passed. warnings=${issues.length - errors.length}`)
}

main()
