import { V5MetricsLedger } from './observability'

export type V5BudgetPolicy = {
  monthlyLimit: number
  highCostActionRequiresApproval: boolean
}

export function evaluateV5Budget(policy: V5BudgetPolicy, ledger: V5MetricsLedger) {
  const agentCost = ledger.totalByKind('agent-cost')
  const pluginCost = ledger.totalByKind('plugin-execution')
  const total = agentCost + pluginCost

  return {
    total,
    withinBudget: total <= policy.monthlyLimit,
    approvalRequired: policy.highCostActionRequiresApproval && total > policy.monthlyLimit * 0.8,
  }
}
