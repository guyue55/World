import dependencyBuildEvidenceMatrix from '../../data/release/dependency-build-evidence-matrix.json'
import identityRbacAuditProofPlan from '../../data/domains/governance/identity-rbac-audit-proof-plan.json'
import phaseThirteenHardeningScopeContract from '../../data/core/phase-thirteen-hardening-scope-contract.json'
import realServiceAdapterImplementationPlan from '../../data/core/real-service-adapter-implementation-plan.json'
import securityBaselineImplementationPlan from '../../data/domains/governance/security-baseline-implementation-plan.json'

export function getPhaseThirteenHardeningScopeContract() {
  return phaseThirteenHardeningScopeContract
}

export function getDependencyBuildEvidenceMatrix() {
  return dependencyBuildEvidenceMatrix
}

export function getSecurityBaselineImplementationPlan() {
  return securityBaselineImplementationPlan
}

export function getRealServiceAdapterImplementationPlan() {
  return realServiceAdapterImplementationPlan
}

export function getIdentityRbacAuditProofPlan() {
  return identityRbacAuditProofPlan
}

export function getPhaseThirteenHardeningSummary() {
  return {
    stageProgress: phaseThirteenHardeningScopeContract.stageProgress,
    evidenceReady: dependencyBuildEvidenceMatrix.evidenceReady,
    checks: dependencyBuildEvidenceMatrix.checks.length,
    securityBaselineReady: securityBaselineImplementationPlan.securityBaselineReady,
    adapterImplementationReady: realServiceAdapterImplementationPlan.adapterImplementationReady,
    adapters: realServiceAdapterImplementationPlan.adapters.length,
    proofReady: identityRbacAuditProofPlan.proofReady,
    proofs: identityRbacAuditProofPlan.proofs.length,
  }
}
