import fs from 'node:fs'
import { forbiddenLighthouseActions, getUnsafeLighthouseSuggestions, lighthouseWorkbenchSuggestions, suggestionRequiresHuman } from '../src/features/ai-lighthouse-workbench'
const errors:string[]=[]
for(const item of ['src/components/lighthouse/HumanApprovalGate.tsx','src/features/ai-lighthouse-workbench/boundaries.ts','data/round-02/stage-05/19-risk-human-confirm-boundary.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
for(const action of ['publish','delete','change-visibility','read-private-raw']) if(!(forbiddenLighthouseActions as readonly string[]).includes(action)) errors.push(`missing ${action}`)
if(getUnsafeLighthouseSuggestions().length>0) errors.push('unsafe suggestions found')
for(const s of lighthouseWorkbenchSuggestions.filter(i=>i.risk==='high')) if(!suggestionRequiresHuman(s)) errors.push(`high risk must require human ${s.id}`)
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 19 checks passed.')
