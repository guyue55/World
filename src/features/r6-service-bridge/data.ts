import apiContractsData from '../../../data/r6-service-bridge/api-contracts.json'
import auditEventsData from '../../../data/r6-service-bridge/audit-events.json'
import exportJobsData from '../../../data/r6-service-bridge/export-jobs.json'
import identityRbacData from '../../../data/r6-service-bridge/identity-rbac.json'
import operationQueueData from '../../../data/r6-service-bridge/operation-queue.json'
import privacyBoundaryData from '../../../data/r6-service-bridge/privacy-boundary.json'
import r7HandoffData from '../../../data/r6-service-bridge/r7-handoff.json'
import roadmapData from '../../../data/r6-service-bridge/roadmap.json'
import serviceHealthData from '../../../data/r6-service-bridge/service-health.json'
import storagePortsData from '../../../data/r6-service-bridge/storage-ports.json'
import type { R6ApiContract, R6AuditEvent, R6ExportJob, R6Operation, R6Role, R6StoragePort, R6Summary } from './types'

export const r6Roadmap = roadmapData
export const r6Stages = roadmapData.stages
export const r6Batches = roadmapData.batches
export const r6Roles = identityRbacData.roles as R6Role[]
export const r6ForbiddenRoleActions = identityRbacData.forbidden
export const r6ApiContracts = apiContractsData.contracts as R6ApiContract[]
export const r6StoragePorts = storagePortsData.ports as R6StoragePort[]
export const r6Operations = operationQueueData.items as R6Operation[]
export const r6AuditEvents = auditEventsData.events as R6AuditEvent[]
export const r6ExportJobs = exportJobsData.jobs as R6ExportJob[]
export const r6PrivacyRules = privacyBoundaryData.rules
export const r6ForbiddenTerms = privacyBoundaryData.forbiddenTerms
export const r6ServiceHealth = serviceHealthData
export const r6R7Handoff = r7HandoffData.items

export function getR6Summary(): R6Summary {
  return {
    stages: r6Stages.length,
    batches: r6Batches.length,
    roles: r6Roles.length,
    apiContracts: r6ApiContracts.length,
    storagePorts: r6StoragePorts.length,
    operations: r6Operations.length,
    auditEvents: r6AuditEvents.length,
    exportJobs: r6ExportJobs.length,
    productionLive: Boolean(r6Roadmap.productionLive),
    releaseReady: Boolean(r6Roadmap.releaseReady),
    cleanProductionReady: Boolean(r6Roadmap.cleanProductionReady),
  }
}

export function getR6PublicApiContracts(): R6ApiContract[] {
  return r6ApiContracts.filter((contract) => contract.visibility === 'public')
}

export function getR6OwnerOnlyApiContracts(): R6ApiContract[] {
  return r6ApiContracts.filter((contract) => contract.visibility === 'owner-only')
}

export function getR6PendingOperations(): R6Operation[] {
  return r6Operations.filter((operation) => !operation.status.includes('complete'))
}
