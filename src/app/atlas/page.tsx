import { getAtlasStats } from '@/lib/atlas'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildAtlasConstellationSurface } from '@/lib/public-world-surfaces'
import { AtlasMap } from '@/components/world/AtlasMap'
import { AreaNodeCluster } from '@/components/world/AreaNodeCluster'
import { createPageMetadata } from '@/lib/metadata'
import { AtlasHero } from '@/components/atlas/AtlasHero'
import { AtlasStats } from '@/components/atlas/AtlasStats'
import { AtlasLiveConstellation } from '@/components/atlas/AtlasLiveConstellation'
import { AtlasStarLines } from '@/components/atlas/AtlasStarLines'
import { AtlasFallbackList } from '@/components/atlas/AtlasFallbackList'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { SceneDeepInteractionPanel } from '@/components/world/SceneDeepInteractionPanel'
import { buildAtlasDeepInteractionModel } from '@/lib/scene-deep-interaction'

export const metadata = createPageMetadata({
  title: '世界地图',
  description: '古月浮屿的空间导航：区域、路径、节点与世界结构。',
  path: '/atlas',
})

export default function AtlasPage() {
  const publicWorld = getPublicWorldObjectIndex()
  const areas = publicWorld.areas
  const publicNodes = publicWorld.nodes
  const stats = getAtlasStats(areas, publicNodes)
  const areaLinks = publicWorld.areaLinks
  const primaryAreas = areas.filter((area) => area.level === 1)
  const atlasSurface = buildAtlasConstellationSurface(areas, publicNodes, areaLinks)
  const interactionModel = buildAtlasDeepInteractionModel(areas, publicNodes)
  const getPublicNodesByArea = (areaId: string) => publicNodes.filter((node) => node.areaId === areaId)

  return (
    <main className="world-container space-y-12 py-16">
      <AtlasHero interactionModel={interactionModel} />
      <ProductRouteGuide
        current="世界地图"
        description="你正在查看古月浮屿的公开空间层。这里不会展示私密区域原文，只展示可公开进入的区域、节点与路径。"
        primaryHref="/timeline"
        primaryLabel="沿时间流继续"
      />
      <AtlasStats
        areaCount={stats.areaCount}
        publicAreaCount={stats.publicAreaCount}
        publicNodeCount={stats.publicNodeCount}
        areaLinkCount={stats.areaLinkCount}
      />
      <SceneDeepInteractionPanel model={interactionModel} />
      <AtlasLiveConstellation surface={atlasSurface} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {primaryAreas.slice(0, 8).map((area) => (
          <a
            id={area.id}
            key={area.id}
            href={`#cluster-${area.id}`}
            className="rounded-[1.6rem] border border-white/65 bg-white/74 p-5 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white"
          >
            <p className="truncate text-sm text-moss">{area.icon} {area.realName}</p>
            <h2 className="mt-3 truncate text-2xl font-semibold text-ink">{area.worldName}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-ink/62">{area.description}</p>
            <p className="mt-4 truncate text-xs text-ink/42">公开节点：{getPublicNodesByArea(area.id).length}</p>
          </a>
        ))}
      </section>

      <AtlasMap areas={areas} nodes={publicNodes} />
      <AtlasStarLines areas={areas} links={areaLinks} />
      <AtlasFallbackList areas={areas} nodes={publicNodes} />

      <section className="space-y-12">
        {primaryAreas.map((area) => (
          <div key={area.id} id={`cluster-${area.id}`}>
            <AreaNodeCluster area={area} nodes={getPublicNodesByArea(area.id)} />
          </div>
        ))}
      </section>
    </main>
  )
}
