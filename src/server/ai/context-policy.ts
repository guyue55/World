export type AIContextVisibility = 'public' | 'semiPublic' | 'private' | 'vault' | 'sealed' | 'silent'

export type AIContextCandidate = {
  id: string
  title: string
  summary?: string
  visibility: AIContextVisibility
  authorized?: boolean
}

export type AIContextSlice = {
  allowed: AIContextCandidate[]
  excluded: Array<{
    id: string
    visibility: AIContextVisibility
    reason: string
  }>
}

export const allowedAIContextVisibilities: AIContextVisibility[] = ['public', 'semiPublic']
export const excludedAIContextVisibilities: AIContextVisibility[] = ['private', 'vault', 'sealed', 'silent']

export function buildAIContextSlice(candidates: AIContextCandidate[]): AIContextSlice {
  const allowed: AIContextCandidate[] = []
  const excluded: AIContextSlice['excluded'] = []

  for (const candidate of candidates) {
    if (allowedAIContextVisibilities.includes(candidate.visibility) || candidate.authorized === true) {
      allowed.push(candidate)
      continue
    }

    excluded.push({
      id: candidate.id,
      visibility: candidate.visibility,
      reason: 'AI provider context excludes private, vault, sealed and silent content unless backend authorization is explicit.',
    })
  }

  return { allowed, excluded }
}
