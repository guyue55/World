// 用途：检查压舱石
import { validateBallast } from '../src/lib/ballast'

function main() {
  const issues = validateBallast()
  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }

  console.log(`Ballast check passed. warnings=${issues.length - errors.length}`)
}

main()
