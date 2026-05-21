export type V6LifeDomain =
  | 'work'
  | 'creation'
  | 'family'
  | 'learning'
  | 'memory'
  | 'relationship'
  | 'legacy'

export type V6LifeProject = {
  id: string
  domain: V6LifeDomain
  goal: string
  milestones: string[]
  visibility: 'public' | 'private' | 'family'
}

export type V6CreationPipeline = {
  ideaInbox: string[]
  draftFactory: string[]
  reviewLoopRequired: true
  publishingRequiresApproval: true
}
