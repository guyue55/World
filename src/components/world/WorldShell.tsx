import { CompassNav } from './CompassNav'
import { MobileNav } from './MobileNav'
import { WorldMotionLayer, WorldRuntimeDock, WorldRuntimeProvider } from '@/components/r8-dynamic-world'
import { DynamicCompassOverlay, UniverseStage, WorldPulseRibbon, WorldRouteTransition } from '@/components/r8-deep-dynamic-world'
import { FullUniverseOrchestrator, LivingWorldViewport } from '@/components/r8-full-dynamic-world'
import { LivingAreaIdentity, LivingUniverseField, UniverseRitualDock } from '@/components/r8-living-universe'
import { CompleteUniverseEngine, UniverseObjectConstellation } from '@/components/r8-complete-universe'
import { CosmicWeatherLayer, SensoryUniverseEngine, SpatialJourneyMap } from '@/components/r8-sensory-universe'
import { InteractiveUniverseEngine, LivingQuestRail, ObservationSearchPanel, WorldModeDock } from '@/components/r8-interactive-universe'
import { SceneDepthField, SceneUniverseEngine } from '@/components/r8-scene-universe'
import { CivilizationUniverseEngine, UniverseObjectWorkbench, WorldTrailBreadcrumb } from '@/components/r8-civilization-universe'

export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    <WorldRuntimeProvider>
      <div className="min-h-screen pb-20 md:pb-0">
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
        <CompassNav />
        {children}
        <footer className="world-container border-t border-ink/10 py-10 text-sm text-ink/60">
          <p>古月浮屿｜一个正在生长的个人数字世界。</p>
        </footer>
        <WorldRuntimeDock />
        <MobileNav />
      </div>
    </WorldRuntimeProvider>
  )
}
