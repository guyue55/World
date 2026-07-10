import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { createPageMetadata } from '@/lib/metadata'
import { buildTimelineViewModel } from '@/lib/scenes/build-timeline-model'
import { TimelineRiverStage } from '@/components/timeline/TimelineRiverStage'

export const metadata = createPageMetadata({
  title: '时间流',
  description: '古月浮屿的世界事件与节点成长记录。',
  path: '/timeline',
})

export default function TimelinePage() {
  const publicWorld = getPublicWorldObjectIndex()
  const model = buildTimelineViewModel(publicWorld)
  return <main><TimelineRiverStage model={model} /></main>
}
