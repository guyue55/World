import { z } from 'zod'

export const visibilitySchema = z.enum([
  'public', 'unlisted', 'semiPublic', 'private', 'family', 'partner', 'vault', 'sealed', 'silent',
])

export const lifeStageSchema = z.enum([
  'seed', 'sprout', 'growing', 'bloom', 'fruit', 'archive', 'relic', 'dormant', 'silent',
])

export const nodeSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  worldTitle: z.string().optional(),
  type: z.enum(['article','project','fragment','memory','photo','document','letter','place','object','rule','path','event']),
  areaId: z.string().min(1),
  summary: z.string().optional(),
  contentPath: z.string().optional(),
  cover: z.string().optional(),
  media: z.array(z.string()).optional(),
  tags: z.array(z.string()),
  visibility: visibilitySchema,
  lifeStage: lifeStageSchema,
  source: z.enum(['manual','upload','import','chat','ai-assisted','github','system']),
  layer: z.enum(['fact','interpretation','imagination']).optional(),
  featured: z.object({
    home: z.boolean().optional(),
    representative: z.boolean().optional(),
    recommended: z.boolean().optional(),
    timelineKey: z.boolean().optional(),
    pathCore: z.boolean().optional(),
    yearbookCandidate: z.boolean().optional(),
  }).optional(),
  ai: z.object({
    generated: z.boolean(),
    reviewed: z.boolean(),
    summary: z.string().optional(),
    tasks: z.array(z.string()).optional(),
    generatedAt: z.string().optional(),
    model: z.string().optional(),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
})

export const areaSchema = z.object({
  id: z.string().min(1),
  worldName: z.string().min(1),
  realName: z.string().min(1),
  description: z.string().min(1),
  parentId: z.string().optional(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  status: z.enum(['draft','experimental','active','quiet','archived','sealed']),
  defaultVisibility: visibilitySchema,
  noAIFallback: z.string().optional(),
  aiEnhancement: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
})

export const relationSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(1),
  to: z.string().min(1),
  type: z.enum(['topic','time','project','place','person','memory','inspired','derived','implemented','summarized','publicVersionOf','privateSourceOf','revivedFrom','theme','reference','sequence']),
  strength: z.union([z.literal(0.2), z.literal(0.3), z.literal(0.4), z.literal(0.5), z.literal(0.6), z.literal(0.7), z.literal(0.8), z.literal(1.0)]),
  note: z.string().optional(),
  source: z.enum(['manual','rule','ai','markdown-link']).optional(),
  reviewed: z.boolean().optional(),
})

export const pathSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  audience: z.enum(['first-time','tech','life','deep-dive','creator']),
  estimatedMinutes: z.number().optional(),
  nodeSlugs: z.array(z.string()),
  nextPathIds: z.array(z.string()).optional(),
  visibility: z.enum(['public', 'private']),
})

export const worldEventSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['world-concept-formed','principle-created','node-created','node-updated','node-published','node-archived','node-revived','area-created','area-awakened','rule-triggered','ai-suggestion-approved','snapshot-created','season-changed','content','governance','maintenance','milestone']),
  title: z.string().min(1),
  date: z.string().min(1),
  description: z.string().min(1),
  nodeIds: z.array(z.string()).optional(),
  areaIds: z.array(z.string()).optional(),
  visibility: visibilitySchema.optional(),
  actor: z.enum(['creator','rule','ai','system','worldos-kernel']).optional(),
  summary: z.string().optional(),
})

export const worldStateSchema = z.object({
  mode: z.enum(['alive','quiet','frozen','repair','archive']),
  season: z.enum(['spring','summer','autumn','winter']),
  dayPhase: z.enum(['dawn','day','dusk','night']),
  aiStatus: z.enum(['enabled','low-light','disabled']),
  lastUpdated: z.string(),
})

export const nodesSchema = z.array(nodeSchema)
export const areasSchema = z.array(areaSchema)
export const relationsSchema = z.array(relationSchema)
export const pathsSchema = z.array(pathSchema)
export const worldEventsSchema = z.array(worldEventSchema)
