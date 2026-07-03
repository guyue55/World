import apiContracts from '../../../data/v9-service-platform/api-contracts.json'
import auditGovernance from '../../../data/v9-service-platform/audit-governance.json'
import consoleWorkflows from '../../../data/v9-service-platform/console-workflows.json'
import extensionRegistry from '../../../data/v9-service-platform/extension-registry.json'
import identityRbac from '../../../data/v9-service-platform/identity-rbac.json'
import integrationAdapters from '../../../data/v9-service-platform/integration-adapters.json'
import qualitySecurity from '../../../data/v9-service-platform/quality-security.json'
import roadmap from '../../../data/v9-service-platform/roadmap.json'
import serviceBlueprint from '../../../data/v9-service-platform/service-blueprint.json'
import serviceEvidenceLedger from '../../../data/v9-service-platform/service-evidence-ledger.json'
import storageMigration from '../../../data/v9-service-platform/storage-migration.json'
import v10Handoff from '../../../data/v9-service-platform/v10-handoff.json'
import type { V9PlatformCard, V9ServiceSummary, V9Stage } from './types'

export const v9Roadmap = roadmap
export const v9Stages = roadmap.stages as V9Stage[]
export const v9Batches = roadmap.batches
export const v9Extensions = extensionRegistry.items
export const v9IdentityRbac = identityRbac
export const v9ServiceBlueprint = serviceBlueprint
export const v9ApiContracts = apiContracts
export const v9StorageMigration = storageMigration
export const v9AuditGovernance = auditGovernance
export const v9IntegrationAdapters = integrationAdapters
export const v9ConsoleWorkflows = consoleWorkflows
export const v9QualitySecurity = qualitySecurity
export const v9V10Handoff = v10Handoff
export const v9ServiceEvidenceLedger = serviceEvidenceLedger

export function getV9ServiceSummary(): V9ServiceSummary {
  return {
    stages: v9Stages.length,
    batches: v9Batches.length,
    extensions: v9Extensions.length,
    roles: v9IdentityRbac.roles.length,
    contracts: v9ApiContracts.contracts.length,
    serviceLive: Boolean(roadmap.serviceLive),
    releaseReady: Boolean(roadmap.releaseReady),
  }
}

export function getV9PlatformCards(): V9PlatformCard[] {
  return [
    {
      id: 'identity',
      title: '身份与 RBAC',
      state: 'designed',
      description: '建立 traveler、creator、operator、guardian、service-agent、admin 等角色边界。',
    },
    {
      id: 'api-contracts',
      title: 'API 合约层',
      state: 'ready',
      description: '仅公开 service-health 安全样板，其余写接口保持未来化与人工审批。',
    },
    {
      id: 'storage',
      title: '存储与迁移端口',
      state: 'designed',
      description: 'Repository、Audit、Object、Secret 端口隔离实现，避免平台锁死。',
    },
    {
      id: 'governance',
      title: '审计与治理',
      state: 'manual-required',
      description: '公开、删除、导出、权限变更、AI 草案转正都必须进入审计和人工签收。',
    },
    {
      id: 'handoff',
      title: 'V10 交接',
      state: 'ready',
      description: '把服务化、权限、审计与适配器底座交给长期智能世界版。',
    },
  ]
}
