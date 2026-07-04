import { DynamicScenePrelude, WorldModeSwitcher } from '@/components/r8-full-dynamic-world'
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
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'

export default function WorldPage() {
  return (
    <ResponsivePageShell>
      <LivingUniverseSection />
      <DynamicScenePrelude label="WORLD OVERVIEW" title="浮屿总览不再是组件集合，而是一个会引导的世界总控场。" description="这里保留早期世界化组件，同时接入 R8.3 的动态模式切换和抵达场景，让旧结构继续在新宇宙中运行。" primaryHref="/atlas" primaryLabel="进入 Atlas" secondaryHref="/ask" secondaryLabel="询问灯塔" objects={['浮屿', '展览', '河流', '灯塔']} />
      <WorldModeSwitcher />
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
