import finalClosure from '../../../data/v4/stage-06/24-v4-final-v5-entry.json'

export function getV4EntryStatus() {
  return {
    status: finalClosure.status,
    completedBatches: finalClosure.completedBatches,
    v4Status: finalClosure.v4Status,
    v5PlanningAllowed: finalClosure.v5PlanningAllowed,
    v5FormalDevelopmentAllowed: finalClosure.v5FormalDevelopmentAllowed,
    releaseReady: finalClosure.releaseReady,
    productionLive: finalClosure.productionLive,
  }
}
