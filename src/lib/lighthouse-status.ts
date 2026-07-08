import lighthouseLocalStatus from '../../data/domains/ai/lighthouse-local-status.json'

export type LighthouseLocalStatus = typeof lighthouseLocalStatus

export function getLighthouseLocalStatus(): LighthouseLocalStatus {
  return lighthouseLocalStatus
}
