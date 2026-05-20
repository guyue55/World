import { createPageMetadata } from '@/lib/metadata'
import { getStatusSkeletonContract, getStatusSummaryCards } from '@/lib/status-skeleton'
import { StatusHero } from '@/components/status-skeleton/StatusHero'
import { StatusSummaryGrid } from '@/components/status-skeleton/StatusSummaryGrid'
import { StatusSectionNav } from '@/components/status-skeleton/StatusSectionNav'
import { StatusFoundationGroups } from '@/components/status-skeleton/StatusFoundationGroups'
import { AccessibleCollapsible } from '@/components/interaction/AccessibleCollapsible'

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
