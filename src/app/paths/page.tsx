import { getAllPaths } from '@/lib/paths'
import { getAllNodes } from '@/lib/nodes'
import { buildPathsDirectorySurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { getRecommendedPathOrder } from '@/lib/path-guidance'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { PathsDynamicDirectory } from '@/components/paths/PathsDynamicDirectory'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const paths = getRecommendedPathOrder(getAllPaths())
  const nodes = getAllNodes()
  const surface = buildPathsDirectorySurface(paths, nodes)

  return (
    <main className="world-container space-y-10 py-16">
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
