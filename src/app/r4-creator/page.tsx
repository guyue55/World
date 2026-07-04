import type { Metadata } from 'next'
import { DynamicScenePrelude, WorldActionRituals } from '@/components/r8-full-dynamic-world'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R4AuditExportPanel, R4ConsolePanels, R4CreatorHero, R4InboxHarbor, R4MaintenanceQueue, R4PermissionGate } from '@/components/r4-creator-workbench'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function R4CreatorPage() {
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
      <DynamicScenePrelude label="CREATOR WORKBENCH AWAKENED" title="创世台进入真实工作场景。" description="收集、安放、设权、关联、审计与导出不再只是面板，而是主人维护世界的日常动作。" primaryHref="/r6-service" primaryLabel="查看服务桥" secondaryHref="/archive" secondaryLabel="打开档案馆" objects={['收集箱', '节点台', '权限门', '导出箱']} />
      <R4CreatorHero />
      <R4InboxHarbor />
      <R4ConsolePanels />
      <R4MaintenanceQueue />
      <R4PermissionGate />
      <R4AuditExportPanel />
      <WorldActionRituals />
    </ResponsivePageShell>
  )
}
