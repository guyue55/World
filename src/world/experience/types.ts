import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import type { SceneContext, SceneId } from '@/lib/scenes/scene-context'
import type { SceneDestination } from '@/lib/scenes/scene-destination'
import type { WorldSignalSnapshot } from '@/world/runtime/signals'

export type { SceneId }
export type PublicWorldProjection = Pick<PublicWorldObjectIndex, 'nodes' | 'areas' | 'relations' | 'paths' | 'events'>

export type StaticSceneDescriptor = {
  heading: string
  summary: string
  destinations: SceneDestination[]
}

export type ArrivalTarget = {
  objectId: string
  fallbackPosition: { xRatio: number; yRatio: number }
}

export type SoundPreference = {
  mode: 'muted' | 'enabled'
  volume: number
  sessionArmed: boolean
}

export type MigrationIntent = {
  source: SceneContext
  destination: SceneDestination
  sourceGeometry: DOMRectReadOnly | null
  returnFocusId: string | null
}

export type MigrationSnapshot =
  | { kind: 'idle' }
  | { kind: 'leaving'; intent: MigrationIntent; startedAt: number }
  | { kind: 'in-transit'; intent: MigrationIntent; startedAt: number }
  | { kind: 'arriving'; intent: MigrationIntent; startedAt: number }
  | { kind: 'settled'; context: SceneContext; settledAt: number }
  | { kind: 'cancelled'; reason: string; context: SceneContext }

export type WorldExperienceManifestEntry = {
  id: SceneId
  matchRoute: (pathname: string) => boolean
  buildModelId: string
  sceneModuleId: string
  staticFallbackId: string
  acceptedSignals: Array<keyof WorldSignalSnapshot>
  activityLevel: 'high' | 'medium' | 'low'
  soundscapeId: string
  arrivalObjectIds: string[]
  requiredModes: Array<'desktop' | 'mobile' | 'reduced' | 'static'>
}
