import { AuditCompliancePanel } from '@/components/governance/AuditCompliancePanel'
import { GovernanceHero } from '@/components/governance/GovernanceHero'
import { RbacServicePanel } from '@/components/governance/RbacServicePanel'
import { SecretStoragePanel } from '@/components/governance/SecretStoragePanel'
import { GovernanceDashboardPanel } from '@/components/governance/GovernanceDashboardPanel'
import { SustainabilityPanel } from '@/components/governance/SustainabilityPanel'
import { TeamCollaborationPanel } from '@/components/governance/TeamCollaborationPanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

export default function GovernancePage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <GovernanceHero />
        <RbacServicePanel />
        <AuditCompliancePanel />
        <SecretStoragePanel />
        <GovernanceDashboardPanel />
        <TeamCollaborationPanel />
        <SustainabilityPanel />
      </div>
    </ResponsivePageShell>
  )
}
