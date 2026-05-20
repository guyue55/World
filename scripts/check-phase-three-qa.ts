import fs from 'node:fs'
import path from 'node:path'
import phaseThreeQaExpansionContract from '../data/phase-three-qa-expansion-contract.json'
import browserQaRouteCoverage from '../data/browser-qa-route-coverage.json'
import browserQaRecords from '../data/browser-qa-records.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const coverage = new Map(browserQaRouteCoverage.routes.map((item) => [item.route, item.coverageCount]))

  phaseThreeQaExpansionContract.newRoutes.forEach((route) => {
    if ((coverage.get(route) ?? 0) < 2) {
      errors.push(`new phase three route needs at least 2 viewport coverage: ${route}`)
    }
  })

  if (phaseThreeQaExpansionContract.interactionFocus.length < 6) {
    errors.push('phase three QA interaction focus too few')
  }

  if (browserQaRecords.matrix.length < 5) {
    errors.push('browser QA matrix unexpectedly small')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('PhaseThreeQaPanel')) {
    errors.push('status groups must include PhaseThreeQaPanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-three-qa']) errors.push('package missing check:phase-three-qa')
  if (!pkg.scripts['phase-three-qa:print']) errors.push('package missing phase-three-qa:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase three QA check passed.')
}

main()
