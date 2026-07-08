import { IntelligentOpsHero } from '@/components/intelligent-ops/IntelligentOpsHero'
import { MultiDeviceExportPanel } from '@/components/intelligent-ops/MultiDeviceExportPanel'
import { MultiDevicePanel } from '@/components/intelligent-ops/MultiDevicePanel'
import { PwaOfflinePanel } from '@/components/intelligent-ops/PwaOfflinePanel'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { DataInsightPanel } from '@/components/intelligent-ops/DataInsightPanel'
import { OpsFeedbackLoopPanel } from '@/components/intelligent-ops/OpsFeedbackLoopPanel'
import { QualityPatrolPanel } from '@/components/intelligent-ops/QualityPatrolPanel'

export default function IntelligentOpsPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <IntelligentOpsHero />
        <MultiDevicePanel />
        <PwaOfflinePanel />
        <MultiDeviceExportPanel />
        <QualityPatrolPanel />
        <DataInsightPanel />
        <OpsFeedbackLoopPanel />
      </div>
    </ResponsivePageShell>
  )
}
