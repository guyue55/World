import fs from 'node:fs'; import { getBrokenAssetBindings, getUnregisteredAssetIdsFromSeeds, resolveAssetsForSeed } from '../src/features/asset-library/resolver'
const errors:string[]=[]; for(const item of ['src/features/asset-library/resolver.ts','src/components/asset-library/AssetBoundPreview.tsx','data/assets/content-asset-bindings.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(getBrokenAssetBindings().length>0) errors.push('broken bindings'); if(getUnregisteredAssetIdsFromSeeds().length>0) errors.push('unregistered ids'); if(resolveAssetsForSeed('origin-of-word-life').length<1) errors.push('origin asset missing')
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 07 checks passed.')
