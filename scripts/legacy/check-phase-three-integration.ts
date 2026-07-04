import fs from 'node:fs'
import path from 'node:path'
import phaseThreeIntegrationFinalReport from '../data/release/phase-three-integration-final-report.json'
import phaseThreeIntegrationReadiness from '../data/release/phase-three-integration-readiness.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const expectedRoutes = ['/phase-three', '/exhibitions', '/ai-workbench', '/export-center']

  if (phaseThreeIntegrationFinalReport.completedBatches.length !== 4) {
    errors.push('integration final report must record 4 batches')
  }

  expectedRoutes.forEach((route) => {
    if (!phaseThreeIntegrationFinalReport.integratedRoutes.includes(route)) {
      errors.push(`missing integrated route: ${route}`)
    }
  })

  if (phaseThreeIntegrationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('integration release decision must remain not-ready-for-release')
  }

  if (!phaseThreeIntegrationReadiness.items.some((item) => item.status === 'pending-real-browser-qa')) {
    errors.push('integration readiness must keep pending real browser QA')
  }

  if (!phaseThreeIntegrationReadiness.items.some((item) => item.status === 'blocked')) {
    errors.push('integration readiness must keep blocked release-ready item')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('release blockers must remain visible')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('PhaseThreeIntegrationClosurePanel')) {
    errors.push('status groups must include PhaseThreeIntegrationClosurePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-three-integration']) errors.push('package missing check:phase-three-integration')
  if (!pkg.scripts['phase-three-integration:print']) errors.push('package missing phase-three-integration:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase three integration check passed.')
}

main()
