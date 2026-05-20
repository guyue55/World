import accessibility from '../../data/v3/stage-03/10-v3-immersive-accessibility.json'
import exhibition from '../../data/v3/stage-03/11-v3-exhibition-worldbook.json'
import finalReport from '../../data/v3/stage-03/12-v3-stage-three-final.json'
import universeMap from '../../data/v3/stage-03/09-v3-universe-map-ia.json'

export function getV3VisualUniverse() {
  return {
    universeMap,
    accessibility,
    exhibition,
    finalReport,
    summary: {
      stage: 3,
      views: universeMap.views.length,
      navigationModes: universeMap.navigationModes.length,
      accessibilityChecks: accessibility.accessibilityChecks.length,
      exhibitionTypes: exhibition.exhibitionTypes.length,
      ready: false,
    },
  }
}
