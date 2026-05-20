import fs from 'node:fs'
import path from 'node:path'
import identityRbacAuditProofPlan from '../data/identity-rbac-audit-proof-plan.json'
import realServiceAdapterImplementationPlan from '../data/real-service-adapter-implementation-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (realServiceAdapterImplementationPlan.adapterImplementationReady !== false) errors.push('adapterImplementationReady must remain false')
  if (realServiceAdapterImplementationPlan.adapters.length < 6) errors.push('adapters too few')
  if (realServiceAdapterImplementationPlan.adapters.some((adapter) => adapter.proofRequired !== true)) errors.push('all adapters must require proof')
  if (realServiceAdapterImplementationPlan.adapters.some((adapter) => adapter.status === 'implemented')) errors.push('adapters must not be pre-marked implemented')
  if (identityRbacAuditProofPlan.proofReady !== false) errors.push('proofReady must remain false')
  if (identityRbacAuditProofPlan.proofs.length < 6) errors.push('proofs too few')
  if (identityRbacAuditProofPlan.proofs.some((proof) => proof.required !== true)) errors.push('all proofs must be required')
  if (identityRbacAuditProofPlan.proofs.some((proof) => proof.status === 'passed')) errors.push('proofs must not be pre-marked passed')

  ;[
    'src/app/hardening/page.tsx',
    'src/lib/phase-thirteen-hardening.ts',
    'src/components/hardening/HardeningHero.tsx',
    'src/components/hardening/EvidenceMatrixPanel.tsx',
    'src/components/hardening/ServiceAdaptersPanel.tsx',
    'src/components/hardening/IdentityRbacAuditProofPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing hardening file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-thirteen-adapters']) errors.push('package missing check:phase-thirteen-adapters')
  if (!pkg.scripts['phase-thirteen-adapters:print']) errors.push('package missing phase-thirteen-adapters:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase thirteen adapters check passed.')
}

main()
