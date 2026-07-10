import { z } from 'zod'

export const SCENE_CONTEXT_SCHEMA_VERSION = 1 as const
export const sceneIdSchema = z.enum(['gateway', 'atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse'])

export const sceneContextSchema = z.object({
  schemaVersion: z.literal(SCENE_CONTEXT_SCHEMA_VERSION),
  sceneId: sceneIdSchema,
  sourcePath: z.string().nullable(),
  focusedObjectId: z.string().nullable(),
  pathId: z.string().nullable(),
  pathStep: z.number().int().nonnegative().nullable(),
  timelineAnchor: z.string().nullable(),
})

export type SceneId = z.infer<typeof sceneIdSchema>
export type SceneContext = z.infer<typeof sceneContextSchema>
