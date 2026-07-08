import { ApprovalWorkflowPanel } from '@/components/operator/ApprovalWorkflowPanel'
import { GrowthLoopPanel } from '@/components/operator/GrowthLoopPanel'
import { OperatorHero } from '@/components/operator/OperatorHero'
import { RuntimeActionsPanel } from '@/components/operator/RuntimeActionsPanel'
import { RuntimeEvidencePanel } from '@/components/operator/RuntimeEvidencePanel'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { RuntimeAdapterPanel } from '@/components/operator/RuntimeAdapterPanel'
import { RuntimeIntegrationPanel } from '@/components/operator/RuntimeIntegrationPanel'
import { RuntimeReadinessPanel } from '@/components/operator/RuntimeReadinessPanel'

export default function OperatorPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <OperatorHero />
        <ApprovalWorkflowPanel />
        <RuntimeActionsPanel />
        <GrowthLoopPanel />
        <RuntimeEvidencePanel />
        <RuntimeIntegrationPanel />
        <RuntimeAdapterPanel />
        <RuntimeReadinessPanel />
      </div>
    </ResponsivePageShell>
  )
}
