export type ProductionGateStatus = 'passed' | 'pending' | 'blocked'

export type ProductionGate = {
  id: string
  title: string
  status: ProductionGateStatus
  evidence: string
  requiredForProduction: boolean
}
