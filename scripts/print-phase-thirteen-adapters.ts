import identityRbacAuditProofPlan from '../data/domains/governance/identity-rbac-audit-proof-plan.json'
import realServiceAdapterImplementationPlan from '../data/core/real-service-adapter-implementation-plan.json'

function main() {
  console.log(`${realServiceAdapterImplementationPlan.name}`)
  console.log(`stageProgress=${realServiceAdapterImplementationPlan.stageProgress}`)
  console.log(`adapterImplementationReady=${realServiceAdapterImplementationPlan.adapterImplementationReady}`)
  console.log(`adapters=${realServiceAdapterImplementationPlan.adapters.length}`)
  console.log(`proofReady=${identityRbacAuditProofPlan.proofReady}`)
  console.log(`proofs=${identityRbacAuditProofPlan.proofs.length}`)
}

main()
