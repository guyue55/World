import fs from 'node:fs'
import { worldZones } from '../src/features/worldification-v4'
const errors:string[]=[]
for(const item of ['src/components/worldification/AtlasWorldMap.tsx','src/app/world/page.tsx','data/v4-worldification/stage-01/02-atlas-world-map.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(!worldZones.some((z)=>z.kind==='atlas')) errors.push('atlas zone missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 02 checks passed.')
