export type AdapterStatus = 'mocked' | 'planned' | 'blocked'
export type AdapterRisk = 'low' | 'medium' | 'high'

export type ServiceAdapterContract = {
  id: string
  name: string
  status: AdapterStatus
  risk: AdapterRisk
  purpose: string
  secretPolicy: string
  productionReady: boolean
}
