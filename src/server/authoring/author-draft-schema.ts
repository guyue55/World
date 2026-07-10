import { z } from 'zod'
import type { AuthorNodeDraft } from '@/lib/author-world-editor'

const nodeTypes = ['article', 'project', 'fragment', 'memory', 'photo', 'document', 'letter', 'place', 'object', 'rule', 'path', 'event'] as const
const lifeStages = ['seed', 'sprout', 'growing', 'bloom', 'fruit', 'archive', 'relic', 'dormant', 'silent'] as const
const relationTypes = ['topic', 'time', 'project', 'place', 'person', 'memory', 'inspired', 'derived', 'implemented', 'summarized', 'publicVersionOf', 'privateSourceOf', 'revivedFrom'] as const

export const authorDraftSchema: z.ZodType<AuthorNodeDraft> = z.object({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]{2,79}$/),
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{2,79}$/),
  title: z.string().trim().min(2).max(120),
  worldTitle: z.string().trim().min(2).max(120).optional(),
  type: z.enum(nodeTypes),
  areaId: z.string().min(1),
  summary: z.string().trim().min(24).max(500),
  contentPath: z.string().regex(/^content\/(?!.*\.\.)[a-zA-Z0-9/_-]+\.mdx?$/),
  content: z.string().trim().min(80).max(50_000),
  tags: z.array(z.string().trim().min(1).max(40)).min(1).max(12),
  visibility: z.literal('public'),
  lifeStage: z.enum(lifeStages),
  permissionAuthority: z.enum(['data-contract', 'server']),
  featured: z.object({ home: z.boolean().optional(), representative: z.boolean().optional(), recommended: z.boolean().optional(), timelineKey: z.boolean().optional(), pathCore: z.boolean().optional(), yearbookCandidate: z.boolean().optional() }).optional(),
  ai: z.object({ generated: z.boolean(), reviewed: z.boolean(), summary: z.string().max(500).optional(), tasks: z.array(z.string()).optional(), generatedAt: z.string().optional(), model: z.string().optional() }).optional(),
  relations: z.array(z.object({ to: z.string().min(1), type: z.enum(relationTypes), note: z.string().trim().min(12).max(300), reviewed: z.literal(true) })).min(1).max(12),
  pathIds: z.array(z.string().min(1)).min(1).max(8),
  eventDraft: z.object({ id: z.string().regex(/^[a-z0-9][a-z0-9-]{2,99}$/), title: z.string().trim().min(2).max(120), date: z.string().date(), description: z.string().trim().min(12).max(500) }).optional(),
  asset: z.object({ source: z.string().min(1), license: z.string().min(1), bytes: z.number().int().nonnegative() }).optional(),
})

export function parseAuthorDraft(input: unknown) { return authorDraftSchema.parse(input) }
