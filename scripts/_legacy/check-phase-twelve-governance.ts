import fs from 'node:fs'
import path from 'node:path'
import auditComplianceLedger from '../data/domains/governance/audit-compliance-ledger.json'
import secretGovernancePolicy from '../data/domains/governance/secret-governance-policy.json'
import storageGovernanceMatrix from '../data/domains/governance/storage-governance-matrix.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (auditComplianceLedger.auditReady !== false) errors.push('auditReady must remain false')
  if (auditComplianceLedger.events.length < 8) errors.push('audit events too few')
  if (auditComplianceLedger.events.some((item) => item.required !== true)) errors.push('audit events must be required')
  if (secretGovernancePolicy.secretGovernanceReady !== false) errors.push('secretGovernanceReady must remain false')
  if (secretGovernancePolicy.secretClasses.length < 5) errors.push('secret classes too few')
  if (secretGovernancePolicy.secretClasses.filter((item) => item.id !== 'public-env').some((item) => item.storage !== 'secret-manager-required')) {
    errors.push('non-public secrets must require secret manager')
  }
  if (storageGovernanceMatrix.storageReady !== false) errors.push('storageReady must remain false')
  if (storageGovernanceMatrix.stores.length < 6) errors.push('stores too few')
  const privateVault = storageGovernanceMatrix.stores.find((item) => item.id === 'private-vault')
  if (!privateVault || privateVault.dataScope !== 'private-encrypted') errors.push('private vault storage mismatch')

  ;[
    'src/app/governance/page.tsx',
    'src/lib/phase-twelve-governance.ts',
    'src/components/governance/GovernanceHero.tsx',
    'src/components/governance/RbacServicePanel.tsx',
    'src/components/governance/AuditCompliancePanel.tsx',
    'src/components/governance/SecretStoragePanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing governance file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-twelve-governance']) errors.push('package missing check:phase-twelve-governance')
  if (!pkg.scripts['phase-twelve-governance:print']) errors.push('package missing phase-twelve-governance:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase twelve governance check passed.')
}

main()
