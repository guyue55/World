import fs from 'node:fs'
import { worldMetrics } from '../src/features/worldification-v4'
const errors:string[]=[]
for(const item of ['src/components/worldification/WorldStateOrbit.tsx','data/v4-worldification/stage-03/11-world-state-orbit.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(!worldMetrics.some((metric)=>metric.status==='pending-real-content')) errors.push('V5 pending real content metric missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 11 checks passed.')
