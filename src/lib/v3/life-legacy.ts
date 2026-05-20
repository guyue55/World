import archive from '../../data/v3/stage-04/13-v3-life-archive-model.json'
import finalReport from '../../data/v3/stage-04/16-v3-stage-four-final.json'
import governance from '../../data/v3/stage-04/15-v3-ethics-risk-governance.json'
import legacy from '../../data/v3/stage-04/14-v3-legacy-protocol.json'

export function getV3LifeLegacySystem() {
  return {
    archive,
    legacy,
    governance,
    finalReport,
    summary: {
      stage: 4,
      archives: archive.archives.length,
      retentionModes: archive.retentionModes.length,
      legacyWindows: legacy.legacyWindows.length,
      riskClasses: governance.riskClasses.length,
      ready: false,
    },
  }
}
