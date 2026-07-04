import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'
import { getPublicWorldEvents, getWorldState } from '@/lib/world-events'
import { getTimelineStats } from '@/lib/timeline'
import { createPageMetadata } from '@/lib/metadata'
import { TimelineHero } from '@/components/timeline/TimelineHero'
import { TimelineStats } from '@/components/timeline/TimelineStats'
import { TimelineEventStream } from '@/components/timeline/TimelineEventStream'

export const metadata = createPageMetadata({
  title: '时间河',
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
      <TimelineHero state={state} />
      <TimelineStats {...stats} />
      <TimelineEventStream events={events} nodes={nodes} areas={areas} />
    </main>
  )
}
