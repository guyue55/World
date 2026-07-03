import { getAllPaths } from '@/lib/paths'
import { getPublicNodes } from '@/lib/nodes'
import { PathTabs } from '@/components/paths/PathTabs'
import { PathHero } from '@/components/paths/PathHero'
import { DeepPathNavigator } from '@/components/r8-deep-dynamic-world'
import { createPageMetadata } from '@/lib/metadata'
import { getRecommendedPathOrder } from '@/lib/path-guidance'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const paths = getRecommendedPathOrder(getAllPaths())

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
      <PathHero paths={paths} />
      <DeepPathNavigator paths={paths} nodes={getPublicNodes()} />
      <PathTabs paths={paths} />
    </main>
  )
}
