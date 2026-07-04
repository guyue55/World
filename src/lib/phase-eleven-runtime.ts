import humanApprovalWorkflow from '../../data/core/human-approval-workflow.json'
import operatorDashboardPlan from '../../data/operations/operator-dashboard-plan.json'
import runtimeActionRegistry from '../../data/core/runtime-action-registry.json'
import runtimeEvidenceRecordPlan from '../../data/release/runtime-evidence-record-plan.json'
import runtimeGrowthLoopPlan from '../../data/operations/runtime-growth-loop-plan.json'

export function getHumanApprovalWorkflow() {
  return humanApprovalWorkflow
}

export function getRuntimeActionRegistry() {
  return runtimeActionRegistry
}

export function getRuntimeGrowthLoopPlan() {
  return runtimeGrowthLoopPlan
}

export function getRuntimeEvidenceRecordPlan() {
  return runtimeEvidenceRecordPlan
}

export function getOperatorDashboardPlan() {
  return operatorDashboardPlan
}

export function getPhaseElevenRuntimeSummary() {
  return {
    stageProgress: operatorDashboardPlan.stageProgress,
    workflowReady: humanApprovalWorkflow.workflowReady,
    approvalTypes: humanApprovalWorkflow.approvalTypes.length,
    registryReady: runtimeActionRegistry.registryReady,
    runtimeActions: runtimeActionRegistry.actions.length,
    growthLoopReady: runtimeGrowthLoopPlan.growthLoopReady,
    growthSteps: runtimeGrowthLoopPlan.steps.length,
    evidenceReady: runtimeEvidenceRecordPlan.evidenceReady,
    evidenceRecords: runtimeEvidenceRecordPlan.records.length,
    dashboardReady: operatorDashboardPlan.dashboardReady,
    dashboardCards: operatorDashboardPlan.cards.length,
  }
}
