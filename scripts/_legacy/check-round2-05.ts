import fs from 'node:fs'
import { legacyWorldRoutes, worldMapConnections, worldMapNodes } from '../src/features/world-map-experience'
const errors: string[]=[]
for (const item of ['src/features/world-map-experience/model.ts','src/features/world-map-experience/data.ts','src/features/world-map-experience/index.ts','data/round-02/stage-02/05-world-map-data-model.json','docs/10-development-history/round-02/stage-02-world-map/05-world-map-data-model.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(worldMapNodes.length<8) errors.push('worldMapNodes must include at least 8 nodes')
if(worldMapConnections.length<8) errors.push('worldMapConnections must include at least 8 connections')
if(legacyWorldRoutes.length<5) errors.push('legacyWorldRoutes must include at least 5 routes')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 05 checks passed.')
