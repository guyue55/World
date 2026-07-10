import advancedVisualizationCandidates from '../../data/domains/experience/advanced-visualization-candidates.json'

export type AdvancedVisualizationRegistry = typeof advancedVisualizationCandidates
export type AdvancedVisualizationCandidate = AdvancedVisualizationRegistry['candidates'][number]

export type AdvancedVisualizationSummary = {
  name: string
  version: string
  currentRenderer: string
  pilotTitle: string
  pilotRoute: string
  dependencyDelta: number
  newRuntimeDependencies: string[]
  acceptedCandidateCount: number
  deferredCandidateCount: number
  rejectedCandidateCount: number
  usesHeavyRenderer: boolean
  evidence: string[]
  candidates: Array<{
    id: string
    label: string
    status: string
    currentDecision: string
  }>
}

export function getAdvancedVisualizationRegistry(): AdvancedVisualizationRegistry {
  return advancedVisualizationCandidates
}

export function getAdvancedVisualizationSummary(): AdvancedVisualizationSummary {
  const acceptedCandidateCount = advancedVisualizationCandidates.candidates.filter((item) => item.status === 'accepted-now').length
  const deferredCandidateCount = advancedVisualizationCandidates.candidates.filter((item) => item.status === 'deferred').length
  const rejectedCandidateCount = advancedVisualizationCandidates.candidates.filter((item) => item.status === 'rejected-for-now').length
  const runtime = advancedVisualizationCandidates.runtime

  return {
    name: advancedVisualizationCandidates.name,
    version: advancedVisualizationCandidates.version,
    currentRenderer: runtime.currentRenderer,
    pilotTitle: advancedVisualizationCandidates.pilot.title,
    pilotRoute: runtime.pilotRoute,
    dependencyDelta: runtime.dependencyDelta,
    newRuntimeDependencies: runtime.newRuntimeDependencies,
    acceptedCandidateCount,
    deferredCandidateCount,
    rejectedCandidateCount,
    usesHeavyRenderer: runtime.usesD3 || runtime.usesThree || runtime.usesReactThreeFiber || runtime.usesPixi || runtime.usesCanvas || runtime.usesWebGl,
    evidence: advancedVisualizationCandidates.pilot.evidence,
    candidates: advancedVisualizationCandidates.candidates.map((item) => ({
      id: item.id,
      label: item.label,
      status: item.status,
      currentDecision: item.currentDecision,
    })),
  }
}
