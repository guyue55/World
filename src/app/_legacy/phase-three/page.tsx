import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { PhaseThreeEntryGrid } from '@/components/phase-three-entry/PhaseThreeEntryGrid'
import { PhaseThreeEntryHero } from '@/components/phase-three-entry/PhaseThreeEntryHero'
import { PhaseThreeWarningPanel } from '@/components/phase-three-entry/PhaseThreeWarningPanel'

export default function PhaseThreePage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <PhaseThreeEntryHero />
        <PhaseThreeWarningPanel />
        <PhaseThreeEntryGrid />
      </div>
    </ResponsivePageShell>
  )
}
