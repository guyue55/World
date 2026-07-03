import { ArchiveView } from '@/components/archive/ArchiveView'
import { DeepArchiveObservatory } from '@/components/r8-deep-dynamic-world'
import { getPublicNodes } from '@/lib/nodes'
import { getAllAreas } from '@/lib/areas'
import { createPageMetadata } from '@/lib/metadata'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export const metadata = createPageMetadata({
  title: '档案馆',
  description: '古月浮屿的现实检索视图：搜索、筛选、查找公开节点。',
  path: '/archive',
})

export default function ArchivePage() {
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
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">ARCHIVE</p>
        <h1 className="text-5xl font-semibold">档案馆</h1>
        <p className="leading-8 text-ink/70">
          当你不想漫游世界时，可以在这里直接查找文章、项目、灵感和归档内容。档案馆负责现实检索，世界地图负责空间漫游。
        </p>
      </header>
      <DeepArchiveObservatory nodes={getPublicNodes()} areas={getAllAreas()} />
      <ArchiveView nodes={getPublicNodes()} areas={getAllAreas()} />
    </main>
  )
}
