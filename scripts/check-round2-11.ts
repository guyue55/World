import fs from 'node:fs'
import { getNextPathHints, getRelatedContentNodes } from '../src/features/content-constellation/recommendations'
const errors:string[]=[]
for(const item of ['src/features/content-constellation/recommendations.ts','src/components/constellation/RelatedNodeRail.tsx','src/components/constellation/NextPathHint.tsx','data/round-02/stage-03/11-node-detail-recommendations.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(getRelatedContentNodes('world-manifesto').length===0) errors.push('related nodes missing')
if(getNextPathHints('world-manifesto').length===0) errors.push('next path hints missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 11 checks passed.')
