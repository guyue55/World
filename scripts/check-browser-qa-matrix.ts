import fs from 'node:fs'
import path from 'node:path'
import browserQaExecutionContract from '../data/browser-qa-execution-contract.json'
import browserQaRecords from '../data/browser-qa-records.json'
import browserQaRouteCoverage from '../data/browser-qa-route-coverage.json'
import realValidationDefectProtocol from '../data/real-validation-defect-protocol.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const allRoutes = new Set(browserQaRecords.matrix.flatMap((item) => item.routes))
  const allViewports = new Set(browserQaRecords.matrix.map((item) => item.viewport))

  browserQaExecutionContract.requiredRoutes.forEach((route) => {
    if (!allRoutes.has(route)) errors.push(`browser QA missing required route: ${route}`)
  })

  browserQaExecutionContract.requiredViewports.forEach((viewport) => {
    if (!allViewports.has(viewport)) errors.push(`browser QA missing required viewport: ${viewport}`)
  })

  browserQaRecords.matrix.forEach((item) => {
    if (!Array.isArray(item.checkedItems) || item.checkedItems.length < 8) {
      errors.push(`browser QA item missing checkedItems: ${item.viewport}`)
    }
  })

  const routeCoverage = new Map(browserQaRouteCoverage.routes.map((item) => [item.route, item.coverageCount]))
  ;['/', '/archive', '/status', '/skeleton'].forEach((route) => {
    if ((routeCoverage.get(route) ?? 0) < 2) {
      errors.push(`important route coverage too low: ${route}`)
    }
  })

  if (!realValidationDefectProtocol.allowedSources.includes('browser-qa')) {
    errors.push('defect protocol must allow browser-qa source')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('BrowserQaMatrixPanel')) {
    errors.push('status groups must include BrowserQaMatrixPanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['browser-qa:plan']) errors.push('package missing browser-qa:plan')
  if (!pkg.scripts['check:browser-qa-matrix']) errors.push('package missing check:browser-qa-matrix')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Browser QA matrix check passed.')
}

main()
