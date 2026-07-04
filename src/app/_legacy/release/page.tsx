import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { ReleaseDashboardPanel } from '@/components/release/ReleaseDashboardPanel'
import { ReleaseEvidencePanel } from '@/components/release/ReleaseEvidencePanel'
import { ReleaseHero } from '@/components/release/ReleaseHero'
import { SeoAnalyticsPanel } from '@/components/release/SeoAnalyticsPanel'
import { BackupRollbackPanel } from '@/components/release/BackupRollbackPanel'
import { LongTermOperationsPanel } from '@/components/release/LongTermOperationsPanel'
import { VersionGovernancePanel } from '@/components/release/VersionGovernancePanel'

export default function ReleasePage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <ReleaseHero />
        <ReleaseDashboardPanel />
        <ReleaseEvidencePanel />
        <SeoAnalyticsPanel />
        <LongTermOperationsPanel />
        <BackupRollbackPanel />
        <VersionGovernancePanel />
      </div>
    </ResponsivePageShell>
  )
}
