export type Visibility =
  | 'public'
  | 'semiPublic'
  | 'private'
  | 'family'
  | 'partner'
  | 'vault'
  | 'sealed'
  | 'silent'

export type LifeStage =
  | 'seed'
  | 'sprout'
  | 'growing'
  | 'bloom'
  | 'fruit'
  | 'archive'
  | 'relic'
  | 'dormant'
  | 'silent'

export type NodeType =
  | 'article'
  | 'project'
  | 'fragment'
  | 'memory'
  | 'photo'
  | 'document'
  | 'letter'
  | 'place'
  | 'object'
  | 'rule'
  | 'path'
  | 'event'

export type SourceType =
  | 'manual'
  | 'upload'
  | 'import'
  | 'chat'
  | 'ai-assisted'
  | 'github'
  | 'system'

export type ContentLayer = 'fact' | 'interpretation' | 'imagination'

export type Node = {
  id: string
  slug: string
  title: string
  worldTitle?: string
  type: NodeType
  areaId: string
  summary?: string
  contentPath?: string
  cover?: string
  media?: string[]
  tags: string[]
  visibility: Visibility
  lifeStage: LifeStage
  source: SourceType
  layer?: ContentLayer
  featured?: {
    home?: boolean
    representative?: boolean
    recommended?: boolean
    timelineKey?: boolean
    pathCore?: boolean
    yearbookCandidate?: boolean
  }
  ai?: {
    generated: boolean
    reviewed: boolean
    summary?: string
    tasks?: string[]
    generatedAt?: string
    model?: string
  }
  createdAt: string
  updatedAt?: string
}

export type AreaStatus = 'draft' | 'experimental' | 'active' | 'quiet' | 'archived' | 'sealed'

export type Area = {
  id: string
  worldName: string
  realName: string
  description: string
  parentId?: string
  level: 1 | 2 | 3 | 4
  status: AreaStatus
  defaultVisibility: Visibility
  noAIFallback?: string
  aiEnhancement?: string
  icon?: string
  order?: number
}

export type RelationType =
  | 'topic'
  | 'time'
  | 'project'
  | 'place'
  | 'person'
  | 'memory'
  | 'inspired'
  | 'derived'
  | 'implemented'
  | 'summarized'
  | 'publicVersionOf'
  | 'privateSourceOf'
  | 'revivedFrom'

export type Relation = {
  id?: string
  from: string
  to: string
  type: RelationType
  strength: 0.2 | 0.5 | 0.8 | 1.0
  note?: string
  source?: 'manual' | 'rule' | 'ai' | 'markdown-link'
  reviewed?: boolean
}

export type PathAudience = 'first-time' | 'tech' | 'life' | 'deep-dive' | 'creator'

export type Path = {
  id: string
  title: string
  description: string
  audience: PathAudience
  estimatedMinutes?: number
  nodeSlugs: string[]
  nextPathIds?: string[]
  visibility: 'public' | 'private'
}

export type WorldEventType =
  | 'world-concept-formed'
  | 'principle-created'
  | 'node-created'
  | 'node-updated'
  | 'node-published'
  | 'node-archived'
  | 'node-revived'
  | 'area-created'
  | 'area-awakened'
  | 'rule-triggered'
  | 'ai-suggestion-approved'
  | 'snapshot-created'
  | 'season-changed'

export type WorldEvent = {
  id: string
  type: WorldEventType
  title: string
  date: string
  description: string
  nodeIds?: string[]
  areaIds?: string[]
  visibility?: Visibility
  actor?: 'creator' | 'rule' | 'ai' | 'system'
}

export type WorldMode = 'alive' | 'quiet' | 'frozen' | 'repair' | 'archive'
export type WorldSeason = 'spring' | 'summer' | 'autumn' | 'winter'
export type DayPhase = 'dawn' | 'day' | 'dusk' | 'night'
export type AIStatus = 'enabled' | 'low-light' | 'disabled'

export type WorldState = {
  mode: WorldMode
  season: WorldSeason
  dayPhase: DayPhase
  aiStatus: AIStatus
  lastUpdated: string
}
