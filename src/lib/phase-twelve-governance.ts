import auditComplianceLedger from '../../data/audit-compliance-ledger.json'
import permissionRoleGovernanceModel from '../../data/permission-role-governance-model.json'
import secretGovernancePolicy from '../../data/secret-governance-policy.json'
import serviceBoundaryDesign from '../../data/service-boundary-design.json'
import storageGovernanceMatrix from '../../data/storage-governance-matrix.json'

export function getPermissionRoleGovernanceModel() {
  return permissionRoleGovernanceModel
}

export function getServiceBoundaryDesign() {
  return serviceBoundaryDesign
}

export function getAuditComplianceLedger() {
  return auditComplianceLedger
}

export function getSecretGovernancePolicy() {
  return secretGovernancePolicy
}

export function getStorageGovernanceMatrix() {
  return storageGovernanceMatrix
}

export function getPhaseTwelveGovernanceSummary() {
  return {
    stageProgress: auditComplianceLedger.stageProgress,
    rbacReady: permissionRoleGovernanceModel.rbacReady,
    roles: permissionRoleGovernanceModel.roles.length,
    serviceBoundaryReady: serviceBoundaryDesign.serviceBoundaryReady,
    services: serviceBoundaryDesign.services.length,
    auditReady: auditComplianceLedger.auditReady,
    auditEvents: auditComplianceLedger.events.length,
    secretGovernanceReady: secretGovernancePolicy.secretGovernanceReady,
    secretClasses: secretGovernancePolicy.secretClasses.length,
    storageReady: storageGovernanceMatrix.storageReady,
    stores: storageGovernanceMatrix.stores.length,
  }
}
