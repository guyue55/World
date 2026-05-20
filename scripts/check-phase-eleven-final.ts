import fs from 'node:fs'
import path from 'node:path'
import humanApprovalWorkflow from '../data/human-approval-workflow.json'
import operatorDashboardPlan from '../data/operator-dashboard-plan.json'
import phaseElevenRuntimeFinalReport from '../data/phase-eleven-runtime-final-report.json'
import phaseTwelveEntryGate from '../data/phase-twelve-entry-gate.json'
import runtimeActionRegistry from '../data/runtime-action-registry.json'
import runtimeAdapterContract from '../data/runtime-adapter-contract.json'
import runtimeEvidenceRecordPlan from '../data/runtime-evidence-record-plan.json'
import runtimeGrowthLoopPlan from '../data/runtime-growth-loop-plan.json'
import runtimeIntegrationGates from '../data/runtime-integration-gates.json'
import runtimeReadinessBoard from '../data/runtime-readiness-board.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseElevenRuntimeFinalReport.completedBatches.length !== 4) {
    errors.push('phase eleven final report must record 4 batches')
  }

  if (phaseElevenRuntimeFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseElevenRuntimeFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }

  if (phaseElevenRuntimeFinalReport.runtimeDecision !== 'runtime-automation-structure-ready-real-execution-not-started') {
    errors.push('runtimeDecision mismatch')
  }

  const flags = [
    humanApprovalWorkflow.workflowReady,
    runtimeActionRegistry.registryReady,
    runtimeGrowthLoopPlan.growthLoopReady,
    runtimeEvidenceRecordPlan.evidenceReady,
    operatorDashboardPlan.dashboardReady,
    runtimeIntegrationGates.integrationReady,
    runtimeAdapterContract.adapterReady,
    runtimeReadinessBoard.runtimeReady,
  ]

  if (flags.some((flag) => flag !== false)) {
    errors.push('all runtime readiness flags must remain false')
  }

  if (phaseElevenRuntimeFinalReport.phaseTwelveEntryDecision !== 'phase-twelve-planning-allowed-real-platformization-and-governance-not-started') {
    errors.push('phase twelve entry decision mismatch')
  }

  if (!phaseTwelveEntryGate.mustNotDo.includes('store secrets in repository')) {
    errors.push('phase twelve gate must forbid storing secrets in repository')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eleven-final']) errors.push('package missing check:phase-eleven-final')
  if (!pkg.scripts['phase-eleven-final:print']) errors.push('package missing phase-eleven-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eleven final check passed.')
}

main()
