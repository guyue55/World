import type { Metadata } from 'next'
import { DynamicScenePrelude, WorldActionRituals } from '@/components/r8-full-dynamic-world'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R6BoundaryPanel, R6ServiceHero, R6ServicePanels } from '@/components/r6-service-bridge'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function R6ServicePage() {
  return (
    <ResponsivePageShell>
      <LivingUniverseSection />
      <DynamicScenePrelude label="SERVICE BRIDGE AWAKENED" title="服务桥进入可观测运行状态。" description="Owner-only API、审计、队列和导出任务被投影为服务星桥，帮助前台世界与后台秩序连接。" primaryHref="/r7-evolution" primaryLabel="查看长期演化" secondaryHref="/r4-creator" secondaryLabel="回到创世台" objects={['API', '审计', '队列', '导出任务']} />
      <R6ServiceHero />
      <R6ServicePanels />
      <R6BoundaryPanel />
      <WorldActionRituals />
    </ResponsivePageShell>
  )
}
