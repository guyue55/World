import fs from 'node:fs'
import { contentEdges, contentNodes, readingPaths } from '../src/features/content-constellation'
const errors:string[]=[]
for(const item of ['src/features/content-constellation/model.ts','src/features/content-constellation/data.ts','src/features/content-constellation/index.ts','data/content-graph/content-nodes.json','data/round-02/stage-03/09-content-node-relation-model.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(contentNodes.length<6) errors.push('contentNodes too few')
if(contentEdges.length<6) errors.push('contentEdges too few')
if(readingPaths.length<3) errors.push('readingPaths too few')
if(!contentNodes.some(n=>n.visibility==='private-redacted')) errors.push('redacted node required')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 09 checks passed.')
