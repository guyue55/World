import fs from 'node:fs'
import { getPublicRealContentItems, getRedactedRealContentItems, realContentItems } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/features/real-content-v5/model.ts','src/features/real-content-v5/data.ts','src/components/real-content/RealContentGateway.tsx','src/app/real-content/page.tsx','data/v5-real-content/stage-01/01-real-content-seeds.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(realContentItems.length < 5) errors.push('real content items too few')
if(getPublicRealContentItems().length < 4) errors.push('public real content too few')
if(getRedactedRealContentItems().length < 1) errors.push('redacted real content missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 01 checks passed.')
