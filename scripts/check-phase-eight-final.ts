import fs from 'node:fs'
import path from 'node:path'
import phaseEightProductionDashboard from '../data/release/phase-eight-production-dashboard.json'
import phaseEightProductionDeploymentChecklist from '../data/release/phase-eight-production-deployment-checklist.json'
import phaseEightProductionFinalReport from '../data/release/phase-eight-production-final-report.json'
import phaseEightProductionSmokePlan from '../data/release/phase-eight-production-smoke-plan.json'
import phaseEightRollbackDrillPlan from '../data/versions/archive/phase-eight-rollback-drill-plan.json'
import phaseNineEntryGate from '../data/release/phase-nine-entry-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseEightProductionFinalReport.completedBatches.length !== 4) {
    errors.push('phase eight final report must record 4 batches')
  }

  if (phaseEightProductionFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseEightProductionFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }

  if (phaseEightProductionDashboard.productionLive !== false) {
    errors.push('production dashboard must keep productionLive=false')
  }

  if (phaseEightProductionSmokePlan.productionSmokePassed !== false) {
    errors.push('production smoke must remain false')
  }

  if (phaseEightRollbackDrillPlan.rollbackDrillPassed !== false) {
    errors.push('rollback drill must remain false')
  }

  if (phaseEightProductionDeploymentChecklist.steps.some((item) => item.status === 'passed')) {
    errors.push('deployment steps must not be pre-marked passed')
  }

  if (phaseEightProductionFinalReport.phaseNineEntryDecision !== 'phase-nine-planning-allowed-real-content-ecosystem-and-brand-not-started') {
    errors.push('phase nine entry decision mismatch')
  }

  if (!phaseNineEntryGate.mustNotDo.includes('claim production live without deployment evidence')) {
    errors.push('phase nine gate must forbid fake production claim')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eight-final']) errors.push('package missing check:phase-eight-final')
  if (!pkg.scripts['phase-eight-final:print']) errors.push('package missing phase-eight-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eight final check passed.')
}

main()
