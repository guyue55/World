import fs from 'node:fs'
import { getOrderedTimeRiverEvents, timeRiverEventsV2 } from '../src/features/time-river'
const errors:string[]=[]
for(const item of ['src/features/time-river/model.ts','src/features/time-river/data.ts','src/features/time-river/index.ts','data/time-river/timeline-events.json','data/round-02/stage-04/13-time-river-data-unification.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const ordered=getOrderedTimeRiverEvents()
if(timeRiverEventsV2.length<10) errors.push('too few events')
if(ordered[0]?.version!=='V1') errors.push('first must be V1')
if(!ordered.some(e=>e.version==='R2-00')) errors.push('R2-00 missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 13 checks passed.')
