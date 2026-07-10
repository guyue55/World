import { z } from 'zod'

export const lighthouseProviderOutputSchema = z.object({
  answer: z.string().min(1).max(800),
  sourceIds: z.array(z.string().min(1)).max(6),
})

export type LighthouseProviderOutput = z.infer<typeof lighthouseProviderOutputSchema>
export type LighthouseProviderContext = { id: string; title: string; summary: string }
export type LighthouseProviderRequest = {
  question: string
  context: LighthouseProviderContext[]
  signal: AbortSignal
}
export type LighthouseProviderResult =
  | { status: 'success'; output: LighthouseProviderOutput; provider: string; model: string; inputTokens?: number; outputTokens?: number }
  | { status: 'disabled' | 'timeout' | 'error' | 'invalid'; reason: string; provider?: string; model?: string }

export interface LighthouseProvider {
  readonly id: string
  readonly enabled: boolean
  answer(request: LighthouseProviderRequest): Promise<LighthouseProviderResult>
}
