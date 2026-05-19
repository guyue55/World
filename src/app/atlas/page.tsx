import { getAllAreas } from '@/lib/areas'
import { getPublicNodesByArea } from '@/lib/nodes'
import { AtlasMap } from '@/components/world/AtlasMap'
import { AreaNodeCluster } from '@/components/world/AreaNodeCluster'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '世界地图',
  description: '古月浮屿的空间导航：区域、路径、节点与世界结构。',
  path: '/atlas',
})

export default function AtlasPage() {
  const areas = getAllAreas()

  return (
    <main className="world-container space-y-14 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">ATLAS</p>
        <h1 className="text-5xl font-semibold">世界地图</h1>
        <p className="leading-8 text-ink/70">
          Atlas 不是分类页，而是空间导航。你可以从区域进入内容，也可以随时返回档案馆进行现实检索。
        </p>
      </header>

      <AtlasMap areas={areas} />

      <section className="space-y-14">
        {areas.map((area) => (
          <AreaNodeCluster key={area.id} area={area} nodes={getPublicNodesByArea(area.id)} />
        ))}
      </section>
    </main>
  )
}
