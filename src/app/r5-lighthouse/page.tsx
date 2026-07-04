import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R5BoundaryAuditPanel, R5LighthouseHero, R5PathRecommendations, R5PublicContextPanel, R5QuestionGuide, R5ReviewQueuePanel } from '@/components/r5-ai-lighthouse'

export default function R5LighthousePage() {
  return (
    <ResponsivePageShell>
      <R5LighthouseHero />
      <R5PublicContextPanel />
      <R5QuestionGuide />
      <R5PathRecommendations />
      <R5ReviewQueuePanel />
      <R5BoundaryAuditPanel />
    </ResponsivePageShell>
  )
}
