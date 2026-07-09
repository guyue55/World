import firstVisitRitual from '../../data/domains/experience/first-visit-ritual.json'

export type FirstVisitRitualConfig = typeof firstVisitRitual
export type FirstVisitRitualAction = FirstVisitRitualConfig['actions'][number]

export type FirstVisitRitualSummary = {
  name: string
  version: string
  localOnly: boolean
  publicExperienceOnly: boolean
  storageKey: string
  actions: FirstVisitRitualAction[]
  reducedMotionNote: string
}

export const FIRST_VISIT_RITUAL_STORAGE_KEY = firstVisitRitual.storage.key
export const FIRST_VISIT_RITUAL_STORAGE_VALUE = firstVisitRitual.storage.value

export function getFirstVisitRitualConfig(): FirstVisitRitualConfig {
  return firstVisitRitual
}

export function getFirstVisitRitualSummary(): FirstVisitRitualSummary {
  return {
    name: firstVisitRitual.name,
    version: firstVisitRitual.version,
    localOnly: firstVisitRitual.scope.localOnly,
    publicExperienceOnly: firstVisitRitual.scope.publicExperienceOnly,
    storageKey: firstVisitRitual.storage.key,
    actions: firstVisitRitual.actions,
    reducedMotionNote: firstVisitRitual.copy.reducedMotionNote,
  }
}
