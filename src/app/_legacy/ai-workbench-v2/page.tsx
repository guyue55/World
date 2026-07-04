import { AiPermissionMatrixPanel } from '@/components/ai-workbench/AiPermissionMatrixPanel'
import { AiSuggestionQueuePanel } from '@/components/ai-workbench/AiSuggestionQueuePanel'
import { AiWorkbenchV2Hero } from '@/components/ai-workbench/AiWorkbenchV2Hero'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { AiRecommendationPanel } from '@/components/ai-workbench/AiRecommendationPanel'
import { AiWorldCompanionPanel } from '@/components/ai-workbench/AiWorldCompanionPanel'

export default function AiWorkbenchV2Page() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <AiWorkbenchV2Hero />
        <AiSuggestionQueuePanel />
        <AiPermissionMatrixPanel />
        <AiWorldCompanionPanel />
        <AiRecommendationPanel />
      </div>
    </ResponsivePageShell>
  )
}
