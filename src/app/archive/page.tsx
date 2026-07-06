import { ArchiveView } from '@/components/archive/ArchiveView'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildArchiveDynamicSurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { ArchiveDynamicGuide } from '@/components/archive/ArchiveDynamicGuide'

export const metadata = createPageMetadata({
  title: '档案馆',
  description: '古月浮屿的现实检索视图：搜索、筛选、查找公开节点。',
  path: '/archive',
})

export default function ArchivePage() {
  const publicWorld = getPublicWorldObjectIndex()
  const nodes = publicWorld.nodes
  const areas = publicWorld.areas
  const archiveSurface = buildArchiveDynamicSurface(nodes, areas)

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="档案馆"
        description="当你不想漫游时，在这里直接查找公开文章、项目、灵感和归档内容。档案馆只读取公开索引，不展示私密层。"
        primaryHref="/atlas"
        primaryLabel="切回世界地图"
      />
      <ArchiveDynamicGuide surface={archiveSurface} />
      <ArchiveView nodes={nodes} areas={areas} />
    </main>
  )
}
