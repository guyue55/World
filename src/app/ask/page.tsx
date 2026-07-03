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
import { DeepLighthouseSimulator } from '@/components/r8-deep-dynamic-world'
import { createPageMetadata } from '@/lib/metadata'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

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
      <LivingUniverseSection />
      <SensoryUniverseSection />
      <SceneUniverseSection />
      <CivilizationUniverseSection />
      <NodeLifeConstellation />
      <InteractiveUniverseSection />
      <CompleteUniverseSection />
      <TodayWorldPanel />
      <LighthouseHero />
      <LighthouseStatus {...stats} />
      <LighthousePromptGuide prompts={prompts} />
      <DeepLighthouseSimulator nodes={nodes} paths={paths} />
      <LighthouseRecommendationGrid nodes={recommendedNodes} paths={recommendedPaths} />
      <LighthouseBoundarySummary allowed={policy.allowed} forbidden={policy.forbidden} />
      <LighthouseFallbackActions />
    </main>
  )
}
