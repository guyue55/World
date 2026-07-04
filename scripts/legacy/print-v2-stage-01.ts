import { getV2PlatformArchitecture } from '../src/lib/v2/platform'

const architecture = getV2PlatformArchitecture()
console.log('V2 Stage 01 Platform Architecture')
console.log(`services=${architecture.summary.services}`)
console.log(`packages=${architecture.summary.packages}`)
console.log(`ready=${architecture.summary.ready}`)
