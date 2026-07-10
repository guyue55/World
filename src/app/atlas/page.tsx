import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { createPageMetadata } from '@/lib/metadata'
import { buildAtlasViewModel } from '@/lib/scenes/build-atlas-model'
import { AtlasExplorationStage } from '@/components/atlas/AtlasExplorationStage'

export const metadata = createPageMetadata({
  title: '世界地图',
  description: '古月浮屿的空间导航：区域、路径、节点与世界结构。',
  path: '/atlas',
})

export default function AtlasPage() {
  const publicWorld = getPublicWorldObjectIndex()
  const model = buildAtlasViewModel(publicWorld)
  return <main><AtlasExplorationStage model={model} /></main>
}
