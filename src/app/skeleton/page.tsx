import { createPageMetadata } from '@/lib/metadata'
import { getSkeletonLayers, getStatusSkeletonContract } from '@/lib/status-skeleton'
import { SkeletonHero } from '@/components/status-skeleton/SkeletonHero'
import { SkeletonLayerSummary } from '@/components/status-skeleton/SkeletonLayerSummary'
import { StatusPanelGroup } from '@/components/status-skeleton/StatusPanelGroup'
import { WorldFoundationStack } from '@/components/world/WorldFoundationStack'
import { AccessibleCollapsible } from '@/components/interaction/AccessibleCollapsible'

export const metadata = createPageMetadata({
  title: '世界骨架',
  description: '古月浮屿的空间层、内容层、关系层、时间层、投影层、治理层与互操作层。',
  path: '/skeleton',
})

export default function SkeletonPage() {
  const layers = getSkeletonLayers()
  const skeletonGroup = getStatusSkeletonContract().groups.find((group) => group.id === 'skeleton')

  return (
    <main className="world-container space-y-12 py-16">
      <SkeletonHero />
      <SkeletonLayerSummary layers={layers} />

      <AccessibleCollapsible
        title="完整骨架面板"
        summary={skeletonGroup?.purpose ?? '按需展开完整世界骨架与工程守门面板。'}
        defaultOpen
      >
        <StatusPanelGroup
          id="complete-foundation-stack"
          title="完整骨架面板"
          purpose={skeletonGroup?.purpose ?? '按需展开完整世界骨架与工程守门面板。'}
        >
          <WorldFoundationStack />
        </StatusPanelGroup>
      </AccessibleCollapsible>
    </main>
  )
}
