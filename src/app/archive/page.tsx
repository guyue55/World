import { ArchiveView } from '@/components/archive/ArchiveView'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildArchiveDynamicSurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { ArchiveDynamicGuide } from '@/components/archive/ArchiveDynamicGuide'
import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'
import { SceneDeepInteractionPanel } from '@/components/world/SceneDeepInteractionPanel'
import { buildArchiveDeepInteractionModel } from '@/lib/scene-deep-interaction'

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
  const interactionModel = buildArchiveDeepInteractionModel(nodes, areas)

  return (
    <main className="world-container space-y-10 py-16">
      <SceneWorldPortal
        scene="archive"
        eyebrow="ARCHIVE · 档案馆"
        title="当你不想漫游，就在馆内检索。"
        description="档案馆不是普通文章列表，而是公开世界的索引大厅。你可以按区域、标签、生命周期和关键词找到已经放行的节点。"
        objects={['卷宗', '索引', '书页', '标签', '馆藏', '归档']}
        primaryAction={{ href: '#archive-search', label: '开始检索' }}
        secondaryActions={[
          { href: '/atlas', label: '切回星图' },
          { href: '/paths', label: '沿路径进入' },
        ]}
        stats={[
          { label: '公开节点', value: nodes.length, note: '只来自公开索引' },
          { label: '区域', value: areas.filter((area) => area.level === 1).length, note: '馆藏按空间归类' },
          { label: '边界', value: '公开', note: '私密层不进入前台' },
        ]}
        interactionModel={interactionModel}
      />
      <ProductRouteGuide
        current="档案馆"
        description="当你不想漫游时，在这里直接查找公开文章、项目、灵感和归档内容。档案馆只读取公开索引，不展示私密层。"
        primaryHref="/atlas"
        primaryLabel="切回世界地图"
      />
      <SceneDeepInteractionPanel model={interactionModel} />
      <ArchiveDynamicGuide surface={archiveSurface} />
      <ArchiveView nodes={nodes} areas={areas} />
    </main>
  )
}
