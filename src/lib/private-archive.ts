import privateArchiveBoundaryPolicy from '../../data/domains/archive/private-archive-boundary-policy.json'
import privateArchiveIndex from '../../data/domains/archive/private-archive-index.json'

export function getPrivateArchiveBoundaryPolicy() {
  return privateArchiveBoundaryPolicy
}

export function getPrivateArchiveIndex() {
  return privateArchiveIndex.items
}

export function getPrivateArchiveSummary() {
  const items = privateArchiveIndex.items

  return {
    stageProgress: privateArchiveIndex.stageProgress,
    status: privateArchiveIndex.status,
    itemCount: items.length,
    excludedCount: items.filter((item) => item.publicBuild === 'excluded').length,
    storedContentCount: items.filter((item) => item.contentStored).length,
    tiers: Array.from(new Set(items.map((item) => item.tier))).length,
  }
}
