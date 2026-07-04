import fs from 'node:fs'
import { worldZones } from '../src/features/worldification-v4'
const errors:string[]=[]
for(const item of ['src/features/worldification-v4/model.ts','src/features/worldification-v4/data.ts','src/components/worldification/WorldPortalHero.tsx','src/app/page.tsx','data/v4-worldification/stage-01/01-world-portal-entry.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(worldZones.length < 8) errors.push('world zones too few')
if(!worldZones.some((z)=>z.kind==='gateway')) errors.push('gateway zone missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 01 checks passed.')
