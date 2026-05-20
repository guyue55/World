import fs from 'node:fs'
import path from 'node:path'
import humanApprovalWorkflow from '../data/core/human-approval-workflow.json'
import phaseElevenEntryGate from '../data/release/phase-eleven-entry-gate.json'
import phaseElevenRuntimeAutomationScopeContract from '../data/core/phase-eleven-runtime-automation-scope-contract.json'
import runtimeActionRegistry from '../data/core/runtime-action-registry.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseElevenEntryGate.entryDecision !== 'phase-eleven-planning-allowed-real-runtime-automation-and-growth-loop-not-started') {
    errors.push('phase eleven entry decision mismatch')
  }

  if (phaseElevenRuntimeAutomationScopeContract.focus.length < 8) errors.push('phase eleven focus too small')
  if (!phaseElevenRuntimeAutomationScopeContract.nonGoals.includes('AI autonomous publishing')) errors.push('must forbid AI autonomous publishing')

  if (humanApprovalWorkflow.workflowReady !== false) errors.push('workflowReady must remain false')
  if (humanApprovalWorkflow.approvalTypes.length < 6) errors.push('approval types too few')
  if (humanApprovalWorkflow.approvalTypes.some((item) => item.requiresEvidence !== true)) {
    errors.push('approval types must require evidence')
  }

  if (runtimeActionRegistry.registryReady !== false) errors.push('registryReady must remain false')
  if (runtimeActionRegistry.actions.length < 6) errors.push('runtime actions too few')
  if (runtimeActionRegistry.actions.some((item) => item.default !== 'approval-required')) {
    errors.push('all runtime actions must require approval')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eleven-runtime-scope']) errors.push('package missing check:phase-eleven-runtime-scope')
  if (!pkg.scripts['phase-eleven-runtime-scope:print']) errors.push('package missing phase-eleven-runtime-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eleven runtime scope check passed.')
}

main()
