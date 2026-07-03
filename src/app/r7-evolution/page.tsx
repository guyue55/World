import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R7EvolutionBoundaryPanel, R7LifecyclePanels, R7WorldEvolutionHero, R7WorldStatePanels } from '@/components/r7-world-evolution'

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
