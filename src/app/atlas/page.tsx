import { getAllAreas } from '@/lib/areas'
import { getPublicNodes, getPublicNodesByArea } from '@/lib/nodes'
import { getAtlasStats, getVisibleAreaLinks } from '@/lib/atlas'
import { AtlasMap } from '@/components/world/AtlasMap'
import { DeepAtlasUniverse } from '@/components/r8-deep-dynamic-world'
import { AreaNodeCluster } from '@/components/world/AreaNodeCluster'
import { createPageMetadata } from '@/lib/metadata'
import { AtlasHero } from '@/components/atlas/AtlasHero'
import { AtlasStats } from '@/components/atlas/AtlasStats'
import { AtlasStarLines } from '@/components/atlas/AtlasStarLines'
import { AtlasFallbackList } from '@/components/atlas/AtlasFallbackList'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export const metadata = createPageMetadata({
  title: '世界地图',
  description: '古月浮屿的空间导航：区域、路径、节点与世界结构。',
  path: '/atlas',
})

export default function AtlasPage() {
  const areas = getAllAreas()
  const publicNodes = getPublicNodes()
  const stats = getAtlasStats(areas, publicNodes)
  const areaLinks = getVisibleAreaLinks(areas)

  return (
    <main className="world-container space-y-14 py-16">
      <LivingUniverseSection />
      <SensoryUniverseSection />
      <SceneUniverseSection />
      <CivilizationUniverseSection />
      <NodeLifeConstellation />
      <InteractiveUniverseSection />
      <CompleteUniverseSection />
      <TodayWorldPanel />
      <AtlasHero />
      <AtlasStats
        areaCount={stats.areaCount}
        publicAreaCount={stats.publicAreaCount}
        publicNodeCount={stats.publicNodeCount}
        areaLinkCount={stats.areaLinkCount}
      />
      <DeepAtlasUniverse areas={areas} nodes={publicNodes} />
      <AtlasMap areas={areas} nodes={publicNodes} />
      <AtlasStarLines areas={areas} links={areaLinks} />
      <AtlasFallbackList areas={areas} nodes={publicNodes} />

      <section className="space-y-14">
        {areas.map((area) => (
          <AreaNodeCluster key={area.id} area={area} nodes={getPublicNodesByArea(area.id)} />
        ))}
      </section>
    </main>
  )
}
