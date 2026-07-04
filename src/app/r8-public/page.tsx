import { DynamicScenePrelude, WorldActionRituals } from '@/components/r8-full-dynamic-world'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R8BoundaryPanel, R8OperationsPanels, R8PublicOperationsHero, R8ReleasePanels } from '@/components/r8-public-operations'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export default function R8PublicPage() {
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
      <DynamicScenePrelude label="PUBLIC SQUARE AWAKENED" title="公开运营变成可回访的世界广场。" description="发布、反馈、SEO、安全审查与回滚不只是治理数据，而是公开世界长期存在的节律。" primaryHref="/status" primaryLabel="查看世界状态" secondaryHref="/paths" secondaryLabel="打开精选路径" objects={['公告', '反馈', 'SEO', '回滚']} />
      <R8PublicOperationsHero />
      <R8ReleasePanels />
      <R8OperationsPanels />
      <R8BoundaryPanel />
      <WorldActionRituals />
    </ResponsivePageShell>
  )
}
