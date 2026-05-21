export type EditorialStatus = 'draft' | 'ready' | 'published'
export type ContentChannel = 'home' | 'constellation' | 'time-river' | 'lighthouse'

export type ContentSeed = {
  id: string
  title: string
  summary: string
  channel: ContentChannel
  status: EditorialStatus
  visibility: 'public' | 'private-redacted'
  tags: string[]
}
