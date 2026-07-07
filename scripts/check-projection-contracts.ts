// 用途：检查投影契约
import { validateProjectionContracts } from '../src/lib/projection-contracts'

function main() {
  const issues = validateProjectionContracts()
  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }

  console.log(`Projection contract check passed. warnings=${issues.length - errors.length}`)
}

main()
