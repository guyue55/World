import { ColumnsChannelsPanel } from '@/components/content-ecosystem/ColumnsChannelsPanel'
import { ContentCalendarPanel } from '@/components/content-ecosystem/ContentCalendarPanel'
import { ContentEcosystemHero } from '@/components/content-ecosystem/ContentEcosystemHero'
import { TopicPillarsPanel } from '@/components/content-ecosystem/TopicPillarsPanel'
import { FeedbackLoopPanel } from '@/components/content-ecosystem/FeedbackLoopPanel'
import { QualityReviewPanel } from '@/components/content-ecosystem/QualityReviewPanel'
import { WorldBookPanel } from '@/components/content-ecosystem/WorldBookPanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

export default function ContentEcosystemPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <ContentEcosystemHero />
        <TopicPillarsPanel />
        <ContentCalendarPanel />
        <ColumnsChannelsPanel />
        <WorldBookPanel />
        <QualityReviewPanel />
        <FeedbackLoopPanel />
      </div>
    </ResponsivePageShell>
  )
}
