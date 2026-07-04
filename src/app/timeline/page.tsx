import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'
import { getPublicWorldEvents, getWorldState } from '@/lib/world-events'
import { getTimelineStats } from '@/lib/timeline'
import { createPageMetadata } from '@/lib/metadata'
import { TimelineHero } from '@/components/timeline/TimelineHero'
import { TimelineStats } from '@/components/timeline/TimelineStats'
import { TimelineEventStream } from '@/components/timeline/TimelineEventStream'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'

export const metadata = createPageMetadata({
  title: '时间流',
  description: '古月浮屿的世界事件与节点成长记录。',
  path: '/timeline',
})

export default function TimelinePage() {
  const events = getPublicWorldEvents()
  const nodes = getPublicNodes()
  const areas = getAllAreas()
  const state = getWorldState()
  const stats = getTimelineStats(events)

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="时间流"
        description="这里不是调试日志，而是公开世界的成长记录。私密事件不会进入这条公开时间流。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />
      <TimelineHero state={state} />
      <TimelineStats {...stats} />
      <TimelineEventStream events={events} nodes={nodes} areas={areas} />
    </main>
  )
}
