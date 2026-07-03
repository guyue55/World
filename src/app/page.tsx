import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { WorldAtlasGateway, WorldDepthPrelude, WorldEntryHero, WorldGatewayPanel } from '@/components/r2-world-entry'
import { R3NodeConstellation, R3ContentPathways } from '@/components/r3-content-life'
import { R4ConsolePanels, R4CreatorHero } from '@/components/r4-creator-workbench'
import { R5LighthouseHero, R5PathRecommendations } from '@/components/r5-ai-lighthouse'
import { R6BoundaryPanel, R6ServiceHero, R6ServicePanels } from '@/components/r6-service-bridge'
import { R7EvolutionBoundaryPanel, R7LifecyclePanels, R7WorldEvolutionHero, R7WorldStatePanels } from '@/components/r7-world-evolution'
import { R8BoundaryPanel, R8OperationsPanels, R8PublicOperationsHero, R8ReleasePanels } from '@/components/r8-public-operations'

export default function HomePage() {
  return (
    <ResponsivePageShell>
      <WorldEntryHero />
      <WorldDepthPrelude />
      <WorldGatewayPanel />
      <WorldAtlasGateway />
      <R3NodeConstellation />
      <R3ContentPathways />
      <R4CreatorHero />
      <R4ConsolePanels />
      <R5LighthouseHero />
      <R5PathRecommendations />
      <R6ServiceHero />
      <R6ServicePanels />
      <R6BoundaryPanel />
      <R7WorldEvolutionHero />
      <R7WorldStatePanels />
      <R7LifecyclePanels />
      <R7EvolutionBoundaryPanel />
      <R8PublicOperationsHero />
      <R8ReleasePanels />
      <R8OperationsPanels />
      <R8BoundaryPanel />
    </ResponsivePageShell>
  )
}
