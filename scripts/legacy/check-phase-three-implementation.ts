import fs from 'node:fs'
import path from 'node:path'
import phaseThreeImplementationFinalReport from '../data/release/phase-three-implementation-final-report.json'
import phaseThreeImplementationRoutes from '../data/domains/experience/phase-three-implementation-routes.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  ;['/exhibitions', '/ai-workbench', '/export-center'].forEach((route) => {
    if (!phaseThreeImplementationFinalReport.implementedRoutes.includes(route)) {
      errors.push(`missing implemented route: ${route}`)
    }
  })

  if (phaseThreeImplementationFinalReport.implementedBatches.length !== 4) {
    errors.push('implementation report must record four batches')
  }

  if (phaseThreeImplementationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('implementation release decision must remain not-ready-for-release')
  }

  if (phaseThreeImplementationRoutes.routes.length < 3) {
    errors.push('implementation route registry too small')
  }

  ;['src/app/exhibitions/page.tsx', 'src/app/ai-workbench/page.tsx', 'src/app/export-center/page.tsx'].forEach((file) => {
    if (!exists(file)) errors.push(`missing route file: ${file}`)
  })

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release prep final report must remain not-ready-for-release')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('release blockers must remain visible')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-three-implementation']) errors.push('package missing check:phase-three-implementation')
  if (!pkg.scripts['phase-three-implementation:print']) errors.push('package missing phase-three-implementation:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase three implementation check passed.')
}

main()
