import { getV3LifeLegacySystem } from '../src/lib/v3/life-legacy'

const system = getV3LifeLegacySystem()
console.log('V3 Stage 04 Life Legacy')
console.log(`archives=${system.summary.archives}`)
console.log(`retentionModes=${system.summary.retentionModes}`)
console.log(`legacyWindows=${system.summary.legacyWindows}`)
console.log(`riskClasses=${system.summary.riskClasses}`)
console.log(`ready=${system.summary.ready}`)
