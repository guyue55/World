import fs from 'node:fs'; import { contentChannels, contentIndexEntries, getIndexEntriesByPlacement } from '../src/features/content-taxonomy'
const errors:string[]=[]; for(const item of ['src/features/content-taxonomy/model.ts','src/features/content-taxonomy/data.ts','src/components/content-ingestion/ContentChannelBoard.tsx','data/content/content-taxonomy.json','data/round-03/stage-01/02-content-taxonomy.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
for(const id of ['article','life','tech','photo','world-rule','ai-suggestion']) if(!contentChannels.some(c=>c.id===id)) errors.push(`missing ${id}`)
if(contentIndexEntries.length<5) errors.push('index entries too few'); if(getIndexEntriesByPlacement('home').length<1) errors.push('home placement missing')
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 02 checks passed.')
