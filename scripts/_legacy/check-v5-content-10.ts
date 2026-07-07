import fs from 'node:fs'
import { realExhibitions, resolveContentIds } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/components/real-content/RealExhibitionRoom.tsx','data/v5-real-content/stage-03/10-real-exhibitions.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(realExhibitions.length < 2) errors.push('exhibitions too few')
for(const exhibition of realExhibitions) if(resolveContentIds(exhibition.contentIds).length < 1) errors.push(`exhibition has no resolved content: ${exhibition.id}`)
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 10 checks passed.')
