export type V6CivilizationDomain = 'work' | 'creation' | 'family' | 'learning' | 'memory' | 'relationship' | 'legacy'

export type V6LifeProject = {
  id: string
  domain: V6CivilizationDomain
  milestones: string[]
  reviewRequired: true
}

export function createV6LifeProject(id: string, domain: V6CivilizationDomain, milestones: string[]): V6LifeProject {
  return { id, domain, milestones, reviewRequired: true }
}

export function getV6ProjectProgress(project: V6LifeProject) {
  return {
    projectId: project.id,
    milestoneCount: project.milestones.length,
    reviewRequired: project.reviewRequired,
  }
}
