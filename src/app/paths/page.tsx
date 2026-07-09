import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildPathsDirectorySurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { getRecommendedPathOrder } from '@/lib/path-guidance'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { PathsDynamicDirectory } from '@/components/paths/PathsDynamicDirectory'
import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const publicWorld = getPublicWorldObjectIndex()
  const paths = getRecommendedPathOrder(publicWorld.paths)
  const nodes = publicWorld.nodes
  const surface = buildPathsDirectorySurface(paths, nodes)

  return (
    <main className="world-container space-y-10 py-16">
      <SceneWorldPortal
        scene="paths"
        eyebrow={`${surface.eyebrow} · 星路入口`}
        title="路径不是分类，是一段可行走的旅程。"
        description={surface.description}
        objects={['起点', '路标', '节点', '下一步', '回望', '抵达']}
        primaryAction={{ href: surface.paths[0]?.href ?? '/paths/first-visit', label: '开始第一条路径' }}
        secondaryActions={[
          { href: '/atlas', label: '回到星图' },
          { href: '/archive', label: '打开档案馆' },
        ]}
        stats={surface.audiences.slice(0, 3).map((item) => ({
          label: item.label,
          value: `${item.count} 条`,
          note: item.description,
        }))}
      />
      <ProductRouteGuide
        current="精选路径"
        description="这里把节点排成可理解的行走路线。路径不是分类，而是降低进入门槛的导游层。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />
      <PathsDynamicDirectory surface={surface} />
    </main>
  )
}
