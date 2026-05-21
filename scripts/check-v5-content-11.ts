import fs from 'node:fs'
import { getBrokenRealContentReferences, realReadingPaths } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/components/real-content/RealReadingPathway.tsx','data/v5-real-content/stage-03/11-real-reading-paths.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(realReadingPaths.length < 2) errors.push('reading paths too few')
if(getBrokenRealContentReferences().length > 0) errors.push('broken real content references found')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 11 checks passed.')
