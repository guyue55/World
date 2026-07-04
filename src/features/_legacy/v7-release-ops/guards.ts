import { v7EvidenceMatrix, v7ReleaseCockpit, v7ReleaseRoadmap, v7V8Handoff } from './data'

const forbiddenPublicMarkers = ['familyOnly', 'partnerOnly', 'vault', 'sealed', 'privateRaw']

export function assertV7ReleaseBoundary() {
  const errors: string[] = []

  if (v7ReleaseRoadmap.releaseReady !== false) errors.push('V7 releaseReady must remain false')
  if (v7ReleaseRoadmap.productionLive !== false) errors.push('V7 productionLive must remain false')
  if (v7ReleaseCockpit.releaseReady !== false) errors.push('V7 cockpit releaseReady must remain false')
  if (v7V8Handoff.productionLive !== false) errors.push('V8 handoff productionLive must remain false')

  const passedRequired = v7EvidenceMatrix.items.filter(
    (item) => item.requiredForReleaseReady && item.status === 'passed-production',
  )
  if (passedRequired.length > 0) errors.push('V7 must not pre-mark production evidence as passed')

  return errors
}

export function findForbiddenPublicMarkers(input: string) {
  return forbiddenPublicMarkers.filter((marker) => input.includes(marker))
}
