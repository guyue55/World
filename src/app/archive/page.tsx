import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { createPageMetadata } from '@/lib/metadata'
import { buildArchiveViewModel } from '@/lib/scenes/build-archive-model'
import { ArchiveHallStage } from '@/components/archive/ArchiveHallStage'

export const metadata = createPageMetadata({
  title: '档案馆',
  description: '古月浮屿的现实检索视图：搜索、筛选、查找公开节点。',
  path: '/archive',
})

export default function ArchivePage() {
  const publicWorld = getPublicWorldObjectIndex()
  const model = buildArchiveViewModel(publicWorld)
  return <main><ArchiveHallStage model={model} /></main>
}
