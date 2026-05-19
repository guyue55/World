import fs from 'node:fs'
import path from 'node:path'
import { getToolingBaseline, validateToolingPackage } from '../src/lib/tooling-baseline'

function main() {
  const baseline = getToolingBaseline()
  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
  const issues = validateToolingPackage(pkg)
  const errors = issues.filter((issue) => issue.severity === 'error')

  const missingFiles = baseline.requiredFiles.filter((file) => !fs.existsSync(path.join(process.cwd(), file)))
  const allErrors = [
    ...errors.map((issue) => `${issue.id}: ${issue.message}`),
    ...missingFiles.map((file) => `missing-file: ${file}`),
  ]

  if (allErrors.length > 0) {
    throw new Error(allErrors.join('\n'))
  }

  console.log(`Tooling check passed. scripts=${baseline.requiredScripts.length}, devDependencies=${baseline.requiredDevDependencies.length}`)
}

main()
