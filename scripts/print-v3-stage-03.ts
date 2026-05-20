import { getV3VisualUniverse } from '../src/lib/v3/visual-universe'

const universe = getV3VisualUniverse()
console.log('V3 Stage 03 Visual Universe')
console.log(`views=${universe.summary.views}`)
console.log(`navigationModes=${universe.summary.navigationModes}`)
console.log(`accessibilityChecks=${universe.summary.accessibilityChecks}`)
console.log(`exhibitionTypes=${universe.summary.exhibitionTypes}`)
console.log(`ready=${universe.summary.ready}`)
