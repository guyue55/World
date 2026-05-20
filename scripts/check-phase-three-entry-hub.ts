import fs from 'node:fs'
import path from 'node:path'
import phaseThreeEntryHubContract from '../data/core/phase-three-entry-hub-contract.json'
import phaseThreeRouteIntegrationContract from '../data/domains/experience/phase-three-route-integration-contract.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (phaseThreeEntryHubContract.route !== '/phase-three') {
    errors.push('phase three entry route must be /phase-three')
  }

  if (phaseThreeEntryHubContract.entries.length < 3) {
    errors.push('phase three entry count too low')
  }

  if (!phaseThreeEntryHubContract.warnings.some((warning) => warning.includes('release-ready'))) {
    errors.push('phase three entry warnings must mention release-ready')
  }

  if (!phaseThreeRouteIntegrationContract.routes.some((route) => route.route === '/phase-three')) {
    errors.push('route integration must include /phase-three')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  if (!exists('src/app/phase-three/page.tsx')) errors.push('missing phase-three page')
  if (!exists('src/components/phase-three-entry/PhaseThreeEntryHero.tsx')) errors.push('missing PhaseThreeEntryHero')
  if (!exists('src/components/phase-three-entry/PhaseThreeEntryGrid.tsx')) errors.push('missing PhaseThreeEntryGrid')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase three entry hub check passed.')
}

main()
