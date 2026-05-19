import { validateExtensionRegistry } from '../src/lib/extensions'
import { assertFutureCompatibility } from '../src/lib/future-compatibility'

function main() {
  assertFutureCompatibility()

  const issues = validateExtensionRegistry()
  const warnings = issues.filter((issue) => issue.severity === 'warning')

  console.log(`Extension registry check passed. warnings=${warnings.length}`)
}

main()
