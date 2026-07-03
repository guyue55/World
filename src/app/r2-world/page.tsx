import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { AreaPassportGrid, NodeOpeningRitualPanel, RealityModeBridge, RitualPathPanel, WorldAtlasGateway, WorldCompassGuide, WorldDepthPrelude, WorldEntryHero, WorldGatewayPanel } from '@/components/r2-world-entry'

export default function R2WorldExperiencePage() {
  return (
    <ResponsivePageShell>
      <WorldEntryHero />
      <WorldDepthPrelude />
      <WorldGatewayPanel />
      <WorldAtlasGateway />
      <WorldCompassGuide />
      <AreaPassportGrid />
      <RitualPathPanel />
      <NodeOpeningRitualPanel />
      <RealityModeBridge />
    </ResponsivePageShell>
  )
}
