import growthLoop from '../data/v3/stage-01/03-v3-growth-loop.json'
import memoryGraph from '../data/v3/stage-01/02-v3-world-memory-graph.json'
import scope from '../data/v3/stage-01/01-v3-intelligent-world-scope.json'
import stageOneFinal from '../data/v3/stage-01/04-v3-stage-one-final.json'

const errors: string[] = []

if (!scope.nonGoals.includes('autonomous publishing')) errors.push('autonomous publishing non-goal missing')
if (!memoryGraph.graphEdges.includes('redacted-from')) errors.push('redaction graph edge missing')
if (!growthLoop.humanGates.includes('private-access')) errors.push('private access gate missing')
if (stageOneFinal.decision !== 'v3-intelligent-world-kernel-complete-stage-two-allowed') {
  errors.push('stage one final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 stage 01 check passed.')
