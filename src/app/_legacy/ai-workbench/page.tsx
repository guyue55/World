import { AiSuggestionList } from '@/components/ai-workbench/AiSuggestionList'
import { AiWorkbenchHero } from '@/components/ai-workbench/AiWorkbenchHero'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function AiWorkbenchPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <AiWorkbenchHero />
        <AiSuggestionList />
      </div>
    </ResponsivePageShell>
  )
}
