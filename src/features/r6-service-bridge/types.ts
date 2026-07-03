export type R6Risk = 'low' | 'medium' | 'high' | 'critical'
export type R6RoleId = 'owner' | 'visitor' | 'ai-lighthouse'
export type R6ApiVisibility = 'public' | 'owner-only'

export type R6Role = {
  id: R6RoleId
  can: string[]
}

export type R6ApiContract = {
  id: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  path: string
  visibility: R6ApiVisibility
  mutates: boolean
}

export type R6StoragePort = {
  id: string
  purpose: string
  implementation: string
}

export type R6Operation = {
  id: string
  kind: string
  status: string
  risk: R6Risk
}

export type R6AuditEvent = {
  id: string
  actor: string
  action: string
  target: string
  result: string
  mutatesWorld: boolean
}

export type R6ExportJob = {
  id: string
  scope: string
  status: string
  containsPrivate: boolean | string
}

export type R6Summary = {
  stages: number
  batches: number
  roles: number
  apiContracts: number
  storagePorts: number
  operations: number
  auditEvents: number
  exportJobs: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
