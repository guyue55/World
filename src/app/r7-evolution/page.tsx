import type { Metadata } from 'next'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R7EvolutionBoundaryPanel, R7LifecyclePanels, R7WorldEvolutionHero, R7WorldStatePanels } from '@/components/r7-world-evolution'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function R7EvolutionPage() {
  return (
    <ResponsivePageShell>
      <R7WorldEvolutionHero />
      <R7WorldStatePanels />
      <R7LifecyclePanels />
      <R7EvolutionBoundaryPanel />
    </ResponsivePageShell>
  )
}
