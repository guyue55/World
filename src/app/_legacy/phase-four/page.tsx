import { ContentCadencePanel } from '@/components/phase-four/ContentCadencePanel'
import { ContentSeedGrid } from '@/components/phase-four/ContentSeedGrid'
import { PhaseFourHero } from '@/components/phase-four/PhaseFourHero'
import { OperationsBoardPanel } from '@/components/phase-four/OperationsBoardPanel'
import { PhaseFiveHandoffPanel } from '@/components/phase-four/PhaseFiveHandoffPanel'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function PhaseFourPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <PhaseFourHero />
        <ContentSeedGrid />
        <ContentCadencePanel />
        <OperationsBoardPanel />
        <PhaseFiveHandoffPanel />
      </div>
    </ResponsivePageShell>
  )
}
