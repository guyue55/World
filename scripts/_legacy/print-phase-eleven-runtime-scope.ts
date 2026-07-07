import humanApprovalWorkflow from '../data/core/human-approval-workflow.json'
import phaseElevenRuntimeAutomationScopeContract from '../data/core/phase-eleven-runtime-automation-scope-contract.json'
import runtimeActionRegistry from '../data/core/runtime-action-registry.json'

function main() {
  console.log(`${phaseElevenRuntimeAutomationScopeContract.name}`)
  console.log(`stageProgress=${phaseElevenRuntimeAutomationScopeContract.stageProgress}`)
  console.log(`focus=${phaseElevenRuntimeAutomationScopeContract.focus.length}`)
  console.log(`workflowReady=${humanApprovalWorkflow.workflowReady}`)
  console.log(`approvalTypes=${humanApprovalWorkflow.approvalTypes.length}`)
  console.log(`registryReady=${runtimeActionRegistry.registryReady}`)
  console.log(`runtimeActions=${runtimeActionRegistry.actions.length}`)
}

main()
