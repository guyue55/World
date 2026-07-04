import fs from 'node:fs'
import { contentNodes } from '../src/features/content-constellation'
import { getContentEmptyState, isSafePublicContentNode } from '../src/features/content-constellation/fallbacks'
const errors:string[]=[]
for(const item of ['src/features/content-constellation/fallbacks.ts','data/round-02/stage-03/12-content-constellation-qa.json','docs/10-development-history/round-02/stage-03-content-constellation/12-content-constellation-qa.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(!getContentEmptyState([])) errors.push('empty state missing')
for(const node of contentNodes) if(!isSafePublicContentNode(node)) errors.push(`unsafe node ${node.id}`)
const qa=JSON.parse(fs.readFileSync('data/round-02/stage-03/12-content-constellation-qa.json','utf8'))
if(!qa.conceptExpansionDecision?.needExpansion) errors.push('expansion decision missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 12 checks passed.')
