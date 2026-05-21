import fs from 'node:fs'
import { realTimelineEvents } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/features/real-content-v5/world-links.ts','src/components/real-content/RealTimelineRiver.tsx','data/v5-real-content/stage-03/09-real-timeline-river.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(realTimelineEvents.length < 3) errors.push('timeline events too few')
if(!realTimelineEvents.some((event)=>event.privacy==='private-redacted')) errors.push('redacted timeline event missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 09 checks passed.')
