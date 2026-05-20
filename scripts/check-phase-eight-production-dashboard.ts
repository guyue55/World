import fs from 'node:fs'
import path from 'node:path'
import phaseEightDomainHttpsCdnPolicy from '../data/phase-eight-domain-https-cdn-policy.json'
import phaseEightProductionDashboard from '../data/phase-eight-production-dashboard.json'
import phaseEightProductionDeploymentChecklist from '../data/phase-eight-production-deployment-checklist.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseEightProductionDashboard.productionLive !== false) errors.push('productionLive must remain false')
  if (phaseEightProductionDashboard.cards.length < 5) errors.push('dashboard cards too few')
  if (phaseEightProductionDeploymentChecklist.steps.length < 10) errors.push('deployment steps too few')
  if (phaseEightProductionDeploymentChecklist.steps.some((item) => item.status === 'passed')) {
    errors.push('deployment step must not be pre-marked passed')
  }
  if (phaseEightDomainHttpsCdnPolicy.https.enforceHttps !== true) errors.push('HTTPS must be enforced')
  if (phaseEightDomainHttpsCdnPolicy.domain.currentValueStored !== false) errors.push('real domain must not be stored in repo')

  ;[
    'src/app/production/page.tsx',
    'src/lib/phase-eight-production.ts',
    'src/components/production/ProductionHero.tsx',
    'src/components/production/ProductionDashboardPanel.tsx',
    'src/components/production/ProductionEnvironmentPanel.tsx',
    'src/components/production/DeploymentChecklistPanel.tsx',
    'src/components/production/DomainHttpsCdnPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing production file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eight-production-dashboard']) errors.push('package missing check:phase-eight-production-dashboard')
  if (!pkg.scripts['phase-eight-production-dashboard:print']) errors.push('package missing phase-eight-production-dashboard:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eight production dashboard check passed.')
}

main()
