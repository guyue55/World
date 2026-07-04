import type { Metadata } from 'next'
import { DynamicScenePrelude, WorldActionRituals } from '@/components/r8-full-dynamic-world'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R7EvolutionBoundaryPanel, R7LifecyclePanels, R7WorldEvolutionHero, R7WorldStatePanels } from '@/components/r7-world-evolution'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function R7EvolutionPage() {
  return (
    <ResponsivePageShell>
      <LivingUniverseSection />
      <SensoryUniverseSection />
      <SceneUniverseSection />
      <CivilizationUniverseSection />
      <NodeLifeConstellation />
      <InteractiveUniverseSection />
      <CompleteUniverseSection />
      <TodayWorldPanel />
      <DynamicScenePrelude label="EVOLUTION GARDEN AWAKENED" title="长期演化不只是状态表，而是世界的季节系统。" description="低光、苏醒、生命周期、世界日志与周期回望被组织为一个会呼吸的演化花园。" primaryHref="/r8-public" primaryLabel="查看公开运营" secondaryHref="/timeline" secondaryLabel="沿时间河" objects={['四季', '低光', '苏醒', '世界日志']} />
      <R7WorldEvolutionHero />
      <R7WorldStatePanels />
      <R7LifecyclePanels />
      <R7EvolutionBoundaryPanel />
      <WorldActionRituals />
    </ResponsivePageShell>
  )
}
