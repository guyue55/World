import type { SceneContext } from '@/lib/scenes/scene-context'
import type { SceneDestination } from '@/lib/scenes/scene-destination'
import type { MigrationIntent, SoundPreference } from '@/world/experience/types'
import type { WorldTimeSnapshot } from './clock'
import type { WorldSignalSnapshot } from './signals'

export type RuntimeEvent =
  | { type: 'clock/ticked'; snapshot: WorldTimeSnapshot }
  | { type: 'visibility/changed'; value: 'visible' | 'hidden' }
  | { type: 'scene/entered'; context: SceneContext }
  | { type: 'scene/focused'; objectId: string }
  | { type: 'migration/requested'; intent: MigrationIntent }
  | { type: 'migration/settled'; destination: SceneDestination }
  | { type: 'journey/progressed'; pathId: string; nodeId: string }
  | { type: 'sound/changed'; preference: SoundPreference }
  | { type: 'lighthouse/status'; status: WorldSignalSnapshot['lighthouse'] }
