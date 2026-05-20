import auditComplianceLedger from '../data/audit-compliance-ledger.json'
import secretGovernancePolicy from '../data/secret-governance-policy.json'
import storageGovernanceMatrix from '../data/storage-governance-matrix.json'

function main() {
  console.log(`${auditComplianceLedger.name}`)
  console.log(`stageProgress=${auditComplianceLedger.stageProgress}`)
  console.log(`auditReady=${auditComplianceLedger.auditReady}`)
  console.log(`auditEvents=${auditComplianceLedger.events.length}`)
  console.log(`secretGovernanceReady=${secretGovernancePolicy.secretGovernanceReady}`)
  console.log(`secretClasses=${secretGovernancePolicy.secretClasses.length}`)
  console.log(`storageReady=${storageGovernanceMatrix.storageReady}`)
  console.log(`stores=${storageGovernanceMatrix.stores.length}`)
}

main()
