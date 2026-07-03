import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'
import { getPublicWorldEvents, getWorldState } from '@/lib/world-events'
import { getTimelineStats } from '@/lib/timeline'
import { createPageMetadata } from '@/lib/metadata'
import { TimelineHero } from '@/components/timeline/TimelineHero'
import { TimelineStats } from '@/components/timeline/TimelineStats'
import { TimelineEventStream } from '@/components/timeline/TimelineEventStream'
import { DeepTimelineUniverse } from '@/components/r8-deep-dynamic-world'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

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
      <LivingUniverseSection />
      <SensoryUniverseSection />
      <SceneUniverseSection />
      <CivilizationUniverseSection />
      <NodeLifeConstellation />
      <InteractiveUniverseSection />
      <CompleteUniverseSection />
      <TodayWorldPanel />
      <TimelineHero state={state} />
      <TimelineStats {...stats} />
      <DeepTimelineUniverse events={events} nodes={nodes} areas={areas} />
      <TimelineEventStream events={events} nodes={nodes} areas={areas} />
    </main>
  )
}
