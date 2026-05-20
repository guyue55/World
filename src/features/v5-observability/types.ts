export type V5MetricKind =
  | 'health'
  | 'error'
  | 'latency'
  | 'build'
  | 'agent-cost'
  | 'plugin-execution'
  | 'publishing'

export type V5MetricEvent = {
  id: string
  kind: V5MetricKind
  value: number
  unit: string
  createdAt: string
}

export type V5BudgetPolicy = {
  monthlyLimit: number
  highCostActionRequiresApproval: boolean
}
