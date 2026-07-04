import fs from 'node:fs'
import { memoryGraphNodesV2 } from '../src/features/memory-graph'
import { getUnsafeRedactedMemoryNodes } from '../src/features/memory-graph/redaction'
const errors:string[]=[]
for(const item of ['src/features/memory-graph/redaction.ts','data/round-02/stage-04/16-privacy-redaction-graph-qa.json','docs/10-development-history/round-02/stage-04-time-memory/16-privacy-redaction-graph-qa.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const unsafe=getUnsafeRedactedMemoryNodes(memoryGraphNodesV2)
if(unsafe.length>0) errors.push(`unsafe redacted nodes ${unsafe.map(n=>n.id).join(',')}`)
const qa=JSON.parse(fs.readFileSync('data/round-02/stage-04/16-privacy-redaction-graph-qa.json','utf8'))
if(!qa.conceptExpansionDecision?.needExpansion) errors.push('expansion decision missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 16 checks passed.')
