import atlasLayoutContract from '../../data/domains/experience/atlas-layout-contract.json'
import { getAllAreaCoordinates, validateSpatialProtocol } from './spatial'
import { getAllAreas } from './areas'

export type AtlasContractIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getAtlasLayoutContract() {
  return atlasLayoutContract
}

export function validateAtlasContract(): AtlasContractIssue[] {
  const issues: AtlasContractIssue[] = []
  const spatialErrors = validateSpatialProtocol(getAllAreas())

  spatialErrors.forEach((message) => {
    issues.push({
      id: `spatial-${message}`,
      severity: 'error',
      message,
    })
  })

  if (getAllAreaCoordinates().length < getAllAreas().length) {
    issues.push({
      id: 'atlas-coordinate-count',
      severity: 'error',
      message: 'Atlas 坐标数量少于区域数量。',
    })
  }

  if (!atlasLayoutContract.requiredFallbacks.includes('list view')) {
    issues.push({
      id: 'atlas-list-fallback',
      severity: 'error',
      message: 'Atlas 必须有 list view 降级。',
    })
  }

  return issues
}
