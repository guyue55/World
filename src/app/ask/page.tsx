import { getAllPaths } from '@/lib/paths'
import { getPublicNodes } from '@/lib/nodes'
import { getAIBoundaryPolicy } from '@/lib/ai-boundary'
import {
  getLighthousePrompts,
  getLighthouseRecommendedNodes,
  getLighthouseRecommendedPaths,
  getLighthouseStats,
} from '@/lib/lighthouse'
import { LighthouseStatus } from '@/components/ask/LighthouseStatus'
import { LighthouseHero } from '@/components/lighthouse/LighthouseHero'
import { LighthousePromptGuide } from '@/components/lighthouse/LighthousePromptGuide'
import { LighthouseRecommendationGrid } from '@/components/lighthouse/LighthouseRecommendationGrid'
import { LighthouseBoundarySummary } from '@/components/lighthouse/LighthouseBoundarySummary'
import { LighthouseFallbackActions } from '@/components/lighthouse/LighthouseFallbackActions'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'AI 灯塔',
  description: '古月浮屿的低光导览：AI 是灯塔，不是太阳。',
  path: '/ask',
})

export default function AskPage() {
  const paths = getAllPaths()
  const nodes = getPublicNodes()
  const prompts = getLighthousePrompts()
  const recommendedNodes = getLighthouseRecommendedNodes(nodes)
  const recommendedPaths = getLighthouseRecommendedPaths(paths)
  const stats = getLighthouseStats(nodes, paths)
  const policy = getAIBoundaryPolicy()

  return (
    <main className="world-container space-y-10 py-16">
      <LighthouseHero />
      <LighthouseStatus {...stats} />
      <LighthousePromptGuide prompts={prompts} />
      <LighthouseRecommendationGrid nodes={recommendedNodes} paths={recommendedPaths} />
      <LighthouseBoundarySummary allowed={policy.allowed} forbidden={policy.forbidden} />
      <LighthouseFallbackActions />
    </main>
  )
}
