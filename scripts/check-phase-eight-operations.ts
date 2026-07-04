import fs from 'node:fs'
import path from 'node:path'
import phaseEightMonitoringErrorTrackingPlan from '../data/versions/archive/phase-eight-monitoring-error-tracking-plan.json'
import phaseEightProductionSmokePlan from '../data/release/phase-eight-production-smoke-plan.json'
import phaseEightRollbackDrillPlan from '../data/versions/archive/phase-eight-rollback-drill-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseEightProductionSmokePlan.productionSmokePassed !== false) errors.push('production smoke must remain false')
  if (phaseEightProductionSmokePlan.checks.length < 8) errors.push('production smoke checks too few')
  if (phaseEightProductionSmokePlan.checks.some((item) => item.status === 'passed')) errors.push('smoke check pre-marked passed')
  if (phaseEightMonitoringErrorTrackingPlan.channels.length < 4) errors.push('monitoring channels too few')
  if (phaseEightMonitoringErrorTrackingPlan.alertRules.length < 6) errors.push('alert rules too few')
  if (phaseEightRollbackDrillPlan.rollbackDrillPassed !== false) errors.push('rollback drill must remain false')
  if (phaseEightRollbackDrillPlan.steps.length < 6) errors.push('rollback steps too few')

  ;[
    'src/lib/phase-eight-operations.ts',
    'src/components/production/ProductionSmokePanel.tsx',
    'src/components/production/MonitoringPanel.tsx',
    'src/components/production/RollbackDrillPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing operations file: ${file}`)
  })

  const page = read('src/app/production/page.tsx')
  if (!page.includes('ProductionSmokePanel') || !page.includes('MonitoringPanel') || !page.includes('RollbackDrillPanel')) {
    errors.push('production page missing operations panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eight-operations']) errors.push('package missing check:phase-eight-operations')
  if (!pkg.scripts['phase-eight-operations:print']) errors.push('package missing phase-eight-operations:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eight operations check passed.')
}

main()
