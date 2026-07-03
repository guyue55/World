import { DynamicCompassOverlay, UniverseStage, WorldPulseRibbon, WorldRouteTransition } from '@/components/r8-deep-dynamic-world'
import { FullUniverseOrchestrator, LivingWorldViewport } from '@/components/r8-full-dynamic-world'
import { LivingAreaIdentity, LivingUniverseField, UniverseRitualDock } from '@/components/r8-living-universe'
import { CompleteUniverseEngine, UniverseObjectConstellation } from '@/components/r8-complete-universe'
import { CosmicWeatherLayer, SensoryUniverseEngine, SpatialJourneyMap } from '@/components/r8-sensory-universe'
import { InteractiveUniverseEngine, LivingQuestRail, ObservationSearchPanel, WorldModeDock } from '@/components/r8-interactive-universe'
import { SceneDepthField, SceneUniverseEngine } from '@/components/r8-scene-universe'
import { CivilizationUniverseEngine, UniverseObjectWorkbench, WorldTrailBreadcrumb } from '@/components/r8-civilization-universe'
import { WorldMotionLayer, WorldRuntimeDock } from '@/components/r8-dynamic-world'

/**
 * WorldRuntimeStack 是全站世界投影层的唯一装配点。
 *
 * 设计边界：
 * - WorldShell 只负责页面骨架，不直接知道每一代 R8.x 动态实现。
 * - 这里装配的 Universe / Living / Sensory / Interactive / Civilization 均为表现投影层。
 * - 真实事实来源仍应来自 src/lib/types.ts 与 data/domain 数据，不能在这里重新定义 Node / Area / Relation / WorldState。
 */
export function WorldRuntimeStack() {
  return (
    <>
      <UniverseStage />
      <WorldMotionLayer />
      <LivingWorldViewport />
      <CosmicWeatherLayer />
      <LivingUniverseField />
      <WorldRouteTransition />
      <WorldPulseRibbon />
      <DynamicCompassOverlay />
      <FullUniverseOrchestrator />
      <LivingAreaIdentity />
      <UniverseRitualDock />
      <UniverseObjectConstellation />
      <SpatialJourneyMap />
      <CompleteUniverseEngine />
      <SensoryUniverseEngine />
      <SceneDepthField />
      <InteractiveUniverseEngine />
      <SceneUniverseEngine />
      <CivilizationUniverseEngine />
      <WorldTrailBreadcrumb />
      <ObservationSearchPanel />
      <LivingQuestRail />
      <WorldModeDock />
      <UniverseObjectWorkbench />
    </>
  )
}

export function WorldRuntimeUtilityDock() {
  return <WorldRuntimeDock />
}
