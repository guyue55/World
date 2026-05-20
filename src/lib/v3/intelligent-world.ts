import growthLoop from '../../data/v3/stage-01/03-v3-growth-loop.json'
import memoryGraph from '../../data/v3/stage-01/02-v3-world-memory-graph.json'
import scope from '../../data/v3/stage-01/01-v3-intelligent-world-scope.json'
import stageOneFinal from '../../data/v3/stage-01/04-v3-stage-one-final.json'

export function getV3IntelligentWorldKernel() {
  return {
    scope,
    memoryGraph,
    growthLoop,
    stageOneFinal,
    summary: {
      stage: 1,
      memoryTypes: memoryGraph.memoryTypes.length,
      graphEdges: memoryGraph.graphEdges.length,
      loops: growthLoop.loops.length,
      ready: false,
    },
  }
}
