import { z } from 'zod'

const projectionExpectationSchema = z.union([
  z.object({ applicable: z.literal(true), requiredEvidence: z.array(z.string().min(1)).min(1) }),
  z.object({ applicable: z.literal(false), reasonCode: z.string().min(1), reason: z.string().min(12) }),
])

export const authorUpdateDraftSchema = z.object({
  schemaVersion: z.literal('1.0.0'),
  operation: z.literal('update'),
  updateId: z.string().regex(/^[a-z0-9][a-z0-9-]{2,99}$/),
  nodeId: z.string().regex(/^[a-z0-9][a-z0-9-]{2,99}$/),
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{2,99}$/),
  contentPath: z.string().regex(/^content\/(?!.*\.\.)[a-zA-Z0-9/_-]+\.mdx?$/),
  baseContentSha256: z.string().regex(/^[a-f0-9]{64}$/),
  expectedPhrase: z.string().trim().min(8).max(120),
  appendMarkdown: z.string().trim().min(80).max(10_000),
  eventDraft: z.object({
    id: z.string().regex(/^[a-z0-9][a-z0-9-]{2,119}$/),
    title: z.string().trim().min(2).max(120),
    date: z.string().date(),
    description: z.string().trim().min(12).max(500),
  }),
  asset: z.object({ source: z.string().min(1), license: z.string().min(1), bytes: z.number().int().nonnegative() }).optional(),
  expectedProjections: z.record(z.string(), projectionExpectationSchema),
})

export type AuthorUpdateDraft = z.infer<typeof authorUpdateDraftSchema>
export function parseAuthorUpdateDraft(input: unknown): AuthorUpdateDraft { return authorUpdateDraftSchema.parse(input) }
