import plan from '../../../data/r8-deep-dynamic-world/plan.json'
import matrix from '../../../data/r8-deep-dynamic-world/page-matrix.json'
import type { DynamicDepthStage, DynamicPageMatrixItem } from './types'

export function getR82Plan() {
  return plan as typeof plan & { stages: DynamicDepthStage[] }
}

export function getR82PageMatrix() {
  return matrix as typeof matrix & { pages: DynamicPageMatrixItem[] }
}

export function getR82DynamicSummary() {
  const typedPlan = getR82Plan()
  const typedMatrix = getR82PageMatrix()
  return {
    version: typedPlan.version,
    name: typedPlan.name,
    completedStages: typedPlan.stages.filter((stage) => stage.status === 'complete').length,
    totalStages: typedPlan.stages.length,
    dynamicPages: typedMatrix.pages.length,
    globalSurfaces: typedMatrix.globalSurfaces.length,
  }
}
