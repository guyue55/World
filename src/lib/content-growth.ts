import phaseThreeContentGrowthContract from '../../data/domains/content/phase-three-content-growth-contract.json'
import themeExhibitionMap from '../../data/domains/experience/theme-exhibition-map.json'
import contentGrowthBoard from '../../data/domains/content/content-growth-board.json'
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

export function getContentGrowthSummary() {
  return {
    stageProgress: phaseThreeContentGrowthContract.stageProgress,
    growthModules: phaseThreeContentGrowthContract.growthModules.length,
    exhibitions: themeExhibitionMap.exhibitions.length,
    publicExhibitions: themeExhibitionMap.exhibitions.filter((item) => item.visibility === 'public').length,
    boardLanes: contentGrowthBoard.lanes.length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
