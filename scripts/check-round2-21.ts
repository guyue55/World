import fs from 'node:fs'
import { themeLayoutVariants, themeModes } from '../src/features/theme-system'
const errors:string[]=[]
for(const item of ['src/features/theme-system/model.ts','src/features/theme-system/tokens.ts','src/features/theme-system/variants.ts','src/features/theme-system/persistence.ts','src/features/theme-system/index.ts','data/theme-system/theme-modes.json','data/round-02/stage-06/21-theme-token-layout-variant.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
for(const id of ['nature','cosmos','library','atelier']) if(!themeModes.some(t=>t.id===id)) errors.push(`missing ${id}`)
if(Object.keys(themeLayoutVariants).length!==4) errors.push('must define 4 layout variants')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 21 checks passed.')
