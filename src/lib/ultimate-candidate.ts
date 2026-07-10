import ultimateCandidateContract from '../../data/domains/experience/ultimate-candidate-acceptance-v1.json'

export type UltimateCandidateContract = typeof ultimateCandidateContract

export type UltimateCandidateSummary = {
  name: string
  version: string
  candidateThreshold: number
  pillarCount: number
  requiredRecordingCount: number
  reportPath: string
  localOnly: boolean
  pillars: Array<{
    id: string
    label: string
    minimumScore: number
  }>
}

export function getUltimateCandidateContract(): UltimateCandidateContract {
  return ultimateCandidateContract
}

export function getUltimateCandidateSummary(): UltimateCandidateSummary {
  return {
    name: ultimateCandidateContract.name,
    version: ultimateCandidateContract.version,
    candidateThreshold: ultimateCandidateContract.candidateThreshold,
    pillarCount: ultimateCandidateContract.pillars.length,
    requiredRecordingCount: ultimateCandidateContract.acceptance.requiredRecordings.length,
    reportPath: ultimateCandidateContract.acceptance.report,
    localOnly: ultimateCandidateContract.scope.localOnly,
    pillars: ultimateCandidateContract.pillars.map((pillar) => ({
      id: pillar.id,
      label: pillar.label,
      minimumScore: pillar.minimumScore,
    })),
  }
}
