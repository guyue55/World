import fs from 'node:fs'
import path from 'node:path'
import phaseThreeRouteIntegrationContract from '../data/phase-three-route-integration-contract.json'
import phaseThreeImplementationRoutes from '../data/phase-three-implementation-routes.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []
  const expectedRoutes = ['/exhibitions', '/ai-workbench', '/export-center']
  const integrated = new Set(phaseThreeRouteIntegrationContract.routes.map((route) => route.route))
  const registered = new Set(phaseThreeImplementationRoutes.routes.map((route) => route.route))

  expectedRoutes.forEach((route) => {
    if (!integrated.has(route)) errors.push(`missing integrated route: ${route}`)
    if (!registered.has(route)) errors.push(`missing registered route: ${route}`)
  })

  phaseThreeRouteIntegrationContract.routes.forEach((route) => {
    if (route.releaseStatus !== 'static-prototype') errors.push(`route must remain static-prototype: ${route.route}`)
  })

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  if (!exists('src/components/phase-three/PhaseThreeRoutePanel.tsx')) {
    errors.push('missing PhaseThreeRoutePanel')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('PhaseThreeRoutePanel')) {
    errors.push('status groups must include PhaseThreeRoutePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-three-routes']) errors.push('package missing check:phase-three-routes')
  if (!pkg.scripts['phase-three-routes:print']) errors.push('package missing phase-three-routes:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase three route integration check passed.')
}

main()
