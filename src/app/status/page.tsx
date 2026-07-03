import { DynamicScenePrelude } from '@/components/r8-full-dynamic-world'
import { createPageMetadata } from '@/lib/metadata'
import { getStatusSkeletonContract, getStatusSummaryCards } from '@/lib/status-skeleton'
import { StatusHero } from '@/components/status-skeleton/StatusHero'
import { StatusSummaryGrid } from '@/components/status-skeleton/StatusSummaryGrid'
import { StatusSectionNav } from '@/components/status-skeleton/StatusSectionNav'
import { StatusFoundationGroups } from '@/components/status-skeleton/StatusFoundationGroups'
import { AccessibleCollapsible } from '@/components/interaction/AccessibleCollapsible'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export const metadata = createPageMetadata({
  title: '世界状态',
  description: '古月浮屿的世界健康度、骨架不变量与星线状态。',
  path: '/status',
})

export default function StatusPage() {
  const contract = getStatusSkeletonContract()
  const cards = getStatusSummaryCards()

  return (
    <main className="world-container space-y-10 py-16">
      <SceneUniverseSection />
      <CivilizationUniverseSection />
      <NodeLifeConstellation />
      <LivingUniverseSection />
      <DynamicScenePrelude label="WORLD HEARTBEAT" title="状态页变成世界心跳台。" description="状态不再只是列表，而是展示世界是否可运行、可观测、可回滚、可继续生长。" primaryHref="/r8-public" primaryLabel="查看公开运营" secondaryHref="/" secondaryLabel="回到入口" objects={['心跳', '证据', '低光', '回滚']} />
      <StatusHero />
      <StatusSummaryGrid cards={cards} />
      <StatusSectionNav sections={contract.groups} />
      <AccessibleCollapsible
        title="完整状态面板"
        summary="按需展开世界状态与阶段守门面板，避免页面一次性过载。"
        defaultOpen
      >
        <StatusFoundationGroups />
      </AccessibleCollapsible>
    </main>
  )
}
