import { getWorldState } from '@/lib/world-events'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getTimelineStats } from '@/lib/timeline'
import { buildTimelineRiverSurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { TimelineHero } from '@/components/timeline/TimelineHero'
import { TimelineStats } from '@/components/timeline/TimelineStats'
import { TimelineRiverRuntime } from '@/components/timeline/TimelineRiverRuntime'
import { TimelineEventStream } from '@/components/timeline/TimelineEventStream'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { SceneDeepInteractionPanel } from '@/components/world/SceneDeepInteractionPanel'
import { buildTimelineDeepInteractionModel } from '@/lib/scene-deep-interaction'

export const metadata = createPageMetadata({
  title: '时间流',
  description: '古月浮屿的世界事件与节点成长记录。',
  path: '/timeline',
})

export default function TimelinePage() {
  const publicWorld = getPublicWorldObjectIndex()
  const events = publicWorld.events
  const nodes = publicWorld.nodes
  const areas = publicWorld.areas
  const state = getWorldState()
  const stats = getTimelineStats(events)
  const timelineSurface = buildTimelineRiverSurface(events, nodes, areas)
  const interactionModel = buildTimelineDeepInteractionModel(events, nodes)

  return (
    <main className="world-container space-y-10 py-16">
      <TimelineHero state={state} />
      <ProductRouteGuide
        current="时间流"
        description="这里不是调试日志，而是公开世界的成长记录。私密事件不会进入这条公开时间流。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />
      <TimelineStats {...stats} />
      <TimelineRiverRuntime surface={timelineSurface} />
      <SceneDeepInteractionPanel model={interactionModel} />
      <TimelineEventStream events={events} nodes={nodes} areas={areas} />
    </main>
  )
}
