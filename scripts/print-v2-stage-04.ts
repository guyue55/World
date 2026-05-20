import { getV2AiOps } from '../src/lib/v2/ai-ops'

const aiOps = getV2AiOps()
console.log('V2 Stage 04 AI Ops')
console.log(`providers=${aiOps.summary.providers}`)
console.log(`workflows=${aiOps.summary.workflows}`)
console.log(`apis=${aiOps.summary.apis}`)
console.log(`taskTypes=${aiOps.summary.taskTypes}`)
console.log(`ready=${aiOps.summary.ready}`)
