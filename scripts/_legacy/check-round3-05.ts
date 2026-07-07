import fs from 'node:fs'; import { visualAssets, getPlaceholderAssets, getProductionReadyAssets } from '../src/features/asset-library'
const errors:string[]=[]; for(const item of ['src/features/asset-library/model.ts','src/features/asset-library/data.ts','src/components/asset-library/AssetLibraryPanel.tsx','src/app/asset-library/page.tsx','data/assets/visual-assets.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(visualAssets.length<5) errors.push('assets too few'); if(getPlaceholderAssets().length<2) errors.push('placeholders too few'); if(getProductionReadyAssets().length!==0) errors.push('production ready not allowed')
for(const a of visualAssets) if(!a.licenseNote||!a.pathHint||(a.source==='placeholder'&&a.productionReady)) errors.push(`bad asset ${a.id}`)
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 05 checks passed.')
