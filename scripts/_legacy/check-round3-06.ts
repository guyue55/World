import fs from 'node:fs'; import { assetGaps, getHighPriorityAssetGaps, assertNoPlaceholderProductionReady } from '../src/features/asset-library/gaps'
const errors:string[]=[]; for(const item of ['src/features/asset-library/gaps.ts','src/components/asset-library/AssetGapBoard.tsx','data/assets/asset-gap-list.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(assetGaps.length<2) errors.push('gaps too few'); if(getHighPriorityAssetGaps().length<1) errors.push('high gap missing'); if(!assertNoPlaceholderProductionReady()) errors.push('placeholder production ready')
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 06 checks passed.')
