import fs from 'node:fs'; import { contentSeeds, getPublicContentSeeds, getRedactedContentSeeds } from '../src/features/content-ingestion'
const errors:string[]=[]; for(const item of ['src/features/content-ingestion/model.ts','src/features/content-ingestion/data.ts','src/components/content-ingestion/ContentSeedBoard.tsx','src/app/content-studio/page.tsx','data/round-03/stage-01/01-content-seeds.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(contentSeeds.length<5) errors.push('contentSeeds too few'); if(getPublicContentSeeds().length<4) errors.push('public seeds too few'); if(getRedactedContentSeeds().length<1) errors.push('redacted seed missing')
for(const seed of contentSeeds) if(!seed.visibility||!seed.status||!seed.channel) errors.push(`seed missing fields ${seed.id}`)
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 01 checks passed.')
