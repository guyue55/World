import fs from 'node:fs'
import path from 'node:path'
import operatorDashboardPlan from '../data/operator-dashboard-plan.json'
import runtimeEvidenceRecordPlan from '../data/runtime-evidence-record-plan.json'
import runtimeGrowthLoopPlan from '../data/runtime-growth-loop-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (runtimeGrowthLoopPlan.growthLoopReady !== false) errors.push('growthLoopReady must remain false')
  if (runtimeGrowthLoopPlan.steps.length < 6) errors.push('growth loop steps too few')
  if (runtimeGrowthLoopPlan.steps.filter((item) => item.writes).some((item) => item.automation !== 'approval-required' && item.automation !== 'manual')) {
    errors.push('writes=true growth steps must require approval or manual action')
  }
  if (runtimeEvidenceRecordPlan.evidenceReady !== false) errors.push('evidenceReady must remain false')
  if (runtimeEvidenceRecordPlan.records.length < 6) errors.push('evidence records too few')
  if (runtimeEvidenceRecordPlan.records.some((item) => item.required !== true)) errors.push('all evidence records must be required')
  if (operatorDashboardPlan.dashboardReady !== false) errors.push('dashboardReady must remain false')
  if (operatorDashboardPlan.cards.length < 5) errors.push('dashboard cards too few')

  ;[
    'src/app/operator/page.tsx',
    'src/lib/phase-eleven-runtime.ts',
    'src/components/operator/OperatorHero.tsx',
    'src/components/operator/ApprovalWorkflowPanel.tsx',
    'src/components/operator/RuntimeActionsPanel.tsx',
    'src/components/operator/GrowthLoopPanel.tsx',
    'src/components/operator/RuntimeEvidencePanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing operator file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eleven-operator']) errors.push('package missing check:phase-eleven-operator')
  if (!pkg.scripts['phase-eleven-operator:print']) errors.push('package missing phase-eleven-operator:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eleven operator check passed.')
}

main()
