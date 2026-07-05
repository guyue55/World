import phaseThreeContentGrowthContract from '../../data/domains/content/phase-three-content-growth-contract.json'
import themeExhibitionMap from '../../data/domains/experience/theme-exhibition-map.json'
import contentGrowthBoard from '../../data/domains/content/content-growth-board.json'
import contentColumnOperationsPlan from '../../data/domains/content/content-column-operations-plan.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getPhaseThreeContentGrowthContract() {
  return phaseThreeContentGrowthContract
}

export function getThemeExhibitionMap() {
  return themeExhibitionMap
}

export function getContentGrowthBoard() {
  return contentGrowthBoard
}

export function getContentColumnOperationsPlan() {
  return contentColumnOperationsPlan
}

export function getContentGrowthSummary() {
  const publicColumns = contentColumnOperationsPlan.columns.filter((item) => item.visibility === 'public')
  const cadences = new Set(publicColumns.map((item) => item.cadence))

  return {
    stageProgress: phaseThreeContentGrowthContract.stageProgress,
    growthModules: phaseThreeContentGrowthContract.growthModules.length,
    exhibitions: themeExhibitionMap.exhibitions.length,
    publicExhibitions: themeExhibitionMap.exhibitions.filter((item) => item.visibility === 'public').length,
    boardLanes: contentGrowthBoard.lanes.length,
    publicColumns: publicColumns.length,
    cadenceKinds: cadences.size,
    weeklyColumns: publicColumns.filter((item) => item.cadence === 'weekly').length,
    monthlyColumns: publicColumns.filter((item) => item.cadence === 'monthly').length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
