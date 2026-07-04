export type RealContentKind = 'article' | 'photo-story' | 'project-log' | 'life-note' | 'timeline-event' | 'exhibition' | 'reading-path'
export type RealContentStatus = 'draft' | 'curated' | 'ready' | 'published-local'
export type RealContentVisibility = 'public' | 'private-redacted'
export type RealContentDomain = 'world' | 'technology' | 'life' | 'memory' | 'design' | 'ai'

export type RealContentItem = {
  id: string
  title: string
  subtitle: string
  kind: RealContentKind
  domain: RealContentDomain
  status: RealContentStatus
  visibility: RealContentVisibility
  summary: string
  body: string
  tags: string[]
  routeHint: string
  worldNodeId: string
  assetIds: string[]
}

export type RealContentCollection = {
  id: string
  title: string
  description: string
  itemIds: string[]
  purpose: 'homepage' | 'exhibition' | 'timeline' | 'pathway'
}
