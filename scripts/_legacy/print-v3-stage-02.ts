import { getV3MultiSpaceModel } from '../src/lib/v3/multi-space'

const model = getV3MultiSpaceModel()
console.log('V3 Stage 02 Multi Space')
console.log(`spaces=${model.summary.spaces}`)
console.log(`actors=${model.summary.actors}`)
console.log(`bridges=${model.summary.bridges}`)
console.log(`blockedBridges=${model.summary.blockedBridges}`)
console.log(`ready=${model.summary.ready}`)
