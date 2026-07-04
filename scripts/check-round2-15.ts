import fs from 'node:fs'
import { getMemoryGraphSummary, memoryGraphNodesV2 } from '../src/features/memory-graph'
const errors:string[]=[]
for(const item of ['src/features/memory-graph/model.ts','src/features/memory-graph/data.ts','src/components/memory-graph/MemoryGraphExplorer.tsx','src/app/memory-graph/page.tsx','data/memory-graph/memory-nodes.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const s=getMemoryGraphSummary()
if(s.total<6 || s.redactedCount<2) errors.push('memory graph summary invalid')
for(const node of memoryGraphNodesV2.filter(n=>n.visibility==='private-redacted')) if(!node.summary.includes('脱敏')&&!node.summary.includes('不显示原文')) errors.push(`unsafe redacted node ${node.id}`)
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 15 checks passed.')
