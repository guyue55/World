import { EvidenceCommandPanel } from '@/components/_legacy/evidence/EvidenceCommandPanel'
import { EvidenceHero } from '@/components/_legacy/evidence/EvidenceHero'
import { EvidenceMatrixPanel } from '@/components/_legacy/evidence/EvidenceMatrixPanel'
import { BlockerClosurePanel } from '@/components/_legacy/evidence/BlockerClosurePanel'
import { DefectExecutionPanel } from '@/components/_legacy/evidence/DefectExecutionPanel'
import { EvidenceAssistClosurePanel } from '@/components/_legacy/evidence/EvidenceAssistClosurePanel'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function EvidencePage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <EvidenceHero />
        <EvidenceCommandPanel />
        <EvidenceMatrixPanel />
        <BlockerClosurePanel />
        <DefectExecutionPanel />
        <EvidenceAssistClosurePanel />
      </div>
    </ResponsivePageShell>
  )
}
