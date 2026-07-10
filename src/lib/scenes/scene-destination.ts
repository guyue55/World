import { z } from 'zod'
import { sceneIdSchema, type SceneContext } from './scene-context'

export const transitionObjectSchema = z.enum(['island', 'star', 'ripple', 'document', 'waypoint', 'door', 'beam'])

export const sceneDestinationSchema = z.object({
  href: z.string().startsWith('/'),
  sceneId: sceneIdSchema,
  objectId: z.string().optional(),
  transitionObject: transitionObjectSchema,
  accessibleLabel: z.string().min(1),
})

export type SceneDestination = z.infer<typeof sceneDestinationSchema>

export function createSceneContext(sceneId: SceneContext['sceneId'], sourcePath: string | null = null): SceneContext {
  return {
    schemaVersion: 1,
    sceneId,
    sourcePath,
    focusedObjectId: null,
    pathId: null,
    pathStep: null,
    timelineAnchor: null,
  }
}
