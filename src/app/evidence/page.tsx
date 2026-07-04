import { EvidenceCommandPanel } from '@/components/evidence/EvidenceCommandPanel'
import { EvidenceHero } from '@/components/evidence/EvidenceHero'
import { EvidenceMatrixPanel } from '@/components/evidence/EvidenceMatrixPanel'
import { BlockerClosurePanel } from '@/components/evidence/BlockerClosurePanel'
import { DefectExecutionPanel } from '@/components/evidence/DefectExecutionPanel'
import { EvidenceAssistClosurePanel } from '@/components/evidence/EvidenceAssistClosurePanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

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
