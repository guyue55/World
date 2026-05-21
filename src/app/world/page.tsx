import { AtlasWorldMap } from '@/components/worldification/AtlasWorldMap'
import { ContentNodeField } from '@/components/worldification/ContentNodeField'
import { ExhibitionGardenWorld } from '@/components/worldification/ExhibitionGardenWorld'
import { JourneyPathwayRail } from '@/components/worldification/JourneyPathwayRail'
import { LighthouseObservatory } from '@/components/worldification/LighthouseObservatory'
import { MemoryRiverWorld } from '@/components/worldification/MemoryRiverWorld'
import { MobileWorldDock } from '@/components/worldification/MobileWorldDock'
import { V5ContentHandoffPanel } from '@/components/worldification/V5ContentHandoffPanel'
import { WorldPortalHero } from '@/components/worldification/WorldPortalHero'
import { WorldStateOrbit } from '@/components/worldification/WorldStateOrbit'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

export default function WorldPage() {
  return (
    <ResponsivePageShell>
      <WorldPortalHero />
      <AtlasWorldMap />
      <ContentNodeField />
      <JourneyPathwayRail />
      <MemoryRiverWorld />
      <ExhibitionGardenWorld />
      <LighthouseObservatory />
      <WorldStateOrbit />
      <V5ContentHandoffPanel />
      <MobileWorldDock />
    </ResponsivePageShell>
  )
}
