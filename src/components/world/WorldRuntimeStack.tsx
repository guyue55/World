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
 * Single assembly point for full-site world presentation projections.
 *
 * Boundary:
 * - WorldShell owns only the page frame.
 * - WorldRuntimeStack owns R8.x presentation projection assembly.
 * - Node / Area / Relation / WorldState facts must stay in src/lib and data domains.
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
