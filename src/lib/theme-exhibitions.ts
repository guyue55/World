import themeExhibitionMap from '../../data/domains/experience/theme-exhibition-map.json'
import themeExhibitionImplementationContract from '../../data/domains/experience/theme-exhibition-implementation-contract.json'

export function getThemeExhibitionImplementationContract() {
  return themeExhibitionImplementationContract
}

export function getThemeExhibitions() {
  return themeExhibitionMap.exhibitions
}

export function getThemeExhibitionSummary() {
  return {
    stageProgress: themeExhibitionImplementationContract.stageProgress,
    route: themeExhibitionImplementationContract.route,
    exhibitions: themeExhibitionMap.exhibitions.length,
    publicExhibitions: themeExhibitionMap.exhibitions.filter((item) => item.visibility === 'public').length,
    planningOnly: themeExhibitionMap.exhibitions.filter((item) => item.visibility === 'planning-only').length,
  }
}
