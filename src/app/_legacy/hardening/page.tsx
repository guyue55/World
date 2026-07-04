import { EvidenceMatrixPanel } from '@/components/hardening/EvidenceMatrixPanel'
import { HardeningHero } from '@/components/hardening/HardeningHero'
import { IdentityRbacAuditProofPanel } from '@/components/hardening/IdentityRbacAuditProofPanel'
import { ServiceAdaptersPanel } from '@/components/hardening/ServiceAdaptersPanel'
import { DeploymentHardeningPanel } from '@/components/hardening/DeploymentHardeningPanel'
import { EvidencePackagePanel } from '@/components/hardening/EvidencePackagePanel'
import { ReleaseReadinessGatePanel } from '@/components/hardening/ReleaseReadinessGatePanel'
import { SecurityBaselinePanel } from '@/components/hardening/SecurityBaselinePanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

export default function HardeningPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <HardeningHero />
        <EvidenceMatrixPanel />
        <ServiceAdaptersPanel />
        <IdentityRbacAuditProofPanel />
        <SecurityBaselinePanel />
        <DeploymentHardeningPanel />
        <EvidencePackagePanel />
        <ReleaseReadinessGatePanel />
      </div>
    </ResponsivePageShell>
  )
}
