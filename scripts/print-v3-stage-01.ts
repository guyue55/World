import { getV3IntelligentWorldKernel } from '../src/lib/v3/intelligent-world'

const kernel = getV3IntelligentWorldKernel()
console.log('V3 Stage 01 Intelligent World Kernel')
console.log(`memoryTypes=${kernel.summary.memoryTypes}`)
console.log(`graphEdges=${kernel.summary.graphEdges}`)
console.log(`loops=${kernel.summary.loops}`)
console.log(`ready=${kernel.summary.ready}`)
