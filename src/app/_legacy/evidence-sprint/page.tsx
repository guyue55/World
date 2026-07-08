import { BlockerLedgerPanel } from '@/components/evidence-sprint/BlockerLedgerPanel'
import { EvidenceSprintHero } from '@/components/evidence-sprint/EvidenceSprintHero'
import { ExecutionQueuePanel } from '@/components/evidence-sprint/ExecutionQueuePanel'
import { ManualSignoffPanel } from '@/components/evidence-sprint/ManualSignoffPanel'
import { ReleaseTransitionPanel } from '@/components/evidence-sprint/ReleaseTransitionPanel'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function EvidenceSprintPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <EvidenceSprintHero />
        <ExecutionQueuePanel />
        <BlockerLedgerPanel />
        <ManualSignoffPanel />
        <ReleaseTransitionPanel />
      </div>
    </ResponsivePageShell>
  )
}
