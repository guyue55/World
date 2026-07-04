import fs from 'node:fs'
import { forbiddenLighthouseActions, getUnsafeLighthouseSuggestions, lighthouseWorkbenchSuggestions } from '../src/features/ai-lighthouse-workbench'
const errors:string[]=[]
for(const item of ['src/features/ai-lighthouse-workbench/model.ts','src/features/ai-lighthouse-workbench/data.ts','src/features/ai-lighthouse-workbench/boundaries.ts','data/ai-lighthouse/suggestions.json','data/round-02/stage-05/17-ai-suggestion-protocol.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(lighthouseWorkbenchSuggestions.length<4) errors.push('suggestions too few')
if(!forbiddenLighthouseActions.includes('read-private-raw')) errors.push('read-private-raw must be forbidden')
if(getUnsafeLighthouseSuggestions().length>0) errors.push('unsafe suggestions found')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 17 checks passed.')
